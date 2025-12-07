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
  const from = location.state || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
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

  const handleRegister = async (data) => {
    try {
      const ProfileImg = data.photo[0];

      // Create user
      await CreateUser(data.email, data.password);

      // Upload Image
      const formData = new FormData();
      formData.append("image", ProfileImg);

      const Image_Api_Url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imagehost_API_key
      }`;

      const imgRes = await axios.post(Image_Api_Url, formData);
      const imageUrl = imgRes.data.data.url;

      // Save to Database
      const userInfo = {
        displayName: data.name,
        photoURL: imageUrl,
        email: data.email,
        bloodGroup: data.Blood,
        district: data.district,
        upazila: data.upazila,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (!dbRes.data.insertedId) {
        throw new Error("Database insert failed");
      }

      // Update Firebase Profile
      await UpdateUser({
        displayName: data.name,
        photoURL: imageUrl,
      });

      toast.success("Register successful ✅");

      // ✅ Navigate only after everything complete
      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
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
              <label className="label font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Required Error</p>
              )}

              <label className="label font-medium">Photo</label>

              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Required Error</p>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Blood Group</legend>
                <select
                  {...register("Blood", { required: true })}
                  defaultValue="Pick a Group"
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
                    defaultValue="Pick a District"
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
                    {...register("upazila", { required: true })} // register name 'upazila'
                    defaultValue="Pick an Upazila"
                    className="select rounded-2xl w-full"
                  >
                    <option disabled={true}>Pick an Upazila</option>
                    {getUpazilasByDistrictName(selectedDistrictName).map(
                      (upazilaName, i) => (
                        <option key={i} value={upazilaName}>
                          {upazilaName}
                        </option>
                      )
                    )}
                  </select>
                </fieldset>
              </div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Required Error</p>
              )}
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input
                  type={!show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    // pattern: /^[A-Za-z]+$/i,
                    minLength: 6,
                  })}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your password"
                />
                <span onClick={handleShowOf} className="absolute top-3 right-5">
                  {" "}
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Requierd Error!</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Please must be 6 charecter or longer!
                  </p>
                )}
              </div>
              {/* {error && <p className="text-red-500 font-medium">{error}</p>} */}
              <div></div>
              <input
                className="btn rounded-2xl btn-secondary mt-4"
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
