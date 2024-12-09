import ClientReview from "../../models/ClientReview"; // Adjust path
import requireAll from "require-all";
import path from "path";

const queryDirectoryPath = path.join(process.cwd(), "/lib/query"); // Adjust based on the directory location
const allQuery = requireAll({
  dirname: queryDirectoryPath,
  filter: /(.+)\.js$/,
  recursive: true,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const addReviews = allQuery["addReviews"];
    if (!addReviews) {
      return res.status(500).json({ message: "addReviews function not found." });
    }

    try {
      const result = await addReviews(req.body);
      res.status(201).json({ message: "Review added successfully", data: result });
    } catch (error) {
      console.error("Error adding review:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
