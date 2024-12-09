const { Op } = require("sequelize");
const PatientDetails = require("../../models/PatientDetails");
const sequelize = require("../../db");

async function userExists(userData) {
  console.log("userData ==>", userData);

  if (!Array.isArray(userData) || userData.length === 0) {
    console.error("Invalid user data provided.");
    return { emails: [], mobiles: [] };
  }

  try {
    const { emails, mobiles } = userData.reduce(
      (acc, data) => {
        if (data.email) acc.emails.push(data.email);
        if (data.mobile) acc.mobiles.push(data.mobile);
        return acc;
      },
      { emails: [], mobiles: [] }
    );

    // Basic validation for email and mobile format
    const invalidEmails = emails.filter(email => !/\S+@\S+\.\S+/.test(email));
    const invalidMobiles = mobiles.filter(mobile => !/^\d{10}$/.test(mobile));

    if (invalidEmails.length) {
      console.error("Invalid emails:", invalidEmails);
    }
    if (invalidMobiles.length) {
      console.error("Invalid mobiles:", invalidMobiles);
    }

    // Log connection pool size
    const connectionManager = sequelize.connectionManager;
    if (connectionManager) {
      const pool = connectionManager.pool;
      console.log("Total connections:", pool.size);
    } else {
      console.error("Sequelize connection manager is not available.");
    }

    // Query the database for existing users
    const existingUsers = await PatientDetails.findAll({
      attributes: ["email", "mobile"],
      where: {
        [Op.or]: [
          { email: { [Op.in]: emails } },
          { mobile: { [Op.in]: mobiles } },
        ],
      },
      logging: console.log, // Log the generated SQL query
    });

    console.log("Existing users found:", existingUsers);

    // Use Sets for uniqueness
    const existingEmails = new Set();
    const existingMobiles = new Set();

    existingUsers.forEach((user) => {
      if (emails.includes(user.email)) existingEmails.add(user.email);
      if (mobiles.includes(user.mobile)) existingMobiles.add(user.mobile);
    });

    const result = {
      emails: Array.from(existingEmails),
      mobiles: Array.from(existingMobiles),
    };

    return result;
  } catch (error) {
    console.error("Error checking existing users:", error);
    return { emails: [], mobiles: [], error: error.message }; // Enhanced error handling
  }
}

module.exports = userExists;
