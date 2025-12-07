import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import UseAuth from "../../AuthProvider/UseAuth";

const Login = () => {
  // const { user } = UseAuth();
  const [show, setShow] = useState(true);
  const { register, handleSubmit } = useForm();
  const handleShowOf = () => {
    setShow(!show);
  };
  const handleSignIn = (data) => {
    console.log(data);
  };
  return (
    <div className="hero my-15">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">LogIn</h1>
          <p className="text-accent">Use a local account to log in.</p>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <fieldset className="fieldset">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your email"
              />
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input
                  type={!show ? "text" : "password"}
                  {...register("password")}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your password"
                />
                <span onClick={handleShowOf} className="absolute top-3 right-5">
                  {" "}
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
              </div>

              <button className="btn text-white rounded-2xl btn-secondary mt-4">
                LogIn
              </button>
            </fieldset>
          </form>

          <p className="text-center">
            Dont have an account?
            <Link
              to={"/register"}
              className="text-red-700 font-medium text-[16px]"
            >
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
