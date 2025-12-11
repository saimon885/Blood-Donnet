import React from "react";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Alldonor = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: donners = [] } = useQuery({
    queryKey: "donners",
    queryFn: async () => {
      const result = await axiosSecure.get("/donners");
      return result.data;
    },
  });
  return <div>donner {donners.length}</div>;
};

export default Alldonor;
