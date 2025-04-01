import React from "react";
import { CardMedia, Box } from "@mui/material";

const LocationVideo = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#C8AF8F",
        color: "#333",
        mt: "3%",
        pl: 1,
        pr: 2,
        p: 2,
        width: "80%",
        borderRadius: 2,
        boxShadow: 3,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="video"
        src="/locationVideo.mp4"
        autoPlay
        muted
        loop
        controls
        sx={{
          width: "100%", // Full width of parent Box
          maxWidth: "960px", // Responsive size (half of 1920px)
          height: "540px", // Maintain 16:9 aspect ratio
          objectFit: "cover", // Ensure proper fitting
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default LocationVideo;
