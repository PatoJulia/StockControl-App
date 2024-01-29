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
import Product from "@/interfaces/Product";

export default function ProductModal({
  isModalOpen,
  closeCallback,
}: {
  isModalOpen: boolean;
  closeCallback: () => void;
}) {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>();
  const [productBrand, setProductBrand] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productStock, setProductStock] = useState<number>(0);
  const [productCode, setProductCode] = useState<string>("");

  const handleFormSubmit = async () => {
    const data: Product = {
      name: productName,
      price: productPrice,
      brand: productBrand,
      description: productDescription,
      stock: productStock,
      productCode: productCode,
    };
    try {
      const response = await fetch("http://localhost:4300/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    closeCallback();
  };

  return (
    <Dialog open={isModalOpen} onClose={closeCallback}>
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <form>
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
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          {/* Product Price */}

          <TextField
            label="Product brand"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
             <label>Price</label>

            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.valueAsNumber)}
            />
          <label>Stock</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.valueAsNumber)}
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
