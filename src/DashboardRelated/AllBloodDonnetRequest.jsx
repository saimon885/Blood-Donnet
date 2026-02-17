import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import {
  FaRegEye,
  FaMapMarkerAlt,
  FaClock,
  FaTint,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import { format, parse } from "date-fns";

const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return "N/A";
  const combinedStr = `${dateStr} ${timeStr}`;
  const dateObj = parse(combinedStr, "yyyy-MM-dd HH:mm", new Date());
  return format(dateObj, "dd MMM, yyyy | hh:mm a");
};

const AllBloodDonnetRequest = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: donners = [], isLoading } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/all`);
      return result.data;
    },
  });

  // Filter pending requests and search functionality
  const filteredRequests = donners.filter((donner) => {
    const isPending = donner.status === "pending";
    const matchesSearch =
      donner.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donner.recipentDistrict.toLowerCase().includes(searchTerm.toLowerCase());
    return isPending && matchesSearch;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4  p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold  border-l-4 border-secondary pl-3">
              Pending Donation Requests
            </h2>
            <p className="text-sm text-gray-500 mt-1 ml-4">
              Help save lives by fulfilling these requests
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 " />
            <input
              type="text"
              placeholder="Search by name or district..."
              className="input input-bordered w-full pl-10 focus:border-secondary"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Table View (Hidden on Tablet & Mobile) */}
        <div className="hidden xl:block overflow-hidden rounded-2xl shadow-sm border border-gray-100">
          <table className="table w-full">
            <thead className="bg-secondary text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="py-5">#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((donner, index) => (
                  <tr
                    key={donner._id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <th className=" font-medium">{index + 1}</th>
                    <td className="font-bold ">
                      {donner.recipientName}
                    </td>
                    <td>
                      <div className="flex items-center gap-1 ">
                        <FaMapMarkerAlt className="text-secondary text-xs" />
                        <span className="text-sm">
                          {donner.recipentDistrict}, {donner.recipientUpazila}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm ">
                      {formatDateTime(donner.donetionDate, donner.donetionTime)}
                    </td>
                    <td>
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-bold text-xs">
                        {donner.Blood}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-error badge-outline font-bold text-[10px] uppercase px-3">
                        {donner.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/blood-donation-Details/${donner._id}`}
                        className="btn btn-square btn-sm btn-info text-white shadow-md hover:scale-110 transition-transform"
                        title="View Details"
                      >
                        <FaRegEye />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <EmptyState />
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View (Visible below 1280px) */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((donner) => (
              <div
                key={donner._id}
                className="card bg-white shadow-sm border border-gray-100 border-l-4 border-l-secondary overflow-hidden"
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {donner.recipientName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                        <FaMapMarkerAlt className="text-secondary" />
                        {donner.recipentDistrict}, {donner.recipientUpazila}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xl font-black text-red-600 flex items-center gap-1">
                        <FaTint className="text-sm shadow-sm" /> {donner.Blood}
                      </span>
                    </div>
                  </div>

                  <div className="divider my-2 opacity-50"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <FaClock className="text-secondary" />
                      {formatDateTime(donner.donetionDate, donner.donetionTime)}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-red-500 bg-red-50 px-2 py-1 rounded">
                      {donner.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/blood-donation-Details/${donner._id}`}
                      className="btn btn-sm btn-info w-full text-white gap-2 rounded-xl"
                    >
                      <FaRegEye /> View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Empty State
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="bg-gray-100 p-6 rounded-full mb-4">
      <FaTint className="text-gray-300 text-5xl" />
    </div>
    <h3 className="text-xl font-bold text-gray-400 italic text-center">
      No pending blood donation requests found.
    </h3>
    <p className="text-gray-400 text-sm mt-2 text-center max-w-xs">
      Check back later or try searching with different keywords.
    </p>
  </div>
);

export default AllBloodDonnetRequest;
