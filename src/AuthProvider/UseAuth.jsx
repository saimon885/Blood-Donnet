import React, { use } from "react";
import { AuthContext } from "./AuthContext";

const UseAuth = () => {
  const Auth = use(AuthContext);
  return Auth;
};

export default UseAuth;
