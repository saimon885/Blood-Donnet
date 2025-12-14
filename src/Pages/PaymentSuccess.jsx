import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import Loading from "../Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({ loading: true });
  const sessionId = searchParams.get("session_id");
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/checkout-session?session_id=${sessionId}`)
        .then((res) => {
          const data = res.data;
          setPaymentInfo({
            transactionId: data.transactionId,
            trackingId: data.trackingId,
            amount: data.amount,
            funderName: data.funderName,
            loading: false,
            success: data.success,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  if (paymentInfo.loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-10 max-w-lg mx-5 md:mx-auto my-8  bg-green-50 border-t-4 border-green-500 rounded-lg shadow-xl">
      {" "}
      <h1 className="text-2xl font-extrabold text-green-700 mb-4">
        ✅ Funding Successful!
      </h1>
      <p className="mb-6 text-gray-700">
        Thank you,{" "}
        <span className="text-green-700 font-bold">
          {paymentInfo.funderName || "Funder"}
        </span>
        , for your generous support!
      </p>{" "}
      <div className="space-y-3 p-4 bg-white rounded-md border border-gray-200">
        <p className="text-lg font-semibold text-gray-800">
          Amount Funded:{" "}
          <span className="text-green-600">
            ${paymentInfo.amount?.toFixed(2) || "N/A"}
          </span>
        </p>{" "}
        <p className="text-sm text-gray-600">
          Transaction ID:{" "}
          <span className="font-mono break-all">
            {paymentInfo.transactionId || "N/A"}
          </span>
        </p>{" "}
        <p className="text-sm text-gray-600">
          Funding ID:{" "}
          <span className="font-mono break-all">
            {paymentInfo.trackingId || "N/A"}
          </span>
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default PaymentSuccess;
