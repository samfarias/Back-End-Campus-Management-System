/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
// Importing the required modules
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the student model, firstName, lastName, email, imageUrl, and GPA
const Student = db.define("student", {
  // Define the firstName field
  firstName: {
    type: Sequelize.STRING, 
    allowNull: false, // Not allowing null values
  },
  // Define the lastName field
  lastName: {
    type: Sequelize.STRING,
    allowNull: false, // Not allowing null values
  },
  // Define the email field
  email: {
    type: Sequelize.STRING,
    allowNull: false, // Not allowing null values
    validate: { isEmail: true }, // Validate email format
  },
  // Define the imageUrl field
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true, // Allowing null values
    defaultValue: "/default-student.png", // Default image URL
  },
  // Define the GPA field
  gpa: {
    type: Sequelize.DECIMAL(2, 1), // Decimal type with 2 digits before and 1 digit after the decimal point
    allowNull: true, // Allowing null values
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});


// Export the student model
module.exports = Student;