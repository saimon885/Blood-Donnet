import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdEmail, MdPhone, MdMessage } from "react-icons/md";

const ContuctUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitContuctForm = (data) => {
    const emailTo = "saimonhossan34567@gmail.com";
    const subject = encodeURIComponent("Contact from Blood Donation Website");
    const body = encodeURIComponent(
      `From: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`,
    );

    // eslint-disable-next-line react-hooks/immutability
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    toast.success("Redirecting to your email app... 🚀");
    reset();
  };

  return (
    <div className="px-4 md:px-0 md:max-w-4xl mx-auto my-16" data-aos="fade-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Contact Us
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Have questions or feedback? We’d love to hear from you.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-6 md:p-10">
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

          <form
            onSubmit={handleSubmit(submitContuctForm)}
            className="space-y-5"
          >
            <div>
              <label className="label font-medium flex items-center gap-2">
                <MdEmail className="text-primary" /> Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="label font-medium flex items-center gap-2">
                <MdPhone className="text-primary" /> Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="input border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number is required
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium flex items-center gap-2">
                <MdMessage className="text-primary" /> Message
              </label>
              <textarea
                {...register("message", { required: true })}
                className="textarea border border-gray-300 w-full rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your message..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">Message is required</p>
              )}
            </div>

            <button className="btn btn-primary w-full text-white rounded-xl mt-2 hover:scale-[1.02] transition duration-300 border-none">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ContuctUs;
