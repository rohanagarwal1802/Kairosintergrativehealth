const generateEmailBody = require("./generateEmailBody");

async function createBulkEmails(userObjects, category) {
  try {
    const result = [];
    let emailTemplate=null
    switch (category) {
      case "createPasswordTemplate":
        console.log("User objects ===>", userObjects);
         emailTemplate = generateEmailBody(userObjects[0], category);
          result.push({
            email: `${userObjects[0].email}`,
            subject: "New Patient Request Created",
            body: `${emailTemplate}`,
          });

        break;
        case "patientRegisterationConfirmation":
        console.log("User objects ===>", userObjects);
         emailTemplate = generateEmailBody(userObjects[0], category);
          result.push({
            email: `info@kairosintegrativehealth.com`,
            subject: "New Patient has been generated",
            body: `${emailTemplate}`,
          });

        break;

        case "roundTableBookTemplate":
          console.log("User objects ===>", userObjects);
           emailTemplate = generateEmailBody(userObjects[0], category);
            result.push({
              email: `${userObjects[0].email}`,
              subject: "New Resillience Round Table Request Created",
              body: `${emailTemplate}`,
            });
  
          break;

          case "roundTableConfirmation":
            console.log("User objects ===>", userObjects);
             emailTemplate = generateEmailBody(userObjects[0], category);
              result.push({
                email: `info@kairosintegrativehealth.com`,
                subject: "New Resillience Round Table Request has been generated",
                body: `${emailTemplate}`,
              });
    
            break;

            case "resetPasswordTemplate":
              console.log("User objects ===>", userObjects);
               emailTemplate = generateEmailBody(userObjects[0], category);
                result.push({
                  email: `${userObjects[0].email}`,
                  subject: "Reset Password Request Created",
                  body: `${emailTemplate}`,
                });
      
              break;

              case "bookAppointmentTemplate":
                console.log("User objects ===>", userObjects);
                 emailTemplate = generateEmailBody(userObjects[0], category);
                  result.push({
                    email: `${userObjects[0].email}`,
                    subject: "Appointment Successfully Booked",
                    body: `${emailTemplate}`,
                  });
        
                break;

          case "bookAppointmentConfirmation":
              console.log("User objects ===>", userObjects);
               emailTemplate = generateEmailBody(userObjects[0], category);
                result.push({
                  email: `info@kairosintegrativehealth.com`,
                  subject: "New Appointment Booked",
                  body: `${emailTemplate}`,
                });
      
              break;

              case "appointmentCancelled":
                console.log("User objects ===>", userObjects);
                 emailTemplate = generateEmailBody(userObjects[0], category);
                  result.push({
                    email: `${userObjects[0].email}`,
                    subject: "Appointment Cancelled",
                    body: `${emailTemplate}`,
                  });
        
                break;
     
      default:
        console.log("Unknown template.");
        break;
    }

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = createBulkEmails;
