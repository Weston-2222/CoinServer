const express = require('express');
const router = express.Router();
const User = require('../controllers').User;
const bcrypt = require('bcrypt');
const passport = require('passport');
const {
  generateAccessToken,
  generateRefreshToken,
  setJwtToCookie,
} = require('../utils/token');
//註冊
router.post('/auth/register', async (req, res) => {
  try {
    // 解構賦值
    const { email, password, name } = req.body;
    // 加密密碼
    const hashedPassword = bcrypt.hashSync(password, 10);
    // 建立user物件
    const user = {
      email,
      password: hashedPassword,
      name,
    };
    // 註冊user
    const result = await User.register(user);

    const access_token = generateAccessToken(result);

    const refresh_token = generateRefreshToken(result);

    setJwtToCookie('access_token', res, access_token);

    setJwtToCookie('refresh_token', res, refresh_token);

    await User.setRefreshTokenToUserDb(result.id, refresh_token);

    delete result.id;
    res.sendFormattedJson(result);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
});

// //更新user資料
router.patch(
  '/user',
  passport.authenticate('access', { session: false }),
  async (req, res) => {
    try {
      const { name } = req.body;

      const result = await User.patchUser(req.user.id, { name });

      res.sendFormattedJson(result);
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }
);
router.get(
  '/user',
  passport.authenticate('access', { session: false }),
  (req, res) => {
    const user = {
      name: req.user.name,
      email: req.user.email,
      created_at: req.user.created_at,
      updated_at: req.user.updated_at,
      last_login: req.user.last_login,
    };
    res.sendFormattedJson(user);
  }
);
module.exports = router;
