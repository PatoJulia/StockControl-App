"use client";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  productCode: string;
  description?: string;
  brand: string;
  stock: number;
  price: number;
}

export default function ProductExample() {
  const ref = useRef();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => handleSendRequest(data);

  const product = { name: "patoto" };
  const handleSendRequest = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:4300/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>Name</Typography>
            <input type="text" {...register("name")} />
          </Grid>
          <Grid item xs={12}>
            <Typography>ProductCode</Typography>
            <input type="text" {...register("productCode")} />
          </Grid>
          <Grid item xs={12}>
            <Typography>Description</Typography>
            <input type="text" {...register("description")} />
          </Grid>
          <Grid item xs={12}>
            <Typography>Brand</Typography>
            <input type="text" {...register("brand")} />
          </Grid>
          <Typography>Stock</Typography>
          <Grid item xs={12}>
            <input type="number" {...register("stock")} />
          </Grid>
          <Grid item xs={12}>
            <Typography>Price</Typography>
            <input type="number" {...register("price")} />
          </Grid>
        </Grid>
        <Link href={"/product/list"}>
          <input type="submit" />
        </Link>
      </form>
    </>
  );
}
