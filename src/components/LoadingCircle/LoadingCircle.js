import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingCircle = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress disableShrink sx={{ margin: '0 auto' }} />
    </Box>
  );
};

export default LoadingCircle;
