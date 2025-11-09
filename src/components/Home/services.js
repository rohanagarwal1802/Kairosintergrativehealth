"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ServicesOptions from "../servicesDropdown";
import CustomIcon from "../customIcon";

const services = ServicesOptions();

const ServicesBox = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  const handleServiceClick = (service) => {
    if (service?.component) {
      setSelectedService(() => service.component); // store component function
      setOpen(true);
    }
  };

  return (
    <>
      {/* Icons Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#ECE7E2",
          padding: "20px",
          borderRadius: "8px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {services.map((service) => (
          <Box
            key={service.title}
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginX: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleServiceClick(service)}
          >
            <CustomIcon
              src={service.image}
              alt={service.title}
              color={"white"}
              // path={service.path}
              size={50}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: { xs: "14px", sm: "16px" },
                marginTop: "8px",
              }}
            >
              {service.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Dynamic Dialog Rendering */}
      {selectedService &&
        (() => {
          const ComponentToRender = selectedService;
          return <ComponentToRender open={open} setOpen={setOpen} />;
        })()}
    </>
  );
};

export default ServicesBox;
