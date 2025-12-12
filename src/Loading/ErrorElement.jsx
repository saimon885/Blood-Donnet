import React from "react";
import { FaGlobe, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const ErrorElement = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div
        className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                           transform transition-all duration-500 border-t-8 border-red-600"
      >
        <div className="text-center">
          <div className="relative inline-block">
            <h1
              className="text-9xl font-extrabold text-red-600 dark:text-indigo-500 
                                       animate-pulse"
            >
              404
            </h1>
            <FaGlobe className="absolute bottom-4 right-[-20px] text-red-400 dark:text-indigo-300 w-12 h-12" />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            Sorry, the page you are looking for has either been deleted or the
            address is incorrect.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Please return to the homepage using the button below.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoHome}
            className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg 
                                   shadow-md hover:bg-red-800 transition duration-300 
                                   focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            <FaArrowLeft className="inline mr-2" />
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
