import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Logos() {
  const images = [
    { src: "/logo5.png", alt: "Image 1" },
    { src: "/logo6.png", alt: "Image 2" },
    { src: "/logo3.png", alt: "Image 3" },
    { src: "/logo4.png", alt: "Image 4" },
  ];

  const fixedLogos = images.slice(0, 4);
  const movingLogos = images.slice(4);

  const settings = {
    dots: false,
    infinite: true,
    speed: 18000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: "#535945",
        }}
      >
        Our Insurance Partners
      </Typography>

      {/* Fixed logos */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mb: 4,
        }}
      >
        {fixedLogos.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image.src}
            alt={image.alt}
            sx={{
              width: "200px",
              height: "120px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        ))}
      </Box>

      {/* Moving logos */}
      <Box sx={{ width: "100%", padding: "10px" }}>
        <Slider {...settings}>
          {movingLogos.map((image, index) => (
            <Box
              key={index}
              sx={{
                padding: "10px",
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                sx={{
                  width: "200px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Logos;
