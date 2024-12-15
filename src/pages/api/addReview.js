import addReview from "../../../lib/query/addReviews";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }




    

  if (!addReview) {
    return res.status(500).json({ error: "addReview function not found." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid input data. Expected a JSON object." });
  }

  try {
    console.log("Request Body:", req.body);
    const result = await addReview(req.body);
    return res.status(201).json({
      message: "Review added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding review:", error.message);
    return res.status(500).json({
      error: process.env.NODE_ENV === "production" 
        ? "Internal Server Error" 
        : error.message,
    });
  }
}
