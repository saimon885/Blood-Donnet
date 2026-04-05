import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import UseAuth from "../../AuthProvider/UseAuth";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const BannerSlide = ({ bg, title,  desc }) => {
  const { user } = UseAuth();



  return (
    <div
      className="w-full min-h-[85vh] flex items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#7f0000]/90 to-black/70"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10">
        <div
          data-aos="fade-right"
          className="max-w-xl text-white space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {title}
            <span className="text-yellow-400 block mt-2">Save Lives Today</span>
          </h1>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed">
            {desc}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {user ? (
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition">
                Donate Now
              </button>
            ) : (
              <Link
                to="/register"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
              >
                Donate Now
              </Link>
            )}

            <Link
              to="/search-blood-requests"
              className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition font-semibold"
            >
              Find Donor
            </Link>
          </div>

          <div className="flex gap-6 pt-4 text-sm md:text-base text-gray-300">
            <span>🩸 Safe Donation</span>
            <span>⚡ Quick Response</span>
            <span>❤️ Save Lives</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Banner1 = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <BannerSlide
          bg="https://images.unsplash.com/photo-1584515933487-779824d29309"
          title="Donate Blood"
          highlight="Save Lives Today"
          desc="Your one donation can save multiple lives. Join our mission and help patients in need across Bangladesh."
        />
      </SwiperSlide>

      <SwiperSlide>
        <BannerSlide
          bg="https://images.unsplash.com/photo-1615461066841-6116e61058f4"
          title="Be a Lifesaver"
          highlight="Give Blood, Give Hope"
          desc="Every drop counts. Your contribution can bring hope to families waiting for urgent blood support."
        />
      </SwiperSlide>

      <SwiperSlide>
        <BannerSlide
          bg="https://images.unsplash.com/photo-1579154204601-01588f351e67"
          title="Emergency Support"
          highlight="Your Blood Matters"
          desc="In critical moments, blood donors become heroes. Step forward and make a real impact today."
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner1;