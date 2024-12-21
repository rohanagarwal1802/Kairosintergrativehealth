import React from "react";
import { Box, Typography } from "@mui/material";
import ResilienceRoundtableForm from "@/components/roundTable/ResilienceRoundtableForm";

const RoundTable = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('/depressionBackground.jpg')`,
          backgroundSize: 'cover', // Ensures the image covers the entire box
          backgroundPosition: 'top', // Focuses on the upper part of the image
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4, // Adds padding around the content
          borderRadius: 2, // Optional: Adds rounded corners for a softer look
          height: 'auto', // Dynamically adjusts height to fit content
          width: '100%', // Ensures it spans the full width
        }}
      >
        {/* First Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Image */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 300, sm: 400, md: 500 },
              width: { xs: 300, sm: 400, md: 500 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2
            }}
          >
            <Box
              component="img"
              src="/rr2.jpg"
              alt="Mental Health Education"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }} />
          </Box>

          {/* Text */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: 800 },
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              boxShadow: 3,
              height: { xs: 'auto', md: 450 }
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: "black" }}>
              Resilience Roundtable
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 25 }}>
              At our clinic, we offer <strong>Resilience Roundtable</strong>, a once-per-month
              virtual educational session designed to address a wide variety of mental health
              topics in a safe and anonymous space. The idea for this program came from{" "}
              <strong>Mark’s recognition of the significant gap in mental health education
                within the community.</strong>
            </Typography>
          </Box>
        </Box>

        {/* Second Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Image */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 300, sm: 400, md: 500 },
              width: { xs: 300, sm: 400, md: 500 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/rr1.jpg"
              alt="Mental Health Support"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }} />
          </Box>

          {/* Text */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: 800 },
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              boxShadow: 3,
              height: { xs: 'auto', md: 500 }
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: "black" }}>
              Fostering Conversations
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 25 }}>
              As a dedicated mental health professional, Mark saw firsthand how a lack of
              accessible, evidence-based information often leads to misunderstanding and
              stigma surrounding mental health issues. <strong>Resilience Roundtable</strong> was
              created to bridge this gap and offer practical, expert-driven discussions on
              various topics.
            </Typography>
          </Box>
        </Box>
        <Box
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#333",
      mt: "3%",
      pl: 1,
      pr: 2,
      width: "100%",
      borderRadius: 2,
      boxShadow: 3,
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        color: "green",
        fontWeight: "bold",
        mb: 1,
        mt: 1,
        fontSize: 25,
        textAlign: { xs: "center", md: "left" }, // Center on small screens
      }}
    >
      Interested in joining The Resilience Roundtable?<br />
    </Typography>
    <Box
      sx={{
        borderRadius: "8px",
        p: 3,
        mb: 4,
        mt: 1,
        textAlign: { xs: "center", md: "left" }, // Center on small screens
      }}
    >
      <Typography variant="subtitle1" sx={{ color: "black", mb: 2 }}>
        To attend the Resilience Roundtable, please follow these steps:
      </Typography>
      <ul style={{ listStyleType: "disc", margin: 0, paddingLeft: "1.5em", fontWeight: "normal" }}>
        <li>Fill out the form provided.</li>
        <li>After submitting, you will receive:
          <ul style={{ listStyleType: "circle", paddingLeft: "1.5em", fontWeight: "normal" }}>
            <li>An invoice via email and/or text.</li>
            <li>A session link sent to your email once payment is received (allow 24 hours).</li>
          </ul>
        </li>
        <li>Sign up for the monthly Resilience Roundtable by completing the form below.</li>
        <li>Access Options:
          <ul style={{ listStyleType: "circle", paddingLeft: "1.5em", fontWeight: "normal" }}>
            <li>Member Discounted Plan: $21 per session + 1 Free Friend/Family Member.</li>
            <li>Guest Access: $30 per session.</li>
          </ul>
        </li>
        <li>Form Details:
          <ul style={{ listStyleType: "circle", paddingLeft: "1.5em", fontWeight: "normal" }}>
            <li>Name of the person filling out the form.</li>
            <li>Name of the first attendee.</li>
            <li>Name of the second attendee (if utilizing the Member Discounted Plan).</li>
            <li>Email address to send the session link.</li>
          </ul>
        </li>
        <li>Payment Method: QuickBooks payment option available.</li>
      </ul>
    </Box>
  </Box>
        <ResilienceRoundtableForm />
      </Box>

      {/* Include the form here */}
     
    </>
  );
};

export default RoundTable;
