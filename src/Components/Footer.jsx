import React from "react";
import Logo from "../assets/Logo.png";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <img src={Logo} alt="BloodHive Logo" className="w-36" />
          <p className="text-gray-400 text-sm leading-relaxed">
            BloodHive unites donors and recipients across Bangladesh to save
            lives and build a reliable blood donation ecosystem.
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/saimon885"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/saimon-hossan/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.facebook.com/saimon547674"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://www.instagram.com/saimon547674"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-white font-semibold text-lg border-b border-red-500 pb-1 inline-block">
            Contact Us
          </h6>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-red-500" />
            <span>+8801400678673</span>
          </div>
          <a
            href="mailto:mdsaimonhossanfff@gmail.com"
            className="flex items-center gap-3 hover:text-red-400 transition"
          >
            <FiMail className="text-red-500" />
            <span>mdsaimonhossanfff@gmail.com</span>
          </a>
          <div className="flex items-start gap-3">
            <FaLocationDot className="text-red-500 mt-1" />
            <span>Chandpur, Chottogram, Bangladesh</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-white font-semibold text-lg border-b border-red-500 pb-1 inline-block">
            Quick Links
          </h6>
          <a className="hover:text-red-400 transition">Home</a>
          <a className="hover:text-red-400 transition">Donate Now</a>
          <a className="hover:text-red-400 transition">Privacy Policy</a>
          <a className="hover:text-red-400 transition">Terms of Use</a>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-white font-semibold text-lg border-b border-red-500 pb-1 inline-block">
            Subscribe
          </h6>
          <p className="text-gray-400 text-sm">
            Get updates about blood drives and initiatives directly in your
            inbox.
          </p>
          <div className="flex w-full max-w-xs gap-2 mt-2">
            <input
              type="email"
              placeholder="Your Email..."
              className="flex-1 input input-bordered rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
            />
            <button className="btn bg-red-600 hover:bg-red-500 border-red-600 text-white rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2025 BloodHive. All rights reserved. Designed & Developed by{" "}
          <span className="text-red-500 underline hover:text-red-400 cursor-pointer">
            BloodHive Team
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
