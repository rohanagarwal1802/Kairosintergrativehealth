const axios = require("axios");
const PatientDetails = require("../models/PatientDetails");
const userExists = require("./common/userExists");
const sequelize = require("../db");
const jwt = require("jsonwebtoken");

async function createBulkTokens(userData) {
  userData.forEach((user) => {
    const token = jwt.sign({ email: user.email }, process.env.secretKey, {
      expiresIn: "24h",
    });
    user.whitelist = token; // Ensure you're modifying the user data correctly
  });

  return userData;
}

async function addPatients(userData) {
  let transaction;

  try {
    const similarEmailMobile = await userExists(userData);
    console.log("similarEmailMobile ==>", similarEmailMobile);

    // Check for any existing emails or mobiles, not length comparison
    if (
      similarEmailMobile?.emails.length > 0 ||
      similarEmailMobile?.mobiles.length > 0
    ) {
      return { passed: 0, failed: similarEmailMobile };
    }

    transaction = await sequelize.transaction();

    // Create tokens before database insert
    await createBulkTokens(userData);

    // Filter out existing users based on email and mobile
    const filteredUserData = userData.filter((user) => {
      return (
        !similarEmailMobile?.emails.includes(user.email) &&
        !similarEmailMobile?.mobiles.includes(user.mobile)
      );
    });

    // Insert filtered data into PatientDetails
    const res = await PatientDetails.bulkCreate(filteredUserData, {
      transaction,
      ignoreDuplicates: true,
      returning: true,
      attributes: ["email", "mobile"],
      raw: true,
    });

    await transaction.commit();

    // Format response for passed records
    const passedRecords = res.map((record) => ({
      email: record.email,
      mobile: record.mobile,
    }));

    return { passed: passedRecords, failed: similarEmailMobile };
  } catch (error) {
    console.error(error);
    
    // Rollback transaction in case of failure
    if (transaction) {
      await transaction.rollback();
    }

    throw new Error("Failed to add patients due to an error.");
  }
}

module.exports = addPatients;
