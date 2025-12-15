import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router";
import UseAuth from "../AuthProvider/UseAuth";
import { toast } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
const Navbar = () => {
  const { user, LogOutUser } = UseAuth();
  // console.log(user);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const Links = (
    <div className=" flex lg:flex-row flex-col gap-2 md:gap-4">
      <NavLink className={"hover:bg-red-500 p-1 pl-2 rounded"} to={"/"}>
        Home
      </NavLink>
      <NavLink
        to={"/blood-donation-requests"}
        className="hover:bg-red-500 p-1 pl-2 rounded"
      >
        Blood-Donation-Requests
      </NavLink>
      <NavLink
        to={"/search-blood-requests"}
        className="hover:bg-red-500 p-1 pl-2 rounded"
      >
        Search Blood
      </NavLink>
      <NavLink
        className={"hover:bg-red-500 p-1 pl-2 rounded"}
        to={"/dashboard"}
      >
        DashBoard
      </NavLink>
      <NavLink to={"/funding"} className="hover:bg-red-500 p-1 pl-2 rounded">
        Funding
      </NavLink>
    </div>
  );
  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        toast.success("LogOut Successfull.");
      })
      .catch();
  };
  return (
    <div className="navbar flex items-center bg-linear-to-r/srgb from-secondary to-primary shadow-sm">
      <div className="navbar-start">
        <Link to={"/"} className="">
          <img className="w-[140px]" src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#F9FAFB] text-[18px]">
          {Links}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:block">
          <div className="flex items-center gap-1">
            {user && (
              <div className="relative inline-block w-[60px] h-[60px] p-2 mr-2">
                <img
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="rounded-full border-2 border-green-700 mx-auto h-full w-full object-cover"
                  src={`${user ? user.photoURL : ""}`}
                  alt="User Profile"
                />
                {user && isHovering && (
                  <div className="absolute -top-2 md:-top-1 right-14 md:right-16 p-5 text-white z-10 flex-nowrap">
                    {user.displayName}
                  </div>
                )}
              </div>
            )}
            {user ? (
              <div
                onClick={handleLogOut}
                className="btn flex items-center gap-2 bg-white border-0"
              >
                <BiLogOut size={20} /> <span>LogOut</span>
              </div>
            ) : (
              <Link to={"/login"} className="btn bg-white border-0">
                LogIn
              </Link>
            )}
          </div>
        </div>
        <div>
          <div className="dropdown">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle "
              />
              <div className="drawer-content flex items-center lg:hidden">
                <div>
                  {" "}
                  {user && (
                    <div className="relative inline-block w-[60px] h-[60px] p-2 mr-2">
                      <img
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="rounded-full border-2 border-green-700 mx-auto h-full w-full object-cover"
                        src={`${user ? user.photoURL : ""}`}
                        alt="User Profile"
                      />
                      {user && isHovering && (
                        <div className="absolute -top-2 md:-top-1 right-14 md:right-16 p-5 text-white z-10 flex-nowrap">
                          {user.displayName}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <label htmlFor="my-drawer-1" className="drawer-button">
                  <svg
                    className="swap-off fill-current bg-transparent text-white text-2xl"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-1"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-[#ffffff] mt-20 mr-2 min-h-[450px] w-70 rounded-2xl border border-4xl border-primary  p-4">
                  {/* Sidebar content here */}
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-4">
                      Menu
                    </h2>
                  </div>
                  <ul className="text-[18px]">{Links}</ul>
                  <div className="mt-8 w-full">
                    {user ? (
                      <div
                        onClick={handleLogOut}
                        className="btn w-full btn-secondary"
                      >
                        LogOut
                      </div>
                    ) : (
                      <Link to={"/login"} className="btn w-full btn-secondary">
                        LogIn
                      </Link>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
