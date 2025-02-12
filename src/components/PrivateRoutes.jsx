import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privateroutes = () => {
  const token = sessionStorage.getItem("logintoken");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Privateroutes;
