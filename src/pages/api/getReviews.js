import ClientReview from "../../../lib/models/ClientReview";
import requireAll from "require-all";
import path from "path";

// Dynamically require query files if necessary
const queryDirectoryPath = path.join(process.cwd(), "/lib/query"); // Adjust based on the directory location
const allQuery = requireAll({
  dirname: queryDirectoryPath,
  filter: /(.+)\.js$/,
  recursive: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch reviews from the database
      const reviews = await ClientReview.findAll();

      // If reviews are found, return them, else return an empty array
      return res.status(200).json({
        message: "Reviews fetched successfully.",
        reviews: reviews.length ? reviews : [],
      });
    } catch (error) {
      // Improved error handling: log the full error object for debugging
      console.error("Error fetching reviews:", error);

      // Return an error response with status 500
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle unsupported methods (e.g., POST, PUT, DELETE)
    return res.status(405).json({ error: "Method not allowed" });
  }
}
