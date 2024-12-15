const PatientDetails = require("../models/PatientDetails");

async function verifyToken(user) {
  try {
    const token = await PatientDetails.findOne({
      // attributes: ["whitelist"],
      where: {
        email: user.email,
      },
      raw: true,
    });
    console.log("token", token);
    return {
      verified: !!token.whitelist,
      hasPassword: !!token.password,
      token: token.whitelist,
    //   hasResetPassword: token.has_password_reset,
    };
  } catch (error) {
    console.error("Error in portalAlerts:", error.message);
    return null; // or throw error for upper layers to handle
  }
}

module.exports = verifyToken;