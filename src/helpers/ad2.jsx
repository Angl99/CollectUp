import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const WatchAd = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '20px auto',
        textAlign: 'center',
      }}
    >
      <Link href="https://kentex-shop.com/cowboybebop2024/index_en.html" target="_blank" rel="noopener noreferrer">
        <img
          src="https://a.storyblok.com/f/178900/960x541/3a4fffe338/cr_bebop_hero.png/m/filters:quality(95)format(webp)"
          alt="Watch Ad"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
        />
      </Link>
      <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
        Advertisement: Cowboy Bebop x Kentex
      </Typography>
    </Box>
  );
};

export default WatchAd;