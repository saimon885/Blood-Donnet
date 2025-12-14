import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import UseAuth from "../AuthProvider/UseAuth";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const BloodDonnetionDetailsPage = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const modalRef = useRef(null);

  const {
    data: donnersDetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donners", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners/${id}`);
      return result.data;
    },
    enabled: !!id,
  });

  const handleDonation = () => {
    modalRef.current.showModal();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleConfirmDonation = (donor) => {
    const updateInfo = {
      status: "in-progress",
    };
    axiosSecure.patch(`/donners/${donor._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        modalRef.current.close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `donnetion Confirm`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="max-w-md p-3 mx-auto">
      <div className="py-4 ">
        <div>
          <div className="rounded-2xl border border-base-content/5 bg-base-100 shadow-xl">
            <div className="bg-primary text-white p-3">
              <h2 className="text-lg font-bold">Donner Details</h2>
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
              <button
                onClick={() => handleDonation()}
                className="btn btn-secondary"
              >
                Donation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Donation Details</h3>
          <div className="py-4">
            <div>
              <div className="">
                <span className="font-semibold">Name :</span>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  readOnly
                  className="input w-full"
                />
              </div>
              <div className="my-2">
                <span className="font-semibold">Email :</span>
                <input
                  type="text"
                  defaultValue={user.email}
                  readOnly
                  className="input w-full"
                />
              </div>
            </div>
          </div>
          <div className="modal-action">
            {user?.email === donnersDetails.requesterEmail ? (
              ""
            ) : (
              <button
                onClick={() => handleConfirmDonation(donnersDetails)}
                className="btn btn-secondary text-white"
              >
                Confirm Donation
              </button>
            )}
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BloodDonnetionDetailsPage;
