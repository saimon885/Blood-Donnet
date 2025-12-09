import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UseAuth from "../AuthProvider/UseAuth";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { ImBin2 } from "react-icons/im";

const MyDonnetionRequest = () => {
  const { user } = UseAuth();
  const [donnerDetails, setDonnerDetails] = useState([]);
  console.log(donnerDetails);
  const modalRef = useRef(null);
  const axiosSecure = UseAxiosSecure();
  const { data: donners = [] } = useQuery({
    queryKey: ["donners", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donners?email=${user.email}`);
      return result.data;
    },
  });
  //   view table
  const handleViews = (data) => {
    modalRef.current.showModal();
    setDonnerDetails(data);
  };
  return (
    <div>
      <div>
        <h2>Total donners {donners.length}</h2>
        <div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead className="bg-secondary text-white">
                <tr>
                  <th>#</th>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donners.map((donner, index) => (
                  <tr key={donner._id}>
                    <th>{index + 1}</th>
                    <td>{donner.recipientName}</td>
                    <td>
                      {donner.recipentDistrict},{donner.recipientUpazila}
                    </td>
                    <td>{donner.donetionDate}</td>
                    <td>{donner.donetionTime}</td>
                    <td>{donner.Blood}</td>
                    <td>{donner.status}</td>
                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => handleViews(donner)}
                        className="btn btn-small"
                      >
                        <FaRegEye />
                      </button>
                      <button className="btn btn-small">
                        <MdModeEdit />
                      </button>
                      <button className="btn btn-small">
                        <ImBin2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
            <div>
              <div>
                <div>
                  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                      {/* head */}
                      <thead className="bg-secondary text-white">
                        <tr>
                          <th>Recipient Name</th>
                          <th>Location</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Blood Group</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{donnerDetails.recipientName}</td>
                          <td>
                            {donnerDetails.recipentDistrict},
                            {donnerDetails.recipientUpazila}
                          </td>
                          <td>{donnerDetails.donetionDate}</td>
                          <td>{donnerDetails.donetionTime}</td>
                          <td>{donnerDetails.Blood}</td>
                          <td>{donnerDetails.status}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyDonnetionRequest;
