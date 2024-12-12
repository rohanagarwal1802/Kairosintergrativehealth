const ClientReview = require("../models/ClientReview");
const sequelize = require("../db");

async function addReview(data) {
  // Add any required default values or transformations
  data.destination = data.destination || "default destination"; // Ensure 'destination' is present
  console.log("Incoming data:", data);

  let transaction;

  try {
    // Start a new transaction
    transaction = await sequelize.transaction();
    console.log("Transaction initiated.");

    // Validate and create the review
    const review = await ClientReview.create(data, { transaction });

    // Commit the transaction
    await transaction.commit();
    console.log("Transaction committed successfully.");

    return {
      message: "Review Submitted Successfully",
      review,
    };
  } catch (error) {
    console.error("Error adding review:", error);

    // Rollback transaction on error
    if (transaction) {
      await transaction.rollback();
      console.log("Transaction rolled back.");
    }

    // Provide meaningful error messages
    if (error.name === "SequelizeValidationError") {
      throw new Error(
        `Validation errors: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }

    throw new Error(`Error adding review: ${error.message}`);
  }
}

module.exports = addReview;
