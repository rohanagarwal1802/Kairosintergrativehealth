import requireAll from "require-all";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let allQuery = {};
  try {
    // Dynamically require query files
    const queryDirectoryPath = path.join(process.cwd(), "/lib/query");
    allQuery = requireAll({
      dirname: queryDirectoryPath,
      filter: /(.+)\.js$/,
      recursive: true,
    });
  } catch (err) {
    console.error("Error loading query files:", err.message);
    return res.status(500).json({ error: "Failed to load query files." });
  }

  // Check for addReviews function
  const addReviews = allQuery["addReviews"];
  if (!addReviews) {
    return res.status(500).json({ error: "addReviews function not found." });
  }

  // Remove strict validation for the input payload
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid input data. Expected a JSON object." });
  }

  try {
    // Log the incoming request body for debugging
    console.log("Request Body:", req.body);

    // Execute addReviews
    const result = await addReviews(req.body);

    return res.status(201).json({
      message: "Review added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding review:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
