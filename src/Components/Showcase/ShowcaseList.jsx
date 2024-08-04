import React, { useState } from 'react';
import { Grid, Button, Container, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShowcaseItem from './ShowcaseItem';

export default function ShowcaseList({ items, onDelete, onUpdate }) {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={isGridView ? <ViewListIcon /> : <GridViewIcon />}
          onClick={toggleView}
        >
          {isGridView ? 'List View' : 'Grid View'}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={isGridView ? 6 : 12} key={item.id}>
            <ShowcaseItem 
              item={item} 
              onDelete={onDelete} 
              onUpdate={onUpdate} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}