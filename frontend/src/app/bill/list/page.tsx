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
import { Bill, BillResponse } from "@/interfaces/Bill";
import { useRouter } from "next/router";

export default function ProductList() {
  const [bills, setBills] = useState<BillResponse[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("http://localhost:4300/bill");
        const data = await response.json();
        console.log(data);
        setBills(data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => console.log(bills), [bills]);
  return (
    <>
      <Typography
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={"2rem"}
        fontFamily={"Bitter"}
        fontStyle={"italic"}
      >
        Remitos
      </Typography>
      <Grid container justifyContent={"space-evenly"} my={5}>
        <Link href={"/home"}>
          <Button
            style={{
              color: "black",
              backgroundColor: "#ffffff",
              fontSize: "1.1rem",
              fontFamily: "Bitter",
            }}
          >
            Inicio
          </Button>
        </Link>

        <Link href={"/bill/new"}>
          <Button
            style={{
              color: "black",
              backgroundColor: "#ffffff",
              fontSize: "1.1rem",
              fontFamily: "Bitter",
            }}
          >
            Nuevo
          </Button>
        </Link>
      </Grid>
      <Grid container width={"80%"} mx={"10%"} spacing={5}>
        <Grid item xs={12}>
          <Table>
            <TableHead style={{ backgroundColor: "#000000" }}>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Fecha
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Cliente
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Productos
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Moneda
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Total
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                PDF
              </TableCell>
            </TableHead>
            <TableBody style={{ backgroundColor: "#EEE7DA" }}>
              {bills.map((bill, index) => (
                <TableRow
                  key={bill + "-" + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {bill.dateOfIssue}
                  </TableCell>
                  <TableCell align="center">{bill.client.name}</TableCell>
                  <TableCell>
                    {bill.products.map((product) => (
                      <Typography key={product.name} align="center">
                        {product.name}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">ARG</TableCell>
                  <TableCell align="center">{bill.total}</TableCell>
                  <TableCell align="center">
                    <Link href={`/pdf/${bill._id}`}>Ir al PDF</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}
