const fs = require("fs/promises");
const path = require("path");

// Correct the path to point to the 'json' directory

console.log(process.cwd())
const filePath = path.resolve(process.cwd(), "lib/json/clientReviews.json");

async function addReview(data) {
  // Ensure rating is an integer and within the valid range
  
  
  try {
    console.log("Incoming data:", data);

    // Check if the file exists
    let reviews = [];
    try {
      const reviewsData = await fs.readFile(filePath, "utf8");
      reviews = JSON.parse(reviewsData);
    } catch (err) {
      if (err.code === "ENOENT") {
        // File doesn't exist, create an empty array
        console.log("File not found, creating new file.");
        reviews = [];
      } else {
        // Rethrow the error if it's not a file not found error
        throw err;
      }
    }

    // Generate a new ID for the review
    const newId = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;

    // Add the review with a new ID and created_at timestamp
    const newReview = {
      id: newId,
      ...data,
      created_at: new Date().toISOString(),
    };
    reviews.push(newReview);

    // Write the updated reviews back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), "utf8");

    console.log("Review added successfully.");

    return {
      message: "Review Submitted Successfully",
      review: newReview,
    };
  } catch (error) {
    console.error("Error adding review:", error.message);
    throw new Error(`Error adding review: ${error.message}`);
  }
}

module.exports = addReview;
