"use client";
import Client from "@/interfaces/Client";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  _id: string;
  name: string;
  addres: string;
  phone: number;
  e_mail: string;
}

export default function ClientDetail({ params }: { params: { id: string } }) {
  const ref = useRef();
  const [client, setClient] = useState<Client>();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => handleSendRequest(data);

  const handleSendRequest = async (data: FormValues) => {
    try {
      const response = await fetch(
        `http://localHost:4300/client/${client?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Error fetching Client:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4300/client/${params.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data: Client = await response.json();
        setClient(data);
      } catch (error) {
        console.log("Error fetching Client:", error);
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
      <Box     
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        width={"100vw"}
        sx={{
        background: "linear-gradient(to bottom, #d0f0f0, #e9e9ef)",
        }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex", justifyContent:"center", flexDirection:"column" }} >
        <Box mb={4}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem", textAlign:"center"}}>
              Nuevo cliente
            </Typography>
          </Box>
            <Box sx={{marginY: 3}}>
              <Typography sx={{ fontSize: "1.5rem" }}>{`Código`}</Typography>
              <input
                type="text"
                {...register("_id")}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
            <Box sx={{marginY: 3}}>
              <Typography sx={{ fontSize: "1.5rem" }}>{"Nombre"}</Typography>
              <input
                type="text"
                {...register("name")}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
            <Box sx={{marginY: 3}}>
              <Typography sx={{ fontSize: "1.5rem" }}>{"Dirección"}</Typography>
              <input
                type="text"
                {...register("addres")}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
            <Box sx={{marginY: 3}}>
              <Typography sx={{ fontSize: "1.5rem" }}>{"Teléfono"}</Typography>
              <input
                type="number"
                {...register("phone")}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
            <Box sx={{marginY: 3}}>
              <Typography sx={{ fontSize: "1.5rem" }}>{"Email"}</Typography>
              <input
                type="text"
                {...register("e_mail")}
                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
            <Box sx={{display:"flex", marginY: 3, justifyContent:"center"}}>
            <input type="submit"  style={{
                fontSize: "1.5rem",
                padding: "0.5rem",
                borderRadius: "10px",
                border:"1px solid black",
                textAlign:"center"
              }} />
          </Box>
        </form>
      </Box>
    </>
  );
}
