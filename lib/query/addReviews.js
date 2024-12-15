const ClientReview = require("../models/ClientReview");
const sequelize = require("../db");

async function addReview(data) {
  // Ensure rating is an integer and within the valid range
  if (data.rating) {
    data.rating = parseInt(data.rating, 10);
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
  }

  // Ensure designation is provided (if required)
  if (!data.designation || data.designation.trim() === "") {
    throw new Error("Designation is required");
  }

  // Add any required default values or transformations
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

    // Log the error stack for debugging purposes
    console.error(error.stack);

    throw new Error(`Error adding review: ${error.message}`);
  }
}

module.exports = addReview;
