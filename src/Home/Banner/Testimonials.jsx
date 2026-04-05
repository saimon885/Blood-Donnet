import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Recipient",
    message:
      "Thanks to BloodHive, I received blood in time and survived. Truly grateful!",
  },
  {
    name: "David M.",
    role: "Donor",
    message:
      "Donating blood through BloodHive was easy and safe. Felt amazing to help someone!",
  },
  {
    name: "Amina R.",
    role: "Recipient",
    message:
      "The process was smooth and professional. BloodHive saved my brother's life.",
  },
];

const Testimonials = () => {
  return (
    <div className="mb-14 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Success Stories
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-4 md:px-0">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 w-full "
          >
            <div className="text-primary text-3xl mb-4">
              <FaQuoteLeft />
            </div>
            <p className="text-gray-700 mb-4">"{t.message}"</p>
            <h4 className="font-semibold">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;