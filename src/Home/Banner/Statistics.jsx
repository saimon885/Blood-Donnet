import React, { useEffect, useState } from "react";
import { FaUsers, FaHeartbeat, FaDonate } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUsers />,
    number: 400,
    label: "Active Donors",
    color: "text-red-500",
  },
  {
    icon: <FaHeartbeat />,
    number: 250,
    label: "Lives Saved",
    color: "text-pink-500",
  },
  {
    icon: <FaDonate />,
    number: 600,
    label: "Blood Donations",
    color: "text-primary",
  },
];

const Statistics = () => {
  const [counters, setCounters] = useState([0, 0, 0]);

  useEffect(() => {
    const incrementSpeed = 25; // ms
    const intervals = statsData.map((stat, i) => {
      return setInterval(() => {
        setCounters((prev) => {
          const newCounters = [...prev];
          if (newCounters[i] < stat.number) {
            const diff = Math.ceil(stat.number / 120); // smoother increment
            newCounters[i] += diff;
            if (newCounters[i] > stat.number) newCounters[i] = stat.number;
          }
          return newCounters;
        });
      }, incrementSpeed);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="py-14 bg-gray-50 ">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">
        BloodHive Impact
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`text-5xl md:text-6xl mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
              {counters[index]}+
            </h3>
            <p className="text-gray-600 mt-2 text-lg md:text-xl text-center font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-12 text-base md:text-lg px-4 md:px-0">
        BloodHive brings together donors and recipients to save lives. Join our
        community and make a difference today!
      </p>
    </div>
  );
};

export default Statistics;
