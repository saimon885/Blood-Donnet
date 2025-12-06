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
    <div>
      <div className="bg-linear-to-r/oklch  from-secondary via-[#afabab91] to-primary mt-10 rounded-t-3xl">
        <footer className="footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center text-base-content  rounded-tl-6xl p-10">
          <nav className="space-y-2">
            <div className="w-[200px] -ml-5">
              <img className="w-full" src={Logo} alt="" />
            </div>
            <p className="w-[300px] text-white">
              Building a sustainable blood donation ecosystem to serve humanity
              and save lives across Bangladesh.
            </p>
            <div className="flex text-black gap-2">
              <a
                href="https://github.com/saimon885"
                target="blank"
                className="bg-white cursor-pointer rounded-full p-2"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saimon-hossan/"
                target="blank"
                className="bg-white cursor-pointer rounded-full p-2"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/saimon547674"
                target="blank"
                className="bg-white cursor-pointer rounded-full p-2"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/saimon547674"
                target="blank"
                className="bg-white cursor-pointer rounded-full p-2"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </nav>
          <nav className="space-y-2">
            <h6 className="text-[18px] text-black font-medium">Contact Us</h6>
            <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
              <span>
                <FaPhoneAlt color="#d72050" size={18} />
              </span>
              <span>(+1800)456-789</span>
            </a>
            <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
              <span>
                <FiMail color="#d72050" size={18} />
              </span>
              <span>Contact@example.com</span>
            </a>
            <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
              <span>
                <FaLocationDot color="#d72050" size={18} />
              </span>
              <span>Chandpur,Chottogram,Bangladesh</span>
            </a>
          </nav>
          <nav className="space-y-2">
            <h6 className="text-[18px] text-black font-medium">Legal</h6>
            <a className="link link-hover text-[#4e4e4ee0]">Home</a>
            <a className="link link-hover text-[#4e4e4ee0]">Terms of use</a>
            <a className="link link-hover text-[#4e4e4ee0]">Privacy policy</a>
          </nav>
          <nav>
            <h6 className="text-[18px] text-black font-medium">Newsletter</h6>
            <fieldset className="">
              <div className="join">
                <input
                  type="text"
                  placeholder="Your Email.."
                  className="input input-bordered join-item"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </fieldset>
          </nav>
        </footer>
        <div className=" border-t border-base-300 py-3 px-2">
          <h1 className="text-center text-black heading-Font font-bold">
            Copyright @2025. All rights Reserve. Carefully Crafted By{" "}
            <span className="text-secondary underline">BloodHive</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
