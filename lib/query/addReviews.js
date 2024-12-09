const ClientReview = require("../models/ClientReview");
const sequelize = require("../db");

async function addReview(data) {
  // Validate incoming data (Example: check for required fields)
  if (!data.userId || !data.rating || !data.reviewText) {
    throw new Error("Missing required fields: userId, rating, reviewText");
  }

  let transaction;
  
  try {
    transaction = await sequelize.transaction(); // Initialize transaction

    // Create a new review in the database
    const review = await ClientReview.create(data, {
      transaction,
      raw: true, // Specify that you want raw data
    });

    // Commit the transaction
    await transaction.commit(); 

    return {
      message: "Review Submitted Successfully",
      review, // Return the created review data
    };
  } catch (error) {
    console.error("Error in addReview:", error.message); // Log the error message for better debugging

    if (transaction) {
      await transaction.rollback(); // Rollback if an error occurs
    }

    // Return a more detailed error message with context
    throw new Error(`Failed to add review: ${error.message}`);
  }
}

module.exports = addReview;
