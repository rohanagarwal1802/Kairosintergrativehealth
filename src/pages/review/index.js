import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Card, Typography, Rating, IconButton, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReviewForm from '@/components/Review/ReviewForm';

import axios from 'axios';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detects if the screen width is below 600px
  const getReviews = async () => {
    try {
      const response = await axios.get('/api/getReviews');
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error in getting reviews', error);
    }
  };
  useEffect(() => {
    
    getReviews();
  }, []);

  const NextArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: -10,
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'black',
      }}
    >
      <ChevronRightIcon />
    </IconButton>
  );

  const PrevArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: -10,
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'black',
      }}
    >
      <ChevronLeftIcon />
    </IconButton>
  );

  const settings = {
    dots: true,                  // Show dots navigation
    infinite: true,              // Allow infinite scrolling
    speed: 500,                  // Transition speed (500ms)
    slidesToShow: isSmallScreen ? 1 : 3, // 1 slide on small screens, 3 slides on large screens
    slidesToScroll: 1,           // Number of slides to scroll at a time
    autoplay: true,              // Enable autoplay
    autoplaySpeed: 3000,         // Delay between slide transitions
    arrows: !isSmallScreen,      // Show arrows only on larger screens
    nextArrow: !isSmallScreen ? <NextArrow /> : null,
    prevArrow: !isSmallScreen ? <PrevArrow /> : null,
    pauseOnHover: true,          // Pause autoplay when hovering
    pauseOnDotsHover: true,      // Pause autoplay when hovering over dots
  };
  
  

  return (
    <><Box
      sx={{
        width: '100%',
        padding: { xs: 1, sm: 2, md: 3 },
        paddingLeft: { xs: 1, md: 4 },
        paddingRight: { xs: 1, md: 4 },
      }}
    >
      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: { xs: '95%', md: 345 },
                margin: '0 auto',
                p: 2,
                position: 'relative',
                mx: { xs: 1, md: 2 },
                backgroundColor: '#1A4B66',
                color: 'white',
                align: "center"
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Rating name="read-only" value={review.rating} precision={0.5} readOnly />
                <Typography variant="body1" sx={{ color: '#CFD8DC' }}>
                  {new Date(review.created_at).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ paddingY: 1, color: '#CFD8DC' }}>
                {review.review || 'No description available'}
              </Typography>
              <Typography variant="h6" sx={{ paddingY: 1, color: '#CFD8DC' }}>
                {review.publishing_name}
              </Typography>
              <Typography variant="body2" sx={{ paddingY: 1, color: '#CFD8DC', fontWeight: 'bold' }}>
                {review.destination}
              </Typography>
            </Card>
          ))}
        </Slider>
      ) : (
        <Typography variant="h6" sx={{ padding: 2, color: 'black' }}>
          No reviews available.
        </Typography>
      )}
    </Box><ReviewForm getReviews={getReviews}/></>
  );
};

export default Review;
