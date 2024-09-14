const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialectOptions =
  process.env.NODE_ENV === 'production'
    ? {
        host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
      }
    : {};
// 從環境變量中獲取數據庫配置
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// 創建 Sequelize 實例
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false, // 設置為 true 可以在控制台看到 SQL 查詢
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions,
});

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
