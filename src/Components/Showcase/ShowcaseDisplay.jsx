import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, CircularProgress, Container, Paper } from "@mui/material";
import ShowcaseItem from "./ShowcaseItem";
import { useAuth } from "../../helpers/AuthContext";
import { getShowcaseById, createShowcase, addItemsToShowcase, getShowcasesByUserUid, removeItemsFromShowcase } from "../../helpers/showcaseHelpers";
import copy from 'copy-to-clipboard';

 function ShowcaseDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showcaseId, setShowcaseId] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const loadOrCreateShowcase = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const showcase = await getShowcaseById(id);
          
          setShowcaseId(showcase.id);

          if (location.state?.items) {
            // Prepare items for adding to showcase
            const itemsToAdd = location.state.items.map(item => ({
              productEan: item.data.ean,
              condition: item.condition,
              userDescription: item.userDescription,
              imgUrl: item.imgUrl
            }));
            // Add new items to the showcase
            await addItemsToShowcase(showcase.id, itemsToAdd);
          }

          // Fetch updated showcase items
          const updatedShowcase = await getShowcaseById(showcase.id);
          setItems(updatedShowcase.items || []);
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading or creating showcase:", err);
          setError("Failed to load or create showcase. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("User not logged in.");
        setIsLoading(false);
      }
    };

    loadOrCreateShowcase();
  }, [user, location.state, id]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const handleShare = () => {
    const link = window.location.href;
    copy(link);
    console.log(link);
  }

  const handleDelete = async (itemId) => {
    try {
      await removeItemsFromShowcase(showcaseId, itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again.");
    }
  };

  const handleUpdate = async (itemId, updatedData) => {
    try {
      const updatedItem = await updateItemInShowcase(showcaseId, itemId, updatedData);
      setItems(items.map(item => item.id === itemId ? updatedItem : item));
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Showcase
        </Typography>
        <Button onClick={handleShare}>
          Share

        </Button>
        {items.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No items in the showcase yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3}>
                  <ShowcaseItem 
                    item={item} 
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/genItem')}
          >
            Add Item
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ShowcaseDisplay;