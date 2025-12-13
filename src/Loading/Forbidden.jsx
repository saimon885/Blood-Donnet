import React from "react";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div
        className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                           transform transition-all duration-500 hover:scale-[1.01] border-t-8 border-red-600"
      >
        <div className="text-center">
          <FaLock
            className="mx-auto text-red-600 dark:text-red-500 w-16 h-16 
                                   animate-bounce"
          />
          <h1 className="mt-4 text-7xl font-extrabold text-gray-900 dark:text-gray-100 border-b pb-3 mb-4">
            403
          </h1>
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-500">
            Forbidden Access
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            Sorry! You do not have permission to view this page. You cannot
            access this resource according to your account role.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoHome}
            className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg 
                                   shadow-md hover:bg-red-700 transition duration-300 
                                   focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            ⬅
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
