import Product from "@/interfaces/Product";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  const { name, price, brand, imageUrl, stock } = props.product;

  return (
    <>
      <Grid style={{ border: "1px solid black" }} container>
        {imageUrl && (
          <Grid
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <Box
              width={"70%"}
              height={"10rem"}
              position={"relative"}
              my={"1rem"}
            >
              <Link href={`/product/${name}`}>
                <Image src={imageUrl ?? ""} alt={"Product image"} fill />
              </Link>
            </Box>
          </Grid>
        )}
        <Grid item xs={5} marginLeft={5}>
          <Typography fontSize={".8rem"}>Nombre: {name}</Typography>
          <Typography fontSize={".8rem"}>Marca: {brand}</Typography>
          <Typography fontSize={".8rem"}>Precio: {price}</Typography>
        </Grid>
        <Grid item xs={5} container display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography fontSize={".8rem"}>Stock: {stock}</Typography>
          </Grid>

          <input style={{ width: "3rem" }} type="number" min={0}></input>
          <Button
            style={{
              width: "3rem",
              color: "black",
              backgroundColor: "#EEE7DA",
              fontSize: ".7rem",
              margin: "1rem 0",
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
