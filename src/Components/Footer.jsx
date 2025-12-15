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
  const TEXT_COLOR = "text-gray-300";
  const HIGHLIGHT_COLOR = "text-red-500";
  const LINK_HOVER_COLOR = "hover:text-red-300";

  return (
    <div className="mt-10">
      <div className={`bg-[#2B2B2B] rounded-t-3xl shadow-2xl`}>
        <footer
          className={`footer ${TEXT_COLOR} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-8`}
        >
          <nav className="space-y-4">
            <div className="w-[180px] -ml-5">
              <img className="w-full" src={Logo} alt="BloodHive Logo" />
            </div>
            <p className="max-w-[300px] text-sm leading-relaxed">
              Building a sustainable blood donation ecosystem to serve humanity
              and save lives across Bangladesh.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/saimon885"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white cursor-pointer rounded-full p-2 transition duration-300 hover:bg-red-600"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saimon-hossan/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white cursor-pointer rounded-full p-2 transition duration-300 hover:bg-red-600"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/saimon547674"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white cursor-pointer rounded-full p-2 transition duration-300 hover:bg-red-600"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/saimon547674"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white cursor-pointer rounded-full p-2 transition duration-300 hover:bg-red-600"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </nav>

          {/* 2. Contact Us */}
          <nav className="space-y-3">
            <h6 className="text-lg text-white font-semibold border-b border-red-500 pb-1 inline-block">
              Contact Us
            </h6>
            <a
              className={`link link-hover flex items-center gap-3 ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}
            >
              <span className={HIGHLIGHT_COLOR}>
                <FaPhoneAlt size={18} />
              </span>
              <span>+8801400678673</span>
            </a>
            <a
              className={`link link-hover flex items-center gap-3 ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}
              href="mailto:mdsaimonhossanfff@gmail.com"
            >
              <span className={HIGHLIGHT_COLOR}>
                <FiMail size={18} />
              </span>
              <span>mdsaimonhossanfff@gmail.com</span>
            </a>
            <div className="flex items-start gap-3">
              <span className={`${HIGHLIGHT_COLOR} pt-1`}>
                <FaLocationDot size={18} />
              </span>
              <span className="max-w-[200px]">
                Chandpur, Chottogram, Bangladesh
              </span>
            </div>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-lg text-white font-semibold border-b border-red-500 pb-1 inline-block">
              Quick Links
            </h6>

            <a className={`link link-hover ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}>
              Home
            </a>
            <a className={`link link-hover ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}>
              Terms of Use
            </a>
            <a className={`link link-hover ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}>
              Privacy Policy
            </a>
            <a className={`link link-hover ${TEXT_COLOR} ${LINK_HOVER_COLOR}`}>
              Donate Now
            </a>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-lg text-white font-semibold border-b border-red-500 pb-1 inline-block">
              Join Our Newsletter
            </h6>
            <p className="text-sm">
              Stay updated with our blood donation drives and initiatives.
            </p>
            <fieldset>
              <div className="join w-full">
                <input
                  type="email"
                  placeholder="Your Email..."
                  className="input input-bordered join-item w-2/3 max-w-xs bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                />
                <button className="btn join-item w-1/3 bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </nav>
        </footer>

        <div className="border-t border-gray-700 py-4 px-2">
          <p className="text-center text-gray-500 text-sm font-medium">
            &copy; 2025 BloodHive. All rights Reserved. Carefully Crafted By{" "}
            <span className="text-red-500 underline hover:text-red-400 cursor-pointer">
              BloodHive
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
