import Product from "@/interfaces/Product";
import { Box, Button, Grid, Typography } from "@mui/material";
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
            <Box width={"60%"} height={"20rem"} position={"relative"}>
              <Image src={imageUrl ?? ""} alt={"Product image"} fill />
            </Box>
          </Grid>
        )}
        <Grid item xs={5} marginLeft={5}>
          <Typography>Nombre: {name}</Typography>
          <Typography>Marca: {brand}</Typography>
          <Typography>Precio: {price}</Typography>
        </Grid>
        <Grid item xs={6} container display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography>Stock: {stock}</Typography>
          </Grid>
          <Button>Agregar</Button>
        </Grid>
      </Grid>
    </>
  );
}
