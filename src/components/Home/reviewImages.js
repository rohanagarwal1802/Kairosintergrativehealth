import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageGallery() {
  const images = [
    { src: "/testimonial1.png", alt: "Image 1" },
    { src: "/testimonial2.png", alt: "Image 2" },
    { src: "/testimonial3.png", alt: "Image 3" },
    { src: "/testimonial4.png", alt: "Image 4" },
    { src: "/testimonial5.png", alt: "Image 4" },
    // { src: "/testimonial5.png", alt: "Image 3" },
    // { src: "/testimonial4.png", alt: "Image 4" },
    // { src: "/testimonial5.png", alt: "Image 3" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 18000,
    autoplay: true,
    autoplaySpeed: 0, // continuous scroll
    cssEase: "linear", // smooth scroll
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
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
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
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "2px solid #000",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default ImageGallery;
