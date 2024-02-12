"use client";
import { Bill } from "@/interfaces/Bill";
import Client from "@/interfaces/Client";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  products: Product[];
  clients: Client[];
}

export default function NewBill() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedProducts, setSelectedProducts] = useState<(Product | {})[]>(
    []
  );
  const [description, setDescription] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productQuantities, setProductQuantities] = useState<number[]>([]);
  const ref = useRef();

  const handleSubmit = async () => {
    try {
      console.log("submitting");

      console.log(selectedClient);
      console.log(selectedProducts);
      const filteredSelectedProducts = selectedProducts.filter(
        (product) => Object.keys(product).length > 0
      );
      const newBill: Bill = {
        clientName: selectedClient!.name,
        productListNames: filteredSelectedProducts.map(
          (product) => product.name
        ),
        products: filteredSelectedProducts.map(
          (product: Product, index: number) => ({
            name: product.name,
            quantity: productQuantities[index],
          })
        ),
        description: description,
        discount: 0,
        total: filteredSelectedProducts.reduce(
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

  const handleProductChange = (index: number, selectedProductName: string) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] =
      products.find((product) => product.name === selectedProductName) || {};
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedQuantities = [...productQuantities];
    updatedQuantities[index] = quantity;
    setProductQuantities(updatedQuantities);
  };

  const addNewProductSelect = () => {
    const allProductsSelected = selectedProducts.every(
      (product) => Object.keys(product).length > 0
    );

    if (allProductsSelected) {
      setSelectedProducts([...selectedProducts, {}]);
      setProductQuantities([...productQuantities, 0]); // Initialize quantity to 0 for the new product
    } else {
      alert(
        "Please select a product for all existing fields before adding a new one."
      );
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
      <div
        style={{
          display: "flex",
          background: "linear-gradient(to bottom, #d0f0f0, #e9e9ef)",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" style={{ textAlign: "center" }}>
                {" "}
                Nuevo Remito
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Productos`}</Typography>
              {selectedProducts.map((selectedProduct, index) => (
                <Box display={"flex"} key={index}>
                  <Select
                    key={index}
                    value={selectedProduct.name || ""}
                    onChange={(e) =>
                      handleProductChange(index, e.target.value as string)
                    }
                    style={{ width: "100%", marginBottom: 10 }}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.name} value={product.name}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    type="number"
                    value={productQuantities[index] || 0}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  >
                    Cantidad
                  </TextField>
                </Box>
              ))}
              <Button variant="outlined" onClick={addNewProductSelect}>
                Agregar Producto
              </Button>
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
                style={{ width: "100%" }}
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
          <Link href="/bill/list">
            <input
              type="submit"
              onClick={() => handleSubmit()}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </Box>
      </div>
    </>
  );
}
