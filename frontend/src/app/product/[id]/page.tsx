"use client";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={"100vh"}
          width={"100vw"}
          sx={{
          background: "linear-gradient(to bottom, #d0f0f0, #e9e9ef)",
          }}>
          
          <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex", justifyContent:"center", flexDirection:"column" }}>
            <Box mb={4}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem", textAlign:"center", fontFamily:"Bitter", fontStyle:"italic"}}>
              Nueva Factura
              </Typography>

            </Box>
            <Box sx={{marginY: 2}}>  
              <button onClick={toggleEditMode} >Editar</button>          
              <Typography sx={{ fontSize: "1.5rem", fontFamily:"Bitter" }}>{`Nombre`}</Typography>
              <input
                  defaultValue={product.name}
                  type="text"
                  disabled={!isEditMode}
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                  {...register("name")}
              />             
              </Box>
             
              <Box sx={{marginY: 2}}>             
                <Typography sx={{ fontSize: "1.5rem", fontFamily:"Bitter" }}>{"Descripcion"}</Typography>
                <input
                  defaultValue={product.description}
                  type="text"
                  disabled={!isEditMode}
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                  {...register("description")}
                />            
              </Box>
              <Box sx={{marginY: 2}}>              
                <Typography sx={{ fontSize: "1.5rem", fontFamily:"Bitter" }}>{"Marca"}</Typography>
                <input
                  defaultValue={product.brand}
                  type="text"
                  disabled={!isEditMode}
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                  {...register("brand")}
                />             
              </Box>
              <Box sx={{marginY: 2}}>
                <Typography sx={{ fontSize: "1.5rem", fontFamily:"Bitter" }}>{"Stock"}</Typography>
                <input
                  defaultValue={product.stock}
                  type="number"
                  disabled={!isEditMode}
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                  {...register("stock")}
                />
               </Box>
               <Box sx={{marginY: 2}}>
                <Typography sx={{ fontSize: "1.5rem", fontFamily:"Bitter" }}>{"Price: "}</Typography>
                <input
                  defaultValue={product.price}
                  type="number"
                  disabled={!isEditMode}
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                  {...register("price")}
                />       
               </Box>       
              <Box sx={{display:"flex", marginY: 2, justifyContent:"center", fontFamily:"fantasy"}}>
            <input type="submit"  style={{
                fontSize: "1.5rem",
                padding: "0.5rem",
                borderRadius: "10px",
                border:"1px solid black",
                textAlign:"center",
                cursor: "pointer",
              }} /> 
              </Box>       
          </form>
        </Box>        
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}
