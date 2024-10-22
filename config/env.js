const dotenv = require('dotenv');

// 加載 .env 檔案
dotenv.config();

const jwt_config = {
  access_secret: process.env.JWT_SECRET_ACCESS_TOKEN,
  refresh_secret: process.env.JWT_SECRET_REFRESH_TOKEN,
};

module.exports = {
  jwt_config,
};
