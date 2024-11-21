import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const FounderDesk = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 4 }}>
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, sm: 400, md: 500 }, // Responsive height
          width: { xs: 300, sm: 400, md: 500 }, // Responsive width
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: { xs: 0, md: -4 }, // Shifts the image to the left on medium and larger screens
        }}
      >
        {/* #66BB6A Decorative Boxes Behind Image */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            left: "-15%",
            width: "80%",
            height: "35%",
            backgroundColor: "#66BB6A",
            zIndex: -1,
            borderRadius: 2,
          }}
        />
        
        {/* Dotted Box */}
        <Box
          sx={{
            position: "absolute",
            top: "15%", // Aligned vertically with some padding
            left: "-5%", // Positioned on the left of the #66BB6A box
            width: "10%", // Narrower width for the dotted box
            height: "20%", // Taller height for the dotted box
            backgroundImage: "radial-gradient(white 10%, transparent 10%)",

            backgroundSize: "10px 10px", // Adjust the size of dots
            zIndex: -1,
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "8%",
            right: "5%",
            width: "60%",
            height: "50%",
            backgroundColor: "#66BB6A",
            zIndex: -1,
            borderRadius: 2,
          }}
        />
        {/* Image */}
        <Box
          component="img"
          src="/founder.jpg"
          alt="Founder"
          sx={{
            height: "70%",
            width: "70%",
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1,
          }}
        />

        {/* Rectangular Text Box at Bottom Left */}
        <Box
          sx={{
            position: "absolute",
            left: 0, // Aligned to the left edge of the image
            bottom: 0, // Aligned to the bottom edge of the image
            width: "50%", // Rectangular shape
            height: "20%", // Less height for the rectangle
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
            padding: 2,
            borderRadius: "8px 8px 0 0", // Rounded corners at the top
            boxShadow: 3,
            zIndex: 2, // Above the image
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "black", fontWeight: 500, textAlign: "center" }}
          >
            Inspiring Leadership and Vision
          </Typography>
        </Box>
      </Box>

      {/* Text Section */}
      <Stack
        sx={{
          ml: { xs: 0, md: 4 },
          mt: { xs: 4, md: 0 },
          justifyContent: "center",
          maxWidth: "400px",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: 600 }}>
          Welcome to the Founder’s Desk
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16 }}>
          We are excited to share our journey with you. Thank you for being part of it!
        </Typography>
      </Stack>
    </Box>
  );
};

export default FounderDesk;
