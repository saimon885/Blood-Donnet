import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseRole from "../AuthProvider/UseRole";

const VolunteerPrivetRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, isLoading } = UseRole();
  if (loading || isLoading) {
    return <span>Loading....</span>;
  }
  if (role !== "volunteer") {
    return <span>Forbidden Access</span>;
  }
  return children;
};

export default VolunteerPrivetRoute;
