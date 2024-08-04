import React from 'react';
import Button from '@mui/material/Button';

export const PrimaryButton = ({ children, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    sx={{
      textTransform: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
    }}
    {...props}
  >
    {children}
  </Button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    color="accent"
    sx={{
      textTransform: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
    }}
    {...props}
  >
    {children}
  </Button>
);