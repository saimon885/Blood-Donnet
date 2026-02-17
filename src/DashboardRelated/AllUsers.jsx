import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import {
  MdAdminPanelSettings,
  MdVolunteerActivism,
  MdSearch,
} from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { TbLock, TbLockOpen, TbUserCircle } from "react-icons/tb";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/alladminusers");
      return result.data;
    },
  });

  const handleUpdate = async (user, updateInfo, successMsg) => {
    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, {
        ...updateInfo,
        email: user.email,
      });
      if (res.data.matchedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: successMsg,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Action failed", error);
    }
  };

  const confirmStatusChange = (user, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `User will be ${newStatus}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "blocked" ? "#EF4444" : "#22C55E",
      confirmButtonText: `Yes, ${newStatus}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate(
          user,
          { status: newStatus },
          `User status set to ${newStatus}`,
        );
      }
    });
  };

  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters - Stacked on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              User Management
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Manage all users and their permissions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search users..."
                className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-secondary"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="select select-bordered bg-gray-50 border-gray-200 focus:border-secondary w-full sm:w-40"
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="volunteer">Volunteer</option>
              <option value="donor">Donor</option>
            </select>
          </div>
        </div>

        {/* Desktop & Tablet Table View (Visible on screens larger than 1024px) */}
        <div className="hidden xl:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-secondary text-white uppercase text-xs">
                <tr>
                  <th className="py-5 px-6">User Info</th>
                  <th>Current Role</th>
                  <th>Status</th>
                  <th className="text-center">Modify Role</th>
                  <th className="text-center">Action Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10 ring-2 ring-gray-100">
                            <img src={user.photoURL} alt={user.displayName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">
                            {user.displayName}
                          </div>
                          <div className="text-[11px] text-gray-400 break-all">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-bold uppercase py-3 px-3 border-none shadow-sm ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : user.role === "volunteer"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div
                        className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${
                          user.status === "active"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                        ></span>
                        {user.status}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() =>
                            handleUpdate(
                              user,
                              { role: "admin" },
                              "Promoted to Admin",
                            )
                          }
                          className="btn btn-sm btn-ghost text-green-600 hover:bg-green-50"
                          title="Admin"
                        >
                          <MdAdminPanelSettings size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdate(
                              user,
                              { role: "volunteer" },
                              "Promoted to Volunteer",
                            )
                          }
                          className="btn btn-sm btn-ghost text-orange-500 hover:bg-orange-50"
                          title="Volunteer"
                        >
                          <MdVolunteerActivism size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdate(
                              user,
                              { role: "donor" },
                              "Set as Donor",
                            )
                          }
                          className="btn btn-sm btn-ghost text-blue-500 hover:bg-blue-50"
                          title="Donor"
                        >
                          <HiMiniUserPlus size={18} />
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      {user.status === "active" ? (
                        <button
                          onClick={() => confirmStatusChange(user, "blocked")}
                          className="btn btn-xs md:btn-sm btn-error btn-outline rounded-lg gap-1"
                        >
                          <TbLock /> Block
                        </button>
                      ) : (
                        <button
                          onClick={() => confirmStatusChange(user, "active")}
                          className="btn btn-xs md:btn-sm btn-success btn-outline rounded-lg gap-1"
                        >
                          <TbLockOpen /> Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Card View (Visible on screens smaller than 1280px) */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="card bg-white shadow-sm border border-gray-100 border-l-4 border-l-secondary overflow-hidden"
            >
              <div className="card-body p-4 md:p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photoURL} alt="" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">
                        {user.displayName}
                      </h3>
                      <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 font-black text-[9px] px-2 py-1 rounded-full uppercase border ${
                      user.status === "active"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                    ></span>
                    {user.status}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-[9px] uppercase text-gray-400 font-bold mb-0.5">
                      Current Role
                    </p>
                    <p className="text-xs font-bold text-secondary capitalize">
                      {user.role}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    <button
                      onClick={() =>
                        handleUpdate(
                          user,
                          { role: "admin" },
                          "Promoted to Admin",
                        )
                      }
                      className="btn btn-xs btn-circle btn-ghost text-green-600"
                      title="Admin"
                    >
                      <MdAdminPanelSettings size={18} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdate(
                          user,
                          { role: "volunteer" },
                          "Promoted to Volunteer",
                        )
                      }
                      className="btn btn-xs btn-circle btn-ghost text-orange-500"
                      title="Volunteer"
                    >
                      <MdVolunteerActivism size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdate(user, { role: "donor" }, "Set as Donor")
                      }
                      className="btn btn-xs btn-circle btn-ghost text-blue-500"
                      title="Donor"
                    >
                      <HiMiniUserPlus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  {user.status === "active" ? (
                    <button
                      onClick={() => confirmStatusChange(user, "blocked")}
                      className="btn btn-sm btn-error w-full gap-2 rounded-lg text-white font-bold"
                    >
                      <TbLock /> Block User
                    </button>
                  ) : (
                    <button
                      onClick={() => confirmStatusChange(user, "active")}
                      className="btn btn-sm btn-success w-full gap-2 rounded-lg text-white font-bold"
                    >
                      <TbLockOpen /> Activate User
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="bg-white p-12 md:p-20 rounded-2xl text-center border-2 border-dashed border-gray-200 mt-6">
            <TbUserCircle className="mx-auto text-gray-200 text-6xl mb-4" />
            <p className="text-gray-400 font-medium italic">
              No users found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
