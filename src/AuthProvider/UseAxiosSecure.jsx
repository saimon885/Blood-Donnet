import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
const axiosSecure = axios.create({
  baseURL: "https://blooddonnet.vercel.app",
});
const UseAxiosSecure = () => {
  const { user } = UseAuth();
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
  }, [user]);
  return axiosSecure;
};

export default UseAxiosSecure;
