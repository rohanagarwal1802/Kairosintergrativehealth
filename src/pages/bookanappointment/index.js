import PatientForm from "@/components/Appointment/newPatientForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Add, Remove } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";

const AppointMent = () => {
    const [expanded, setExpanded] = useState(false);
    const router=useRouter()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
          
    <>
     <Box
            sx={{
                backgroundImage: `url('/background.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', // Ensure it covers the full viewport height
                py: 6, // Padding on the y-axis
            }}
        >
    <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
                alignItems: "center",
                gap: 4, // Adds spacing between items
                p: 4, // Padding around the container
            }}
        >
            {/* Left Side: Image */}
            <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
                <Image
                    src="/Contact.jpg"
                    alt="Mental Well-being"
                    width={400} // Adjust as needed
                    height={400}
                    style={{ borderRadius: "8px" }} // Optional: Add rounded corners
                />
            </Box>

            {/* Right Side: Text */}
            <Box sx={{ flex: "2", textAlign: "left" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "black" }}>
                Get Started
                </Typography>
                <Typography variant="body1">
                To embark on your wellness journey and begin your path towards optimal health and well-being, it is essential to start by completing our patient registration and sign-up process. This will ensure that we have all the necessary information about you and can provide you with tailored support and guidance throughout your wellness journey. To get started, please follow the steps below to register and sign up as a patient.
                </Typography>
            </Box>
        </Box><Box display="flex" justifyContent="center" mt={3}>
                <Box
                    sx={{
                        width: {
                            xs: '90%', // 90% width on extra-small screens
                            sm: '80%', // 80% width on small screens
                            md: '60%', // 60% width on medium screens and above
                        }
                    }}
                >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel1' ? <Remove /> : <Add />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography>Existing Patients</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                If you are an existing patient, please login to the patient portal where you can request appointments, refills, and send messages to your doctor.
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Box
                                component="button"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#FFD700", // Golden yellow background
                                    color: "white", // White text
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "6px 12px", // Reduced padding
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#FFC300" }, // Slightly darker on hover
                                    fontSize: "0.75rem", // Smaller font size
                                }}
                                onClick={() => {
                                    router.push("/login");
                                    // Define the action when the button is clicked
                                } }
                            >
                                <Typography variant="body2" sx={{ marginRight: 1 }}>
                                    Patient Portal
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel2' ? <Remove /> : <Add />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>New Patients</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                If you are a new patient looking to establish care with one of our providers, please start by answering the following questions.
                            </Typography>
                            <PatientForm />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
            </Box>
            </>
    );
}

export default AppointMent;
