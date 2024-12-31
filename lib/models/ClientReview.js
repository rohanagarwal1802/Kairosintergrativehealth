const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(process.cwd(), "lib/json/clientReviews.json");


// Read all reviews from the JSON file
const getAllReviews = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data); // Parse JSON string into an array
  } catch (error) {
    console.error('Error reading reviews:', error);
    throw error;
  }
};

// Function to get reviews where review.check is true
const getPrivateReviews = async () => {
  try {
    const reviews = await getAllReviews(); // Get all reviews first
    // Filter reviews where `check` exists and is true
    const verifiedReviews = reviews.filter(review => review.public === true && review.approval_status==='Approved'
    );
    return verifiedReviews;
  } catch (error) {
    console.error('Error filtering verified reviews:', error);
    throw error;
  }
};

// Add a new review to the JSON file
const addReview = async (newReview) => {
  try {
    const reviews = await getAllReviews();
    const id = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;
    const reviewWithId = { id, ...newReview, created_at: new Date() };
    reviews.push(reviewWithId);

    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8');
    return reviewWithId;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Update an existing review
const updateReview = async (id, updatedData) => {
  try {
    const reviews = await getAllReviews();
    const index = reviews.findIndex((review) => review.id === id);

    if (index === -1) return {status:403,message:'Review not found'};
console.log(reviews[index])
    reviews[index] = { ...reviews[index], ...updatedData, updatedAt: new Date() };

    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8');
    return reviews[index];
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete a review
const deleteReview = async (ids) => {
  try {
    // Get all reviews
    const reviews = await getAllReviews();
    
    // Filter out reviews whose id is in the ids array
    const filteredReviews = reviews.filter((review) => !ids.includes(review.id));

    // Write the updated reviews back to the file
    await fs.writeFile(filePath, JSON.stringify(filteredReviews, null, 2), 'utf8');
    
    return { message: `${ids.length} review(s) deleted successfully` };
  } catch (error) {
    console.error('Error deleting reviews:', error);
    throw error;
  }
};

module.exports = {
  getAllReviews,
  getPrivateReviews,
  addReview,
  updateReview,
  deleteReview,
};
