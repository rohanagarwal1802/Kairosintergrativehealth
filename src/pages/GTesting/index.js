import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

const GeneticTestingPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/depressionBackground.jpg')`,
        backgroundSize: "cover", // Ensures the image covers the entire box
        backgroundPosition: "top", // Focuses on the upper part of the image
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, sm: 4 }, // Adjusts padding for different screen sizes
        borderRadius: 2,
        height: "auto", // Dynamically adjusts height to fit content
        width: "100%", // Ensures it spans the full width
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks column on small screens, row on larger
          alignItems: "center",
          gap: { xs: 2, md: 4 },
          p: 2,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
          }}
        >
          <Image
            src="/Gtest.jpg"
            alt="Mental Well-being"
            width={500}
            height={300}
            style={{
              width: "100%", // Makes the image responsive
              height: "auto",
              borderRadius: "8px", // Adds rounded corners
            }}
          />
        </Box>

        {/* Text Section */}
        <Stack
          sx={{
            maxWidth: "500px",
            textAlign: { xs: "center", md: "left" }, // Center text on small screens
            mt: { xs: 2, md: 0 }, // Adds margin on small screens
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: "#333",
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "2rem" }, // Adjusts font size for responsiveness
            }}
          >
            Genetic Testing
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: 14, sm: 16 }, // Adjusts font size for different screen sizes
              lineHeight: 1.7,
            }}
          >
            In psychiatry, we utilize a form of genetic testing that analyzes specific
            genes related to mental health medications. This tool can be helpful in
            determining treatment options for individuals. By assessing how a person's
            genetic makeup affects their response to various psychiatric medications, genetic
            testing can help clinicians select medications that are more likely to be effective
            and have fewer side effects. This personalized approach aims to enhance treatment
            outcomes and reduce the trial-and-error process often associated with psychiatric
            care. Ultimately, genetic testing used at Kairos Integrative Health is a tool
            to empower patients and providers to make informed decisions about medication
            management, leading to more tailored and effective mental health treatment.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default GeneticTestingPage;
