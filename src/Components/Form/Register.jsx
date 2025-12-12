import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import UseAuth from "../../AuthProvider/UseAuth";
import axios from "axios";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../AuthProvider/UseAxiosSecure";

const Register = () => {
  const [show, setShow] = useState(true);
  const axiosSecure = UseAxiosSecure();
  const { CreateUser, UpdateUser } = UseAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const [allUpazila, setAllUpazila] = useState([]);

  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        setAllUpazila(data);
      });
  }, []);

  const DistrictData = useLoaderData();
  const DistrictDuplicate = DistrictData ? DistrictData.map((c) => c.name) : [];

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

  const handleRegister = async (data) => {
    try {
      const ProfileImg = data.photo[0];

      // Create user
      await CreateUser(data.email, data.password);
      // Upload Image (ImgBB)
      const formData = new FormData();
      formData.append("image", ProfileImg);

      const Image_Api_Url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imagehost_API_key
      }`;

      const imgRes = await axios.post(Image_Api_Url, formData);
      const imageUrl = imgRes.data.data.url;

      // Save user info to Database
      const userInfo = {
        displayName: data.name,
        photoURL: imageUrl,
        email: data.email,
        bloodGroup: data.Blood,
        district: data.district,
        upazila: data.upazila,
        role: "donor",
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (dbRes.data.insertedId) {
        // Update Profile
        await UpdateUser({
          displayName: data.name,
          photoURL: imageUrl,
        });

        toast.success("Registration successful ✅");
        navigate(from, { replace: true });
      } else {
        throw new Error("Database insertion failed or user already exists.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleShowOf = () => {
    setShow(!show);
  };

  return (
    <div className="hero my-15 px-5">
      <div className="card bg-base-100 border border-primary w-full max-w-xl shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">
            Create Your Account!
          </h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* Name Field */}
              <label className="label font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}

              {/* Photo Field */}
              <label className="label font-medium">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Profile photo is required</p>
              )}

              {/* Blood Group Field */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Blood Group</legend>
                <select
                  {...register("Blood", { required: true })}
                  className="select w-full rounded-2xl"
                  defaultValue={""}
                >
                  <option value={""} disabled={true}>
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
                {errors.Blood?.type === "required" && (
                  <p className="text-red-500">Blood Group is required</p>
                )}
              </fieldset>

              {/* District and Upazila Fields */}
              <div className="flex gap-4 items-center w-full">
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">District</legend>

                  <select
                    {...register("district", { required: true })}
                    className="select rounded-2xl w-full"
                    defaultValue={""}
                  >
                    <option value={""} disabled={true}>
                      Pick a District
                    </option>

                    {DistrictDuplicate.map((d, i) => (
                      <option value={d} key={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.district?.type === "required" && (
                    <p className="text-red-500">District is required</p>
                  )}
                </fieldset>

                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Upazila</legend>
                  <select
                    {...register("upazila", { required: true })}
                    className="select rounded-2xl w-full"
                    defaultValue={""}
                  >
                    <option value={""} disabled={true}>
                      Pick an Upazila
                    </option>
                    {getUpazilasByDistrictName(selectedDistrictName).map(
                      (upazilaName, i) => (
                        <option key={i} value={upazilaName}>
                          {upazilaName}
                        </option>
                      )
                    )}
                  </select>
                  {errors.upazila?.type === "required" && (
                    <p className="text-red-500">Upazila is required</p>
                  )}
                </fieldset>
              </div>

              {/* Email Field */}
              <label className="label font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* Password Field */}
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input
                  type={!show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your password"
                />
                <span
                  onClick={handleShowOf}
                  className="absolute top-3 right-5 cursor-pointer"
                >
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <label className="label font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={!show ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "The passwords do not match",
                  })}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={handleShowOf}
                  className="absolute top-3 right-5 cursor-pointer"
                >
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <input
                className="btn rounded-2xl btn-secondary mt-4 w-full"
                type="submit"
                value="Register"
              />
            </fieldset>
          </form>

          <p className="text-center">
            Already have an account?
            <Link
              to={"/login"}
              className="text-red-700 font-medium text-[16px]"
            >
              {" "}
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
