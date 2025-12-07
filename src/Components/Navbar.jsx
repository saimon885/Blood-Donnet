import React from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  const Links = (
    <div className=" flex md:flex-row flex-col gap-2 md:gap-4">
      <NavLink className={"hover:bg-amber-500 p-1 pl-2 rounded"} to={"/"}>Home</NavLink>
      <a className="hover:bg-amber-500 p-1 pl-2 rounded">About</a>
    </div>
  );
  return (
    <div className="navbar bg-linear-to-r/srgb from-secondary to-primary shadow-sm">
      <div className="navbar-start">
        <div className="">
          <img className="w-[140px]" src={Logo} alt="" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#F9FAFB] text-[18px]">
          {Links}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:block">
          <Link to={"/login"} className="btn bg-white border-0">
            LogIn
          </Link>
        </div>
        <div>
          <div className="dropdown">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle "
              />
              <div className="drawer-content lg:hidden">
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
                    <Link to={"/login"} className="btn w-full btn-secondary">Log In</Link>
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
