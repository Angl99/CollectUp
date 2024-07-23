import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button, Typography, Box, Avatar } from '@mui/material';
import { useAuth } from '../../helpers/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme for the Profile component
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#e67e22',
    },
    text: {
      primary: '#34495e',
      secondary: '#95a5a6',
    },
    background: {
      default: '#f0f3f5',
    },
  },
});

export default function Profile() {
  // Get the user object from the AuthContext
  const { user } = useAuth();
  
  return (
    <ThemeProvider theme={theme}>
      {/* Main container for the profile page */}
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 5 }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={9} xl={7}>
              <Card>
                {/* Profile header with background color and avatar */}
                <Box sx={{ 
                  backgroundColor: 'primary.main', 
                  height: 200, 
                  position: 'relative',
                  display: 'flex',
                  color: 'white'
                }}>
                  {/* Avatar */}
                  <Box sx={{ position: 'absolute', bottom: 20, left: 24 }}>
                    <Avatar
                      src=""
                      sx={{ width: 150, height: 150, border: '5px solid white' }}
                    />
                  </Box>
                  {/* User's display name */}
                  <Box sx={{ ml: 24, mt: 'auto', mb: 2 }}>
                    <Typography variant="h5">
                      {`${user.displayName}`}
                    </Typography>
                  </Box>
                </Box>

                <CardContent>
                  {/* About section */}
                  <Typography variant="h6" gutterBottom color="text.primary">About</Typography>
                  <Box sx={{ backgroundColor: 'background.default', p: 2, mb: 3 }}>
                    <Typography color="text.primary">Email: {`${user.email}`}</Typography>  
                    <Typography color="text.primary">Date of Birth:</Typography>
                    <Typography color="text.primary">Location:</Typography>
                  </Box>

                  {/* Showcases section */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Showcases</Typography>
                  {/* Commented out "Show all" link */}
                  {/* <Typography color="text.secondary">Show all</Typography> */}
                  </Box>
                  
                  {/* Grid of showcase images */}
                  <Grid container spacing={2}>
                    {[112, 107, 108, 114].map((num) => (
                      <Grid item xs={6} key={num}>
                        <CardMedia
                          component="img"
                          image={`https://via.placeholder.com/300x200`}
                          alt={`Photo ${num}`}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
