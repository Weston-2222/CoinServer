const jwt = require('jsonwebtoken');
const { jwt_config } = require('../../config/env');
const { is_production } = require('../../config/env');
const generateAccessToken = (params) => {
  const payload = {
    id: params.id,
    email: params.email,
  };

  return jwt.sign(payload, jwt_config.access_secret, {
    expiresIn: '30m',
  });
};

const generateRefreshToken = (params) => {
  const payload = {
    id: params.id,
    email: params.email,
  };
  return jwt.sign(payload, jwt_config.refresh_secret, {
    expiresIn: '7d',
  });
};

const setJwtToCookie = (kind, res, token, maxAge = 3600000) => {
  res.cookie(kind, token, {
    httpOnly: true,
    secure: is_production,
    maxAge: maxAge,
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  setJwtToCookie,
};
