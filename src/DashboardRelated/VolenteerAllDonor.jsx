import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import {
  FaRegEye,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaTint,
  FaClock,
} from "react-icons/fa";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { format, parse } from "date-fns";

const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return "N/A";

  const combinedStr = `${dateStr} ${timeStr}`;
  const dateObj = parse(combinedStr, "yyyy-MM-dd HH:mm", new Date());
  return format(dateObj, "dd MMM, yyyy | hh:mm a");
};

const VolenteerAllDonor = () => {
  const { user } = UseAuth();
  const [donnerDetails, setDonnerDetails] = useState(null);
  const viewModalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();

  const {
    data: donners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donners", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/all`);
      return result.data;
    },
  });

  const handleViews = (data) => {
    setDonnerDetails(data);
    viewModalRef.current.showModal();
  };

  const updateStatus = async (id, status) => {
    const res = await axiosSecure.patch(`/donners/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Status updated to ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "badge badge-success text-white";
      case "pending":
        return "badge badge-error text-white";
      case "in-progress":
        return "badge badge-warning text-white";
      case "canceled":
        return "badge badge-error text-white";
      default:
        return "badge badge-ghost";
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-secondary pl-3">
          Blood Donation Requests
        </h2>

        <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="table w-full">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="py-4">#</th>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donners.map((donner, index) => (
                <tr
                  key={donner._id}
                  className="hover:bg-blue-50/50 text-black transition-colors"
                >
                  <th>{index + 1}</th>
                  <td className="font-medium">{donner.recipientName}</td>
                  <td className="text-sm">
                    {donner.recipentDistrict}, {donner.recipientUpazila}
                  </td>
                  <td className="text-sm">
                    {formatDateTime(donner.donetionDate, donner.donetionTime)}
                  </td>
                  <td>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-bold">
                      {donner.Blood}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusClass(donner.status)}>
                      {donner.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViews(donner)}
                        className="btn btn-square btn-sm btn-info text-white"
                      >
                        <FaRegEye />
                      </button>
                      <button
                        onClick={() => updateStatus(donner._id, "completed")}
                        className="btn btn-square btn-sm btn-success text-white"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => updateStatus(donner._id, "canceled")}
                        className="btn btn-square btn-sm btn-error text-white"
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden grid grid-cols-1 gap-4">
          {donners.map((donner) => (
            <div
              key={donner._id}
              className="card bg-white shadow-sm border border-gray-100"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-black">
                      {donner.recipientName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <FaMapMarkerAlt className="text-secondary" />
                      {donner.recipentDistrict}, {donner.recipientUpazila}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xl font-black text-red-600 flex items-center gap-1">
                      <FaTint className="text-sm" /> {donner.Blood}
                    </span>
                    <span className={getStatusClass(donner.status)}>
                      {donner.status}
                    </span>
                  </div>
                </div>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <FaClock />
                  {formatDateTime(donner.donetionDate, donner.donetionTime)}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleViews(donner)}
                    className="btn btn-sm btn-info text-white gap-2"
                  >
                    <FaRegEye /> View
                  </button>
                  <button
                    onClick={() => updateStatus(donner._id, "completed")}
                    className="btn btn-sm btn-success text-white gap-2"
                  >
                    <FaCheckCircle /> Done
                  </button>
                  <button
                    onClick={() => updateStatus(donner._id, "canceled")}
                    className="btn btn-sm btn-error text-white gap-2"
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donation Details</h3>
          <div className="py-4">
            {donnerDetails && (
              <div className="rounded-box border border-base-content/5 bg-base-100 shadow-xl">
                <div className="bg-secondary text-white p-3">
                  <h2 className="text-lg font-bold">All Information</h2>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Requester Name:</span>
                    <span>{donnerDetails.requesterName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Requester Email:</span>
                    <span>{donnerDetails.requesterEmail}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Recipient Name:</span>
                    <span>{donnerDetails.recipientName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Location:</span>
                    <span>
                      {donnerDetails.recipentDistrict},{" "}
                      {donnerDetails.recipientUpazila}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Blood Group:</span>
                    <span className="text-red-600 font-bold">
                      {donnerDetails.Blood}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Hospital Name:</span>
                    <span>{donnerDetails.hospitalName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Address:</span>
                    <span>{donnerDetails.address}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Date & Time:</span>
                    <span>
                      {formatDateTime(
                        donnerDetails.donetionDate,
                        donnerDetails.donetionTime,
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col text-sm pt-2">
                    <span className="font-semibold">Request Message:</span>
                    <p className="mt-1 bg-gray-50 text-black p-2 rounded">
                      {donnerDetails.requestMessage || "No message provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default VolenteerAllDonor;
