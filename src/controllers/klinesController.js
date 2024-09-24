const { CoinInfo, Klines } = require('../models');

async function findOne(id) {
  try {
    const data = await CoinInfo.findOne({
      where: { id },
      attributes: ['id'],
      include: { model: Klines },
    });
    return data.toJSON();
  } catch (error) {
    console.error('獲取單個幣種和K線信息時出錯:', error);
    throw error;
  }
}

module.exports = { findOne };
