import { serialize } from "cookie";

export default function handler(req, res) {
  // Create a cookie configuration for expiring cookies
  const cookiesConfig = {
    maxAge: -1, // Set to -1 to expire the cookie immediately
    path: "/", // Ensure the cookie is valid for the entire site
    httpOnly: true, // Make the cookie inaccessible via JavaScript
    sameSite: "lax", // Additional security to prevent CSRF attacks
  };

  // Retrieve all cookies from the request
  const cookies = req.headers.cookie?.split("; ") || [];

  // Create an array to hold the serialized cookies to remove
  const cookiesToRemove = cookies.map((cookie) => {
    const [name] = cookie.split("="); // Extract the cookie name
    return serialize(name, "", cookiesConfig); // Serialize the cookie to remove
  });

  // Set the cookies in the response to expire them
  res.setHeader("Set-Cookie", cookiesToRemove);

  // Respond with a success message
  res
    .status(200)
    .json({ message: "Logged out successfully, all cookies removed." });
}