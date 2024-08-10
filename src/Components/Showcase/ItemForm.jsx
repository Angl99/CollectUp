import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

export default function EditModal({ isOpen, onClose, onSave, item }) {
  const [formData, setFormData] = useState({
    imageUrl: item.imageUrl || "",
    condition: item.condition || "",
    userDescription: item.userDescription || "",
    forSale: item.forSale ? "yes" : "no",
    price: item.price || Math.min(...item.product.data.offers.map((offer) => offer.price)),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Edit Item</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="userDescription"
            value={formData.userDescription}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">For Sale</FormLabel>
            <RadioGroup
              row
              name="forSale"
              value={formData.forSale}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} size="small">Cancel</Button>
          <Button type="submit" variant="contained" color="primary" size="small">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}