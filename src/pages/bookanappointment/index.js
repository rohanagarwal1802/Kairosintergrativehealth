import { useEffect, useRef } from "react";
import PatientForm from "@/components/Appointment/newPatientForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Add, Remove } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useRouter } from "next/router";
import useUserStore from "@/components/useUserStore";
import Image from "next/image";

const AppointMent = () => {
    const { expanded, setExpanded } = useUserStore();
    const router = useRouter();

    // Create a ref for panel2
    const panel2Ref = useRef(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);

        // If panel2 is expanded, scroll into view
        if (isExpanded && panel === "panel2") {
            panel2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    

    useEffect(() => {
        // If panel2 is expanded on initial render, scroll into view
        if (expanded === "panel2") {
            panel2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [expanded]); // Dependency ensures this runs only when 'expanded' changes

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url('/background.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    py: 6,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: 4,
                        p: 4,
                    }}
                >
                    {/* Left Side: Image */}
                    <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
                        <Image
                            src="/Contact.jpg"
                            alt="Mental Well-being"
                            width={400}
                            height={400}
                            style={{ borderRadius: "8px" }}
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
                </Box>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Box
                        sx={{
                            width: "90%",
                        }}
                    >
                        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} sx={{ backgroundColor: "#98BF64" }}>
                            <AccordionSummary
                                expandIcon={expanded === "panel1" ? <Remove sx={{ color: "white" }} /> : <Add sx={{ color: "white" }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography sx={{ fontWeight: "bold", color: "white" }}>Existing Patients</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "white" }}>
                                    If you are an existing patient, please login to the patient portal where you can request appointments, refills, and send messages to your doctor.
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Box
                                    component="button"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#FFD700",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        padding: "6px 12px",
                                        cursor: "pointer",
                                        "&:hover": { backgroundColor: "#FFC300" },
                                        fontSize: "0.75rem",
                                    }}
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    <Typography variant="body2" sx={{ marginRight: 1 }}>
                                        Patient Portal
                                    </Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            ref={panel2Ref} // Attach the ref to panel2
                            expanded={expanded === "panel2"}
                            onChange={handleChange("panel2")}
                            sx={{ backgroundColor: "#98BF64" }}
                        >
                            <AccordionSummary
                                expandIcon={expanded === "panel2" ? <Remove sx={{ color: "white" }} /> : <Add sx={{ color: "white" }} />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography sx={{ fontWeight: "bold", color: "white" }}>New Patients</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "white" }}>
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
};

export default AppointMent;
