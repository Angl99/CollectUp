import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { updateById } from '../../helpers/userHelpers';

// component for editing user profile
export default function ProfileForm({ onClose, user }) {
  // state to hold form data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
  });

  // effect to populate form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        streetAddress1: user.streetAddress1 || '',
        streetAddress2: user.streetAddress2 || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  // handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateById(user.id, formData);
    console.log(formData);
    onClose();
    window.location.reload();
  };

  // styles for the modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* first name input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Grid>
          {/* last name input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Grid>
          {/* email input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          {/* street address 1 input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address 1"
              name="streetAddress1"
              value={formData.streetAddress1}
              onChange={handleChange}
            />
          </Grid>
          {/* street address 2 input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address 2"
              name="streetAddress2"
              value={formData.streetAddress2}
              onChange={handleChange}
            />
          </Grid>
          {/* city input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          {/* state input */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          {/* zip code input */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid>
          {/* bio input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleChange}
            />
          </Grid>
          {/* form buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Save</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
