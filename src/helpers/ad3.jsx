import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const AnimeExpoAd = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '75px auto 30px',
        textAlign: 'center',
      }}
    >
      <Link href="https://www.eventbrite.com/e/san-diego-anime-convention-2024-tickets-885442411087" target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F800033979%2F16478428167%2F1%2Foriginal.20240702-083048?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=267%2C0%2C2280%2C1140&s=82ade831f6a16bf0fc5dac8b1979af15"
          alt="Anime Expo 2025 Ad"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
        />
      </Link>
      <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
        Advertisement: Anime Expo 2025
      </Typography>
    </Box>
  );
};

export default AnimeExpoAd;