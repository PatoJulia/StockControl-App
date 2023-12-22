import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function ProductModal({
  isModalOpen,
  closeCallback,
}: {
  isModalOpen: boolean;
  closeCallback: () => void;
}) {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Perform any necessary actions with form data
    console.log("Product Name:", productName);
    console.log("Product Price:", productPrice);

    // Close the modal
    closeCallback();
  };

  return (
    <Dialog open={isModalOpen} onClose={closeCallback}>
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        {/* Form */}
        <form>
          {/* Product Name */}
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* Product Price */}
          <TextField
            label="Product Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
