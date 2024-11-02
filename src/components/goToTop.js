import React from "react";
import { IconButton, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Using Material-UI's built-in arrow icon

const GoToTopIcon = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16, // Position from the bottom
        right: 16, // Position from the right
        backgroundColor: "black", // Background color
        color: "white", // Icon color
        borderRadius: "50%", // Circular shape
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)", // Shadow for better visibility
        width: 60, // Circular button width
        height: 60, // Circular button height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          padding: 0, // Remove padding
          color: "white",
          width: "100%", // Make button take full width
          height: "100%", // Make button take full height
        }}
      >
        <ArrowUpwardIcon sx={{ fontSize: 30 }} /> {/* Arrow icon */}
      </IconButton>
    </Box>
  );
};

export default GoToTopIcon;
