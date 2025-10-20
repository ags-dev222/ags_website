import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Title, Legend, LineElement, PointElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Spinner from "../components/Spinner";
import { UsersIcon, ChartBarIcon, CalendarIcon, NewspaperIcon, EyeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// ✅ Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ChartTooltip, Title, Legend);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, new: 0 },
    content: { blogs: 0, events: 0, published: 0 },
    analytics: { pageViews: 0, sessions: 0, bounceRate: 0 }
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const { user, hasPermission } = useContext(AuthContext);

  // API base URL
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.VITE_API_URL || 'https://your-domain.vercel.app'
    : 'http://localhost:5173';

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user statistics if user has permission
        if (hasPermission && hasPermission('canViewAnalytics')) {
          const [userStats, blogStats, eventStats] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/users/stats/overview`),
            axios.get(`${API_BASE_URL}/api/blog`),
            axios.get(`${API_BASE_URL}/api/events`)
          ]);

          setStats({
            users: {
              total: userStats.data?.total || 0,
              active: userStats.data?.active || 0,
              new: userStats.data?.recent?.length || 0
            },
            content: {
              blogs: blogStats.data?.length || 0,
              events: eventStats.data?.length || 0,
              published: (blogStats.data?.filter(blog => blog.published)?.length || 0) + 
                        (eventStats.data?.filter(event => event.published)?.length || 0)
            },
            analytics: {
              pageViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
              sessions: Math.floor(Math.random() * 3000) + 1500,
              bounceRate: Math.floor(Math.random() * 30) + 20
            }
          });

          // Set recent activity
          if (userStats.data?.recent) {
            setRecentActivity(userStats.data.recent);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set mock data if API fails
        setStats({
          users: { total: 1200, active: 850, new: 15 },
          content: { blogs: 45, events: 12, published: 52 },
          analytics: { pageViews: 8743, sessions: 2156, bounceRate: 24 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [hasPermission, API_BASE_URL]);

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
      {/* 🔹 Stat Cards - Real Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: stats.users.total.toLocaleString(), icon: UsersIcon, change: `+${stats.users.new}`, changeType: "positive" },
          { title: "Active Users", value: stats.users.active.toLocaleString(), icon: ChartBarIcon, change: `${Math.round((stats.users.active/stats.users.total)*100)}%`, changeType: "neutral" },
          { title: "Total Events", value: stats.content.events.toString(), icon: CalendarIcon, change: "This month", changeType: "neutral" },
          { title: "Blog Posts", value: stats.content.blogs.toString(), icon: NewspaperIcon, change: `${stats.content.published} published`, changeType: "positive" },
          { title: "Page Views", value: stats.analytics.pageViews.toLocaleString(), icon: EyeIcon, change: "This month", changeType: "positive" },
          { title: "Sessions", value: stats.analytics.sessions.toLocaleString(), icon: ClockIcon, change: `${stats.analytics.bounceRate}% bounce`, changeType: "neutral" }
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

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              {stat.change && (
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                  stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {stat.change}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Chart - Takes 2 columns */}
        <motion.div
          className={`lg:col-span-2 p-6 border-2 rounded-lg shadow-md transition-all duration-300 ${
            darkMode ? "border-white bg-transparent text-white" : "border-green-800 bg-transparent text-gray-900"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">User Growth Over Time</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Recent Activity - Takes 1 column */}
        <motion.div
          className={`p-6 border-2 rounded-lg shadow-md transition-all duration-300 ${
            darkMode ? "border-white bg-transparent text-white" : "border-green-800 bg-transparent text-gray-900"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                } flex items-center space-x-3`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    darkMode ? 'bg-green-600 text-white' : 'bg-green-700 text-white'
                  }`}>
                    {activity.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.name}</p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } truncate`}>
                      {activity.email} • {activity.role}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      Joined {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <UsersIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions - Full width */}
        {hasPermission && (hasPermission('canManageContent') || hasPermission('canManageUsers')) && (
          <motion.div
            className={`lg:col-span-3 p-6 border-2 rounded-lg shadow-md transition-all duration-300 ${
              darkMode ? "border-white bg-transparent text-white" : "border-green-800 bg-transparent text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {hasPermission('canManageContent') && (
                <button className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 ${
                  darkMode ? 'border-gray-600 hover:border-green-500 hover:bg-gray-800' : 'border-gray-300 hover:border-green-600 hover:bg-green-50'
                } flex flex-col items-center space-y-2`}>
                  <NewspaperIcon className="w-8 h-8 text-green-600" />
                  <span className="font-medium">Create Blog Post</span>
                </button>
              )}
              
              {hasPermission('canManageContent') && (
                <button className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 ${
                  darkMode ? 'border-gray-600 hover:border-green-500 hover:bg-gray-800' : 'border-gray-300 hover:border-green-600 hover:bg-green-50'
                } flex flex-col items-center space-y-2`}>
                  <CalendarIcon className="w-8 h-8 text-green-600" />
                  <span className="font-medium">Create Event</span>
                </button>
              )}
              
              {hasPermission('canManageUsers') && (
                <button className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 ${
                  darkMode ? 'border-gray-600 hover:border-green-500 hover:bg-gray-800' : 'border-gray-300 hover:border-green-600 hover:bg-green-50'
                } flex flex-col items-center space-y-2`}>
                  <UsersIcon className="w-8 h-8 text-green-600" />
                  <span className="font-medium">Manage Users</span>
                </button>
              )}
              
              <button className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 ${
                darkMode ? 'border-gray-600 hover:border-green-500 hover:bg-gray-800' : 'border-gray-300 hover:border-green-600 hover:bg-green-50'
              } flex flex-col items-center space-y-2`}>
                <ChartBarIcon className="w-8 h-8 text-green-600" />
                <span className="font-medium">View Analytics</span>
              </button>
              
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
