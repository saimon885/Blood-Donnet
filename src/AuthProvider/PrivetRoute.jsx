import React from "react";
import UseAuth from "./UseAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <span>Loading..</span>;
  }
  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default PrivetRoute;
