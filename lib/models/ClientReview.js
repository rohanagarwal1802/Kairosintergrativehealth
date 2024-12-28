const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(__dirname, '../json/clientReviews.json');

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
    const verifiedReviews = reviews.filter(review => review.check === false);
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

    if (index === -1) throw new Error('Review not found');

    reviews[index] = { ...reviews[index], ...updatedData, updatedAt: new Date() };

    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8');
    return reviews[index];
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete a review
const deleteReview = async (id) => {
  try {
    const reviews = await getAllReviews();
    const filteredReviews = reviews.filter((review) => review.id !== id);

    await fs.writeFile(filePath, JSON.stringify(filteredReviews, null, 2), 'utf8');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    console.error('Error deleting review:', error);
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
