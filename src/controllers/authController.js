const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const login = async (email, password) => {
  // 查找使用者
  let user = await User.findOne({ where: { email } });

  const error = {
    msg: '',
    user: null,
    access_token: null,
    refresh_token: null,
  };
  if (!user) {
    error.msg = 'User not found';
    return error;
  }

  // 驗證密碼
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    error.msg = 'Invalid credentials';
    return error;
  }

  // 生成 JWT
  const payload = {
    id: user.id,
    email: user.email,
  };

  const access_token = generateAccessToken(payload);
  const refresh_token = generateRefreshToken(payload);

  await User.update(
    { refresh_token, last_login: new Date() },
    { where: { id: user.id } }
  );
  user = user.toJSON();
  delete user.password;
  delete user.id;
  delete user.refresh_token;
  return {
    access_token,
    refresh_token,
    msg: 'Login successful',
    user,
  };
};

const updateAccessToken = async (user) => {
  const access_token = generateAccessToken({
    id: user.id,
    email: user.email,
  });
  return access_token;
};

const logout = async (user_id) => {
  await User.update({ refresh_token: null }, { where: { id: user_id } });
  return { msg: 'Logout successful' };
};
module.exports = {
  login,
  updateAccessToken,
  logout,
};
