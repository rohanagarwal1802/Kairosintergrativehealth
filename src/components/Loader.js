import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import BlankLayout from './blankLayout';

const Loader = ({  altText = 'Loading...', useGif = true }) => {
    let gifSrc='/loader.gif'
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {useGif ? (
        <img
          src={gifSrc}
          alt={altText}
          style={{ width: '20%', height: 'auto', marginBottom: '16px' }}
        />
      ) : (
        <CircularProgress size={60} color="primary" />
      )}
      {!useGif &&
      <Typography variant="body1" sx={{ marginTop: 2 ,color:"black"}}>
        {altText}
      </Typography>
}
    </Box>
  );
};

export default Loader;

Loader.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
