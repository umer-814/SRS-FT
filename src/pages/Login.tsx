import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Zap, User, Lock } from 'lucide-react';
import Notification from '../components/Notification';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@crypto.com',
      password: 'Demo1234',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        setNotification({
          type: 'success',
          title: '✅ Login Successful',
          message: 'Welcome back to Smart Recovery System!',
        });
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setNotification({
          type: 'error',
          title: '❌ Login Failed',
          message: 'Invalid email or password. Please try again.',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        title: '❌ Login Error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center p-4">
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-electric-blue rounded-2xl glow-blue animate-glow">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Smart Recovery account</p>
        </div>

        {/* Demo Credentials Card */}
        <div className="glass border border-gold-highlight/30 rounded-xl p-4 mb-6 glow-gold">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gold-highlight font-semibold flex items-center">
              <User className="h-4 w-4 mr-2" />
              Demo Credentials
            </h3>
            <button
              onClick={fillDemoCredentials}
              className="text-xs bg-gold-highlight/20 hover:bg-gold-highlight/30 text-gold-highlight px-3 py-1 rounded-full transition-colors btn-press"
            >
              Auto Fill
            </button>
          </div>
          <div className="text-sm text-gold-highlight/80 space-y-1">
            <p>📧 Email: <span className="font-mono text-white">demo@crypto.com</span></p>
            <p>🔑 Password: <span className="font-mono text-white">Demo1234</span></p>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8 border border-dark-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email or Phone Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="Enter email or phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="custom-checkbox mr-2"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-electric-blue hover:text-blue-400 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-electric-blue hover:text-blue-400 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Protected by industry-standard security protocols
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;