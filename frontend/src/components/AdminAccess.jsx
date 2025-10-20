import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CogIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';

const AdminAccess = () => {
  const [user, setUser] = useState(null);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in and has admin privileges
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // Only show admin access for SuperAdmin, Admin, and Editor roles
      if (['superadmin', 'admin', 'editor'].includes(parsedUser.role)) {
        setUser(parsedUser);
      }
    }
  }, []);

  // Don't render if user is not an admin
  if (!user) return null;

  const adminOptions = [
    {
      title: 'Dashboard',
      description: 'Analytics & Overview',
      icon: ChartBarIcon,
      action: () => window.open('http://localhost:5175/dashboard', '_blank'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Content Management',
      description: 'Blogs, Events, Resources',
      icon: CogIcon,
      action: () => window.open('http://localhost:5175/content', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'User Management',
      description: 'Roles & Permissions',
      icon: UserGroupIcon,
      action: () => window.open('http://localhost:5175/users', '_blank'),
      color: 'from-purple-500 to-purple-600',
      adminOnly: true // Only for SuperAdmin and Admin
    },
    {
      title: 'Role Requests',
      description: 'Approve/Reject Requests',
      icon: ShieldCheckIcon,
      action: () => window.open('http://localhost:5175/role-requests', '_blank'),
      color: 'from-orange-500 to-orange-600',
      superAdminOnly: true // Only for SuperAdmin
    }
  ];

  const filteredOptions = adminOptions.filter(option => {
    if (option.superAdminOnly && user.role !== 'superadmin') return false;
    if (option.adminOnly && !['superadmin', 'admin'].includes(user.role)) return false;
    return true;
  });

  return (
    <div className="relative">
      {/* Admin Access Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
      >
        <CogIcon className="w-5 h-5" />
        <span className="font-medium">Admin Panel</span>
        <motion.div
          animate={{ rotate: isAdminMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Admin Menu Dropdown */}
      <AnimatePresence>
        {isAdminMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsAdminMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Admin Panel</h3>
                    <p className="text-indigo-100 text-sm">Welcome, {user.name}</p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Access Options */}
              <div className="p-4 space-y-2">
                {filteredOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        option.action();
                        setIsAdminMenuOpen(false);
                      }}
                      className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {option.title}
                        </h4>
                        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                          {option.description}
                        </p>
                      </div>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Secure Admin Access
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open('http://localhost:5175', '_blank');
                      setIsAdminMenuOpen(false);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                  >
                    <span>Open Full Panel</span>
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAccess;
