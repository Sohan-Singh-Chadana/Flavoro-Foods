import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cartItems = useSelector((state) => state.cartItems.cart);

  if (cartItems.length > 0) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
