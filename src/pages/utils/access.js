import { parse } from "cookie";

export default async function getTokenFromCookie(req) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.userToken || null;

    return token;
  } catch (error) {
    console.log("Error in access");
  }
}