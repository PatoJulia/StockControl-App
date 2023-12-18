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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

export default function ProductList() {
  const [tableView, setTableView] = useState<boolean>(false);

  const toggleTableView = () => {
    setTableView(!tableView);
  };

  return (
    <>
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"2rem"}>
        Productos
      </Typography>
      <Grid container justifyContent={"space-evenly"} my={5}>
        <Link href={"/home"}>
          <Button style={{ color: "black", backgroundColor: "#AFC8AD" }}>
            Arrow Left
          </Button>
        </Link>

        <Button style={{ color: "black", backgroundColor: "#AFC8AD" }}>
          Nuevo
        </Button>
        <Button
          style={{ color: "black", backgroundColor: "#AFC8AD" }}
          onClick={toggleTableView}
        >
          ToggleView
        </Button>
        <Button style={{ color: "black", backgroundColor: "#AFC8AD" }}>
          Filter
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
                <TableCell align="right">PDF LINK</TableCell>
              </TableHead>
              <TableBody style={{ backgroundColor: "#EEE7DA" }}>
                {PRODUCTS.map((product, index) => (
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
                    <TableCell align="right">PDF LINK</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        ) : (
          PRODUCTS.map((product, index) => (
            <Grid key={product.name + index} item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
