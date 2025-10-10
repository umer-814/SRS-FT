import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, TrendingUp, Italic as Crystal, Wrench, Bell, FileText, Zap, User, LogOut, ChevronDown, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthRequiredModal from './AuthRequiredModal';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { 
      path: '/', 
      label: 'Market Overview',  
      icon: TrendingUp,
      public: true 
    },
    { 
      path: '/forecast', 
      label: 'AI Price Forecast', 
      icon: Crystal,
      public: false 
    },
    { 
      path: '/recovery', 
      label: 'Recovery Tool', 
      icon: Wrench,
      public: false 
    },
    { 
      path: '/alerts', 
      label: 'Alerts', 
      icon: Bell,
      public: false 
    },
    { 
      path: '/reports', 
      label: 'Reports',  
      icon: FileText,
      public: false 
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const handleNavClick = (path: string, isPublic: boolean) => {
    if (!isPublic && !isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-dark-card border border-dark-border text-white hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-secondary border-r border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-dark-border">
          <div className="flex items-center justify-center w-10 h-10 bg-electric-blue rounded-xl glow-blue">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Smart Recovery</h1>
            <p className="text-xs text-gray-400">Future Traders</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isLocked = !item.public && !isAuthenticated;

            return (
              <motion.button
                key={item.path}
                onClick={() => handleNavClick(item.path, item.public)}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  active
                    ? 'bg-electric-blue text-white glow-blue'
                    : 'text-gray-300 hover:bg-dark-card hover:text-white'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isLocked && (
                  <div className="ml-auto">
                    <Lock className="h-4 w-4 text-gold-highlight" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-dark-border p-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-card transition-colors"
              >
                <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-dark-card border border-dark-border rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full bg-electric-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block btn-press"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full bg-transparent border border-electric-blue text-electric-blue hover:bg-electric-blue/10 font-semibold py-2 px-4 rounded-lg transition-colors text-center block btn-press"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;