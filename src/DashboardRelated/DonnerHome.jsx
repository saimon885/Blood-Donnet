import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseRole from "../AuthProvider/UseRole";

const DonnerHome = () => {
  const { user } = UseAuth();
  const { role } = UseRole();
  const { register, handleSubmit, control, reset } = useForm();
  const [donnerDetails, setDonnerDetails] = useState([]);
  const [donnerupdate, setDonnerUpdate] = useState([]);
  console.log(donnerupdate);
  const viewModalRef = useRef(null);
  const UpdateModalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();
  const { data: donnerd = [], refetch } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners?email=${user.email}`);
      return result.data;
    },
  });
  const donners = donnerd.slice(0, 3);

  const [allUpazila, setAllUpazila] = useState([]);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        setAllUpazila(data);
      })
      .catch((err) => console.error("Error loading upazila data:", err));
  }, []);

  const DistrictData = useLoaderData();
  const DistrictDuplicate = DistrictData.map((c) => c.name);

  const selectedDistrictName = useWatch({ control, name: "recipentDistrict" });

  const getDistrictIdByName = (districtName) => {
    const districtObject = DistrictData.find((d) => d.name === districtName);
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
    viewModalRef.current.showModal();
    setDonnerDetails(data);
  };

  const handleEditDonnetion = (data) => {
    UpdateModalRef.current.showModal();
    setDonnerUpdate(data);
    reset(data);
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
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleDelete = (id) => {
    console.log(id);
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
              text: "Your Donnetions has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-secondary my-4">
          Welcome - {user?.displayName}
        </h1>
        {role === "donor" && (
          <>
            {" "}
            <div>
              <h2 className="text-2xl font-medium mb-4">
                Recent Donation Requests
              </h2>
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
                          <td>{donner.status}</td>
                          <td className="flex items-center gap-2">
                            <button
                              onClick={() => handleViews(donner)}
                              className="btn btn-small"
                            >
                              <FaRegEye />
                            </button>
                            <button
                              onClick={() => handleEditDonnetion(donner)}
                              className="btn btn-small"
                            >
                              <MdModeEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(donner._id)}
                              className="btn btn-small"
                            >
                              <ImBin2 />
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
            <dialog
              ref={viewModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Donnetion Details</h3>
                <div className="py-4">
                  <div>
                    <div class=" rounded-box border border-base-content/5 bg-base-100 shadow-xl">
                      <div class="bg-secondary text-white p-3">
                        <h2 class="text-lg font-bold">
                          Donner All Information
                        </h2>
                      </div>
                      <div class="p-4 space-y-2">
                        <div class="flex gap-5 items-center text-sm">
                          <span class="font-semibold">Requester Name :</span>
                          <span class="text-right">
                            {donnerDetails.requesterName}
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
                          <span class="text-right">
                            {donnerDetails.hospitalName}
                          </span>
                        </div>
                        <div class="flex gap-5 items-center text-sm">
                          <span class="font-semibold">Address :</span>
                          <span class="text-right">
                            {donnerDetails.address}
                          </span>
                        </div>
                        <div class="flex gap-5 items-center text-sm">
                          <span class="font-semibold">
                            Donnetion Time And Date{" "}
                          </span>
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
            {/* Update Donnetion Modal (defaultValue removed as reset is used) */}
            <dialog
              ref={UpdateModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg text-secondary">
                  Update Donnetion!!
                </h3>
                <div className="py-4">
                  <form onSubmit={handleSubmit(handleUpdateDonner)}>
                    <fieldset className="fieldset">
                      <div className="grid grid-cols-2 gap-5 w-full">
                        <div>
                          {/* Requester name */}
                          <fieldset>
                            <legend className="fieldset-legend">
                              Requster Name
                            </legend>
                            <input
                              type="text"
                              {...register("requesterName")}
                              className="input w-full"
                              readOnly
                            />
                          </fieldset>
                          <fieldset className="hidden">
                            <legend className="fieldset-legend">Id</legend>
                            <input
                              type="text"
                              {...register("id")}
                              className="input w-full"
                              defaultValue={donnerupdate._id}
                              readOnly
                            />
                          </fieldset>

                          <fieldset>
                            <legend className="fieldset-legend">
                              Requester Email
                            </legend>
                            <input
                              type="email"
                              {...register("requesterEmail")}
                              readOnly
                              className="input w-full"
                            />
                          </fieldset>

                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                              Blood Group
                            </legend>
                            <select
                              {...register("Blood")}
                              className="select w-full"
                            >
                              <option disabled={true} value={""}>
                                Pick a Group
                              </option>
                              <option>A+</option>
                              <option>A-</option>
                              <option>B+</option>
                              <option>B-</option>
                              <option>O+</option>
                              <option>O-</option>
                              <option>AB+</option>
                              <option>AB-</option>
                            </select>
                          </fieldset>
                          <fieldset>
                            <legend className="fieldset-legend">
                              Donation date
                            </legend>
                            <input
                              type="date"
                              {...register("donetionDate")}
                              className="input w-full"
                              placeholder="Enter Date"
                            />
                          </fieldset>
                          <fieldset>
                            <legend className="fieldset-legend">
                              Donation Time
                            </legend>
                            <input
                              type="time"
                              {...register("donetionTime")}
                              className="input w-full"
                              placeholder="Enter Donation Time"
                            />
                          </fieldset>

                          <fieldset>
                            <legend className="fieldset-legend">
                              Request message
                            </legend>
                            <textarea
                              {...register("requestMessage")}
                              className="input w-full h-15"
                              placeholder="Enter Request message"
                            ></textarea>
                          </fieldset>
                        </div>

                        <div>
                          <fieldset>
                            <legend className="fieldset-legend">
                              Recipient name
                            </legend>
                            <input
                              type="text"
                              {...register("recipientName")}
                              className="input w-full"
                              placeholder="Recipient name"
                            />
                          </fieldset>
                          <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">
                              District
                            </legend>

                            <select
                              {...register("recipentDistrict")}
                              className="select w-full"
                            >
                              <option disabled={true}>Pick a District</option>

                              {DistrictDuplicate.map((d, i) => (
                                <option value={d} key={i}>
                                  {d}
                                </option>
                              ))}
                            </select>
                          </fieldset>

                          <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Upazila</legend>
                            <select
                              {...register("recipientUpazila")}
                              className="select w-full"
                            >
                              {getUpazilasByDistrictName(
                                selectedDistrictName
                              ).map((upazilaName, i) => (
                                <option key={i} value={upazilaName}>
                                  {upazilaName}
                                </option>
                              ))}
                            </select>
                          </fieldset>
                          <fieldset>
                            <legend className="fieldset-legend">
                              Hospital Name
                            </legend>
                            <input
                              type="text"
                              {...register("hospitalName")}
                              className="input w-full"
                              placeholder="Hospital Name"
                            />
                          </fieldset>
                          <fieldset>
                            <legend className="fieldset-legend">
                              Full address Line
                            </legend>
                            <input
                              type="text"
                              {...register("address")}
                              className="input w-full"
                              placeholder="Full Address"
                            />
                          </fieldset>
                        </div>
                      </div>
                    </fieldset>
                    <input
                      className="btn btn-primary mt-4"
                      type="submit"
                      value="Upadate"
                    />
                  </form>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default DonnerHome;
