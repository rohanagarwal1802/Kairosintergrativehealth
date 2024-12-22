import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import Patients from "../../../lib/models/PatientDetails";
import requireAll from "require-all";
import path from "path";

const queryDirectoryPath = path.join(process.cwd(), "/lib/query"); // Adjust based on the directory location
const allQuery = requireAll({
  dirname: queryDirectoryPath,
  filter: /(.+)\.js$/,
  recursive: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = await getTokenFromCookie(req);

      console.log(token)

      if (!token) {
        // Clear cookies if token doesn't exist or has expired
        res.setHeader("Set-Cookie", [
          "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Ensure the path is correct
          "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Add all cookies you need to clear
        ]);
        return res.status(204).json({
          message:
            "Cookies cleared, please clear local storage on the client side.",
        });
      }

      console.log("token ==>", token);
      const decodedToken = jwt.verify(token, process.env.secretKey);
      if(decodedToken.role==='admin')
      {
        let adminInfo={
            email:decodedToken.email,
            role:decodedToken.role
        }
        return res.status(200).send(adminInfo);
      }

      // const userInfo = {
      //   id: decodedToken.id,
      //   firstname: decodedToken.firstname,
      //   lastname: decodedToken.lastname,
      //   email: decodedToken.email,
      //   mobile: decodedToken.mobile,
      //   service: decodedToken.service,
      //   permissionToText: decodedToken.permissionToText,
      //   schedulingAnAppointment: decodedToken.schedulingAnAppointment,

      //   over18: decodedToken.over18,
      //   hospitalizedWithin4Weeks: decodedToken.hospitalizedWithin4Weeks,
      //   makingAppointmentToDiscussDisability: decodedToken.makingAppointmentToDiscussDisability,
      //   insurance: decodedToken.insurance,
      //   howDidYouHear: decodedToken.howDidYouHear,
      //   dob:decodedToken.dob
      // };

      // let config = {
      //   method: "GET",
      //   maxBodyLength: Infinity,
      //   url: `${process.env.HOST}/verifyToken`,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // };

      const response = await Patients.getPatientsByToken(token);
      console.log(response)

      if (response === "") {
        // Clear cookies if user not found
        res.setHeader("Set-Cookie", [
          "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Ensure the path is correct
          "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Add other cookies if needed
        ]);

        return res.status(500).json({
          message: "User Not Found.",
        });
      } else {
        return res.status(200).send(response);
      }
    } catch (error) {
      console.error("Error in Cookie", error?.message);

      // Clear cookies in case of an error
      res.setHeader("Set-Cookie", [
        "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Ensure the path is correct
        "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Add other cookies if needed
      ]);

      return res.status(500).json({
        message:
          "Internal Server Error. Clear local storage on the client side.",
      });
    }
  }
}