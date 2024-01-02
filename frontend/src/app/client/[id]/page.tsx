import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Client } from 'src/client/schema/client.schema';


import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues{
  _id: string;
  name: string;
  addres: string;
  phone: number;
  e_mail: string;
}

export default function ClientDetail({ params }: { params: {id: string}}){
    const ref = useRef();
    const [Client, setClient] = useState<Client>();
    const { register, handleSubmit } = useForm<FormValues>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => handleSendRequest(data);
    
    const handleSendRequest = async (data: FormValues) => {
      try {
        const response = await fetch(
          `http://localHost:4300/client/${Client?._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );        
      }catch (error){
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
          if(!response.ok){
            throw new Error("Network response was not ok.");
          }
          const data: Product = await response.json();
          setClient(data);
        }catch (error){
        console.log("Error fetching Client:", error);
        }
      };

      if(params.id){
        fetchData();
      }
    }, [params.id]);

    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
    };
    return(
        <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>{`codigo`}</Typography>
              <input type="text" {...register("_id")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Nombre"}</Typography>
              <input type="text" {...register("name")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"Direccion"}</Typography>
              <input type="text" {...register("addres")} />
            </Grid>
            <Grid item xs={12}>
              <Typography>{"telefono"}</Typography>
              <input type="number" {...register("phone")} />
            </Grid>
            <Typography>{"Email"}</Typography>
            <Grid item xs={12}>
              <input type="text" {...register("e_mail")} />
            </Grid>
          <input type="submit" />
        </Grid>
        </form>
      </Box>
        </>
    );
}