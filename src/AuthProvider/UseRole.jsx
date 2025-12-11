import React from "react";
import UseAuth from "./UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const UseRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { isLoading, data: role = "donor" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data.role;
    },
  });
  return { role, isLoading };
};

export default UseRole;
