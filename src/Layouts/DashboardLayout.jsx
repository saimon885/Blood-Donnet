import React from "react";
import Logo from "../assets/DashboardMainLogo.png";
import { Link, Outlet } from "react-router";
import { FaFileMedical, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { LuTally5 } from "react-icons/lu";
import UseRole from "../AuthProvider/UseRole";
const DashBoardLayout = () => {
  const { role } = UseRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-[20px] text-primary font-bold uppercase">
            {role} <span className="ml-1 text-secondary">DashBoard</span>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <Link to={"/"}>
              <li className="py-2 text-[20px]">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="BloodHive"
                >
                  {/* Home icon */}
                  <img
                    src="https://img.icons8.com/?size=48&id=26115&format=png"
                    alt=""
                  />
                  <span className="is-drawer-close:hidden text-2xl font-bold text-secondary">
                    BloodHive
                  </span>
                </button>
              </li>
            </Link>

            {/* List item */}
            <li className="py-2 text-[20px]">
              <Link
                to={"/dashboard/Profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <FaUser />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>
            {role === "donor" && (
              <>
                <li className="py-2 text-[20px]">
                  <Link
                    to={"/dashboard/My-donation-request"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Donetion"
                  >
                    <FaFileMedical />
                    <span className="is-drawer-close:hidden">My Donetion</span>
                  </Link>
                </li>
                <li className="py-2 text-[20px]">
                  <Link
                    to={"/dashboard/create-donation-request"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Donetion"
                  >
                    <MdCreateNewFolder />
                    <span className="is-drawer-close:hidden">
                      Create Donetion
                    </span>
                  </Link>
                </li>
              </>
            )}
            {role && role === "admin" && (
              <li className="py-2 text-[20px]">
                <Link
                  to={"/dashboard/all-users"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Users"
                >
                  <FaUsers />
                  <span className="is-drawer-close:hidden">All Users</span>
                </Link>
              </li>
            )}
            {role === "admin" ? (
              <li className="py-2 text-[20px]">
                <Link
                  to={"/dashboard/all-blood-donation-request"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Blood Donation"
                >
                  <LuTally5 />
                  <span className="is-drawer-close:hidden">
                    All Blood Donation
                  </span>
                </Link>
              </li>
            ) : role === "volunteer" ? (
              <li className="py-2 text-[20px]">
                <Link
                  to={"/dashboard/volunteerAllDonor"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Blood Donation"
                >
                  <LuTally5 />
                  <span className="is-drawer-close:hidden">
                    All Blood Donation
                  </span>
                </Link>
              </li>
            ) : (
              ""
            )}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
