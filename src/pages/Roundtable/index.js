import React from "react";
import { Box, Typography } from "@mui/material";

const RoundTable = () => {
  return (
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
            p:2
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
            }}
          />
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
            height:{xs:'auto',md:450}
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600,color:"black" }}>
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
            }}
          />
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
            height:{xs:'auto',md:500}
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 ,color:"black"}}>
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
    </Box>
  );
};

export default RoundTable;
