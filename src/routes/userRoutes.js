const express = require('express');
const router = express.Router();
const User = require('../controllers').User;
const bcrypt = require('bcrypt');
//註冊
router.post('/user', async (req, res) => {
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
    res.sendFormattedJson(result);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
});

// //取得user資料
// router.get('/user', User.register);

// //更新user資料
// router.patch('/user', User.register);

module.exports = router;
