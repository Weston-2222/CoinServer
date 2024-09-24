const { CoinInfo } = require('../models');

async function findAll() {
  try {
    const data = await CoinInfo.findAll();
    return data.map((item) => item.toJSON());
  } catch (error) {
    console.error('獲取所有幣種信息時出錯:', error);
    throw error;
  }
}

async function findOne(id) {
  try {
    const data = await CoinInfo.findOne({
      where: { id },
    });
    return [data.toJSON()];
  } catch (error) {
    console.error('獲取單個幣種信息時出錯:', error);
    throw error;
  }
}
module.exports = { findAll, findOne };
