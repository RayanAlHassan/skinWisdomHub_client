import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';

const LoadingPage = () => {
  return (
    
    <Container
      style={{
      
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FEE7CB',
        maxWidth:"100%",
        height: '100vh',
      }}
    >
      <CircularProgress style={{ color: "var(--Font-color)" }} size={80} thickness={5} />
      <Typography
        variant="h6"
        style={{ color: 'var(--Font-color)', marginTop: '16px' }}
      >
        Loading...
      </Typography>
    </Container>
  );
};

export default LoadingPage;