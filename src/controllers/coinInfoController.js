const { CoinInfo } = require('../models').CoinInfo;

async function findAll() {
  try {
    const data = await CoinInfo.findAll();

    return data.map((item) => item.toJSON());
  } catch (error) {
    console.error('獲取所有幣種信息時出錯:', error);
    throw error;
  }
}

module.exports = { findAll };
