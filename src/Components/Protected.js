import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  // Check if user is signed in by checking if there is a token in local storage
  const isSignedIn = localStorage.getItem("token");
  // If user is not signed in, redirect to home page
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  return children;
}

export default Protected;
