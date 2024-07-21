import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Button, Typography, Box, Avatar } from '@mui/material';
import { useAuth } from '../../helpers/AuthContext';
import { getById } from '../../helpers/userHelpers';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  const { uid } = useParams();
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getById(uid);
        setProfileUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [uid]);

  if (!profileUser) {
    return <div>Loading...</div>;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 5 }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={9} xl={7}>
              <Card>
                <Box sx={{ 
                  backgroundColor: 'primary.main', 
                  height: 200, 
                  position: 'relative',
                  display: 'flex',
                  color: 'white'
                }}>
                  <Box sx={{ position: 'absolute', bottom: 20, left: 24 }}>
                    <Avatar
                      src=""
                      sx={{ width: 150, height: 150, border: '5px solid white' }}
                    />
                  </Box>
                  <Box sx={{ ml: 24, mt: 'auto', mb: 2 }}>
                    <Typography variant="h5">
                      {`${profileUser.displayName}`}
                    </Typography>
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.primary">About</Typography>
                  <Box sx={{ backgroundColor: 'background.default', p: 2, mb: 3 }}>
                    <Typography color="text.primary">Email: {`${profileUser.email}`}</Typography>  
                    <Typography color="text.primary">Date of Birth:</Typography>
                    <Typography color="text.primary">Location:</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Showcases</Typography>
                  {/* <Typography color="text.secondary">Show all</Typography> */}
                  </Box>
                  
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
