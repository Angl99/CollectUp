import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Container, Typography, Grid, Button, Box, IconButton, TextField, SwipeableDrawer, FormControl, FormControlLabel, Radio, RadioGroup, Slider, CircularProgress, Snackbar } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

// Component for individual marketplace items
const MarketplaceItem = ({ item, onAddToCart }) => (
  <Card className="h-full flex flex-col">
    <CardMedia
      component="img"
      image={item.imageUrl || (item.product?.images || [])[0] || item.product.data?.images[0]}
      alt={item.product.title}
      className="h-48 object-cover"
    />
    <CardContent className="flex-grow p-4">
      <Typography variant="inherit" component="div" sx={{ fontFamily: 'Komika Axis', mb: 1 }}>
        {item.product.title || item.product.data.title}
      </Typography>
      <Typography variant="body1" color="text.primary" className="mb-1">
        Price: ${item.price}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-2">
        Condition: {item.condition ? item.condition.charAt(0).toUpperCase() + item.condition.slice(1) : 'N/A'}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-2">
        {item.userDescription || item.product.description}
      </Typography>
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
      <Button 
        variant="contained" 
        onClick={() => onAddToCart(item)}
        fullWidth
        sx={{ backgroundColor: 'primary.main', color: '#ffffff',}}
      >
        Add to Cart
      </Button>
    </Box>
  </Card>
);

// Main Marketplace component
const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    condition: 'all'
  });
  const [tempFilters, setTempFilters] = useState({...filters});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items`);
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsFilterOpen(open);
  };

  const handleFilterChange = (filterType, value) => {
    setTempFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const cancelFilters = () => {
    setTempFilters({...filters});
    setIsFilterOpen(false);
  };

  const filteredItems = items.filter(item =>
    item.product.data.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.category === 'all' || item.category === filters.category) &&
    item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1] &&
    (filters.condition === 'all' || item.condition === filters.condition)
  );

  const handleAddToCart = (item) => {
    setSnackbarMessage(`${item.name} added to cart!`);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pt: 12, pb: 11 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, fontFamily: 'Komika Axis' }}>
        Marketplace
      </Typography>
      <Box sx={{ display: 'flex', mb: 4, mt: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search marketplace items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <IconButton
          color="primary"
          onClick={toggleDrawer(true)}
          aria-label="filter"
          sx={{ ml: 2 }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredItems.map(item => (
            <Grid item xs={12} sm={6} key={item.id}>
              <MarketplaceItem item={item} onAddToCart={handleAddToCart} onClick={() => navigate(`/404`)} />
            </Grid>
          ))}
        </Grid>
      )}

      <SwipeableDrawer
        anchor="right"
        open={isFilterOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Filters</Typography>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Category</Typography>
            <RadioGroup
                value={tempFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
            >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="figures" control={<Radio />} label="Figures" />
                <FormControlLabel value="books" control={<Radio />} label="Books" />
            </RadioGroup>
          </FormControl>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Price Range</Typography>
            <Slider
              value={tempFilters.priceRange}
              onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
          </Box>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Condition</Typography>
            <RadioGroup
              value={tempFilters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={cancelFilters}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={applyFilters}>Apply</Button>
          </Box>
        </Box>
      </SwipeableDrawer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Marketplace;
