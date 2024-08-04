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
        <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'Komika Axis' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>Category:</strong> {category || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>Code:</strong> {ean || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>Brand:</strong> {brand || publisher || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>Price:</strong> ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>Condition:</strong> {condition}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Komika Axis' }}>
          <strong>For Sale:</strong> {forSale ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
        <SecondaryButton onClick={handleDeleteClick} sx={{ fontFamily: 'Komika Axis' }}>
          Delete
        </SecondaryButton>
        <PrimaryButton onClick={handleEdit} sx={{ fontFamily: 'Komika Axis' }}>
          Edit
        </PrimaryButton>
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