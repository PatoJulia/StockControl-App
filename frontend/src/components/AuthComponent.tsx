"use client";
import { requireAuthentication } from "@/utils/auth";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AuthComponent({ Component }) {
  const session = useSession();

  return session.status === "authenticated" ? (
    Component
  ) : (
    <Typography>Not authenticated</Typography>
  );
}
