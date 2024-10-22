const jwt = require('jsonwebtoken');
const { jwt_config } = require('../../config/env');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwt_config.access_secret, {
    expiresIn: '60s',
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, jwt_config.refresh_secret, {
    expiresIn: '7d',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
