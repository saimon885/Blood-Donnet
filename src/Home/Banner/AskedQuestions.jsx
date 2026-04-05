import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Anyone aged between 18–60 years, weighing at least 50kg, and in good health can donate blood. Avoid donating if you have recent tattoos, infections, or travel to high-risk areas.",
  },
  {
    question: "How often can I donate?",
    answer:
      "Men can donate whole blood every 3 months, and women every 4 months. Platelet donation can be done more frequently depending on health condition.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes, blood donation is completely safe. Sterile, single-use equipment is used, and trained professionals ensure proper screening before donation.",
  },
  {
    question: "How long does it take?",
    answer:
      "The whole process takes around 30–45 minutes, while the actual blood donation only takes about 8–10 minutes.",
  },
  {
    question: "What should I do before donating?",
    answer:
      "Drink plenty of water, eat a healthy meal, and get enough sleep before donating blood.",
  },
];

const AskedQuestions = () => {
  return (
    <div className="px-4 md:px-0 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 text-primary mb-2">
          <FaQuestionCircle size={24} />
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-gray-500 text-sm md:text-base">
          Answers to all common questions in one place — clear up confusion
          about blood donation.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="collapse-title font-semibold text-base md:text-lg flex items-center gap-2">
              <MdBloodtype className="text-primary" size={20} />
              {faq.question}
            </div>
            <div className="collapse-content text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          Still have questions? Contact support or visit nearest blood bank.
        </p>
      </div>
    </div>
  );
};

export default AskedQuestions;
