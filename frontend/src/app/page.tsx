"use client";
import { Box, Button, Grid, Input, Typography } from "@mui/material";

export default function LoginPage() {
  const handleRedirectToHome = () => {
    window.location.href = "/home";
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid
        container
        direction={"column"}
        display={"flex"}
        justifyContent={"center"}
        width={"50%"}
        alignItems={"center"}
        gap={2}
        marginTop={"8%"}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"2rem"}
          marginBottom={"3.5rem"}
        >
          STOCK CONTROL APP
        </Typography>
        <Typography>Nombre de Usuario</Typography>
        <Input></Input>
        <Typography>Contraseña</Typography>
        <Input></Input>
        <Button sx={{ marginTop: 4 }} onClick={handleRedirectToHome}>
          Iniciar sesión
        </Button>
      </Grid>
    </Box>
  );
}
