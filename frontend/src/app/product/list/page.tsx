"use client";
import ProductCard from "@/components/ProductCard";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useTransition } from "react";
import PRODUCTS from "./MOCK";
import { table } from "console";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { get } from "http";
import ProductModal from "@/components/ProductModal";

export default function ProductList() {
  const [tableView, setTableView] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleTableView = () => {
    setTableView(!tableView);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
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
  }, []);

  return (
    <>
       <Box
        sx={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff)",          padding: "20px", // Ajusta el espaciado interno según sea necesario
        }}
      >
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"2rem"}>
        Productos
      </Typography>
      <Grid container justifyContent={"space-evenly"} my={5}>
        <Link href={"/home"}>
          <Button style={{ color: "black", fontSize: "1.4rem" }}>
            Inicio
          </Button>
        </Link>

        <Button
          style={{ color: "black", fontSize: "1.4rem" }}
          onClick={handleOpenModal}
        >
          Nuevo producto
        </Button>
        <Button
         style={{ color: "black", fontSize: "1.4rem" }}
          onClick={toggleTableView}
        >
        Lista de Productos
        </Button>
        <Button style={{ color: "black", fontSize: "1.4rem" }}>
          Filtro
        </Button>
      </Grid>
      <Grid container width={"80%"} mx={"10%"} spacing={5}>
        {tableView ? (
          <Grid item xs={12}>
            <Table>
              <TableHead style={{ backgroundColor: "#88AB8E" }}>
                <TableCell>ProductCode</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Ultima factura</TableCell>
              </TableHead>
              <TableBody style={{ backgroundColor: "#EEE7DA" }}>
                {products?.map((product, index) => (
                  <TableRow
                    key={product.name + "-" + index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.productCode}
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.brand}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <Box display={"flex"} justifyContent={"center"}>
                      <Link href={"/bill"}>
                        <TableCell align="left">Bill link</TableCell>
                      </Link>
                    </Box>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        ) : (
          products.map((product, index) => (
            <Grid key={product.name + index} item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>

      <ProductModal
        closeCallback={handleCloseModal}
        isModalOpen={isModalOpen}
      />
      </Box>
    </>
  );
}
