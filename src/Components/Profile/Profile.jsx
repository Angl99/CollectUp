import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Button, Typography, Box, Avatar, Modal, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getById } from '../../helpers/userHelpers';
import { useAuth } from '../../helpers/AuthContext';
import ProfileForm from './ProfileForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#95a5a6',
    },
    accent: {
      main: '#623c8c',
    },
    text: {
      primary: '#34495e',
    },
    background: {
      default: '#f0f3f5',
    },
  },
});

export default function Profile() {
  const [profileUser, setProfileUser] = useState(null);
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isProfileOwner = user && profileUser && user.uid === profileUser.uid;

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const fetchedUser = await getById(userId);
        setProfileUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching profile user:', error);
      }
    };
    fetchProfileUser();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 9, }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Card>
                <Box sx={{ 
                  backgroundColor: 'accent.main', 
                  height: isMobile ? 250 : 200, 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'center' : 'flex-end',
                  color: 'white',
                  p: 2
                }}>
                  <Avatar
                    src="https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg"
                    sx={{ 
                      width: isMobile ? 100 : 150, 
                      height: isMobile ? 100 : 150, 
                      border: '5px solid white',
                      mb: isMobile ? 2 : 0
                    }}
                  />
                  <Box sx={{ 
                    ml: isMobile ? 0 : 3, 
                    textAlign: isMobile ? 'center' : 'left',
                    flexGrow: 1
                  }}>
                    <Typography variant={isMobile ? "h5" : "h4"}>
                      {`${profileUser?.first_name} ${profileUser?.last_name}`}
                    </Typography>
                    {isProfileOwner && (
                      <Button 
                        variant="contained"
                        sx={{ backgroundColor: 'secondary.main', color: 'white', mt: 1 }} 
                        onClick={handleOpen}
                        size="small"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Box>
                </Box>

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom color="text.primary">Bio</Typography>
                      <Typography color="text.primary">{profileUser?.bio || 'No bio available.'}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom color="text.primary">About</Typography>
                      <Box sx={{ backgroundColor: 'background.default', p: 2, borderRadius: 1 }}>
                        <Typography color="text.primary">Email: {profileUser?.email}</Typography>
                        <Typography color="text.primary">Full Address:</Typography>
                        <Typography color="text.primary">
                          {profileUser?.streetAddress1}
                          {profileUser?.streetAddress2 && `, ${profileUser.streetAddress2}`}
                          {profileUser?.city && `, ${profileUser.city}`}
                          {profileUser?.state && `, ${profileUser.state}`}
                          {profileUser?.zipCode && ` ${profileUser.zipCode}`}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Modal open={open} onClose={handleClose} sx={{ marginBottom: 7 }} >
        <ProfileForm onClose={handleClose} user={profileUser} />
      </Modal>
    </ThemeProvider>
  );
}
