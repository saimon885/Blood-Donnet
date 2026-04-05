import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { FaTint, FaUser, FaUsers } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import UseRole from "../AuthProvider/UseRole";

const DashBoardLayout = () => {
  const { role } = UseRole();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const renderMenuItem = (to, Icon, label) => (
    <li className="py-1">
      <Link
        to={to}
        className={`flex items-center gap-3 p-3 text-base font-semibold rounded-lg transition-all duration-200 w-full whitespace-nowrap overflow-hidden ${
          isActive(to)
            ? "bg-primary text-white shadow-lg"
            : "text-gray-700 hover:bg-red-50/70 hover:text-primary"
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="drawer lg:drawer-open h-screen overflow-hidden">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden bg-gray-50">
        
        {/* Fixed Navbar for both Mobile and Desktop */}
        <header className="h-16 bg-white shadow-md sticky top-0 z-40 flex items-center px-4 shrink-0">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost lg:hidden mr-4"
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

          <span className="text-xl lg:text-2xl font-bold text-primary uppercase">
            <span className="text-secondary">{role}</span> Dashboard
          </span>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar - Fixed on Desktop, Drawer on Mobile */}
      <div className="drawer-side z-[100] h-full overflow-hidden">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        
        <aside className="flex flex-col w-72 bg-white shadow-xl h-full border-r">
          {/* Sidebar Logo */}
          <Link
            to="/"
            className="p-4 flex items-center justify-start border-b h-16 bg-white shrink-0"
          >
            <img
              src="https://img.icons8.com/?size=48&id=26115&format=png"
              alt="BloodHive Logo"
              className="w-8 h-8"
            />
            <span className="ml-2 text-2xl font-bold text-secondary">
              BloodHive
            </span>
          </Link>

          {/* Menu Items - Internal Scrollable */}
          <ul className="p-4 w-full flex-1 space-y-2 overflow-y-auto">
            {renderMenuItem("/dashboard", BiHomeAlt, "Home")}
            {renderMenuItem("/dashboard/Profile", FaUser, "Profile")}

            {role === "donor" && (
              <>
                {renderMenuItem(
                  "/dashboard/My-donation-request",
                  FaTint,
                  "My Donation Request"
                )}
                {renderMenuItem(
                  "/dashboard/create-donation-request",
                  MdCreateNewFolder,
                  "Create Donation Request"
                )}
              </>
            )}

            {role === "admin" && (
              <>
                {renderMenuItem("/dashboard/all-users", FaUsers, "All Users")}
                {renderMenuItem(
                  "/dashboard/all-blood-donation-request",
                  FaTint,
                  "Blood Donation Requests"
                )}
              </>
            )}

            {role === "volunteer" && (
              <>
                {renderMenuItem(
                  "/dashboard/volunteerAllDonor",
                  FaTint,
                  "Blood Donation Requests"
                )}
              </>
            )}
          </ul>

          {/* Footer */}
          <div className="p-4 border-t text-sm text-center text-gray-500 bg-white shrink-0">
            © BloodHive
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;