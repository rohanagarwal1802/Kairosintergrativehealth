import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function ImageGallery() {
  const images = [
    { src: "/testimonial1.jpeg", alt: "Image 1", title: "Image 1" },
    { src: "/testimonial1.jpeg", alt: "Image 2", title: "Image 2" },
    { src: "/testimonial1.jpeg", alt: "Image 3", title: "Image 3" },
    { src: "/testimonial1.jpeg", alt: "Image 4", title: "Image 4" },
  ];

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid
            item
            xs={12} // Full width on small screens
            sm={6}  // 2 images per row on medium screens
            md={3}  // 4 images per row on large screens
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "8px",
                border: "2px solid #000", // Bold border around the image
              }}
            />
           
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ImageGallery;
