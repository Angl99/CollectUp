import React, { useState } from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ItemForm from "./ItemForm";
import { PrimaryButton, SecondaryButton } from "../../helpers/ButtonSystem";

export default function ShowcaseItem({ item, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { title, category, ean, brand, images, publisher, offers } = item.product.data;
  const { userDescription, condition, forSale, imageUrl: itemImage } = item;
  const { id } = item;
  const imageUrl = itemImage || (images && images.length > 0 ? images[0] : null);
  const price = item.price || Math.min(...offers.map(offer => offer.price));

  const handleEdit = () => {
    setIsModalOpen(true);
  };

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

  const handleUpdate = (updatedData) => {
    onUpdate(id, updatedData);
    setIsModalOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="175"
        image={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="inherit" component="div" gutterBottom sx={{ fontFamily: 'Komika Axis' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Category:</strong> {category || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Code:</strong> {ean || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Brand:</strong> {brand || publisher || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Price:</strong> ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Condition:</strong> {condition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>For Sale:</strong> {forSale ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
        <Button 
          onClick={handleDeleteClick}
          variant="text"
          color="primary"
          size="small"
        >
          Delete
        </Button>
        <Button 
          onClick={handleEdit}
          variant="contained"
          size="small"
        >
          Edit
        </Button>
      </CardActions>

      <ItemForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        item={{ id, imageUrl, condition, userDescription, price, forSale }}
      />

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
            NO
          </SecondaryButton>
          <PrimaryButton onClick={handleConfirmDelete} autoFocus>
            YES
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
}