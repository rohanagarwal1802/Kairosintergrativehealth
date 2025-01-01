const fs = require("fs");
const dotenv = require("dotenv").config();
const url = process.env.TOKEN_URL;

function generateEmailBody(userData, category) {
  try {
    switch (category) {
      case "createPasswordTemplate": {
        const url_string = `${url}?verify=${userData?.whitelist}`;
        let emailBody = fs.readFileSync("lib/templates/createPasswordTemplate.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.firstname + " " + userData?.lastname)
          .replace("${patient_another_name}", userData?.firstname + " " + userData?.lastname)
          .replace("${patient_email}", userData?.email)
          .replace("${patient_mobile}", userData?.mobile)
          .replace("${patient_dob}", userData?.dob)
          .replace("${patient_insurance}", userData?.insurance)
          .replace("${patient_questions0}", userData?.questions[0])
          .replace("${patient_questions1}", userData?.questions[1])
          .replace("${patient_questions2}", userData?.questions[2])
          .replace("${patient_questions3}", userData?.questions[3])
          .replace("${patient_questions4}", userData?.questions[4])
          .replace("${password_creation_link}", url_string);
        return emailBody;
      }
      case "patientRegisterationConfirmation": {
        let emailBody = fs.readFileSync("lib/templates/patientRegisterationConfirmation.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.firstname + " " + userData?.lastname)
          .replace("${patient_another_name}", userData?.firstname + " " + userData?.lastname)
          .replace("${patient_email}", userData?.email)
          .replace("${patient_mobile}", userData?.mobile)
          .replace("${patient_dob}", userData?.dob)
          .replace("${patient_insurance}", userData?.insurance)
          .replace("${patient_questions0}", userData?.questions[0])
          .replace("${patient_questions1}", userData?.questions[1])
          .replace("${patient_questions2}", userData?.questions[2])
          .replace("${patient_questions3}", userData?.questions[3])
          .replace("${patient_questions4}", userData?.questions[4])
        return emailBody;
      }

        
      case "roundTableBookTemplate": {
        let emailBody = fs.readFileSync("lib/templates/roundTableBookTemplate.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.firstName + " " + userData?.lastName)
          .replace("${patient_another_name}", userData?.firstName + " " + userData?.lastName)
          .replace("${email}", userData?.email)
          .replace("${phoneNumber}", userData?.phoneNumber)
          .replace("${dob}", userData?.dob)
          .replace("${attending}", userData?.attending)
          .replace("${over18}", userData?.over18)
          .replace("${bringingFriend}", userData?.bringingFriend)
          .replace("${friendFirstName}", userData?.friendFirstName)
          .replace("${friendLastName}", userData?.friendLastName)
          .replace("${friendDob}", userData?.friendDob)

          .replace("${friendPhoneNumber}", userData?.friendPhoneNumber)
          .replace("${friendEmail}", userData?.friendEmail)
          .replace("${friendTextPermission}", userData?.textPermission)
          .replace("${paymentOption}", userData?.payment)
          .replace("${memberName}", userData?.memberName)

          .replace("${firstAttendeeName}", userData?.firstAttendeeName)
          .replace("${secondAttendeeName}", userData?.secondAttendeeName)

        return emailBody;
      }

      case "roundTableConfirmation": {
        let emailBody = fs.readFileSync("lib/templates/roundTableConfirmation.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.firstName + " " + userData?.lastName)
          .replace("${patient_another_name}", userData?.firstName + " " + userData?.lastName)
          .replace("${email}", userData?.email)
          .replace("${phoneNumber}", userData?.phoneNumber)
          .replace("${dob}", userData?.dob)
          .replace("${attending}", userData?.attending)
          .replace("${over18}", userData?.over18)
          .replace("${bringingFriend}", userData?.bringingFriend)
          .replace("${friendFirstName}", userData?.friendFirstName)
          .replace("${friendLastName}", userData?.friendLastName)
          .replace("${friendDob}", userData?.friendDob)

          .replace("${friendPhoneNumber}", userData?.friendPhoneNumber)
          .replace("${friendEmail}", userData?.friendEmail)
          .replace("${friendTextPermission}", userData?.textPermission)
          .replace("${paymentOption}", userData?.payment)
          .replace("${memberName}", userData?.memberName)

          .replace("${firstAttendeeName}", userData?.firstAttendeeName)
          .replace("${secondAttendeeName}", userData?.secondAttendeeName)

        return emailBody;
      }

      case "resetPasswordTemplate": {
        const url_string = `${url}?verify=${userData?.whitelist}`;
        let emailBody = fs.readFileSync("lib/templates/resetPasswordTemplate.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.firstname + " " + userData?.lastname)
          .replace("${reset_link}", url_string);

        return emailBody;
      }
      case "bookAppointmentTemplate": {
        let emailBody = fs.readFileSync("lib/templates/bookAppointmentTemplate.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.username)
          .replace("${appointment_date}", userData?.appointmentDate)
          .replace("${service}", userData?.service)
          .replace("${address}", userData?.location)

        return emailBody;
      }
      case "bookAppointmentConfirmation": {
        let emailBody = fs.readFileSync("lib/templates/bookAppointmentConfirmation.html", "utf-8");
        emailBody = emailBody
          .replace("${patient_name}", userData?.username)
          .replace("${patient_name}", userData?.email)
          .replace("${patient_name}", userData?.phone)
          .replace("${appointment_date}", userData?.appointmentDate)
          .replace("${service}", userData?.service)
          .replace("${address}", userData?.location)

        return emailBody;
      }

    }
  } catch (error) {
    console.error("error in generate email body function");
  }
}
module.exports = generateEmailBody;
