"use client";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  name: string;
  productCode: string;
  description?: string;
  brand: string;
  stock: number;
  price: number;
}

export default function NewProductDetail() {
  const [product, setProduct] = useState<Product>();
  const ref = useRef();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleSendRequest(data);
  };

  const handleSendRequest = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/product`, {
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
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>{`Name`}</Typography>
              <input type="text" {...register("name")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Product Code"}</Typography>
              <input type="text" {...register("productCode")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Description"}</Typography>
              <input type="text" {...register("description")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Brand"}</Typography>
              <input type="text" {...register("brand")} />
            </Grid>
            <Typography>{"Stock"}</Typography>
            <Grid item xs={12}>
              <input type="number" {...register("stock")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Price"}</Typography>
              <input type="number" {...register("price")} />
            </Grid>
          </Grid>
          <input type="submit" />
        </form>
      </Box>
    </>
  );
}
