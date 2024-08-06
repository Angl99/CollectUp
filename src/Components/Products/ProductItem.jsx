import React, { useState } from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { PrimaryButton, SecondaryButton } from "../../helpers/ButtonSystem";

export default function ProductItem({ item, onDelete, onUpdate }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { id, productEan, imageUrl, condition, userDescription, forSale, price } = item;
  const { searchableTitle, searchableBrand, searchableDescription } = item.product;

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit item:", id);
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="175"
        image={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={searchableTitle}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'Komika Axis' }}>
          {searchableTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>EAN:</strong> {productEan}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Brand:</strong> {searchableBrand || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Description:</strong> {searchableDescription || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Condition:</strong> {condition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>User Description:</strong> {userDescription || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>For Sale:</strong> {forSale ? 'Yes' : 'No'}
        </Typography>
        {price && (
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${price.toFixed(2)}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
        <SecondaryButton onClick={handleDeleteClick} sx={{ fontFamily: 'Komika Axis' }}>
          Delete
        </SecondaryButton>
        <PrimaryButton onClick={handleEdit} sx={{ fontFamily: 'Komika Axis' }}>
          Edit
        </PrimaryButton>
      </CardActions>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={handleCancelDelete}>
            No
          </SecondaryButton>
          <PrimaryButton onClick={handleConfirmDelete} autoFocus>
            Yes
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
