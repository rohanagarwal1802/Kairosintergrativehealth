import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import useUserStore from "../useUserStore";
import { useState,useEffect } from "react";

function OfficeImageGallery() {
  const { preferedLocation, setPreferedLocation } = useUserStore();
  const [contactImages,setContactImages]=useState([])
  const alabamaImages = [
    { src: "/office1.png", alt: "Image 1", title: "Image 1" },
    { src: "/office2.png", alt: "Image 2", title: "Image 2" },
    { src: "/office3.png", alt: "Image 3", title: "Image 3" },
  ];
  const northCarolinaImages = [
    { src: "/carolinaOffice1.png", alt: "Image 1", title: "Image 1" },
    // { src: "/office2.png", alt: "Image 2", title: "Image 2" },
    // { src: "/office3.png", alt: "Image 3", title: "Image 3" },
  ];
useEffect(()=>{
  if(preferedLocation==='Alabama')
  {

    setContactImages(alabamaImages)
  }
  else if(preferedLocation==='North Carolina')
  {
    setContactImages(northCarolinaImages)
  }
},[preferedLocation])
  return (
    <Box sx={{ width: "100%", padding: "4px", backgroundColor: "#ECE7E2", display: "flex", justifyContent: "center" }}>
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        sx={{ maxWidth: "1200px" }} // Adjust max width to keep alabamaImages centered
      >
        {contactImages.map((image, index) => (
          <Grid
            item
            xs={12} // Full width on small screens
            sm={6}  // 2 alabamaImages per row on medium screens
            md={4}  // 3 or 4 alabamaImages per row on larger screens
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: "100%", // Fully responsive width
                maxWidth: "500px", // Adjust max width of each image
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

export default OfficeImageGallery;
