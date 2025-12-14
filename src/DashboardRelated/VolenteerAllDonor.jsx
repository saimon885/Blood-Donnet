import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import { FaRegEye } from "react-icons/fa";
import { ImBin2, ImCancelCircle } from "react-icons/im";
import { GiConfirmed } from "react-icons/gi";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const VolenteerAllDonor = () => {
  const { user } = UseAuth();

  const [donnerDetails, setDonnerDetails] = useState([]);
  const viewModalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();
  const {
    data: donners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/all`);
      return result.data;
    },
  });
  const handleViews = (data) => {
    viewModalRef.current.showModal();
    setDonnerDetails(data);
  };

  const updateStatus = (donor, status) => {
    const updateInfo = {
      status: status,
    };
    axiosSecure.patch(`/donners/${donor._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `donnetion status has been updated and this ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleConfirm = (donor) => {
    updateStatus(donor, "completed");
  };
  const handleCancel = (donor) => {
    updateStatus(donor, "canceled");
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <div>
        <h2>Total donners {donners.length}</h2>
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
                  <th>status Actions</th>
                </tr>
              </thead>
              <tbody>
                {donners.map((donner, index) => (
                  <tr key={donner._id}>
                    <th>{index + 1}</th>
                    <td>{donner.recipientName}</td>
                    <td>
                      {donner.recipentDistrict},{donner.recipientUpazila}
                    </td>
                    <td>{donner.donetionDate}</td>
                    <td>{donner.donetionTime}</td>
                    <td>{donner.Blood}</td>
                    <td
                      className={`${
                        donner.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-bold`}
                    >
                      {donner.status}
                    </td>
                    <td>
                      <button
                        onClick={() => handleViews(donner)}
                        className="btn btn-sm btn-info text-white"
                        title="View Details"
                      >
                        <FaRegEye />
                      </button>
                    </td>
                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => handleConfirm(donner)}
                        className="btn btn-sm btn-warning text-white"
                        title="Edit Request"
                      >
                        <GiConfirmed />
                      </button>
                      <button
                        onClick={() => handleCancel(donner)}
                        className="btn btn-sm btn-error text-white"
                        title="Delete Request"
                      >
                        <ImCancelCircle />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* View Donnetion Modal (No change needed here) */}
      {/* ... (Your existing view modal dialog) ... */}
      <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donnetion Details</h3>
          <div className="py-4">
            <div>
              <div class=" rounded-box border border-base-content/5 bg-base-100 shadow-xl">
                <div class="bg-secondary text-white p-3">
                  <h2 class="text-lg font-bold">Donner All Information</h2>
                </div>
                <div class="p-4 space-y-2">
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Requester Name :</span>
                    <span class="text-right">
                      {donnerDetails.requesterName}
                    </span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Requester Email :</span>
                    <span class="text-right">
                      {donnerDetails.requesterEmail}
                    </span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Recipient Name :</span>
                    <span class="text-right">
                      {donnerDetails.recipientName}
                    </span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Location :</span>
                    <span class="text-right">
                      {donnerDetails.recipentDistrict},
                      {donnerDetails.recipientUpazila}
                    </span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Blood Group :</span>
                    <span class="text-right">{donnerDetails.Blood}</span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">HospitalName :</span>
                    <span class="text-right">{donnerDetails.hospitalName}</span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Address :</span>
                    <span class="text-right">{donnerDetails.address}</span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Donnetion Time And Date </span>
                    <span class="text-right">
                      {donnerDetails.donetionDate} /{" "}
                      {donnerDetails.donetionTime}
                    </span>
                  </div>
                  <div class="flex gap-5 items-center text-sm">
                    <span class="font-semibold">Request Message :</span>
                    <span class="text-right">
                      {donnerDetails.requestMessage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
