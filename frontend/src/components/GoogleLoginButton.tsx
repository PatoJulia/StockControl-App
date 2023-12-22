import React from "react";
import axios from "axios";

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

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
