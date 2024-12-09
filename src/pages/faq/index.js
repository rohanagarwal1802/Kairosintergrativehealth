import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import AccordionQuestion from "@/components/FAQ/Questions"; // Adjust path if necessary
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "90%", margin: "auto" }}>
      <Typography
        variant="h4"
        className="heading"
        sx={{
          textAlign: "center",
          marginTop: "60px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#3b2311",
        }}
      >
        Got Questions?
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
          color: "#5a3d2f",
          marginBottom: "40px",
        }}
      >
        Below are the answers to some of the common questions. If you are looking
        for something specific, please get in touch with us.
      </Typography>

      {/* Accordion Item 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          border: "0.5px solid #ddd", // Thinner border
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f1f8ff",
            "&:hover": {
              backgroundColor: "#beeaca",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
              color: "#3b2311",
            },
            border: "0.5px solid #ddd", // Thinner border
          }}
        >
          <Typography variant="body1">Complementary & Alternative Medicine FAQs</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
          <AccordionQuestion
            question="What insurance do you accept?"
            answer="We work with most of the commercial insurances to make mental health care accessible and affordable for our patients. Currently, we are in-network with:"
          />
          <AccordionQuestion
            question="What is Co-pay, Deductible & Coinsurance?"
            answer={
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                  Copay
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  A copay is a fixed amount of money that you pay out of your own pocket for a specific medical service or medication. It is a cost-share between you and your insurer. This copay amount is usually mentioned in your health insurance policy document.
                </Typography>
                {/* More content here */}
              </>
            }
          />
        </AccordionDetails>
      </Accordion>

      {/* Additional Accordion Items */}
      {/* Same pattern applies to all */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          border: "1px solid #ccc", // Thinner border
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f1f8ff",
            "&:hover": {
              backgroundColor: "#beeaca",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
              color: "#3b2311",
            },
          }}
        >
          <Typography variant="body1">Insurance and Billing</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
          <Typography sx={{ color: "#3b2311" }}>
            You can contact support via our contact form on the website or email us directly.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          borderBottom: "0.5px solid #ddd", // Thinner divider border
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f1f8ff",
            "&:hover": {
              backgroundColor: "#beeaca",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
              color: "#3b2311",
            },
          }}
        >
          <Typography variant="body1">General FAQs</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
          <Typography sx={{ color: "#3b2311" }}>
            Additional information can be found on our website’s resources section.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Faq;
