const express = require('express');
const router = express.Router();
const Auth = require('../controllers').Auth;
const passport = require('passport');

// //登入
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await Auth.login(email, password);
    res.sendFormattedJson(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});
// 刷新 access_token
router.get(
  '/auth/access',
  passport.authenticate('refresh', { session: false }),
  async (req, res) => {
    const access_token = Auth.updateAccessToken(req.user);

    res.sendFormattedJson({ access_token });
  }
);
//登出
router.post(
  '/auth/logout',
  passport.authenticate('refresh', { session: false }),
  async (req, res) => {
    try {
      const result = await Auth.logout(req.user.id);
      res.sendFormattedJson(result);
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
// //登出
// router.post('/user/logout', User.logout);
module.exports = router;
