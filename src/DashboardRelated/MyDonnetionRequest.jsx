import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import {
  FaRegEye,
  FaMapMarkerAlt,
  FaTint,
  FaClock,
  FaUserAlt,
} from "react-icons/fa";
import { MdCancel, MdDoneOutline, MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { format, parse } from "date-fns";

const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return "N/A";

  const combinedStr = `${dateStr} ${timeStr}`;
  const dateObj = parse(combinedStr, "yyyy-MM-dd HH:mm", new Date());
  return format(dateObj, "dd MMM, yyyy | hh:mm a");
};

const MyDonnetionRequest = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const [donnerDetails, setDonnerDetails] = useState({});
  const [donnerupdate, setDonnerUpdate] = useState({});
  const viewModalRef = useRef(null);
  const UpdateModalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();

  const {
    data: donners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donners", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners?email=${user.email}`);
      return result.data;
    },
  });

  const [allUpazila, setAllUpazila] = useState([]);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setAllUpazila(data));
  }, []);

  const DistrictData = useLoaderData() || [];
  const DistrictDuplicate = DistrictData.map((c) => c.name) || [];
  const selectedDistrictName = useWatch({ control, name: "recipentDistrict" });

  const getUpazilasByDistrictName = (districtName) => {
    const districtObject = DistrictData.find((d) => d.name === districtName);
    if (districtObject && allUpazila.length > 0) {
      return allUpazila
        .filter((u) => u.district_id === String(districtObject.id))
        .map((u) => u.name);
    }
    return [];
  };

  const handleViews = (data) => {
    setDonnerDetails(data);
    viewModalRef.current.showModal();
  };

  const handleEditDonnetion = (data) => {
    setDonnerUpdate(data);
    // Reset form with existing data including the hidden ID
    reset({
      ...data,
      id: data._id, // mapping _id to id for the hidden field
    });
    UpdateModalRef.current.showModal();
  };

  const handleUpdateDonner = (data) => {
    const updatePayload = {
      Blood: data.Blood,
      donetionDate: data.donetionDate,
      donetionTime: data.donetionTime,
      requestMessage: data.requestMessage,
      recipentDistrict: data.recipentDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      address: data.address,
      recipientName: data.recipientName,
    };

    // Use data.id which was reset into the form
    axiosSecure
      .patch(`/donners/${data.id}`, updatePayload)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          UpdateModalRef.current.close();
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to update", err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donners/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Success", "success");
          }
        });
      }
    });
  };

  const updateStatus = (donor, status) => {
    axiosSecure.patch(`/donners/${donor._id}`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Status: ${status}`,
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "done":
      case "completed":
        return "badge badge-success text-white";
      case "in-progress":
        return "badge text-warning font-bold ";
      case "pending":
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-l-4 border-red-600 pl-4">
          My Donation Requests
        </h1>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="table w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="py-4">#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
                <th className="text-center">Manage</th>
              </tr>
            </thead>
            <tbody>
              {donners.map((donner, index) => (
                <tr key={donner._id} className="hover:bg-red-50/30 text-black bg-white">
                  <th>{index + 1}</th>
                  <td className="font-semibold">{donner.recipientName}</td>
                  <td className="text-sm">
                    {donner.recipentDistrict}, {donner.recipientUpazila}
                  </td>
                  <td className="text-sm font-medium text-blue-600">
                    {formatDateTime(donner.donetionDate, donner.donetionTime)}
                  </td>
                  <td className="font-bold text-red-600">{donner.Blood}</td>
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
                        onClick={() => handleEditDonnetion(donner)}
                        className="btn btn-square btn-sm btn-warning text-white"
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(donner._id)}
                        className="btn btn-square btn-sm btn-error text-white"
                      >
                        <ImBin2 />
                      </button>
                    </div>
                  </td>
                  <td className="text-center">
                    {donner.status === "in-progress" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => updateStatus(donner, "Done")}
                          className="btn btn-sm btn-success text-white"
                        >
                          <MdDoneOutline />
                        </button>
                        <button
                          onClick={() => updateStatus(donner, "Cancel")}
                          className="btn btn-sm btn-error text-white"
                        >
                          <MdCancel />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {donners.map((donner) => (
            <div
              key={donner._id}
              className="card bg-white shadow-sm border border-gray-100 p-5"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <FaUserAlt className="text-red-500 text-sm" />
                  {donner.recipientName}
                </h3>
                <span className="font-bold text-red-600">{donner.Blood}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <FaMapMarkerAlt /> {donner.recipentDistrict},{" "}
                {donner.recipientUpazila}
              </div>
              <div className="text-sm font-semibold text-blue-600 mt-1 flex items-center gap-2">
                <FaClock />{" "}
                {formatDateTime(donner.donetionDate, donner.donetionTime)}
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className={getStatusClass(donner.status)}>
                  {donner.status}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViews(donner)}
                    className="btn btn-xs btn-info text-white"
                  >
                    <FaRegEye />
                  </button>
                  <button
                    onClick={() => handleEditDonnetion(donner)}
                    className="btn btn-xs btn-warning text-white"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(donner._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    <ImBin2 />
                  </button>
                </div>
              </div>
              {donner.status === "in-progress" && (
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <button
                    onClick={() => updateStatus(donner, "Done")}
                    className="btn btn-xs btn-success text-white flex-1"
                  >
                    <MdDoneOutline /> Done
                  </button>
                  <button
                    onClick={() => updateStatus(donner, "Cancel")}
                    className="btn btn-xs btn-error text-white flex-1"
                  >
                    <MdCancel /> Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0">
          <div className="bg-red-700 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">Donation Details</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>
          <div className="p-6 space-y-3">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="font-bold">Requester:</span>{" "}
              <span>{donnerDetails?.requesterName}</span>
              <span className="font-bold">Email:</span>{" "}
              <span className="break-all">{donnerDetails?.requesterEmail}</span>
              <span className="font-bold">Recipient:</span>{" "}
              <span>{donnerDetails?.recipientName}</span>
              <span className="font-bold">Location:</span>{" "}
              <span>
                {donnerDetails?.recipentDistrict},{" "}
                {donnerDetails?.recipientUpazila}
              </span>
              <span className="font-bold">Hospital:</span>{" "}
              <span>{donnerDetails?.hospitalName}</span>
              <span className="font-bold">Blood Group:</span>{" "}
              <span className="text-red-600 font-bold">
                {donnerDetails?.Blood}
              </span>
              <span className="font-bold">Date & Time:</span>{" "}
              <span className="text-blue-600">
                {formatDateTime(
                  donnerDetails?.donetionDate,
                  donnerDetails?.donetionTime,
                )}
              </span>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-bold text-xs uppercase text-gray-400 mb-1">
                Request Message
              </p>
              <p className="text-gray-700 italic">
                "{donnerDetails?.requestMessage || "No message provided"}"
              </p>
            </div>
          </div>
          <div className="modal-action p-4">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Update Modal */}
      <dialog
        ref={UpdateModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg text-secondary mb-4">
            Update Donation Request
          </h3>
          <form
            onSubmit={handleSubmit(handleUpdateDonner)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text mb-1">Requester Name</label>
                <input
                  type="text"
                  {...register("requesterName")}
                  className="input input-bordered w-full bg-gray-100"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Requester Email</label>
                <input
                  type="email"
                  {...register("requesterEmail")}
                  className="input input-bordered w-full bg-gray-100"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Blood Group</label>
                <select
                  {...register("Blood")}
                  className="select select-bordered w-full"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Recipient Name</label>
                <input
                  type="text"
                  {...register("recipientName")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">District</label>
                <select
                  {...register("recipentDistrict")}
                  className="select select-bordered w-full"
                >
                  {DistrictDuplicate.map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Upazila</label>
                <select
                  {...register("recipientUpazila")}
                  className="select select-bordered w-full"
                >
                  {getUpazilasByDistrictName(
                    selectedDistrictName || donnerupdate?.recipentDistrict,
                  ).map((u, i) => (
                    <option key={i} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Date</label>
                <input
                  type="date"
                  {...register("donetionDate")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label-text mb-1">Time</label>
                <input
                  type="time"
                  {...register("donetionTime")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="form-control mt-2">
              <label className="label-text mb-1">Hospital Name</label>
              <input
                type="text"
                {...register("hospitalName")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label-text mb-1">Address</label>
              <input
                type="text"
                {...register("address")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label-text mb-1">Message</label>
              <textarea
                {...register("requestMessage")}
                className="textarea textarea-bordered w-full h-20"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-red-600 hover:bg-red-700 border-none"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => UpdateModalRef.current.close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyDonnetionRequest;
