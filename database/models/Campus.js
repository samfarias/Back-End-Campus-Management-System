/*==================================================
/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
// Importing the required modules
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  // Define the name field
  name: {
    type: Sequelize.STRING,
    allowNull: false // Not allowing null values
  },
  // Define the address field
  address: {
    type: Sequelize.STRING,
    allowNull: false // Not allowing null values
  },
  // Define the city field
  description: {
    type: Sequelize.STRING,
  },
  // Define the state field
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true, // Allowing null values
    defaultValue: "/default-campus.png" // Default image URL
  }
});

// Export the campus model
module.exports = Campus;