import React from "react";
import { Box, Typography } from "@mui/material";
import ServicesOptions from "../servicesDropdown";
// Services list with custom icons
const services = ServicesOptions()

const ServicesBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#d9fbd9", // Light green background
        padding: "20px",
        borderRadius: "8px",
        overflowX: "auto", // Enable horizontal scrolling if items overflow
        whiteSpace: "nowrap", // Prevent items from wrapping
      }}
    >
      {services.map((service) => (
        <Box
          key={service.title}
          sx={{
            display: "inline-flex", // Ensure items stay in one line
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginX: "10px", // Horizontal margin between items
          }}
        >
          {service.icon}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: "black",
              fontSize: {
                xs: "14px", // Smaller text for mobile
                sm: "16px",
              },
              marginTop: "8px", // Space between icon and text
            }}
          >
            {service.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ServicesBox;
