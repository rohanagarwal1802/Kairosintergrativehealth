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
      notEmpty: true,
    },
  },
  publishing_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  services_availed: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 500],
    },
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'ClientReview',
  createdAt: 'created_at',
  updatedAt: 'updatedAt',  // Let Sequelize handle `updatedAt`
});

module.exports = ClientReview;
