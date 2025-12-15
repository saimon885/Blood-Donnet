import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router"; 
import UseAuth from "../AuthProvider/UseAuth";
import { toast } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, LogOutUser } = UseAuth();
  const [isHovering, setIsHovering] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        toast.success("LogOut Successfull.");
      })
      .catch((error) => {
        console.error("LogOut Error:", error);
        toast.error("LogOut failed.");
      });
  };

  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 transition duration-300 ease-in-out font-medium text-lg rounded-full ${
      isActive
        ? "bg-red-600 text-white shadow-md"
        : "lg:text-gray-100 hover:bg-red-500/80 hover:text-white"
    }`;

  const Links = (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-1">
      <NavLink className={navLinkClasses} to={"/"}>
        Home
      </NavLink>
      <NavLink className={navLinkClasses} to={"/blood-donation-requests"}>
        Requests
      </NavLink>
      <NavLink className={navLinkClasses} to={"/search-blood-requests"}>
        Search Blood
      </NavLink>
      <NavLink className={navLinkClasses} to={"/dashboard"}>
        Dashboard
      </NavLink>
      <NavLink className={navLinkClasses} to={"/funding"}>
        Funding
      </NavLink>
    </div>
  );

  return (
    <div className="shadow-lg sticky top-0 z-50 bg-gradient-to-r from-red-700 to-red-900 border-b border-red-900">
      <div className="navbar container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="navbar-start">
          <Link to={"/"} className="flex items-center">
            <img className="w-[120px] sm:w-[150px]" src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-2 text-black">{Links}</ul>
        </div>


        <div className="navbar-end flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            {user && (
              <div
                className="relative cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="rounded-full border-3 border-white h-12 w-12 object-cover transition duration-300 hover:scale-105"
                  src={user.photoURL || "default-avatar.png"} // Fallback image for safety
                  alt="User Profile"
                />
                {isHovering && (
                  <div className="absolute top-14 right-0 mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg whitespace-nowrap">
                    {user.displayName || "User"}
                  </div>
                )}
              </div>
            )}
            {user ? (
              <button
                onClick={handleLogOut}
                className="btn btn-sm text-sm bg-white text-red-700 hover:bg-gray-100 border-0 flex items-center gap-2 font-semibold transition duration-300"
              >
                <BiLogOut size={20} />{" "}
                <span className="hidden sm:inline">Log Out</span>
              </button>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-sm text-sm bg-white text-red-700 hover:bg-gray-100 border-0 font-semibold transition duration-300"
              >
                Log In
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 text-white transition duration-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isDrawerOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-4 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-700">Menu</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-700 hover:text-red-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <ul className="space-y-3 border-b pb-4">{Links}</ul>


            <div className="mt-6 space-y-4">
              {user && (
                <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg">
                  <img
                    className="rounded-full h-10 w-10 object-cover border-2 border-red-700"
                    src={user.photoURL || "default-avatar.png"}
                    alt="User Profile"
                  />
                  <span className="font-semibold text-gray-800">
                    {user.displayName || "User Profile"}
                  </span>
                </div>
              )}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="w-full btn bg-red-700 text-white hover:bg-red-800 border-0 flex items-center justify-center font-semibold"
                >
                  <BiLogOut size={20} /> Log Out
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="w-full btn bg-red-700 text-white hover:bg-red-800 border-0 flex items-center justify-center font-semibold"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
