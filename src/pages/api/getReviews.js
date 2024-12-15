import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  // Ensure the method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Path to the JSON file containing reviews
  const filePath = path.resolve(process.cwd(), "lib/json/clientReviews.json");

  try {
    // Read the JSON file
    const reviewsData = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const reviews = JSON.parse(reviewsData);

    // Return the reviews in the response
    const message = reviews.length
      ? "Reviews fetched successfully."
      : "No reviews found.";
    return res.status(200).json({ message, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);

    // Handle file not found
    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "Reviews file not found." });
    }

    // Handle JSON parsing error or other issues
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
