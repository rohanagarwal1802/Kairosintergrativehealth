import { useEffect, useRef } from "react";
import PatientForm from "@/components/Appointment/newPatientForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Add, Remove } from '@mui/icons-material';
import { Box, Typography,List,ListItem } from '@mui/material';
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
                    backgroundColor: `#ECE7E2`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // minHeight: '100vh',
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
                   

                    {/* Right Side: Text */}
                    <Box sx={{ flex: "2", textAlign: "left" }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "black",textAlign:"center" }}>
                            Get Connected
                        </Typography>
                        <Typography variant="body1" sx={{color:"black"}}> 
                        Welcome to our "Get Connected" page! Please select whether you are a new patient (looking to schedule your complementary phone call) or existing patient (looking to schedule a follow up appointment or message your provider). Either way, we’re here to help you, craft a better you!
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Box
                        sx={{
                            width: "95%",
                           
                        }}
                    >
                          <Accordion
                            ref={panel2Ref} // Attach the ref to panel2
                            expanded={expanded === "panel2"}
                            onChange={handleChange("panel2")}
                            sx={{  backgroundColor:"#6F7863" }}
                        >
                            <AccordionSummary
                                expandIcon={expanded === "panel2" ? <Remove sx={{ color: "white" }} /> : <Add sx={{ color: "white" }} />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography sx={{ fontWeight: "bold", color: "white" }}>New Patients</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                           
                               
                                <PatientForm />
                            </AccordionDetails>
                        </Accordion>



                        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} sx={{  backgroundColor:"#6F7863" }}>
                            <AccordionSummary
                                expandIcon={expanded === "panel1" ? <Remove sx={{ color: "white" }} /> : <Add sx={{ color: "white" }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography sx={{ fontWeight: "bold", color: "white" }}>Existing Patients</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "white" }}>
                                    If you are an existing patient, please login to the patient portal where you can request appointments, refills, and send messages to your provider.
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Box
                                    component="button"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#2A3923",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        padding: "6px 12px",
                                        cursor: "pointer",
                                        "&:hover": { backgroundColor: "#2A3923" },
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

                      
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AppointMent;
