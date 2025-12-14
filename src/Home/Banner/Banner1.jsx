import React, { useEffect } from "react";
import bannerImg from "../../assets/Banner1IMG.jpeg";
import { Link } from "react-router";
import { useTypewriter } from "react-simple-typewriter";
import AOS from "aos";
import UseAuth from "../../AuthProvider/UseAuth";
const Banner1 = () => {
  const { user } = UseAuth();
  const [text] = useTypewriter({
    words: [" Donate Blood Today."],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);
  return (
    <div className="bg-secondary ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mx-10 py-20 ">
        <div data-aos="fade-right" className="text-center space-y-5 text-white">
          <h1 className="text-4xl font-bold text-white">
            Save Lives.
            <span className="text-yellow-500">{text}</span>{" "}
          </h1>
          <p className="text-xl">
            Your donation can give someone a second chance at life. Join
            thousands of heroes making a difference every day in Bangladesh.
          </p>
          <p className="text-xl">Contact Us : +8801992644935</p>
          <div className="flex justify-center items-center gap-6">
            <div className="p-4 bg-[#ffffffd7] rounded-2xl transition-all duration-300 hover:-translate-y-2">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/893/893529.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl transition-all duration-300 hover:-translate-y-2">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/865/865969.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl transition-all duration-300 hover:-translate-y-2">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/8011/8011552.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-[#ffffffd7] rounded-2xl transition-all duration-300 hover:-translate-y-2">
              <img
                className="w-[30px]"
                src="https://cdn-icons-png.flaticon.com/128/1843/1843467.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mx-auto">
            {user ? (
              <div className="btn text-[18px] rounded-2xl">Donate Now</div>
            ) : (
              <Link to={"/register"} className="btn text-[18px] rounded-2xl">
                Donate Now
              </Link>
            )}
            <Link
              to={"/search-blood-requests"}
              className="btn text-[18px] hover:bg-white hover:text-black bg-transparent rounded-2xl text-white "
            >
              Find Donnor
            </Link>
          </div>
        </div>
        <div data-aos="fade-left">
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
