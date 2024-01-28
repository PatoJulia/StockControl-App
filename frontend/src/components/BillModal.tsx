import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ProductDetail from "@/app/product/[id]/page";

export default function BillModal({
  isModalOpen,
  closeCallback,
}: {
  isModalOpen: boolean;
  closeCallback: () => void;
}) {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDesciption, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCode, setProductCode] = useState("");

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Perform any necessary actions with form data
    console.log("Codigo:", productCode);
    console.log("Product Name:", productName);
    console.log("Descripcion:", productDesciption);
    console.log("Product Price:", productPrice);
    console.log("marca:", productBrand);
    console.log("stock:", productStock);
    console.log("imagen:", productImage);

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
          <TextField
            label="Product Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <TextField
            label="Product Desciption"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productDesciption}
            onChange={(e) => setProductDescription(e.target.value)}
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

          <TextField
            label="Product Brand"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
          <TextField
            label="Product Stock"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
          <TextField
            label="Product Image"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
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
