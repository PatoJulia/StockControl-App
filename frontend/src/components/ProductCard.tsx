import { Badge, Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

export interface Product {
  name: string;
}

interface Props {
  product?: Product;
}

export function ProductCard(props: Props) {
  return (
    <Box>
      <Grid style={{ width: "50%", border: "1px solid black" }} container>
        <Grid
          item
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Box width={"60%"} height={"20rem"} position={"relative"}>
            <Image
              src={
                "https://img.freepik.com/foto-gratis/hoja-naturaleza-fondos-patron-ilustracion-planta-telon-fondo-diseno-abstracto-naturaleza-verde-vibrante-papel-tapiz-ilustracion-generativa-ai_188544-12680.jpg?w=1060&t=st=1702792509~exp=1702793109~hmac=ef7811c6a83b96b7127594913216ed783503c59f5573793cd42ae0047a350a61"
              }
              alt={"Product image"}
              layout="fill"
            />
          </Box>
        </Grid>
        <Grid item xs={5} marginLeft={5}>
          <Typography>Nombre: {props.product?.name}</Typography>
          <Typography>Marca</Typography>
          <Typography>Precio</Typography>
          <Typography>Stock</Typography>
        </Grid>
        <Grid item xs={6} container display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography>5</Typography>
          </Grid>
          <Button>Agregar</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
