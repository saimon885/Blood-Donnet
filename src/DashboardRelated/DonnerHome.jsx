import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import {
  FaClock,
  FaMapMarkerAlt,
  FaRegEye,
  FaTint,
  FaUserAlt,
} from "react-icons/fa";
import { MdCancel, MdDoneOutline, MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseRole from "../AuthProvider/UseRole";
import Loading from "../Loading/Loading";
import { format, parse } from "date-fns";
import AdminDashboardHome from "./AdminDashboardHome";

const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return "N/A";
  const combinedStr = `${dateStr} ${timeStr}`;
  const dateObj = parse(combinedStr, "yyyy-MM-dd HH:mm", new Date());
  return format(dateObj, "dd MMM, yyyy | hh:mm a");
};

const DonnerHome = () => {
  const { user } = UseAuth();
  const { role, isRoleLoading } = UseRole();
  const { register, handleSubmit, control, reset } = useForm();
  const [donnerDetails, setDonnerDetails] = useState(null);
  const [donnerupdate, setDonnerUpdate] = useState(null);
  const viewModalRef = useRef(null);
  const UpdateModalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();

  const {
    data: donnerd = [],
    refetch,
    isLoading: isDonnerLoading,
  } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners?email=${user.email}`);
      return result.data;
    },
    enabled: !!user?.email && role === "donor",
  });

  const donners = donnerd.slice(0, 3);

  const [allUpazila, setAllUpazila] = useState([]);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        setAllUpazila(data);
      });
  }, []);

  const DistrictData = useLoaderData();
  const DistrictDuplicate = DistrictData?.map((c) => c.name) || [];

  const selectedDistrictName = useWatch({ control, name: "recipentDistrict" });

  const getDistrictIdByName = (districtName) => {
    const districtObject = DistrictData?.find((d) => d.name === districtName);
    return districtObject ? String(districtObject.id) : null;
  };

  const getUpazilasByDistrictName = (districtName) => {
    const targetDistrictId = getDistrictIdByName(districtName);

    if (targetDistrictId && allUpazila.length > 0) {
      const upazilas = allUpazila.filter(
        (u) => u.district_id === targetDistrictId,
      );
      return upazilas.map((u) => u.name);
    }
    return [];
  };

  const handleViews = (data) => {
    setDonnerDetails(data);
    viewModalRef.current.showModal();
  };

  const handleEditDonnetion = (data) => {
    setDonnerUpdate(data);
    reset({ ...data, id: data._id });
    UpdateModalRef.current.showModal();
  };

  const handleUpdateDonner = (data) => {
    const allInfo = {
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

    axiosSecure.patch(`/donners/${data.id}`, allInfo).then((res) => {
      if (res.data.modifiedCount) {
        UpdateModalRef.current.close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your donation request has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donners/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your donation request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
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
          title: `Donation status updated to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleConfirm = (donor) => {
    updateStatus(donor, "Done");
  };

  const handleCancel = (donor) => {
    updateStatus(donor, "Cancel");
  };

  if (
    isDonnerLoading ||
    isRoleLoading 
    // isDonorsCountLoading
    // isFundsLoading
  )
    return <Loading />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-red-700 my-6 border-b-2 border-red-500 pb-2">
        Welcome, {user?.displayName}{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </h1>

      {role === "donor" ? (
        <div>
          <div>
            <h2 className="text-2xl font-semibold my-6 text-gray-800">
              Recent Donation Requests
            </h2>

            {donners.length > 0 ? (
              <>
                {/* --- Desktop View (Large Screens) --- */}
                <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                  <table className="table w-full border-collapse">
                    <thead className="bg-[#b20000] text-white">
                      <tr>
                        <th className="py-4 px-4 text-center">#</th>
                        <th className="py-4 px-4">Recipient</th>
                        <th className="py-4 px-4">Location</th>
                        <th className="py-4 px-4">Date & Time</th>
                        <th className="py-4 px-4 text-center">Blood</th>
                        <th className="py-4 px-4 text-center">Status</th>
                        <th className="py-4 px-4 text-center">Actions</th>
                        <th className="py-4 px-4 text-center">Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donners.map((donner, index) => (
                        <tr
                          key={donner._id}
                          className="border-b hover:bg-gray-50 transition duration-150"
                        >
                          <th className="px-4 py-4 text-center font-bold text-black">
                            {index + 1}
                          </th>
                          <td className="px-4 py-4 font-bold text-black">
                            {donner.recipientName}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {donner.recipentDistrict}, {donner.recipientUpazila}
                          </td>
                          <td className="px-4 py-4 font-semibold text-blue-500">
                            {formatDateTime(
                              donner.donetionDate,
                              donner.donetionTime,
                            )}
                          </td>
                          <td className="px-4 py-4 font-bold text-red-600 text-center">
                            {donner.Blood}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span
                              className={`px-4 py-1.5 rounded-full font-bold text-sm inline-block min-w-[100px] ${
                                donner.status === "Done" ||
                                donner.status === "completed"
                                  ? "bg-[#00d084] text-white"
                                  : donner.status === "in-progress"
                                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                                    : "bg-[#ff7675] text-white"
                              }`}
                            >
                              {donner.status === "in-progress"
                                ? "in-progress"
                                : donner.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleViews(donner)}
                                className="p-2 bg-[#00c3ff] text-white rounded shadow hover:bg-cyan-500 transition-colors"
                              >
                                <FaRegEye />
                              </button>
                              <button
                                onClick={() => handleEditDonnetion(donner)}
                                className="p-2 bg-[#ffb900] text-white rounded shadow hover:bg-amber-600 transition-colors"
                              >
                                <MdModeEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(donner._id)}
                                className="p-2 bg-[#ff6b81] text-white rounded shadow hover:bg-rose-500 transition-colors"
                              >
                                <ImBin2 />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center text-gray-400 font-semibold">
                            {donner.status === "in-progress" ? (
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => handleConfirm(donner)}
                                  className="p-2 bg-[#00d084] text-white rounded shadow hover:bg-green-600"
                                >
                                  <MdDoneOutline />
                                </button>
                                <button
                                  onClick={() => handleCancel(donner)}
                                  className="p-2 bg-[#ff7675] text-white rounded shadow hover:bg-red-600"
                                >
                                  <MdCancel />
                                </button>
                              </div>
                            ) : (
                              "N/A"
                            )}
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
                      className="bg-white p-5 rounded-2xl shadow-md border border-gray-100"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-xl text-black flex items-center gap-2">
                          <FaUserAlt className="text-red-500 text-base" />
                          {donner.recipientName}
                        </h3>
                        <span className="font-bold text-xl text-red-600">
                          {donner.Blood}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 font-medium mb-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>
                          {donner.recipentDistrict}, {donner.recipientUpazila}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
                        <FaClock />
                        <span>
                          {formatDateTime(
                            donner.donetionDate,
                            donner.donetionTime,
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <span
                            className={`px-4 py-1.5 rounded-lg text-white font-bold text-sm ${
                              donner.status === "Done" ||
                              donner.status === "completed"
                                ? "bg-emerald-500"
                                : donner.status === "in-progress"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                          >
                            {donner.status}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViews(donner)}
                            className="btn btn-sm bg-cyan-400 text-white rounded-lg shadow-sm hover:bg-cyan-500 transition-colors"
                          >
                            <FaRegEye />
                          </button>
                          <button
                            onClick={() => handleEditDonnetion(donner)}
                            className="btn btn-sm bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
                          >
                            <MdModeEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(donner._id)}
                            className="btn btn-sm bg-rose-400 text-white rounded-lg shadow-sm hover:bg-rose-500 transition-colors"
                          >
                            <ImBin2 />
                          </button>
                        </div>
                      </div>

                      {donner.status === "in-progress" && (
                        <div className="mt-4 pt-4 border-t flex gap-3">
                          <button
                            onClick={() => updateStatus(donner, "Done")}
                            className="btn btn-success btn-sm w-6/12"
                          >
                            <MdDoneOutline /> Done
                          </button>
                          <button
                            onClick={() => updateStatus(donner, "Cancel")}
                            className="btn btn-error btn-sm w-6/12"
                          >
                            <MdCancel /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md text-center border-l-4 border-red-500">
                <p className="text-xl text-gray-600 font-medium">
                  You have no recent donation requests.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  All of your requests will appear here.
                </p>
              </div>
            )}

            <dialog
              ref={viewModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box p-0">
                <div className="bg-red-700 text-white p-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Donation Details</h3>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost">
                      ✕
                    </button>
                  </form>
                </div>
                <div className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="font-bold">Requester:</span>{" "}
                    <span>{donnerDetails?.requesterName}</span>
                    <span className="font-bold">Email:</span>{" "}
                    <span className="break-all">
                      {donnerDetails?.requesterEmail}
                    </span>
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
                          selectedDistrictName ||
                            donnerupdate?.recipentDistrict,
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
          <div className="flex mt-4 justify-between items-center mx-2">
            <div></div>
            <Link
              to={"/dashboard/My-donation-request"}
              className="btn btn-secondary "
            >
              See All
            </Link>
          </div>
        </div>
      ) : (
        <AdminDashboardHome></AdminDashboardHome>
      )}
    </div>
  );
};

export default DonnerHome;
