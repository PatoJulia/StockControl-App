import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Make a request to the backend to initiate Google authentication
      const response = await axios.get("http://localhost:4300");

      // Redirect the user to the Google authentication page
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  return <button   style={{backgroundColor: "rgb(210,210,210)",color:"black", padding: 10, borderRadius: "19px"}} onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
