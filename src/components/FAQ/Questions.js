import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

const AccordionQuestion = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);

  // Only trigger state change on the client side to avoid SSR mismatch
  useEffect(() => {
    setClientRendered(true);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Update state to the current panel
  };

  if (!clientRendered) {
    return null; // Skip rendering until on the client side
  }

  return (
    <Box sx={{ padding: "10px", maxWidth: "99%", margin: "auto" }}>
      <Accordion
        expanded={expanded === "panel1"} // Only this panel opens when expanded state is "panel1"
        onChange={handleChange("panel1")}
        sx={{
          boxShadow: "none",
          "&:before": { display: "none" },
          backgroundColor: "#535945",
          p: 1,
        }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? <Typography>−</Typography> : <Typography>+</Typography>
          }
          sx={{
            backgroundColor: "whiteSmoke",
            "& .MuiTypography-root": {
              fontWeight: "bold",
              color: "black",
            },
          }}
        >
          <Typography variant="body1">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", padding: "16px" }}>
          <Typography sx={{ color: "black" }}>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionQuestion;
