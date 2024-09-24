const CoinInfo = require('./coinInfoModel');
const Klines = require('./klinesModel');
const News = require('./newsModel');
//建立關聯
CoinInfo.hasMany(Klines, { foreignKey: 'coin_id' });
Klines.belongsTo(CoinInfo, { foreignKey: 'coin_id' });
module.exports = {
  CoinInfo,
  Klines,
  News,
};
