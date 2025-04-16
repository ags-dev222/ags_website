import { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Title, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Spinner from "../components/Spinner";
import { UsersIcon, ChartBarIcon, CalendarIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../context/ThemeContext";

// ✅ Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Title, Legend);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <Spinner />;

  // ✅ Chart Data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [120, 300, 450, 600, 750, 900],
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(16, 185, 129, 0.2)",
        borderColor: darkMode ? "#ffffff" : "#059669",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  // ✅ Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className={`p-6 space-y-6 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* 🔹 Stat Cards - Updated */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "1,200", icon: UsersIcon },
          { title: "Active Users", value: "850", icon: ChartBarIcon },
          { title: "Upcoming Events", value: "15", icon: CalendarIcon },
          { title: "Published Blogs", value: "45", icon: NewspaperIcon }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`p-6 border-2 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300 ${
              darkMode ? "border-white text-white bg-opacity-10" : "border-green-800 text-green-800 bg-green-50"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {/* Icon Fix - Adjust Color Based on Theme */}
            <div
              className={`p-3 rounded-full transition ${
                darkMode ? "bg-white bg-opacity-20" : "bg-green-800 bg-opacity-10"
              }`}
            >
              <stat.icon className={`w-10 h-10 ${darkMode ? "text-green-500" : "text-white"}`} />
            </div>

            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Outlined Bar Chart Section */}
      <motion.div
        className={`p-6 border-2 rounded-lg shadow-md transition-all duration-300 ${
          darkMode ? "border-white bg-transparent text-white" : "border-green-800 bg-transparent text-gray-900"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg font-semibold mb-3">User Growth Over Time</h2>
        <div className="h-72">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
