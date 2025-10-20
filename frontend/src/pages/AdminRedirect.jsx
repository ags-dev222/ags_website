import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, CogIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const AdminRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // If user has admin privileges, redirect immediately
      if (['superadmin', 'admin', 'editor'].includes(parsedUser.role)) {
        window.location.href = 'http://localhost:5175';
        return;
      }
    }

    // Countdown for non-admin users or non-logged-in users
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to login page or main site
          window.location.href = user ? '/' : '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  const handleDirectAccess = () => {
    if (user && ['superadmin', 'admin', 'editor'].includes(user.role)) {
      window.location.href = 'http://localhost:5175';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl text-white text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
          >
            {user && ['superadmin', 'admin', 'editor'].includes(user.role) ? (
              <CogIcon className="w-10 h-10 text-white" />
            ) : (
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            )}
          </motion.div>

          {/* Content based on user status */}
          {user && ['superadmin', 'admin', 'editor'].includes(user.role) ? (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Welcome, {user.name}!
              </h1>
              <p className="text-white/80 mb-6">
                Redirecting you to the Admin Panel...
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-sm text-white/60 mb-2">Your Role:</div>
                <div className="text-lg font-semibold text-green-300 uppercase">
                  {user.role}
                </div>
              </div>
            </>
          ) : user ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-yellow-300">
                Access Restricted
              </h1>
              <p className="text-white/80 mb-6">
                Hi {user.name}! You don't have admin privileges. 
                Redirecting you back to the main website...
              </p>
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6">
                <div className="text-sm text-red-200">
                  Your current role: <span className="font-semibold">{user.role}</span>
                </div>
                <div className="text-xs text-red-300 mt-1">
                  Contact an administrator to request elevated permissions.
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Admin Panel Access
              </h1>
              <p className="text-white/80 mb-6">
                Please log in to access the admin panel. 
                Redirecting you to login...
              </p>
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-200">
                  Authentication Required
                </div>
              </div>
            </>
          )}

          {/* Countdown */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          >
            {countdown}
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDirectAccess}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>
                {user && ['superadmin', 'admin', 'editor'].includes(user.role) 
                  ? 'Go to Admin Panel Now' 
                  : user 
                    ? 'Return to Website' 
                    : 'Go to Login'
                }
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-white/10 text-white font-medium py-2 px-6 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              Go to Main Website
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/60">
            <div className="mb-2">AGS Admin Panel</div>
            <div>Secure • Professional • Efficient</div>
          </div>
        </motion.div>

        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.5, 0.1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRedirect;
