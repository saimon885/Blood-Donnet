import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
const BloodRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, control, setValue } = useForm();
  const [allUpazila, setAllUpazila] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
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
  useEffect(() => {
    if (selectedDistrictName) {
      setValue("recipientUpazila", "");
    }
  }, [selectedDistrictName, setValue]);
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

  const handleSearchDonors = async (data) => {
    console.log("Search Query:", data);

    setFilteredDonors([]);
    const params = new URLSearchParams(data).toString();
    const response = await axiosSecure.get(`/users/allusers?${params}`);
    setFilteredDonors(response.data);
    if (response.data.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Donors Found",
        text: "No users matched your search criteria.",
        showConfirmButton: true,
      });
    } else if (response.data === response.data) {
      Swal.fire({
        icon: "success",
        title: " Donors Found",
        text: "users matched your search criteria.",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: "Could not connect to the server or an error occurred.",
      });
    }
  };

  return (
    <div>
      <div className="min-h-xl bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        {" "}
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl border border-red-100 mb-8">
          {" "}
          <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8 tracking-tight">
            🩸 Find Blood Donors{" "}
          </h1>{" "}
          <form
            onSubmit={handleSubmit(handleSearchDonors)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="Blood"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Blood Group{" "}
              </label>{" "}
              <select
                {...register("Blood", { required: true })}
                defaultValue={""}
                id="Blood"
                className="select select-bordered w-full bg-white transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500"
              >
                {" "}
                <option value="" disabled>
                  Pick a Group
                </option>{" "}
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              {" "}
              <label
                htmlFor="recipentDistrict"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select District
              </label>{" "}
              <select
                {...register("recipentDistrict", { required: true })}
                defaultValue={""}
                id="recipentDistrict"
                className="select select-bordered w-full bg-white transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500"
              >
                {" "}
                <option value="" disabled>
                  Pick a District
                </option>{" "}
                {DistrictDuplicate.map((d, i) => (
                  <option value={d} key={i}>
                    {d}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>
            <div>
              {" "}
              <label
                htmlFor="recipientUpazila"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Upazila
              </label>{" "}
              <select
                {...register("recipientUpazila", { required: true })}
                defaultValue={""}
                id="recipientUpazila"
                className={`select select-bordered w-full bg-white transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500`}
              >
                {" "}
                <option value="" disabled>
                  {" "}
                  {allUpazila.length === 0
                    ? "Loading Upazilas..."
                    : selectedDistrictName
                    ? "Pick a Upazila"
                    : "Select a District first"}{" "}
                </option>{" "}
                {getUpazilasByDistrictName(selectedDistrictName).map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>
            <div className="pt-4">
              <button
                className="btn w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50"
                type="submit"
              >
                Search Blood
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      </div>
      <div className="">
        <div className="w-full mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {" "}
            {filteredDonors.length > 0
              ? `Found ${filteredDonors.length} Donor(s)`
              : ""}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-red-200 hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-extrabold text-red-600">
                    {donor.bloodGroup || "Group N/A"}{" "}
                  </span>
                  <span className="text-sm font-semibold text-gray-600 text-right">
                    {donor.district || "District N/A"},
                    {donor.upazila || "Upazila N/A"}{" "}
                  </span>{" "}
                </div>{" "}
                <p className="text-lg font-medium text-gray-900">
                  {donor.displayName || "N/A"}
                </p>
                <p className="text-gray-600">
                  Contact: {donor.contactNumber || "N/A"}
                </p>
                <button className="mt-3 btn btn-sm bg-red-500 text-white hover:bg-red-600">
                  Request Contact
                </button>
              </div>
            ))}{" "}
          </div>
          {filteredDonors.length === 0 && (
            <div className="text-center text-gray-500 p-10 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold">
                🔍 Please search to find available blood donors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;
