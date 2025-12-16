import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import {  FaTint, FaUser, FaUsers } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import UseRole from "../AuthProvider/UseRole";

const DashBoardLayout = () => {
  const { role } = UseRole();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const closeDrawer = () => {
    const checkbox = document.getElementById("my-drawer-4");
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  const renderMenuItem = (to, Icon, label, dataTip) => (
    <li className="py-1">
      <Link
        to={to}
        onClick={closeDrawer}
        className={`flex items-center gap-3 p-3 text-base font-semibold rounded-lg transition-all duration-200 w-full whitespace-nowrap overflow-hidden ${
          isActive(to)
            ? "bg-primary text-white shadow-lg"
            : "text-gray-700 hover:bg-red-50/70 hover:text-primary"
        } lg:is-drawer-close:tooltip lg:is-drawer-close:tooltip-right`}
        data-tip={dataTip}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );

  const dashboardTitle = (
    <div className="px-3 text-2xl font-extrabold uppercase flex items-center">
      <span className="text-primary mr-1 uppercase mr-2">{role}</span>
      <span className="text-gray-800 font-normal">Dashboard</span>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open bg-gray-50 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-white shadow-md p-0 h-16 sticky top-0 z-20">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>

            {dashboardTitle}
          </div>
          <div className="flex-none"></div>
        </nav>

        {/* Main Content Area */}
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex flex-col min-h-full bg-white text-gray-800 shadow-xl w-72">
          <Link
            to={"/"}
            className="p-4 flex items-center justify-start border-b h-16"
          >
            <div className="flex items-center">
              <img
                src="https://img.icons8.com/?size=48&id=26115&format=png"
                alt="BloodHive Logo"
                className="w-8 h-8"
              />
              <span className="ml-2 text-2xl font-bold text-secondary">
                BloodHive
              </span>
            </div>
          </Link>

          <ul className="menu p-4 w-full grow space-y-2">
            {renderMenuItem("/dashboard/Profile", FaUser, "Profile", "Profile")}

            {role === "donor" && (
              <>
                {renderMenuItem(
                  "/dashboard/My-donation-request",
                  FaTint,
                  "My Donation Request",
                  "My Donation"
                )}
                {renderMenuItem(
                  "/dashboard/create-donation-request",
                  MdCreateNewFolder,
                  "Create Donation Request",
                  "Create Donation"
                )}
              </>
            )}

            {role === "admin" && (
              <>
                {renderMenuItem(
                  "/dashboard/all-users",
                  FaUsers,
                  "All Users",
                  "All Users"
                )}
                {renderMenuItem(
                  "/dashboard/all-blood-donation-request",
                  FaTint,
                  "Blood Donation Requests",
                  "All Blood Donation"
                )}
              </>
            )}

            {role === "volunteer" && (
              <>
                {renderMenuItem(
                  "/dashboard/volunteerAllDonor",
                  FaTint,
                  "Blood Donation Requests",
                  "All Blood Donation"
                )}
              </>
            )}
          </ul>
          <div className="p-4 border-t text-sm text-center text-gray-500">
            © BloodHive
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
