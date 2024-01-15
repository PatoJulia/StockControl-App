"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useEffect } from "react";

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
        <Button onClick={handleRedirectToHome}>Enter</Button>
      </Grid>
    </Box>
  );
}
