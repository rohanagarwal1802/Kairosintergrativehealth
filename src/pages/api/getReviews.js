import ClientReview from "../../../lib/models/ClientReview";
import requireAll from "require-all";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Dynamically require query files
    const queryDirectoryPath = path.resolve(process.cwd(), "lib/query");
    let allQuery = {};

    try {
      allQuery = requireAll({
        dirname: queryDirectoryPath,
        filter: /(.+)\.js$/,
        recursive: true,
      });
    } catch (queryError) {
      console.error("Error loading query files:", queryError);
      return res
        .status(500)
        .json({ error: "Failed to load query files. Check server logs." });
    }

    // Fetch reviews from the database
    const reviews = await ClientReview.findAll();

    const message = reviews.length
      ? "Reviews fetched successfully."
      : "No reviews found.";
    return res.status(200).json({ message, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
