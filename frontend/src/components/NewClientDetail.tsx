"use client";
import Client from "@/interfaces/Client";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  name: string;
  address: string;
  phone: number;
  email: string;
}

export default function NewClientDetail() {
  const [client, setClient] = useState<Client>();
  const ref = useRef();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleSendRequest(data);
  };

  const handleSendRequest = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:4300/client", {
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
              <Typography>{"Email"}</Typography>
              <input type="email" {...register("email")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Address"}</Typography>
              <input type="text" {...register("address")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Phone"}</Typography>
              <input type="tel" {...register("phone")} />
            </Grid>
          </Grid>
          <input type="submit" />
        </form>
      </Box>
    </>
  );
}
