// GoogleMap.js
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';

const GoogleMap = () => {
  // Define breakpoints using MUI's `useMediaQuery` for responsive sizes
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  // Adjust width and height based on screen size
  const mapWidth = isSmallScreen ? '100%' : isMediumScreen ? '80%' : '600px';
  const mapHeight = isSmallScreen ? '300px' : isMediumScreen ? '400px' : '400px';

  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'right',
        width: mapWidth,
        height: mapHeight,
        margin: '0 auto', // Center the map on the page
        border:'10px solid green',
        borderRadius: '16px'
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          background: 'none!important',
        }}
      >
        <iframe
          title="Google Map"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=vestavia hills&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default GoogleMap;
