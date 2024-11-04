import PatientForm from "@/components/Appointment/newPatientForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Add, Remove } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const AppointMent = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box display="flex" justifyContent="center" mt={3}>
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
                                // Define the action when the button is clicked
                            }}
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
    );
}

export default AppointMent;
