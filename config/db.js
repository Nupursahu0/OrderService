
require('dotenv').config();
const path = require('path');
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    require('../models/product'),
    require('../models/order')
], 
  synchronize: true,
  logging: ['error'],
});

module.exports = { AppDataSource };