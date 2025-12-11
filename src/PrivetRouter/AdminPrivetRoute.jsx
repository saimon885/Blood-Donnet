import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseRole from "../AuthProvider/UseRole";

const AdminPrivetRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, isLoading } = UseRole();
  if (loading || isLoading) {
    return <span>Loading....</span>;
  }
  if (role !== "admin") {
    return <span>Forbidden Access</span>;
  }
  return children;
};

export default AdminPrivetRoute;
