import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Card, Typography, IconButton, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReviewForm from '@/components/Review/ReviewForm';
import axios from 'axios';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detects if the screen width is below 600px

  const getReviews = async () => {
    try {
      const response = await axios.get('/api/getReviewsc');
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
        color: 'white',
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
        color: 'white',
      }}
    >
      <ChevronLeftIcon />
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: !isSmallScreen,
    nextArrow: !isSmallScreen ? <NextArrow /> : null,
    prevArrow: !isSmallScreen ? <PrevArrow /> : null,
    pauseOnHover: true,
    pauseOnDotsHover: true,
  };

  return (
    <Box sx={{ width: '100%', padding: { xs: 1, sm: 2, md: 3 }, paddingLeft: { xs: 1, md: 4 }, paddingRight: { xs: 1, md: 4 } ,mt:4}}>
      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: { xs: '95%', sm: 300, md: 345 },
                margin: '0 auto',
                p: 2,
                position: 'relative',
                mx: { xs: 1, md: 2 },
                backgroundColor: '#1A4B66',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#CFD8DC', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                  {new Date(review.created_at).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ paddingY: 1, color: '#CFD8DC' }}>
                {review.review || 'No description available'}
              </Typography>

              <Typography variant="h6" sx={{ paddingY: 1, color: '#CFD8DC', fontWeight: 'bold' }}>
                {review.publishing_name}
              </Typography>

              <Typography variant="body2" sx={{ paddingY: 1, color: '#CFD8DC', fontWeight: 'bold' }}>
                {review.designation}
              </Typography>
            </Card>
          ))}
        </Slider>
      ) : (
        <Typography variant="h6" sx={{ padding: 2, color: 'black' }}>
          No reviews available.
        </Typography>
      )}
      
      <ReviewForm getReviews={getReviews} />
    </Box>
  );
};

export default Review;
