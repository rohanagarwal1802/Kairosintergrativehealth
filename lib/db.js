const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

// Path to the JSON file where data will be stored
const filePath = path.resolve(__dirname, '../json/data.json');

// Initialize JSON storage (Create file if it doesn't exist)
const initializeStorage = async () => {
  try {
    await fs.access(filePath); // Check if file exists
  } catch (error) {
    // Create an empty JSON file if it doesn't exist
    await fs.writeFile(filePath, JSON.stringify([]), 'utf8');
    console.log('JSON storage initialized at:', filePath);
  }
};

// Simulate database connection check
const testConnection = async () => {
  try {
    await initializeStorage();
    console.log('JSON storage connection established successfully.');
  } catch (error) {
    console.error('Unable to establish JSON storage connection:', error);
  }
};

testConnection();

module.exports = {
  getFilePath: () => filePath, // Export file path for reuse
};
