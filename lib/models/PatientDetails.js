'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Patients = sequelize.define("Patient_Details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{10}$/, // Regex to ensure a 10-digit mobile number
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whitelist: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  insurance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  howDidYouHear: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Automatically set to now when created
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Automatically set to now when updated
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // Allow null for active records
  },
  permissionToText: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  schedulingAnAppointment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  over18: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  hospitalizedWithin4Weeks: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  makingAppointmentToDiscussDisability: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  // Specify custom field names for timestamps and enable paranoid
  // timestamps: true, // Enable timestamps
  createdAt: 'created_at', // Specify the custom name for createdAt
  updatedAt: 'updated_at', // Specify the custom name for updatedAt
  deletedAt: 'deleted_at', // Specify the custom name for deletedAt
  paranoid: true, // Enable soft deletes (will set deleted_at instead of deleting)
});

// Hook to set updated_at before updating
Patients.beforeUpdate((patient) => {
  patient.updated_at = new Date(); // Automatically set updated_at before any update
});

module.exports = Patients;
