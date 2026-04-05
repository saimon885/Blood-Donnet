import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../AuthProvider/UseAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { SignInUser } = UseAuth();
  const [show, setShow] = useState(true);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const handleShowOf = () => {
    setShow(!show);
  };

  const handleSignIn = (data) => {
    SignInUser(data.email, data.password)
      .then(() => {
        toast.success("Sign in Successfull.");
        navigate(from);
      })
      .catch();
  };

  const handleDemoLogin = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    handleSignIn({ email, password });
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
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
              </div>

              <button className="btn text-white rounded-2xl btn-secondary mt-4">
                LogIn
              </button>
            </fieldset>
          </form>
              <div className="text-center font-bold text-accent ">
                ( Demo Login )
              </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin("donor@gmail.com", "Donner123")}
              className="btn btn-xs btn-outline btn-primary rounded-xl"
            >
              Donor
            </button>
            <button
              onClick={() => handleDemoLogin("volunteer@gmail.com", "Volunteer123")}
              className="btn btn-xs btn-outline btn-primary rounded-xl"
            >
              Volunteer
            </button>
            <button
              onClick={() => handleDemoLogin("admin@gmail.com", "Admin123")}
              className="btn btn-xs btn-outline btn-primary rounded-xl"
            >
              Admin
            </button>
          </div>

          <p className="text-center mt-4">
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
