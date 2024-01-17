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
import { Bill } from "@/interfaces/Bill";

const MOCK_BILL: Bill = {
  dateOfIssue: new Date(),
  _id: "id 1",
  description: "description",
  discount: 10,
  total: 100,
  currency: Currency.USD,
  client: {
    _id: "id 1",
    name: "Pato Julia",
  },
  productList: [
    {
      _id: "a",
      name: "product a",
      productCode: "4",
      brand: "brand",
      stock: 20,
      price: 200,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
    {
      _id: "",
      name: "product b",
      productCode: "1",
      brand: "brand 2",
      stock: 50,
      price: 500,
    },
  ],
};

const MOCK_BILL_LIST: Bill[] = [MOCK_BILL];

export default function ProductList() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    const fetchBills = async () => {
      try {
        const response = await fetch("http://localhost:4300/bill");
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <>
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"2rem"}>
        Remitos
      </Typography>
      <Grid container justifyContent={"space-evenly"} my={5}>
        <Link href={"/home"}>
          <Button style={{ color: "black", backgroundColor: "#AFC8AD", fontSize: "1.1rem"}}>
            Inicio
          </Button>
        </Link>

        <Button
          style={{ color: "black", backgroundColor: "#AFC8AD", fontSize: "1.1rem"}}
          onClick={handleOpenModal}
        >
          Nuevo
        </Button>
      </Grid>
      <Grid container width={"80%"} mx={"10%"} spacing={5}>
        <Grid item xs={12}>
          <Table>
            <TableHead style={{ backgroundColor: "#88AB8E" }}>
              <TableCell style = {{textAlign:"center",  fontSize: "1.2rem"}} >Fecha</TableCell>
              <TableCell style = {{textAlign:"center",  fontSize: "1.2rem"}} >Cliente</TableCell>
              <TableCell style = {{textAlign:"center",  fontSize: "1.2rem"}} >Productos</TableCell>
              <TableCell style = {{textAlign:"center",  fontSize: "1.2rem"}} >Moneda</TableCell>
              <TableCell style = {{textAlign:"center",  fontSize: "1.2rem"}} >Total</TableCell>
            </TableHead>
            <TableBody style={{ backgroundColor: "#EEE7DA" }}>
              {MOCK_BILL_LIST.map((bill, index) => (
                <TableRow
                  key={bill._id + "-" + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {bill.dateOfIssue.getTime()}
                  </TableCell>
                  <TableCell align="center">{bill.client.name}</TableCell>
                  <TableCell>
                    {bill.productList.map((product) => (
                      <Typography key={product._id} align="center">
                        {product.name}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">{bill.currency}</TableCell>
                  <TableCell align="center">{bill.total}</TableCell>
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
    </>
  );
}
