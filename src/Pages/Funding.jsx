import React from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Funding = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data } = useQuery({
    queryKey: ["checkout-session"],
    queryFn: async () => {
      const result = await axiosSecure.get(`checkout-session`);
      return result.data;
    },
  });
  console.log(data);
  const fundAmount = 50;
  const handleGiveFundClick = async () => {
    const paymentInfo = {
      funderName: user?.displayName,
      funder_email: user?.email,
      fundAmount: fundAmount,
    };
    const res = await axiosSecure.post("/checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Funding</h1>
        <button
          onClick={handleGiveFundClick}
          className="px-4 py-2 text-white bg-secondary rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.funderName}</td>
                <td>$ {item.amount}</td>
                <td>{item.paidAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
