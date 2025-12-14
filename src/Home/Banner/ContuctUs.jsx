import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContuctUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const { register, handleSubmit, reset } = useForm();
  const submitContuctForm = () => {
    toast.success("Submit Successfull ✅");
    reset();
  };
  return (
    <div className="mx-5" data-aos="fade-up">
      <h2 className="text-4xl text-center font-bold text-primary">
        Contact Us
      </h2>
      <div className="hero my-15">
        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Contact</h1>

            <form onSubmit={handleSubmit(submitContuctForm)}>
              <fieldset className="fieldset">
                <label className="label font-medium">Your Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your email"
                />
                <label className="label font-medium">Your Phone Number</label>
                <input
                  type="number"
                  {...register("number", { required: true })}
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your Number"
                />

                <label className="label font-medium"> Your Messege</label>
                <textarea
                  className="input h-35 rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  {...register("messege", { required: true })}
                  placeholder="Enter Your Messege"
                  cols="30"
                  rows="10"
                ></textarea>

                <button className="btn text-white rounded-2xl btn-secondary mt-4">
                  Send Messege
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContuctUs;
