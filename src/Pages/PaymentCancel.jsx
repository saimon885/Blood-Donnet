import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 text-center border-t-8 border-red-500">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          🚫 Payment Cancelled
        </h2>
        <p className="text-base text-gray-500 mb-8">
          The transaction was not completed. Please try again or contact support
          if the issue persists.
        </p>
        <Link to={"/funding"} className="block w-full">
          <button className="w-full px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-red-300">
            Try Funding Again
          </button>
        </Link>
        <div className="mt-4 text-sm text-gray-400">Need help? Contact us.</div>
      </div>
    </div>
  );
};

export default PaymentCancel;
