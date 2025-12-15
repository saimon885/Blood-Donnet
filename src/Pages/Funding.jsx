import React, { useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaSackDollar } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import Loading from "../Loading/Loading";

const formatUtcDate = (utcString) => {
  if (!utcString) return "N/A";
  return format(parseISO(utcString), "MMM dd, yyyy | hh:mm a");
};

const Funding = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [customFundAmount, setCustomFundAmount] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["checkout-session"],
    queryFn: async () => {
      const result = await axiosSecure.get(`checkout-session`);
      return result.data;
    },
  });

  const handleGiveFundClick = async () => {
    const amountToSend = parseFloat(customFundAmount);
    if (isNaN(amountToSend) || amountToSend <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    const paymentInfo = {
      funderName: user?.displayName,
      funder_email: user?.email,
      fundAmount: amountToSend,
    };
    try {
      const res = await axiosSecure.post("/checkout-session", paymentInfo);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <FaSackDollar className="text-primary-500" /> Fund History &
          Contribution
        </h1>

      
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
   
          <div className="relative w-full sm:w-40">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-semibold">
              $
            </span>
            <input
              type="number"
              min="1"
              required
              value={customFundAmount || ""}
              onChange={(e) => setCustomFundAmount(e.target.value)}
              placeholder="Amount"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </div>

          {/* Give Fund Button */}
          <button
            onClick={handleGiveFundClick}
            disabled={!customFundAmount || parseFloat(customFundAmount) <= 0}
            className="w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <span>Contribute Now</span>{" "}
            <AiFillDollarCircle className="text-xl" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Recent Contributions
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
     
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                S/N
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Funder Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date & Time
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/50 transition duration-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {item.funderName || "Anonymous"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                    $ {parseFloat(item.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatUtcDate(item.paidAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No funding history found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
