"use client";
import ProductCard from "@/components/ProductCard";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useTransition } from "react";
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
import Client from "@/interfaces/Client";

export default function ProductList() {
  const [tableView, setTableView] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);
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
        const response = await fetch("http://localhost:4300/client");
        const data = await response.json();
        setClients(data);
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
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #7FC7D9, #ffffff)",
        padding: "20px",
        fontFamily: "fantasy"
      }}>
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"2rem"}>
        Clientes
      </Typography>
      <Grid container justifyContent={"space-evenly"} my={5}>
        <Link href={"/home"}>
          <Button style={{ color: "black", fontSize: "1.4rem", fontFamily: "fantasy" }}>
            Inicio
          </Button>
        </Link>

        <Button
          style={{ color: "black", fontSize: "1.4rem", fontFamily: "fantasy"  }}
          onClick={handleOpenModal}
        >
          Nuevo
        </Button>
        
        <Button style={{ color: "black", fontSize: "1.4rem", fontFamily: "fantasy"  }}>
          Filter
        </Button>
      </Grid>
      <Grid container width={"80%"} mx={"10%"} spacing={5}>
        <Grid item xs={12}>
        <Table>
                <TableHead style={{ backgroundColor: "#000000" }}>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} >Codigo de Cliente</TableCell>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} align="right">Nombre</TableCell>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} align="right">Direccion</TableCell>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} align="right">Telefono</TableCell>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} align="right">Email</TableCell>
                  <TableCell style = {{color: "white",  fontSize: "1.2rem"}} align="right">Ultima factura</TableCell>
                </TableHead>
            <TableBody style={{ backgroundColor: "#EEE7DA" }}>
              {clients?.map((client, index) => (
                <TableRow 
                  key={client.name + "-" + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell  component="th" scope="row">
                    {client.name}
                  </TableCell>
                  <TableCell  align="right">{client.email}</TableCell>
                  <TableCell align="right">{client.address}</TableCell>
                  <TableCell align="right">{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

      <ProductModal
        closeCallback={handleCloseModal}
        isModalOpen={isModalOpen}
      />
      </Box>
    </>
  );
}
