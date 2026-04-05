import Aos from "aos";
import React, { useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";

const BloodHiveWorks = () => {
  const [text] = useTypewriter({
    words: ["BloodHive Works"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 60,
  });

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  const steps = [
    {
      title: "Create Account",
      desc: "Register in seconds and become part of a trusted blood donor network. Your journey to saving lives starts here.",
      icon: "https://cdn-icons-png.flaticon.com/128/16000/16000109.png",
    },
    {
      title: "Donate Blood",
      desc: "Find nearby requests or donation centers easily and contribute safely with proper guidance and scheduling.",
      icon: "https://cdn-icons-png.flaticon.com/128/893/893529.png",
    },
    {
      title: "Save Lives",
      desc: "Your one donation can save multiple lives. Be the reason someone gets a second chance at life.",
      icon: "https://cdn-icons-png.flaticon.com/128/17587/17587007.png",
    },
  ];

  return (
    <div className="py-16 px-4 md:px-10 bg-gray-50 ">
      <div data-aos="fade-up" className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl  font-bold text-gray-800 ">
          How <span className="text-red-600">{text}</span>
        </h1>
        <p className="mt-4 text-gray-600  text-sm md:text-base">
          A simple and effective process designed to connect donors with those
          in need. Follow these steps and become a real-life hero today.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            className="relative group bg-white  rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <img src={step.icon} alt="" className="w-8" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 ">
              {step.title}
            </h2>

            <p className="mt-3 text-sm text-gray-600  leading-relaxed">
              {step.desc}
            </p>

            <div className="absolute top-4 right-4 text-5xl font-bold text-gray-100  opacity-20">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodHiveWorks;
