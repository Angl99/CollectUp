import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, SwipeableDrawer, FormControl, FormControlLabel, Radio, RadioGroup, Slider, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

// Component for individual marketplace items
const MarketplaceItem = ({ item }) => (
  <Card className="h-full flex flex-col">
    <CardMedia
      component="img"
      image={item.image}
      alt={item.name}
      className="h-48 object-cover"
    />
    <CardContent className="flex-grow p-4">
      <Typography variant="h6" component="div" className="mb-2">
        {item.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-2">
        {item.description}
      </Typography>
      <Typography variant="body1" color="text.primary" className="mb-1">
        Price: ${item.price}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-2">
        Condition: {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
      </Typography>
    </CardContent>
    <div className="p-4 pt-0">
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => onAddToCart(item)}
        fullWidth
      >
        Add to Cart
      </Button>
    </div>
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://api.example.com/marketplace-items');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.category === 'all' || item.category === filters.category) &&
    item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1] &&
    (filters.condition === 'all' || item.condition === filters.condition)
  );

  return (
    <div className="container mx-auto p-4 pt-24">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Marketplace
      </Typography>
      <div className="flex mb-6 mt-5">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" className="text-center mt-8">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredItems.map(item => (
            <Grid item xs={12} sm={6} key={item.id}>
              <MarketplaceItem item={item} />
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
        <div className="w-80 p-4">
          <Typography variant="h6" className="mb-4">Filters</Typography>
          <FormControl component="fieldset" className="mb-4">
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
          <div className="mb-4">
            <Typography variant="subtitle1">Price Range</Typography>
            <Slider
              value={tempFilters.priceRange}
              onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
          </div>
          <FormControl component="fieldset" className="mb-4">
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
          <div className="flex justify-between">
            <Button variant="outlined" onClick={cancelFilters}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Marketplace;
