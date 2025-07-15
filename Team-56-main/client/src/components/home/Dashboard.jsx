import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
} from "recharts";
import {
  FiHome,
  FiBarChart2,
  FiUser,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";

const dataLine = [
  { name: "Jan", hours: 4, target: 5 },
  { name: "Feb", hours: 6, target: 5 },
  { name: "Mar", hours: 5, target: 5 },
  { name: "Apr", hours: 7, target: 6 },
  { name: "May", hours: 9, target: 6 },
  { name: "Jun", hours: 8, target: 6 },
  { name: "Jul", hours: 10, target: 7 },
];

const dataPie = [
  { name: "Individual", value: 40 },
  { name: "Group", value: 30 },
  { name: "Workshop", value: 20 },
  { name: "Online", value: 10 },
];

const dataBar = [
  { day: "Mon", sessions: 4, students: 12 },
  { day: "Tue", sessions: 3, students: 9 },
  { day: "Wed", sessions: 2, students: 6 },
  { day: "Thu", sessions: 5, students: 15 },
  { day: "Fri", sessions: 3, students: 8 },
];

const dataRadar = [
  { subject: "Communication", A: 85, fullMark: 100 },
  { subject: "Mentoring", A: 78, fullMark: 100 },
  { subject: "Planning", A: 92, fullMark: 100 },
  { subject: "Creativity", A: 80, fullMark: 100 },
  { subject: "Teamwork", A: 88, fullMark: 100 },
];

const dataArea = [
  { month: "Jan", students: 30, hours: 20 },
  { month: "Feb", students: 35, hours: 25 },
  { month: "Mar", students: 40, hours: 22 },
  { month: "Apr", students: 45, hours: 30 },
  { month: "May", students: 50, hours: 35 },
  { month: "Jun", students: 55, hours: 40 },
  { month: "Jul", students: 60, hours: 45 },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Workshop on Digital Literacy",
    date: "15 Aug 2023",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Group Mentoring Session",
    date: "18 Aug 2023",
    time: "2:30 PM",
  },
  { id: 3, title: "Volunteer Training", date: "22 Aug 2023", time: "11:00 AM" },
];

const notifications = [
  { id: 1, message: "New student assigned to you", time: "2 hours ago" },
  { id: 2, message: "Workshop schedule updated", time: "1 day ago" },
  { id: 3, message: "Your monthly report is ready", time: "2 days ago" },
];

const COLORS = ["#FFD700", "#001f3f", "#0066cc", "#003366"];
const AREA_COLORS = ["#FFD700", "#001f3f"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserData = localStorage.getItem("userData");

    if (!isLoggedIn || !storedUserData) {
      navigate("/login");
      return;
    }

    try {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#001f3f]"></div>
          <p className="mt-4 text-[#001f3f]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001f3f] shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-yellow-400">Edu Hub</h2>
          <p className="text-sm text-white mt-1">Volunteer Dashboard</p>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "dashboard"
                ? "bg-[#00326a] text-yellow-400 border-r-4 border-yellow-400"
                : "text-white hover:bg-[#00326a]"
            }`}
          >
            <FiHome className="mr-3" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "progress"
                ? "bg-[#00326a] text-yellow-400 border-r-4 border-yellow-400"
                : "text-white hover:bg-[#00326a]"
            }`}
          >
            <FiBarChart2 className="mr-3" /> My Progress
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "students"
                ? "bg-[#00326a] text-yellow-400 border-r-4 border-yellow-400"
                : "text-white hover:bg-[#00326a]"
            }`}
          >
            <FiUser className="mr-3" /> My Students
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "events"
                ? "bg-[#00326a] text-yellow-400 border-r-4 border-yellow-400"
                : "text-white hover:bg-[#00326a]"
            }`}
          >
            <FiCalendar className="mr-3" /> Events
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "settings"
                ? "bg-[#00326a] text-yellow-400 border-r-4 border-yellow-400"
                : "text-white hover:bg-[#00326a]"
            }`}
          >
            <FiSettings className="mr-3" /> Settings
          </button>
        </nav>
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-yellow-400 transition-colors"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#f0f4f8]">
        <header className="bg-[#001f3f] shadow-sm text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              Welcome, {userData.name.split(" ")[0]}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-white hover:text-yellow-400">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-yellow-400 rounded-full text-xs text-[#001f3f] flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative p-2 text-white hover:text-yellow-400">
                <FiMessageSquare size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-yellow-400 rounded-full text-xs text-[#001f3f] flex items-center justify-center">
                  2
                </span>
              </button>
              <div className="flex items-center">
                <img
                  src={userData.avatar}
                  className="h-10 w-10 rounded-full border-2 border-yellow-400"
                  alt="avatar"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-yellow-400 capitalize">
                    {userData.role}
                  </p>
                  {userData.id && (
                    <p className="text-xs text-gray-300">ID: {userData.id}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">
                    Total Hours
                  </p>
                  <p className="text-3xl font-bold text-[#001f3f] mt-1">120</p>
                  <p className="text-xs text-green-500 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FiBarChart2 className="text-[#001f3f]" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">
                    Students Assigned
                  </p>
                  <p className="text-3xl font-bold text-[#001f3f] mt-1">15</p>
                  <p className="text-xs text-green-500 mt-1">
                    +3 new this month
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FiUser className="text-[#001f3f]" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">
                    Sessions Conducted
                  </p>
                  <p className="text-3xl font-bold text-[#001f3f] mt-1">42</p>
                  <p className="text-xs text-green-500 mt-1">+8 this month</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FiCalendar className="text-[#001f3f]" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">
                    Events Attended
                  </p>
                  <p className="text-3xl font-bold text-[#001f3f] mt-1">8</p>
                  <p className="text-xs text-green-500 mt-1">+2 this month</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FiCalendar className="text-[#001f3f]" size={24} />
                </div>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Hours Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#001f3f]">
                  Monthly Hours
                </h3>
                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-4">
                    <div className="h-3 w-3 bg-[#001f3f] rounded-full mr-1"></div>
                    <span>Actual</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></div>
                    <span>Target</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={dataLine}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
                  <YAxis tick={{ fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.5rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    fill="#ccd9e6"
                    stroke="#001f3f"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#FFD700"
                    strokeDasharray="5 5"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Sessions Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#001f3f]">
                  Weekly Sessions
                </h3>
                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-4">
                    <div className="h-3 w-3 bg-[#001f3f] rounded-full mr-1"></div>
                    <span>Sessions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></div>
                    <span>Students</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataBar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fill: "#6B7280" }} />
                  <YAxis tick={{ fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.5rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="sessions"
                    fill="#001f3f"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="students"
                    fill="#FFD700"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* More Charts & Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Session Types */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">
                Session Types
              </h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dataPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {dataPie.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} hours`, "Value"]}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {dataPie.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Assessment */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">
                Skills Assessment
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius={80} data={dataRadar}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "#6B7280" }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#001f3f"
                    fill="#FFD700"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.5rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#001f3f]">
                  Upcoming Events
                </h3>
                <button className="text-sm text-[#001f3f] hover:text-yellow-500">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-l-4 border-yellow-400 pl-4 py-2"
                  >
                    <p className="font-medium text-[#001f3f]">{event.title}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FiCalendar className="mr-1" size={14} />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-[#001f3f] text-white py-2 rounded-md hover:bg-[#00326a] transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>

          {/* Student Impact Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">
                Student Impact
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-[#001f3f] text-white rounded-md">
                  Monthly
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-[#001f3f] rounded-md hover:bg-yellow-100">
                  Yearly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dataArea}>
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#001f3f" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#001f3f" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: "#6B7280" }} />
                <YAxis tick={{ fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "none",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#001f3f"
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#FFD700"
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
