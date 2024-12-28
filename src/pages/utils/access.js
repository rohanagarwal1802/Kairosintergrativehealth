import { parse } from "cookie";

export default async function getTokenFromCookie(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const tokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('userToken='));
  if (!tokenCookie) return null;
  return tokenCookie.split('=')[1];
}
