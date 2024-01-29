"use client";
import { Bill } from "@/interfaces/Bill";
import Client from "@/interfaces/Client";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import { MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  products: Product[];
  clients: Client[];
}

export default function NewBill() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [description, setDescription] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef();

  const handleSubmit = async () => {
    try {
      console.log("submitting");

      console.log(selectedClient);
      console.log(selectedProducts);
      const newBill: Bill = {
        clientName: selectedClient!.name,
        productListNames: selectedProducts.map((product) => product.name),
        description: description,
        discount: 0,
        total: selectedProducts.reduce(
          (acc, product) => acc + product.price,
          0
        ),
        dateOfIssue: new Date(),
      };

      const response = await fetch("http://localhost:4300/bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBill),
      });
    } catch (error) {
      console.error("Error submitting bill:", error);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:4300/client");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4300/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchClients();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', background: "linear-gradient(to bottom, #d0f0f0, #e9e9ef)", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Box>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Typography variant="h4" style={{textAlign:"center"}}> Nuevo Remito</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Productos`}</Typography>
          <Select
            multiple
            value={selectedProducts.map((product) => product.name)}
            onChange={(e) => {
              const selectedProductNames = e.target.value;
              const selectedProductObjects = products.filter((product) =>
                selectedProductNames.includes(product.name)
              );
              setSelectedProducts(selectedProductObjects);
            }}
            style={{ width: '100%' }}
          >
            {products.map((product) => (
              <MenuItem key={product.name} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography>{"Clientes"}</Typography>
          <Select
            value={selectedClient?.name || ""}
            onChange={(e) => {
              const selectedClientName = e.target.value as string;
              const selectedClientObject = clients.find(
                (client) => client.name === selectedClientName
              );
              setSelectedClient(selectedClientObject);
            }}
            style={{ width: '100%' }}
          >
            {clients.map((client) => (
              <MenuItem key={client.name} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label={"Descripción"}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <input type="submit" onClick={() => handleSubmit()} style={{ cursor: 'pointer' }}/>
    </Box>
  </div>
    </>
  );
}
