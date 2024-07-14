import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button, Typography, Box, Avatar } from '@mui/material';

export default function Profile() {
  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh', py: 5 }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={9} xl={7}>
            <Card>
              <Box sx={{ 
                backgroundColor: '#000', 
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
                  <Typography variant="h5">First/Last Name</Typography>
                  <Typography>New York</Typography>
                </Box>
              </Box>

              <CardContent>
                <Typography variant="h6" gutterBottom>About</Typography>
                <Box sx={{ backgroundColor: '#f8f9fa', p: 2, mb: 3 }}>
                  <Typography>Email:</Typography>  
                  <Typography>Date of Birth:</Typography>
                  <Typography>Location:</Typography>
                
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
  );
}