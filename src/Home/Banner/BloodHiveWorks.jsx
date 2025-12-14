import Aos from "aos";
import React, { useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";

const BloodHiveWorks = () => {
  const [text] = useTypewriter({
    words: [" BloodHive Works"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  useEffect(() => {
    Aos.init({
      duration: 900,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="my-8 mx-5">
      <h1 className="text-4xl font-bold text-primary text-center">
        How {text}
      </h1>
      <div className="flex flex-col md:flex-row justify-between gap-8 items-center mt-5">
        <div className="text-center mx-auto transition-all duration-300 hover:-translate-y-2 bg-white shadow-xl p-9 space-y-3 rounded-2xl ">
          <img
            className="mx-auto w-[40px]"
            src="https://cdn-icons-png.flaticon.com/128/16000/16000109.png"
            alt=""
          />
          <h2 className="font-bold">Sign Up</h2>
          <p className="text-[14px] text-accent">
            Become a registered donor in minutes and join our lifesaving
            community. Verify your details securely.
          </p>
        </div>
        <div className="text-center mx-auto transition-all duration-300 hover:-translate-y-2 bg-white shadow-xl p-9 space-y-3 rounded-2xl ">
          <img
            className="mx-auto w-[40px]"
            src="https://cdn-icons-png.flaticon.com/128/893/893529.png"
            alt=""
          />
          <h2 className="font-bold">Donate Blood</h2>
          <p className="text-[14px] text-accent">
            Find nearby donation events or hospitals to give your blood safely.
            Schedule appointments easily.
          </p>
        </div>
        <div className="text-center mx-auto transition-all duration-300 hover:-translate-y-2 bg-white shadow-xl p-9 space-y-3 rounded-2xl ">
          <img
            className="mx-auto w-[40px]"
            src="https://cdn-icons-png.flaticon.com/128/17587/17587007.png"
            alt=""
          />
          <h2 className="font-bold">Save Lives</h2>
          <p className="text-[14px] text-accent">
            Your donation reaches patients in need across Bangladesh,
            potentially saving up to three lives per pint.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodHiveWorks;
