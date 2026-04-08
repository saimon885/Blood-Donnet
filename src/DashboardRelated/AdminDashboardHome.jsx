import React from "react";
import UseRole from "../AuthProvider/UseRole";
import UseAxiosSecure from "../AuthProvider/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { FaUsers, FaUserShield, FaHandsHelping, FaTint, FaArrowUp } from "react-icons/fa";
import { MdAttachMoney, MdDashboard, MdQueryStats } from "react-icons/md";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

const AdminDashboardHome = () => {
  const { role, isRoleLoading } = UseRole();
  const axiosSecure = UseAxiosSecure();

  const { data: totalDonorsData, isLoading: isDonorsCountLoading } = useQuery({
    queryKey: ["users-role-count"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/allusers/Role");
      return result.data;
    },
    enabled: !!role,
  });

  const { data: totalVolunteersData, isLoading: isVolunteersCountLoading } = useQuery({
    queryKey: ["volunteers-role-count"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/allVolunteers/Role");
      return result.data;
    },
    enabled: !!role,
  });

  const { data: totalAdminsData, isLoading: isAdminsCountLoading } = useQuery({
    queryKey: ["admins-role-count"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/allAdmins/Role");
      return result.data;
    },
    enabled: !!role,
  });

  const { data: allBloods } = useQuery({
    queryKey: ["all-bloods"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/allusers/bloods");
      return result.data;
    },
    enabled: !!role,
  });

  const { data: totalFundsData, isLoading: isFundsLoading } = useQuery({
    queryKey: ["checkout-session-status"],
    queryFn: async () => {
      const result = await axiosSecure.get("/checkout-session/paymentStatus");
      return result.data;
    },
    enabled: !!role,
  });

  const { data: stats } = useQuery({
    queryKey: ["donation-stats"],
    queryFn: async () => {
      const [all, pending, progress, completed] = await Promise.all([
        axiosSecure.get("/donners/DonnetionCount"),
        axiosSecure.get("/donners/PendingDonnetionCount"),
        axiosSecure.get("/donners/InprogressDonnetionCount"),
        axiosSecure.get("/donners/CompletedDonnetionCount"),
      ]);
      return {
        total: all.data[0]?.count || 0,
        pending: pending.data[0]?.count || 0,
        progress: progress.data[0]?.count || 0,
        completed: completed.data[0]?.count || 0,
      };
    },
    enabled: !!role,
  });

  if (isRoleLoading || isDonorsCountLoading || isFundsLoading || isVolunteersCountLoading || isAdminsCountLoading) return <Loading />;

  const userDistributionData = [
    { name: "Donors", value: totalDonorsData?.[0]?.count || 0 },
    { name: "Volunteers", value: totalVolunteersData?.[0]?.count || 0 },
    { name: "Admins", value: totalAdminsData?.[0]?.count || 0 },
  ];

  const donationFlowData = [
    { name: "Pending", value: stats?.pending },
    { name: "Process", value: stats?.progress },
    { name: "Done", value: stats?.completed },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 mb-8 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-200">
              <MdDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-none">Dashboard Overview</h1>
              <p className="text-gray-500 text-sm mt-1">Real-time metrics for {role} management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full border border-indigo-100">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            System Online
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Donors", val: totalDonorsData?.[0]?.count || 0, icon: <FaUsers />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Total Revenue", val: `$${totalFundsData?.[0]?.totalFund || 0}`, icon: <MdAttachMoney />, color: "text-emerald-600", bg: "bg-emerald-100" },
            { label: "Total Admins", val: totalAdminsData?.[0]?.count || 0, icon: <FaHandsHelping />, color: "text-amber-600", bg: "bg-amber-100" },
            { label: "Completed", val: stats?.completed || 0, icon: <FaTint />, color: "text-rose-600", bg: "bg-rose-100" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-300 transition-all duration-300">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                <h3 className="text-2xl font-extrabold text-gray-900">{item.val}</h3>
              </div>
              <div className={`${item.bg} ${item.color} p-4 rounded-xl text-xl group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <MdQueryStats className="text-indigo-600" size={20} /> Blood Stock Analytics
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Live Data</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={allBloods}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="bloodGroup" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#9ca3af" }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                  <Area type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="font-bold text-gray-800 w-full mb-6">User Distribution</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userDistributionData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                    {userDistributionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
              {userDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-gray-600 font-medium">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-gray-800 px-1">Blood Groups</h3>
            <div className="grid grid-cols-2 gap-3">
              {allBloods?.map((blood, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-rose-50 hover:border-rose-200 transition-colors group">
                  <span className="text-xl font-black text-rose-600 mb-1">{blood.bloodGroup}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-rose-400">{blood.count} Donors</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-8">Donation Progress Flow</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "12px" }} />
                  <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 6, 6]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;