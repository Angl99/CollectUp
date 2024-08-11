import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import notFoundImage from '../../assets/404.png';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '2rem',
});

const NotFound404 = () => {
  return (
    <StyledBox>
      <StyledImage src={notFoundImage} alt="404 Not Found" />
      <Typography variant="h4" gutterBottom sx={{fontFamily: 'Komika Axis'}}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
    </StyledBox>
  );
};

export default NotFound404;