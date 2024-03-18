"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Appbar from "./Appbar";
import App from "next/app";

interface AuthComponentProps {
  component: any;
}

export default function AuthComponent(props: AuthComponentProps) {
  const session = useSession();

  /*
  return session.status === "authenticated" ? (
    <>
      <Appbar />
      {props.component}
    </>
  ) : (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12}>
          <Typography>Por favor inicia sesión.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
      </Grid>
    </>
  );
  */

  return (
    <>
      <Appbar />
      {props.component}
    </>
  );
}
