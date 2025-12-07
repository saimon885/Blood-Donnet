import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const { user } = UseAuth();
  //   console.log(user);
  const axiosSecure = UseAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["/users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  console.log(users);
  return (
    <div>
      {users &&
        users.map((user) => (
          <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              {/* Profile Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {/* Placeholder for the image. In a real app, you would use an <img> tag */}
                <img src={user?.photoURL} alt="" />
              </div>

              {/* Name and Email */}
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user?.displayName}
                  </h2>
                </div>
                <p className="text-sm text-gray-500">Email: {user?.email}</p>
              </div>
            </div>

            <hr className="mb-6" />

            {/* Location Details Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* District */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  District
                </p>
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    {user?.district}
                  </span>
                </div>
              </div>

              {/* Upazila */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Upazila
                </p>
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    {user?.upazila}
                  </span>
                </div>
              </div>
            </div>

            {/* Blood Group and Save Button Section */}
            <div className="flex flex-col items-center space-y-4">
              {/* Blood Group */}
              <div className="flex items-center space-x-2 p-2 rounded-lg">
                <p className="text-lg font-bold text-gray-800 flex items-center">
                  <span>
                    <img
                      className="w-[25px]"
                      src="https://img.icons8.com/?size=48&id=26115&format=png"
                      alt=""
                    />
                  </span>
                  <span>
                    {" "}
                    Blood Group:{" "}
                    <span className="text-red-600">{user?.bloodGroup}</span>
                  </span>
                </p>
                <span className="text-red-500 cursor-pointer hover:text-red-700"></span>
              </div>

              {/* Save Changes Button */}
              <button className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2 transition duration-300">
                Edit <MdEdit />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
