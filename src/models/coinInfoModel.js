const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const CoinInfo = sequelize.define(
  'coin_info',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    symbol: {
      type: Sequelize.STRING,
    },
    cmc_rank: {
      type: Sequelize.INTEGER,
    },
    circulating_supply: {
      type: Sequelize.INTEGER,
    },
    total_supply: {
      type: Sequelize.INTEGER,
    },
    max_supply: {
      type: Sequelize.INTEGER,
    },
    infinite_supply: {
      type: Sequelize.BOOLEAN,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    volume_change_24h: {
      type: Sequelize.FLOAT,
    },
    percent_change_1h: {
      type: Sequelize.FLOAT,
    },
    percent_change_24h: {
      type: Sequelize.FLOAT,
    },
    percent_change_7d: {
      type: Sequelize.FLOAT,
    },
    market_cap: {
      type: Sequelize.INTEGER,
    },
    market_cap_dominance: {
      type: Sequelize.FLOAT,
    },
    fully_diluted_market_cap: {
      type: Sequelize.INTEGER,
    },
    last_updated: {
      type: Sequelize.DATE,
    },
  },
  { tableName: 'coin_info', timestamps: false }
);

if (require.main === module) {
  async function coin_info_get_all() {
    try {
      const data = await CoinInfo.findAll();
      console.log(data);
      return data;
    } catch (error) {
      console.error('獲取所有幣種信息時出錯:', error);
      throw error;
    }
  }
  coin_info_get_all();
}

module.exports = { CoinInfo };
