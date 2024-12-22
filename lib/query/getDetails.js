const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PartnerUser = require("../models/PatientDetails");

// Define a function to compare passwords with better error handling
async function comparePasswords(providedPassword, storedPassword) {
  try {
    return await bcrypt.compare(providedPassword, storedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
}

// Define a function to generate JWT token
async function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    profile_pic: user.profile_pic,
    partner_id: user.partner_id,
    role: user["authrole.role"], // Ensure this key is correct in your model
    email: user.email,
  };
  
  try {
    const token = await jwt.sign(payload, process.env.secretKey, {
      expiresIn: process.env.JWT_EXPIRY || "24h",  // Make expiry configurable via env variable
    });
    return { status: 200, token };
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
}

// Main function to get user details
async function getDetails(email, password) {
  try {
    const user = await PartnerUser.findOne({
      where: { email },
      attributes: [
        "id", "username", "profile_pic", "password", "mobile", "isRegistered", 
        "email", "partner_id", "utility",
      ],
      raw: true,
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if (!user.isRegistered) {
      return { status: 225, message: "User is inactive" };
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return { status: 401, message: "Invalid password" };
    }

    // Return JWT token upon successful authentication
    return await generateToken(user);
  } catch (error) {
    console.error("Error getting user details:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

module.exports = getDetails;
