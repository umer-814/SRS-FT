import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogIn, UserPlus, X } from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-dark-card to-dark-secondary border-2 border-electric-blue/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              style={{
                boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Lock Icon with Glow */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', damping: 15 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-electric-blue opacity-30 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="relative w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center border-2 border-electric-blue/50">
                    <Lock className="h-10 w-10 text-electric-blue" />
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white text-center mb-3"
              >
                🔒 Authentication Required
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-center mb-8"
              >
                Please log in or sign up to access this feature and unlock advanced trading tools.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                {/* Login Button */}
                <motion.button
                  onClick={handleLogin}
                  className="w-full bg-electric-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </motion.button>

                {/* Signup Button */}
                <motion.button
                  onClick={handleSignup}
                  className="w-full bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </motion.button>
              </motion.div>

              {/* Demo Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <p className="text-xs text-gray-500">
                  💡 Try our demo account: demo@crypto.com
                </p>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
