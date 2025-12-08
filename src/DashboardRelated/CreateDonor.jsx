import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import UseAuth from "../AuthProvider/UseAuth";
import { useLoaderData } from "react-router";

const CreateDonor = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, control } = useForm();
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

  const selectedSenderRegion = useWatch({ control, name: "recipentDistrict" });

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

  const handleCreateDonor = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleCreateDonor)}>
          <fieldset className="fieldset">
            <div className="grid grid-cols-2 gap-5 w-full">
              <div>
                {/* Requester name */}
                <fieldset>
                  <legend className="fieldset-legend">Your Name</legend>
                  <input
                    type="text"
                    {...register("requesterName")}
                    className="input w-full"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                </fieldset>
                <fieldset>
                  <legend className="fieldset-legend">Your Email</legend>
                  <input
                    type="email"
                    {...register("requesterEmail")}
                    defaultValue={user?.email}
                    readOnly
                    className="input w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Blood Group</legend>
                  <select
                    {...register("Blood", { required: true })}
                    defaultValue="Pick a Group"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Group</option>

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
                  <legend className="fieldset-legend">Donation date</legend>
                  <input
                    type="date"
                    {...register("donetionDate")}
                    className="input w-full"
                    placeholder="Enter Date"
                  />
                </fieldset>
                <fieldset>
                  <legend className="fieldset-legend">Donation Time</legend>
                  <input
                    type="time"
                    {...register("donetionTime")}
                    className="input w-full"
                    placeholder="Enter Donation Time"
                  />
                </fieldset>

                <fieldset>
                  <legend className="fieldset-legend">Request message</legend>
                  <textarea
                    {...register("requestMessage")}
                    className="input w-full h-15"
                    placeholder="Enter Request message"
                  ></textarea>
                </fieldset>
              </div>

              <div>
                <fieldset>
                  <legend className="fieldset-legend">Recipient name</legend>
                  <input
                    type="text"
                    {...register("Recipient name")}
                    className="input w-full"
                    placeholder="Recipient name"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Recipient District
                  </legend>
                  <select
                    {...register("recipentDistrict")}
                    defaultValue="Pick a District"
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

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Recipient Upazila</legend>
                  <select
                    {...register("recipientUpazila")}
                    defaultValue="Pick a Upazila"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Upazila</option>

                    {getUpazilasByDistrictName(selectedSenderRegion).map(
                      (u, i) => (
                        <option key={i} value={u}>
                          {u}
                        </option>
                      )
                    )}
                  </select>
                </fieldset>
                <fieldset>
                  <legend className="fieldset-legend">Hospital Name</legend>
                  <input
                    type="text"
                    {...register("hospitalName")}
                    className="input w-full"
                    placeholder="Hospital Name"
                  />
                </fieldset>
                <fieldset>
                  <legend className="fieldset-legend">Full address Line</legend>
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
            className="btn btn-neutral mt-4"
            type="submit"
            value="Request"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateDonor;
