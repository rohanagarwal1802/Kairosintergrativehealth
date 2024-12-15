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
    <Box sx={{ padding: { xs: "10px", sm: "20px" }, maxWidth: "90%", margin: "auto" }}>
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
          border: "0.1px solid #ddd", // Reduced border width
          p:1,
          "&:hover": {
            borderColor: "#bbb", // Border color on hover
          },
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
            borderBottom: "1px solid #ddd", // Adding bottom border for better visual
          }}
        >
          <Typography variant="body1">General Information</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
          <AccordionQuestion
            question="What services do you offer ?"
            answer="We offer a range of services to support your mental health and wellness, including psychiatric evaluations, psychotherapy, medication management, addiction treatment, 
            and educational sessions designed to empower and inform."
          />
 <AccordionQuestion
            question="What do you treat ?"
            answer="Our team is here to help you navigate challenges such as anxiety, depression, PTSD, ADHD, addiction, relationship concerns, stress management, and more. We’re committed to tailoring your care to your unique needs."
          />
 <AccordionQuestion
            question="Do you treat children or adolescents ?"
            answer="At this time, we specialize in working with individuals aged 18–65, ensuring our services are specifically designed to support this stage of life."
          />
 <AccordionQuestion
            question="Do you see college students ?"
            answer="We offer a range of services to support your mental health and wellness, including psychiatric evaluations, psychotherapy, medication management, addiction treatment, 
            and educational sessions designed to empower and inform."
          />


         
        </AccordionDetails>
      </Accordion>

      {/* Additional Accordion Items */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          p:1,
          border: "0.5px solid #ddd", // Reduced border width
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
          <Typography variant="body1">Appointments and Scheduling</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
        <AccordionQuestion
            question="How do I schedule an appointment ?"
            answer={
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                Scheduling an appointment is simple and convenient:
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
  <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
    <li>Use our website to easily book a complimentary, no cost to you, 10-minute call with one of our providers at a time that works for you.</li>
    <li>Prefer a personal touch? Call our office, and we’ll be happy to assist.</li>
  </ul>
</Typography>
<Typography sx={{ marginBottom: "10px" }}>
***Please note that using our website to book a complimentary, no cost to you, 10-minute call with one of our providers to discuss if KIH is a good fit, is the most efficient method to scheduling an appointment.
</Typography>

              </>
            }
            />
             <AccordionQuestion
            question="Do you offer same-day or emergency appointments ?"
            answer="While we do not provide emergency services, our team is available to help you schedule non-urgent appointments. In case of an emergency, please call 911 or visit your nearest emergency room. Same-day appointments may
             be available depending on our schedule, so don’t hesitate to reach out!"
          />

<AccordionQuestion
            question="Can I do virtual/telehealth appointments ?"
            answer="Yes! We’re proud to offer secure telehealth appointments for eligible clients,
             giving you access to care from the comfort of your home."
          />


        </AccordionDetails>
      </Accordion>

       {/* Additional Accordion Items */}
       <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          p:1,
          border: "0.5px solid #ddd", // Reduced border width
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
          <Typography variant="body1">Payment and Insurance</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
      
             <AccordionQuestion
            question="Do you accept insurance ?"
            answer="Currently, we do not accept insurance, but we’re actively working to partner with
             insurance companies to offer in-network services in the future."
          />

<AccordionQuestion
            question="What are your fees ?"
            answer="Our fees are structured to provide affordable care, with discount options available for services such as medication management, psychotherapy, and our Resilience Roundtable program. Many clients find these options
             cost-effective, often under $100 per month. Contact us to learn more!"
          />


        </AccordionDetails>
      </Accordion>


      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          p:1,
          borderBottom: "0.5px solid #ddd", // Reduced border width
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
          <Typography variant="body1">Specialized Topics</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
        <AccordionQuestion
            question="Do you prescribe medications ?"
            answer="Yes, we offer medication management services. However, we do not prescribe controlled substances at this time."
          />
            <AccordionQuestion
            question="Do you offer addiction treatment ?"
            answer="Absolutely. Our outpatient addiction recovery services are designed to meet your unique needs and provide compassionate care.
             Please note that we currently do not offer treatment with Suboxone."
          />
            <AccordionQuestion
            question="Do you treat men’s mental health concerns ?"
            answer="Yes, we specialize in addressing men’s health challenges, including stress, relationships, and addiction. Our tailored
             programs are here to support your journey toward mental well-being."
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        sx={{
          marginBottom: "8px",
          boxShadow: "none",
          backgroundColor: "green",
          p:1,
          borderBottom: "0.5px solid #ddd", // Reduced border width
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
          <Typography variant="body1">Getting Started</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "12px", backgroundColor: "white" }}>
        <AccordionQuestion
            question="How long will my treatment take ?"
            answer="Your treatment timeline is as unique as you are! Together, we’ll establish a personalized plan
             and regularly review your progress to ensure you’re meeting your goals."
          />
            <AccordionQuestion
            question="How do I know if therapy or medication is right for me ?"
            answer="During your initial assessment, we’ll explore your concerns, goals, and preferences to recommend the most effective
             treatment approach for you. We’re here to guide you every step of the way."
          />
           
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Faq;


{/* <AccordionQuestion
question="What is Co-pay, Deductible & Coinsurance?"
answer={
  <>
    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginTop: "10px" }}>
      Copay
    </Typography>
    <Typography sx={{ marginBottom: "10px" }}>
      A copay is a fixed amount of money that you pay out of your own pocket for a specific medical service or medication. It is a cost-share between you and your insurer. This copay amount is usually mentioned in your health insurance policy document.
    </Typography>
  </>
}
/>  */}