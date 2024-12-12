'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const ClientReview = sequelize.define("ClientReview", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensure the full name is not empty
    },
  },
  publishing_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensure the publishing name is not empty
    },
  },
  services_availed: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensure the publishing name is not empty
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1, // Optional: Set min rating value
      max: 5, // Optional: Set max rating value
    },
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 500], // Optional: Limit the review length
    },
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensure destination is not empty
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically sets current time when a new record is created
  },
}, {
  tableName: 'ClientReview', // Ensure the table name matches the database
  createdAt: 'created_at', // Custom column name for createdAt
  updatedAt: false, // Disable the updatedAt field since it doesn't exist in the table
});

module.exports = ClientReview;
