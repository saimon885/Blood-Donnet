import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseRole from "../AuthProvider/UseRole";
import Loading from "../Loading/Loading";
import Forbidden from "../Loading/Forbidden";




const AdminPrivetRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, isLoading } = UseRole();
  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminPrivetRoute;
