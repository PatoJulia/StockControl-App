"use client";
import ProductCard from "@/components/ProductCard";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useTransition } from "react";
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
          //background: "linearF-gradient(to bottom, #7FC7D9, #B2FAFA)",
          //background: "lineaFr-gradient(to bottom, #F9E8D9, #FFE382)",
          padding: "20px", // Ajusta el espaciado interno según sea necesario
          fontFamily: "fantasy", // Cambia la fuente según tus preferencias
        }}
      >
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"2rem"}
          fontFamily={"Bitter"}
          fontStyle={"italic"}
        >
          Productos
        </Typography>
        <Grid container justifyContent={"space-evenly"} my={5}>
          <Link href={"/home"}>
            <Button
              style={{
                color: "black",
                fontSize: "1.4rem",
                fontFamily: "Bitter",
              }}
            >
              Inicio
            </Button>
          </Link>

          <Button
            style={{
              color: "black",
              fontSize: "1.4rem",
              fontFamily: "Bitter",
            }}
            onClick={handleOpenModal}
          >
            Nuevo producto
          </Button>
          <Button
            style={{
              color: "black",
              fontSize: "1.4rem",
              fontFamily: "Bitter",
            }}
            onClick={toggleTableView}
          >
            Lista de Productos
          </Button>
          <Button
            style={{
              color: "black",
              fontSize: "1.4rem",
              fontFamily: "Bitter",
            }}
          >
            Filtro
          </Button>
        </Grid>
        <Grid container width={"80%"} mx={"10%"} spacing={5}>
          {tableView ? (
            <Grid item xs={12}>
              <Table>
                <TableHead style={{ backgroundColor: "#000000" }}>
                  <TableCell style={{ color: "white", fontSize: "1.2rem" }}>
                    ProductCode
                  </TableCell>
                  <TableCell
                    style={{ color: "white", fontSize: "1.2rem" }}
                    align="right"
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    style={{ color: "white", fontSize: "1.2rem" }}
                    align="right"
                  >
                    Precio
                  </TableCell>
                  <TableCell
                    style={{ color: "white", fontSize: "1.2rem" }}
                    align="right"
                  >
                    Marca
                  </TableCell>
                  <TableCell
                    style={{ color: "white", fontSize: "1.2rem" }}
                    align="right"
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    style={{ color: "white", fontSize: "1.2rem" }}
                    align="right"
                  >
                    Ultima factura
                  </TableCell>
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
                      <TableCell align="left">
                        <Box display={"flex"} justifyContent={"center"}>
                          <Link href={"/bill"}>Bill link</Link>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          ) : (
            products.map((product, index) => (
              <Grid key={product.name + index} item xs={3} style={{wordWrap:"break-word"}}>
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
