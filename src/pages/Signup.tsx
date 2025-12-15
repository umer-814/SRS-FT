import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Shield, Zap, User, Lock, Mail, Check, X } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import Notification from '../components/Notification';

const API_BASE_URL = 'http://localhost:3000';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { test: (pwd: string) => pwd.length >= 8 && pwd.length <= 14, label: '8-14 characters' },
    { test: (pwd: string) => /[a-z]/.test(pwd), label: 'Lowercase letter' },
    { test: (pwd: string) => /[A-Z]/.test(pwd), label: 'Uppercase letter' },
    { test: (pwd: string) => /[0-9]/.test(pwd), label: 'Number' },
  ];

  const checkPasswordStrength = (password: string) => {
    return passwordRequirements.filter(req => req.test(password)).length;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleNextStep = async () => {
    if (step === 1 && formData.name && formData.email) {
      setStep(2);
    } else if (step === 2 && formData.password && passwordStrength >= 4 && formData.password === formData.confirmPassword) {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            emailOrPhone: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setNotification({
            type: 'error',
            title: 'Registration Error',
            message: data.message || 'Failed to register. Please try again.',
          });
          setLoading(false);
          return;
        }

        setNotification({
          type: 'success',
          title: 'Verification Code Sent',
          message: 'Please check your email or phone for the OTP.',
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
    }
  };

  const handleSubmit = async () => {
    if (formData.verificationCode.length !== 6) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/validOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData.email,
          otp: formData.verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          type: 'error',
          title: 'Invalid OTP',
          message: data.message || 'The verification code is incorrect.',
        });
        setLoading(false);
        return;
      }

      const loginResult = await login(formData.email, formData.password);

      if (loginResult.success) {
        setNotification({
          type: 'success',
          title: 'Account Created Successfully',
          message: 'Welcome to Smart Recovery System!',
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          title: 'Login Error',
          message: 'Account created but login failed. Please try logging in manually.',
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Signup Error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-risk-red';
    if (passwordStrength < 4) return 'bg-gold-highlight';
    return 'bg-profit-green';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
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
          <h1 className="text-3xl font-bold text-white mb-2">Join Smart Recovery</h1>
          <p className="text-gray-400">Create your account to start trading smarter</p>
        </div>

        {/* Trust Counter */}
        <div className="glass border border-profit-green/30 rounded-xl p-6 mb-8 text-center glow-green">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Shield className="h-6 w-6 text-profit-green" />
            <div className="counter-glow">
              <AnimatedCounter target={280000000} suffix="+" />
            </div>
          </div>
          <p className="text-sm text-profit-green font-semibold">USERS TRUST US WORLDWIDE</p>
          <div className="flex justify-center space-x-4 mt-3 text-xs text-gray-400">
            <span>🔒 Secure</span>
            <span>⚡ Fast</span>
            <span>🌍 Global</span>
          </div>
        </div>

        {/* Signup Form */}
        <div className="glass rounded-2xl p-8 border border-dark-border">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Step 1: Contact Information</h2>
                <p className="text-sm text-gray-400">Enter your details to get started</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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

              <button
                onClick={handleNextStep}
                disabled={!formData.name || !formData.email}
                className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Step 2: Create Password</h2>
                <p className="text-sm text-gray-400">Choose a strong password for your account</p>
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
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Password Strength:</span>
                    <span className={`font-medium ${
                      passwordStrength < 2 ? 'text-risk-red' :
                      passwordStrength < 4 ? 'text-gold-highlight' : 'text-profit-green'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="mt-4 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      {req.test(formData.password) ? (
                        <Check className="h-4 w-4 text-profit-green" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={req.test(formData.password) ? 'text-profit-green' : 'text-gray-400'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-risk-red text-sm mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={passwordStrength < 4 || formData.password !== formData.confirmPassword}
                  className="flex-1 bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Step 3: Verification</h2>
                <p className="text-sm text-gray-400">Enter the verification code</p>
              </div>
              
              <div className="glass border border-electric-blue/30 rounded-lg p-4 mb-4">
                <p className="text-electric-blue text-sm mb-1">
                  📧 Verification code sent to:
                </p>
                <p className="text-white font-medium">{formData.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent text-center text-xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Didn't receive the code? <button className="text-electric-blue hover:text-blue-400">Resend</button>
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={formData.verificationCode.length !== 6 || loading}
                  className="flex-1 bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-electric-blue hover:text-blue-400 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
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

export default Signup;