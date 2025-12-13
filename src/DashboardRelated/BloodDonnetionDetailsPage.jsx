import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";

const BloodDonnetionDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  console.log(id);
  const { data: donnersDetails = [] } = useQuery({
    queryKey: ["donners", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/${id}`);
      return result.data;
    },
  });
  console.log(donnersDetails);
  return (
    <div className="max-w-md p-3 mx-auto">
      <h3 className="font-bold text-lg">Donnetion Details</h3>
      <div className="py-4 ">
        <div>
          <div className="rounded-2xl border border-base-content/5 bg-base-100 shadow-xl">
            <div className="bg-secondary text-white p-3">
              <h2 className="text-lg font-bold">Donner All Information</h2>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Requester Name :</span>
                <span className="text-right">
                  {donnersDetails.requesterName}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Requester Email :</span>
                <span className="text-right">
                  {donnersDetails.requesterEmail}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Recipient Name :</span>
                <span className="text-right">
                  {donnersDetails.recipientName}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Location :</span>
                <span className="text-right">
                  {donnersDetails.recipentDistrict},
                  {donnersDetails.recipientUpazila}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Blood Group :</span>
                <span className="text-right">{donnersDetails.Blood}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">HospitalName :</span>
                <span className="text-right">
                  {donnersDetails.hospitalName}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Address :</span>
                <span className="text-right">{donnersDetails.address}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Donnetion Time And Date :</span>
                <span className="text-right">
                  {donnersDetails.donetionDate} / {donnersDetails.donetionTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Request Message :</span>
                <span className="text-right">
                  {donnersDetails.requestMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonnetionDetailsPage;
