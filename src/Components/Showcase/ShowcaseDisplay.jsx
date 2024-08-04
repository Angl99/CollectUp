import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, CircularProgress, Container, Fab, useMediaQuery, useTheme, IconButton, Tooltip, Dialog,DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ShowcaseItem from "./ShowcaseItem";
import { useAuth } from "../../helpers/AuthContext";
import { getShowcaseById, addItemsToShowcase, removeItemsFromShowcase } from "../../helpers/showcaseHelpers";
import { updateItemById } from "../../helpers/itemHelper";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';

 function ShowcaseDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showcaseId, setShowcaseId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  
  useEffect(() => {
    const loadOrCreateShowcase = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const showcase = await getShowcaseById(id);
          console.log('showcase', showcase);
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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

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

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setIsCopied(false);
  };

  const handleShare = () => {
    const link = window.location.href;
    copy(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDelete = async (itemId) => {
    try {
      await removeItemsFromShowcase(showcaseId, [{ id: itemId, type: 'Item' }]);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again.");
    }
  };

  const handleUpdate = async (itemId, updatedData) => {
    try {
      const updatedItem = await updateItemById(itemId, updatedData);
      console.log("Updated item:", updatedItem);
      setItems(items.map(item => item.id === itemId ? updatedItem : item));
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" sx={{ fontFamily: 'Komika Axis' }}>
            Your Showcase
          </Typography>
          <Box>
            <Tooltip title="Add Item">
              <IconButton 
                color="primary" 
                onClick={() => navigate('/genItem')}
                size="large"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={isGridView ? "List View" : "Grid View"}>
              <IconButton 
                color="primary" 
                onClick={toggleView}
                size="large"
              >
                {isGridView ? <ViewListIcon /> : <GridViewIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton 
                color="primary" 
                onClick={handleShareClick}
                size="large"
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {items.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No items in the showcase yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {items.map((item, index) => (
              <Grid item xs={isGridView ? 6 : 12} sm={isGridView ? 6 : 12} md={isGridView ? 4 : 12} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ShowcaseItem 
                    item={item} 
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
        
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {showScrollTop && (
        <Box
          onClick={scrollToTop}
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      )}
      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onClose={handleCloseShareModal} fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Share Your Showcase</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={window.location.href}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton color="primary" onClick={handleShare} size="large">
              <ContentCopyIcon />
            </IconButton>
          </Box>
          {isCopied && (
            <Typography color="primary" variant="body2" mt={1}>
              Link copied to clipboard!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ShowcaseDisplay;