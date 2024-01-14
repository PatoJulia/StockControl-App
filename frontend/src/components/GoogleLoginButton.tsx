"use client";
import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

const GoogleLoginButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      style={{
        backgroundColor: "rgb(210,210,210)",
        color: "black",
        padding: 10,
        borderRadius: "19px",
      }}
      onClick={() => signIn()}
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
