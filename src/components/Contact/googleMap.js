// GoogleMap.js
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import useUserStore from '../useUserStore';
import { useState,useEffect } from 'react';

const GoogleMap = () => {
  // Define breakpoints using MUI's `useMediaQuery` for responsive sizes
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');
  const { preferedLocation } = useUserStore();
  const [googleLocation,setGoogleLocation]=useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.1708332067687!2d-86.80047252431046!3d33.418790273401974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88891894b98bf963%3A0x94794a40fd765bf6!2s400%20Vestavia%20Pkwy%2C%20Vestavia%20Hills%2C%20AL%2035216%2C%20USA!5e0!3m2!1sen!2sin!4v1741772143133!5m2!1sen!2sin");
  useEffect(()=>{
if(preferedLocation==='Alabama')

{
  
  setGoogleLocation("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.1708332067687!2d-86.80047252431046!3d33.418790273401974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88891894b98bf963%3A0x94794a40fd765bf6!2s400%20Vestavia%20Pkwy%2C%20Vestavia%20Hills%2C%20AL%2035216%2C%20USA!5e0!3m2!1sen!2sin!4v1741772143133!5m2!1sen!2sin")
}
else if(preferedLocation==='North Carolina')
{
  setGoogleLocation("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.341187136169!2d-78.7763811!3d35.7424179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf3315617832f%3A0x44b3e2a45e3b0f45!2s523%20Keisler%20Dr%2C%20Cary%2C%20NC%2027518%2C%20USA!5e0!3m2!1sen!2sin!4v1760084974207!5m2!1sen!2sin")
}
  },[preferedLocation])


  // Adjust width and height based on screen size
  const mapWidth = isSmallScreen ? '100%' : isMediumScreen ? '80%' : '600px';
  const mapHeight = isSmallScreen ? '300px' : isMediumScreen ? '400px' : '780px';

  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'right',
        width: mapWidth,
        height: mapHeight,
        margin: '0 auto', // Center the map on the page
        border:'10px solid #535945',
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
  src={googleLocation}
  style={{ width: '100%', height: '100%' }}
></iframe>

      </Box>
    </Box>
  );
};

export default GoogleMap;
