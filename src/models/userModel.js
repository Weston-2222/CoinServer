const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    last_login: {
      type: Sequelize.DATE,
    },
    refresh_token: {
      type: Sequelize.STRING,
    },
  },
  { tableName: 'users', timestamps: false }
);

module.exports = User;
