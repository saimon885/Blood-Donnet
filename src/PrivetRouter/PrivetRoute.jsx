import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default PrivetRoute;
