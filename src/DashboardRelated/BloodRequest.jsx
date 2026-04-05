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
      });
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
        (u) => u.district_id === targetDistrictId,
      );
      return upazilas.map((u) => u.name);
    }
    return [];
  };

  const handleSearchDonors = async (data) => {
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
  console.log(filteredDonors);

  return (
    <div>
      <div className="min-h-xl  flex flex-col items-center p-4 sm:p-6 lg:p-8">
        {" "}
        <div className="w-full max-w-xl  p-8 rounded-xl border border-red-100 mb-8">
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
                className="block text-sm font-medium text-accent mb-1"
              >
                Select Blood Group{" "}
              </label>{" "}
              <select
                {...register("Blood", { required: true })}
                defaultValue={""}
                id="Blood"
                className="select select-bordered w-full transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500"
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
                className="block text-sm font-medium text-accent  mb-1"
              >
                Select District
              </label>{" "}
              <select
                {...register("recipentDistrict", { required: true })}
                defaultValue={""}
                id="recipentDistrict"
                className="select select-bordered w-full transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500"
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
                className="block text-sm font-medium text-accent mb-1"
              >
                Select Upazila
              </label>{" "}
              <select
                {...register("recipientUpazila", { required: true })}
                defaultValue={""}
                id="recipientUpazila"
                className={`select select-bordered w-full transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500`}
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
      <div className="mx-5">
        <div className="w-full mt-6">
          <h2 className="text-2xl font-bold  mb-4 text-center">
            {" "}
            {filteredDonors.length > 0
              ? `Found ${filteredDonors.length} Donor(s)`
              : ""}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            {filteredDonors.map((donor, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={donor.photoURL || "https://via.placeholder.com/150"}
                    alt="donor"
                    className="w-16 h-20 object-cover rounded-md border"
                  />

                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {donor.displayName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {donor.district || "District N/A"},{" "}
                      {donor.upazila || "Upazila N/A"}
                    </p>
                  </div>

                  <span className="text-lg font-bold text-red-500">
                    {donor.bloodGroup || "N/A"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 break-all">
                  {donor.email || "N/A"}
                </p>

                <a
                  target="_blank"
                  href={`mailto:${donor.email}`}
                  className="btn mt-4 w-full py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Request Contact
                </a>
              </div>
            ))}
          </div>
          {filteredDonors.length === 0 && (
            <div className="text-center text-gray-500 p-10  rounded-lg shadow-md">
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
