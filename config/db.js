const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_IP,
  DB_PORT,
  CLOUD_SQL_CONNECTION_NAME,
  NODE_ENV,
} = process.env;

let nodeEnv = {};
if (NODE_ENV === 'production') {
  nodeEnv = {
    dialect: 'postgres',
    logging: false,
    host: `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`,
  };
}
if (NODE_ENV === 'development') {
  nodeEnv = {
    dialect: 'postgres',
    host: DB_IP,
    port: DB_PORT,
    logging: false,
  };
}
// 創建 Sequelize 實例
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, nodeEnv);

// 測試數據庫連接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('數據庫連接成功。');
  } catch (error) {
    console.error('無法連接到數據庫:', error);
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { sequelize, testConnection };
