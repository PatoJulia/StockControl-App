"use client";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  productCode: string;
  description?: string;
  brand: string;
  stock: number;
  price: number;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>();
  const ref = useRef();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => handleSendRequest(data);

  const handleSendRequest = async (data: FormValues) => {
    try {
      const response = await fetch(
        `http://localhost:4300/product/${product?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4300/product/${params.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      {product && product.name ? (
        <Box>
          <button onClick={toggleEditMode}>Toggle edit</button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <Typography>{`Name`}</Typography>
                <input
                  defaultValue={product.name}
                  type="text"
                  disabled={!isEditMode}
                  {...register("name")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{"Product Code"}</Typography>
                <input
                  defaultValue={product.productCode}
                  type="text"
                  disabled={!isEditMode}
                  {...register("productCode")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{"description: "}</Typography>
                <input
                  defaultValue={product.description}
                  type="text"
                  disabled={!isEditMode}
                  {...register("description")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{"brand: "}</Typography>
                <input
                  defaultValue={product.brand}
                  type="text"
                  disabled={!isEditMode}
                  {...register("brand")}
                />
              </Grid>
              <Typography>{"stock: "}</Typography>
              <Grid item xs={12}>
                <input
                  defaultValue={product.stock}
                  type="number"
                  disabled={!isEditMode}
                  {...register("stock")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{"price: "}</Typography>
                <input
                  defaultValue={product.price}
                  type="number"
                  disabled={!isEditMode}
                  {...register("price")}
                />
              </Grid>
            </Grid>
            {isEditMode && <input type="submit" />}
          </form>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}
