const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('stock-prices', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

module.exports = sequelize;