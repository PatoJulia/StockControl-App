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
import Client from "@/interfaces/Client";

export default function ProductModal({
  isModalOpen,
  closeCallback,
}: {
  isModalOpen: boolean;
  closeCallback: () => void;
}) {
  const [clientName, setClientName] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<number>();
  const [clientEmail, setClientEmail] = useState<string>("");

  const handleFormSubmit = async () => {
    const data: Client = {
      name: clientName,
      address: clientAddress,
      phone: clientPhone,
      email: clientEmail,
    };
    try {
      const response = await fetch("http://localhost:4300/client", {
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
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            margin="normal"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />

          {/* Product Price */}
          <label>Número de teléfono</label>

          <input
            type="number"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.valueAsNumber)}
          />

          {/* Submit Button */}
          <Button onClick={handleFormSubmit} sx={{ color: "black" }}>
            Agregar cliente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
