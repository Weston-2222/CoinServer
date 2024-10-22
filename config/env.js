const dotenv = require('dotenv');

// 加載 .env 檔案
dotenv.config();

const jwt_config = {
  access_secret: process.env.JWT_SECRET_ACCESS_TOKEN,
  refresh_secret: process.env.JWT_SECRET_REFRESH_TOKEN,
};

const is_production = process.env.IS_PRODUCTION == 'true';

module.exports = {
  jwt_config,
  is_production,
};
