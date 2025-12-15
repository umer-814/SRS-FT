import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap, ArrowLeft } from 'lucide-react';
import Notification from '../components/Notification';

const API_BASE_URL = 'http://localhost:3000';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    otp: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone: formData.emailOrPhone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to send OTP. Please try again.',
        });
        return;
      }

      setNotification({
        type: 'success',
        title: 'OTP Sent Successfully',
        message: 'Please check your email or phone for the verification code.',
      });

      setTimeout(() => {
        setStep(2);
        setNotification(null);
      }, 1500);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Network Error',
        message: 'Unable to connect to server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/validOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          type: 'error',
          title: 'Invalid OTP',
          message: data.message || 'The verification code is incorrect. Please try again.',
        });
        return;
      }

      setNotification({
        type: 'success',
        title: 'OTP Verified',
        message: 'Please enter your new password.',
      });

      setTimeout(() => {
        setStep(3);
        setNotification(null);
      }, 1500);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Network Error',
        message: 'Unable to connect to server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to reset password. Please try again.',
        });
        return;
      }

      setNotification({
        type: 'success',
        title: 'Password Reset Successfully',
        message: 'You can now login with your new password.',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Network Error',
        message: 'Unable to connect to server. Please try again.',
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
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-electric-blue rounded-2xl glow-blue animate-glow">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">
            {step === 1 && 'Enter your email or phone number to receive OTP'}
            {step === 2 && 'Enter the verification code sent to you'}
            {step === 3 && 'Create a new password for your account'}
          </p>
        </div>

        <div className="glass rounded-2xl p-8 border border-dark-border">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-electric-blue hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>

          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailOrPhone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Enter email or phone number"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.emailOrPhone}
                className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleValidateOTP} className="space-y-6">
              <div className="glass border border-electric-blue/30 rounded-lg p-4 mb-4">
                <p className="text-electric-blue text-sm mb-1">
                  Verification code sent to:
                </p>
                <p className="text-white font-medium">{formData.emailOrPhone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent text-center text-xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || formData.otp.length !== 6}
                  className="flex-1 bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify OTP</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Enter new password"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Password must be at least 8 characters long
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || formData.newPassword.length < 8}
                className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-electric-blue glow-blue' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
