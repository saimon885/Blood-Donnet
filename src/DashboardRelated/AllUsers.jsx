import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { MdAdminPanelSettings, MdVolunteerActivism } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { TbLock, TbLockOpen } from "react-icons/tb";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });
  const userUpdateRole = (user, role) => {
    console.log(user);
    const updateInfo = {
      role: role,
      email: user.email,
    };
    console.log(updateInfo);
    axiosSecure.patch(`/users/${user._id}`, updateInfo).then((res) => {
      refetch();
      console.log(res.data);
    });
  };
  const roleAdmin = (user) => {
    userUpdateRole(user, "admin");
  };
  const roleVolunteer = (user) => {
    userUpdateRole(user, "volunteer");
  };
  const roleDonor = (user) => {
    userUpdateRole(user, "donor");
  };
  const updateStatus = (user, status) => {
    console.log(user);
    const updateInfo = {
      status: status,
      email: user.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You status update this ${status}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, updateInfo).then((res) => {
          if (res.data.matchedCount) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Your Status has been Updated.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const statusActive = (user) => {
    updateStatus(user, "active");
  };
  const statusBlock = (user) => {
    updateStatus(user, "blocked");
  };
  return (
    <div>
      <h2>Users {allUsers.length}</h2>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Role Actions</th>
                <th>Status Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((users, index) => (
                <tr key={users._id}>
                  <th>{index + 1}</th>
                  <td>
                    {" "}
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={users.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{users.displayName}</td>
                  <td>{users.email}</td>
                  <td
                    className={`${
                      users.role === "admin"
                        ? "text-green-600"
                        : users.role === "volunteer"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-bold`}
                  >
                    {users.role}
                  </td>
                  <td
                    className={`${
                      users.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    } font-bold`}
                  >
                    {users.status}
                  </td>

                  <td className="flex items-center gap-2">

                    <button
                      onClick={() => roleAdmin(users)}
                      className="btn bg-green-400"
                    >
                      <MdAdminPanelSettings />
                    </button>
                    {users.role === "donor" ? (
                      <button
                        onClick={() => roleVolunteer(users)}
                        className="btn bg-yellow-400"
                      >
                        <MdVolunteerActivism />
                      </button>
                    ) : (
                      <button
                        onClick={() => roleDonor(users)}
                        className="btn bg-red-500"
                      >
                        <HiMiniUserPlus />
                      </button>
                    )}
                  </td>
                  <td>
                    {users.status === "active" ? (
                      <button
                        onClick={() => statusBlock(users)}
                        className="btn bg-red-500"
                      >
                        <TbLock />
                      </button>
                    ) : (
                      <button
                        onClick={() => statusActive(users)}
                        className="btn bg-green-400"
                      >
                        <TbLockOpen />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
