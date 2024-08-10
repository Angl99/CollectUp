import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const AnimeNYCAd = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '20px auto',
        textAlign: 'center',
      }}
    >
      <Link href="https://animenyc.com" target="_blank" rel="noopener noreferrer">
        <img
          src="https://animenyc.com/wp-content/uploads/2024/03/420179809_781564557346819_2103121196891959057_n.png"
          alt="Anime NYC Ad"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
        />
      </Link>
      <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
        Advertisement: Anime NYC
      </Typography>
    </Box>
  );
};

export default AnimeNYCAd;