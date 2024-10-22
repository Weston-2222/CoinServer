const express = require('express');
const router = express.Router();
const Auth = require('../controllers').Auth;
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const passport = require('passport');
const { is_production } = require('../../config/env');
const { setJwtToCookie } = require('../utils/token');
const User = require('../controllers').User;

// //登入
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Auth.login(email, password);

    const access_token = generateAccessToken(data);
    const refresh_token = generateRefreshToken(data);
    setJwtToCookie('access_token', res, access_token);
    setJwtToCookie('refresh_token', res, refresh_token);
    await User.setRefreshTokenToUserDb(data.id, refresh_token);
    delete data.id;
    res.sendFormattedJson(data);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});
// 刷新 access_token
router.get(
  '/auth/access',
  passport.authenticate('refresh', { session: false }),
  async (req, res) => {
    const access_token = Auth.updateAccessToken(req.user);

    setJwtToCookie('access_token', res, access_token);

    res.sendFormattedJson();
  }
);
//登出
router.post(
  '/auth/logout',
  passport.authenticate('refresh', { session: false }),
  async (req, res) => {
    try {
      await Auth.logout(req.user.id);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.sendFormattedJson();
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }
);

//測試
router.get(
  '/test',
  passport.authenticate('access', { session: false }),
  (req, res) => {
    res.json({ msg: 'Test successful' });
  }
);

module.exports = router;
