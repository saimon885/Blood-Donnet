import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { FaRegEye, FaTint } from "react-icons/fa";
import { MdCancel, MdDoneOutline, MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseRole from "../AuthProvider/UseRole";
import Loading from "../Loading/Loading";
import { format, parse } from "date-fns";

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

  const { data: totalDonorsData, isLoading: isDonorsCountLoading } = useQuery({
    queryKey: ["users-role-count"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/allusers/Role");
      return result.data;
    },
    enabled: role === "admin" || role === "volunteer",
  });

  const { data: totalFundsData, isLoading: isFundsLoading } = useQuery({
    queryKey: ["checkout-session-status"],
    queryFn: async () => {
      const result = await axiosSecure.get("/checkout-session/paymentStatus");
      return result.data;
    },
    enabled: role === "admin" || role === "volunteer",
  });

  const totalDonorCount = totalDonorsData?.[0]?.count || 0;
  const totalFundAmount = totalFundsData?.[0]?.totalFund || 0;

  const { data: totalDonnations } = useQuery({
    queryKey: ["donners-DonnetionCount"],
    queryFn: async () => {
      const result = await axiosSecure.get("/donners/DonnetionCount");
      return result.data;
    },
    enabled: role === "admin" || role === "volunteer",
  });

  const totalDonnation = totalDonnations?.[0]?.count || 0;

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
        (u) => u.district_id === targetDistrictId
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
    isRoleLoading ||
    isDonorsCountLoading ||
    isFundsLoading
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
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="table w-full">
                  <thead className="bg-red-700 text-white sticky top-0">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Recipient Name</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Blood Group</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                      <th className="py-3 px-4 text-center">Status Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donners.map((donner, index) => (
                      <tr
                        key={donner._id}
                        className="border-b hover:bg-red-50 transition duration-150 ease-in-out"
                      >
                        <th className="px-4 py-3">{index + 1}</th>
                        <td className="px-4 py-3 font-medium text-gray-700">
                          {donner.recipientName}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {donner.recipentDistrict}, {donner.recipientUpazila}
                        </td>
                        <td className="px-4 py-3 font-semibold whitespace-nowrap text-blue-600">
                          {formatDateTime(
                            donner.donetionDate,
                            donner.donetionTime
                          )}
                        </td>
                        <td className="px-4 py-3 font-bold text-red-700">
                          {donner.Blood}
                        </td>
                        <td
                          className={`px-4 py-3 font-bold uppercase ${
                            donner.status === "Done" ||
                            donner.status === "completed"
                              ? "text-green-600"
                              : donner.status === "in-progress"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {donner.status}
                        </td>

                        <td className="flex items-center justify-center gap-2 px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => handleViews(donner)}
                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg tooltip"
                            data-tip="View Details"
                          >
                            <FaRegEye />
                          </button>
                          <button
                            onClick={() => handleEditDonnetion(donner)}
                            className={`btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg `}
                          >
                            <MdModeEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(donner._id)}
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg tooltip"
                            data-tip="Delete Request"
                          >
                            <ImBin2 />
                          </button>
                        </td>

                        <td className="text-center">
                          {donner.status === "in-progress" && (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleConfirm(donner)}
                                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg tooltip"
                                data-tip="Confirm Donation"
                              >
                                <MdDoneOutline />
                              </button>
                              <button
                                onClick={() => handleCancel(donner)}
                                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg tooltip"
                                data-tip="Cancel Donation"
                              >
                                <MdCancel />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              {" "}
              {donnerDetails && (
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Donnetion Details</h3>{" "}
                  <div className="py-4">
                    {" "}
                    <div>
                      {" "}
                      <div className=" rounded-box border border-base-content/5 bg-base-100 shadow-xl">
                        {" "}
                        <div className="bg-red-700 text-white p-3 rounded-t-lg">
                          {" "}
                          <h2 className="text-lg font-bold">
                            Donation Request Information
                          </h2>{" "}
                        </div>{" "}
                        <div className="p-4 space-y-2">
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Requester Name :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.requesterName}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Requester Email :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.requesterEmail}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Recipient Name :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.recipientName}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Location :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.recipentDistrict},
                              {donnerDetails.recipientUpazila}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Blood Group :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.Blood}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              HospitalName :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.hospitalName}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Address :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.address}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm font-bold text-blue-600">
                            {" "}
                            <span className="font-semibold text-gray-800">
                              Donnetion Time And Date{" "}
                            </span>{" "}
                            <span className="text-right">
                              {formatDateTime(
                                donnerDetails.donetionDate,
                                donnerDetails.donetionTime
                              )}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex gap-5 items-center text-sm">
                            {" "}
                            <span className="font-semibold">
                              Request Message :
                            </span>{" "}
                            <span className="text-right">
                              {donnerDetails.requestMessage}{" "}
                            </span>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="modal-action">
                    {" "}
                    <form method="dialog">
                      <button className="btn">Close</button>{" "}
                    </form>{" "}
                  </div>{" "}
                </div>
              )}
            </dialog>

            <dialog
              ref={UpdateModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              {" "}
              {donnerupdate && (
                <div className="modal-box">
                  {" "}
                  <h3 className="font-bold text-lg text-secondary">
                    Update Donnetion!!{" "}
                  </h3>{" "}
                  <div className="py-4">
                    {" "}
                    <form onSubmit={handleSubmit(handleUpdateDonner)}>
                      {" "}
                      <fieldset className="fieldset">
                        {" "}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          {" "}
                          {/* Made responsive */}{" "}
                          <div>
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Requster Name
                              </legend>{" "}
                              <input
                                type="text"
                                {...register("requesterName")}
                                className="input input-bordered w-full"
                                readOnly
                              />{" "}
                            </fieldset>{" "}
                            <fieldset className="hidden">
                              {" "}
                              <legend className="fieldset-legend">
                                Id
                              </legend>{" "}
                              <input
                                type="text"
                                {...register("id")}
                                className="input input-bordered w-full"
                                defaultValue={donnerupdate._id}
                                readOnly
                              />{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Requester Email{" "}
                              </legend>{" "}
                              <input
                                type="email"
                                {...register("requesterEmail")}
                                readOnly
                                className="input input-bordered w-full"
                              />{" "}
                            </fieldset>{" "}
                            <fieldset className="fieldset">
                              {" "}
                              <legend className="fieldset-legend">
                                Blood Group
                              </legend>{" "}
                              <select
                                {...register("Blood")}
                                className="select select-bordered w-full"
                              >
                                {" "}
                                <option disabled={true} value={""}>
                                  Pick a Group{" "}
                                </option>
                                <option>A+</option>
                                <option>A-</option> <option>B+</option>{" "}
                                <option>B-</option> <option>O+</option>{" "}
                                <option>O-</option> <option>AB+</option>{" "}
                                <option>AB-</option>{" "}
                              </select>{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Donation date
                              </legend>{" "}
                              <input
                                type="date"
                                {...register("donetionDate")}
                                className="input input-bordered w-full"
                                placeholder="Enter Date"
                              />{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Donation Time
                              </legend>{" "}
                              <input
                                type="time"
                                {...register("donetionTime")}
                                className="input input-bordered w-full"
                                placeholder="Enter Donation Time"
                              />{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Request message{" "}
                              </legend>{" "}
                              <textarea
                                {...register("requestMessage")}
                                className="textarea textarea-bordered w-full h-15"
                                placeholder="Enter Request message"
                              ></textarea>{" "}
                            </fieldset>{" "}
                          </div>{" "}
                          <div>
                            {" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Recipient name{" "}
                              </legend>{" "}
                              <input
                                type="text"
                                {...register("recipientName")}
                                className="input input-bordered w-full"
                                placeholder="Recipient name"
                              />{" "}
                            </fieldset>{" "}
                            <fieldset className="fieldset w-full">
                              {" "}
                              <legend className="fieldset-legend">
                                District
                              </legend>{" "}
                              <select
                                {...register("recipentDistrict")}
                                className="select select-bordered w-full"
                              >
                                {" "}
                                <option disabled={true}>
                                  Pick a District
                                </option>{" "}
                                {DistrictDuplicate.map((d, i) => (
                                  <option value={d} key={i}>
                                    {d}{" "}
                                  </option>
                                ))}{" "}
                              </select>{" "}
                            </fieldset>{" "}
                            <fieldset className="fieldset w-full">
                              {" "}
                              <legend className="fieldset-legend">
                                Upazila
                              </legend>{" "}
                              <select
                                {...register("recipientUpazila")}
                                className="select select-bordered w-full"
                              >
                                {" "}
                                {getUpazilasByDistrictName(
                                  selectedDistrictName ||
                                    donnerupdate.recipentDistrict
                                ).map((upazilaName, i) => (
                                  <option key={i} value={upazilaName}>
                                    {upazilaName}{" "}
                                  </option>
                                ))}{" "}
                              </select>{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Hospital Name
                              </legend>{" "}
                              <input
                                type="text"
                                {...register("hospitalName")}
                                className="input input-bordered w-full"
                                placeholder="Hospital Name"
                              />{" "}
                            </fieldset>{" "}
                            <fieldset>
                              {" "}
                              <legend className="fieldset-legend">
                                Full address Line{" "}
                              </legend>{" "}
                              <input
                                type="text"
                                {...register("address")}
                                className="input input-bordered w-full"
                                placeholder="Full Address"
                              />{" "}
                            </fieldset>{" "}
                          </div>{" "}
                        </div>{" "}
                      </fieldset>{" "}
                      <input
                        className="btn btn-primary bg-secondary text-white hover:bg-red-800 border-none mt-4"
                        type="submit"
                        value="Update"
                      />{" "}
                    </form>{" "}
                  </div>{" "}
                  <div className="modal-action">
                    {" "}
                    <form method="dialog">
                      {" "}
                      <button className="btn">Close</button>{" "}
                    </form>{" "}
                  </div>{" "}
                </div>
              )}
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
        <div className="p-8 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Dashboard Overview for {role?.toUpperCase() || "User"}
          </h2>

          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-figure text-blue-500 text-3xl">
                <FaRegEye />
              </div>
              <div className="stat-title">Total Donors</div>
              <div className="stat-value text-blue-600">{totalDonorCount}+</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-green-500 text-3xl">
                <MdDoneOutline />
              </div>
              <div className="stat-title">Total Funding</div>
              <div className="stat-value text-green-600">
                {totalFundAmount}$
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-red-500 text-3xl">
                <FaTint />
              </div>
              <div className="stat-title">Total Donnations</div>
              <div className="stat-value text-red-600">{totalDonnation}+</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonnerHome;
