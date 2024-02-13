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
  const [clientPhone, setClientPhone] = useState<number>(0);
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
      <DialogTitle style={{backgroundColor: '#000000', color: '#ffffff'}}>New Client</DialogTitle>
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
          
          <label>Número de teléfono:</label>
          <input style={{margin:"9px"}}
            type="number"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.valueAsNumber)}
          />

          {/* Submit Button */}
          <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            style={{ backgroundColor: '#000000', color: '#ffffff',  marginTop: '10px'}}
          >
            Add Client
          </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
