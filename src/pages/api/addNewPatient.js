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
    const addPatients = allQuery["addPatients"];
    if (!addPatients) {
      return res.status(500).json({ message: "addPatients function not found." });
    }

    try {
      const result = await addPatients([req.body]);
      return result?.passed
        ? res.status(201).json({ message: "Patient registered successfully", data: result })
        : res.status(400).json({ message: "Failed to register patient", data: result });
    } catch (error) {
      console.error("Error registering patient:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
