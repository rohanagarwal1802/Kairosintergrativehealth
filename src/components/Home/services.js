import React from "react";
import { Box, Typography } from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';

const services = [
  { name: "Psychiatry", icon: "/icons/psychiatry.svg" },
  { name: "Therapy", icon: "/icons/therapy.svg" },
  { name: "Holistic Wellness Programmes", icon: "/icons/holistic.svg" },
  { name: "Genetic Testing", icon: "/icons/genetic.svg" },
  { name: "Online Workshops", icon: "/icons/workshops.svg" },
];

const ServicesBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#d9fbd9", // Light green background
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {services.map((service) => (
        <Box
          key={service.name}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "150px",
          }}
        >
          <PsychologyIcon sx={{color:"black"}}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 ,color:"black"}}>
            {service.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ServicesBox;
