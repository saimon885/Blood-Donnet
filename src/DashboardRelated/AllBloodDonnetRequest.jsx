import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../Loading/Loading";

const AllBloodDonnetRequest = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // React Query Hook
  const { data: donners = [], isLoading } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/all`);
      return result.data;
    },
  });

  const pendingRequests = donners.filter(
    (donner) => donner.status === "pending"
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="mx-5 my-8">
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((donner, index) => (
                  <tr key={donner._id}>
                    <th>{index + 1}</th>
                    <td>{donner.recipientName}</td>
                    <td>
                      {donner.recipentDistrict},{donner.recipientUpazila}
                    </td>
                    <td>{donner.donetionDate}</td>
                    <td>{donner.donetionTime}</td>
                    <td>{donner.Blood}</td>
                    <td className={`text-red-600 font-bold`}>
                      {donner.status}
                    </td>
                    <td className="flex items-center gap-2">
                      <Link
                        //   onClick={() => handleViews(donner)}
                        to={`/blood-donation-Details/${donner._id}`}
                        className="btn btn-sm btn-info text-white"
                        title="View Details"
                      >
                        <FaRegEye />
                      </Link>{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-4 text-gray-500 text-3xl"
                  >
                    No pending blood donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonnetRequest;
