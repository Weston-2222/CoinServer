const { Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const News = sequelize.define(
  'news',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.TIME,
    },
  },
  { tableName: 'news', timestamps: false }
);

module.exports = News;
