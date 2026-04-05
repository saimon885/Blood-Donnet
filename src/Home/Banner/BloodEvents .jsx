import React from "react";
import { MdEvent } from "react-icons/md";
import Swal from "sweetalert2";

const events = [
  {
    title: "Community Blood Drive - Dhaka City",
    date: "Apr 20, 2026",
    registrationStart: "Apr 15, 2026",
    location: "Dhaka City Hall",
  },
  {
    title: "University Blood Camp - Chittagong",
    date: "Apr 20, 2026",
    registrationStart: "Apr 10, 2026",
    location: "Chittagong University",
  },
  {
    title: "Corporate Blood Donation - Sylhet",
    date: "May 5, 2026",
    registrationStart: "Apr 28, 2026",
    location: "Sylhet Corporate Park",
  },
];

const BloodEvents = () => {
  const handleJoinClick = (event) => {
    Swal.fire({
      title: "Registration Not Open Yet!",
      text: `There is still plenty of time left for this event. Registration for "${event.title}" will officially begin on ${event.registrationStart}. Please stay tuned!`,
      icon: "info",
      confirmButtonText: "Got it!",
      confirmButtonColor: "#ef4444",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <div className="bg-gray-50 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Upcoming Blood Drives
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-5 px-4 md:px-0">
        {events.map((event, index) => (
          <div
            key={index}
            className="border border-base-300 bg-white rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 w-full"
          >
            <div className="flex items-center gap-2 text-primary mb-3">
              <MdEvent size={24} />
              <h3 className="font-semibold text-lg">{event.title}</h3>
            </div>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Date:</span> {event.date}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-medium">Location:</span> {event.location}
            </p>
            <button
              onClick={() => handleJoinClick(event)}
              className="btn btn-primary w-full rounded-xl text-white"
            >
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodEvents;
