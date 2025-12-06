import React from "react";
import bannerImg from "../../assets/Banner1IMG.jpeg";
import { Link } from "react-router";
const Banner1 = () => {
  return (
    <div className="bg-secondary ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mx-10 py-20 ">
        <div className="text-center space-y-5 text-white">
          <h1 className="text-4xl font-bold text-white">
            Save Lives.<span className="text-yellow-500"> Donate Blood</span>{" "}
            Today.
          </h1>
          <p className="text-xl">
            Your donation can give someone a second chance at life. Join
            thousands of heroes making a difference every day in Bangladesh.
          </p>
          <p className="text-xl">Contact Us : +8801992644935</p>
          <div className="flex justify-center items-center gap-6">
            <div className="p-4 bg-[#ffffffd7] rounded-2xl">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/893/893529.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/865/865969.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/8011/8011552.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/1843/1843467.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mx-auto">
            <Link to={"/register"} className="btn text-[18px] rounded-2xl">
              Donate Now
            </Link>
            <button className="btn text-[18px] hover:bg-white hover:text-black bg-transparent rounded-2xl text-white ">
              Find Donnor
            </button>
          </div>
        </div>
        <div>
          <img
            className="w-[500px] shadow-2xl rounded-2xl"
            src={bannerImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner1;
