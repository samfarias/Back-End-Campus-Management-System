/*==================================================
/database/db.js

It sets up Sequelize with Postgres database. 
- Create a Sequelize instance to connect to the database specifying database name, username, and password.
==================================================*/
/* INSTANTIATE DATABASE */ 
const { dbName, dbUser, dbPwd } = require('./utils/configDB');
require('dotenv').config();
const Sequelize = require('sequelize');

console.log('Opening database connection');

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

let db;

if (isProduction && connectionString) {
  // If Render backend server or other production environments is used
  db = new Sequelize(connectionString, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  db = new Sequelize(dbName, dbUser, dbPwd, {
    host: 'localhost',
    dialect: 'postgres',
  });
}

module.exports = db;
