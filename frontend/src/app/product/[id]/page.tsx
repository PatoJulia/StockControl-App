"use client";
import Product from "@/interfaces/Product";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4300/product/${params.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
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
  return (
    <>
      {(product && product.name) ? (
        <>
          <Typography>{`name:  ${product.name}`}</Typography>
          <Typography>{"price: " + product.price}</Typography>
          <Typography>{"stock: " + product.stock}</Typography>
          <Typography>{"description: " + product.description}</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}