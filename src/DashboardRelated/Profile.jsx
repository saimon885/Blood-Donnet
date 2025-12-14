import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { MdEdit } from "react-icons/md";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { user } = UseAuth();
  const modalRef = useRef(null);
  //  console.log(user);
  const axiosSecure = UseAxiosSecure();

  const DistrictData = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [allUpazila, setAllUpazila] = useState([]);
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["/users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  const handleModal = (data) => {
    modalRef.current.showModal();
    reset(data);
  };
  // console.log(users);
  // profile Updatae Related

  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        setAllUpazila(data);
      });
  }, []);

  const DistrictDuplicate = DistrictData.map((c) => c.name);

  const selectedDistrictName = useWatch({ control, name: "district" });
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

  const UpdateProfile = async (data) => {
    const ProfileImg = data.photo[0];
    const existingPhotoURL = users[0]?.photoURL || user.photoURL;
    let newPhotoURL = existingPhotoURL;

    try {
      if (ProfileImg) {
        const formData = new FormData();
        formData.append("image", ProfileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Imagehost_API_key
        }`;

        const res = await axios.post(image_API_URL, formData);
        newPhotoURL = res.data.data.url;
      }

      const userInfo = {
        displayName: data.name,
        photoURL: newPhotoURL,
        email: data.email,
        bloodGroup: data.Blood,
        district: data.district,
        upazila: data.upazila,
      };

      // Database update
      await axiosSecure.patch(`/users/${data.id}`, userInfo);

      refetch();
      toast.success("Update successful ✅");
      modalRef.current.close();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed! Please try again.");
    }
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <div>
        {users &&
          users.map((user) => (
            <div
              key={user._id}
              className="max-w-lg mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img src={user?.photoURL} alt="" />
                </div>

                {/* Name and Email */}
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {user?.displayName}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500">Email: {user?.email}</p>
                </div>
              </div>

              <hr className="mb-6" />

              {/* Location Details Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* District */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    District
                  </p>
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="text-gray-700 font-medium">
                      {user?.district}
                    </span>
                  </div>
                </div>

                {/* Upazila */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Upazila
                  </p>
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="text-gray-700 font-medium">
                      {user?.upazila}
                    </span>
                  </div>
                </div>
              </div>

              {/* Blood Group and Save Button Section */}
              <div className="flex flex-col items-center space-y-4">
                {/* Blood Group */}
                <div className="flex items-center space-x-2 p-2 rounded-lg">
                  <p className="text-lg font-bold text-gray-800 flex items-center">
                    <span>
                      <img
                        className="w-[25px]"
                        src="https://img.icons8.com/?size=48&id=26115&format=png"
                        alt=""
                      />
                    </span>
                    <span>
                      {" "}
                      Blood Group:{" "}
                      <span className="text-red-600">{user?.bloodGroup}</span>
                    </span>
                  </p>
                  <span className="text-red-500 cursor-pointer hover:text-red-700"></span>
                </div>

                {/* Save Changes Button */}
                <button
                  onClick={() => handleModal(user)}
                  className=" px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2 transition duration-300"
                >
                  Edit <MdEdit />
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        {users.map((man) => (
          <div key={man._id} className="modal-box">
            <h3 className="font-bold text-lg text-secondary">
              Update Your Profile
            </h3>
            <div className="py-4">
              <div className="card bg-base-100 shrink-0 shadow-2xl">
                <div className="card-body">
                  <form onSubmit={handleSubmit(UpdateProfile)}>
                    <fieldset className="fieldset">
                      <label className="label font-medium">Name</label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        defaultValue={man.displayName}
                        className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                        placeholder="Enter your Name"
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-red-500">Required Error</p>
                      )}

                      <input
                        type="text"
                        {...register("id", { required: true })}
                        defaultValue={man._id}
                        readOnly
                        className="input rounded-2xl hidden focus:border-0 w-full focus:outline-gray-200"
                        placeholder="Enter your Name"
                      />

                      <label className="label font-medium">Photo</label>

                      <input
                        type="file"
                        {...register("photo")}
                        className="file-input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                      />
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Blood Group</legend>
                        <select
                          {...register("Blood", { required: true })}
                          defaultValue={man.bloodGroup}
                          className="select rounded-2xl w-full"
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
                      <div className="flex gap-4 items-center w-full">
                        <fieldset className="fieldset w-full">
                          <legend className="fieldset-legend">District</legend>

                          <select
                            {...register("district", { required: true })}
                            defaultValue={man.district}
                            className="select rounded-2xl w-full"
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
                            {...register("upazila", { required: true })}
                            defaultValue={man.upazila}
                            className="select rounded-2xl w-full"
                          >
                            {man.upazila &&
                              selectedDistrictName === man.district && (
                                <option
                                  value={man.upazila}
                                  key="default_upazila"
                                >
                                  {man.upazila}
                                </option>
                              )}
                            {getUpazilasByDistrictName(
                              selectedDistrictName || man.district
                            ).map((upazilaName, i) => (
                              <option key={i} value={upazilaName}>
                                {upazilaName}
                              </option>
                            ))}
                          </select>
                        </fieldset>
                      </div>
                      <label className="label font-medium">Email</label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        defaultValue={user?.email}
                        readOnly
                        className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                        placeholder="Enter your email"
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-red-500">Required Error</p>
                      )}

                      <input
                        className="btn rounded-2xl btn-secondary mt-4"
                        type="submit"
                        value="Update"
                      />
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        ))}
      </dialog>
    </div>
  );
};

export default Profile;
