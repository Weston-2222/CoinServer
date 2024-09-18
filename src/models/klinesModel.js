const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const Klines = sequelize.define(
  'klines',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    opening_time: {
      type: Sequelize.DATE,
    },
    opening_price: {
      type: Sequelize.FLOAT,
    },
    highest_price: {
      type: Sequelize.FLOAT,
    },
    lowest_price: {
      type: Sequelize.FLOAT,
    },
    closing_price: {
      type: Sequelize.FLOAT,
    },
    volume: {
      type: Sequelize.FLOAT,
    },
    closing_time: {
      type: Sequelize.DATE,
    },
    turnover: {
      type: Sequelize.FLOAT,
    },
    active_buying_volume: {
      type: Sequelize.FLOAT,
    },
    active_buying_turnover: {
      type: Sequelize.FLOAT,
    },
    coin_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'coin_info',
        key: 'id',
        allowNull: false,
      },
    },
  },
  { tableName: 'klines', timestamps: false }
);

module.exports = Klines;
