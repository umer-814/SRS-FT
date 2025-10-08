import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Zap } from 'lucide-react';

interface HeroSectionProps {
  onComplete?: () => void;
  standalone?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onComplete, standalone = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [count, setCount] = useState(0);
  const targetCount = 280000;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const handleCTA = () => {
    if (standalone && onComplete) {
      onComplete();
    } else if (isAuthenticated) {
      navigate('/forecast');
    } else {
      navigate('/signup');
    }
  };

  const testimonials = [
    {
      quote: "Recovered 40% of my lost BTC position — game changer!",
      author: "Sarah M.",
      avatar: "🟠",
    },
    {
      quote: "This platform guided me through volatility with confidence.",
      author: "Hamza T.",
      avatar: "💎",
    },
    {
      quote: "Smart. Fast. Reliable — finally a recovery tool that understands traders.",
      author: "Ahmed R.",
      avatar: "⚡",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-electric-blue rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Turn Losses Into Learning
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-blue-400 to-electric-blue animate-gradient">
                and Learning Into Profit
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              AI-Powered Recovery for Modern Crypto Traders
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Built by traders, for traders — powered by data, not emotion.
            </motion.p>

            <motion.button
              onClick={handleCTA}
              className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue to-blue-600 hover:from-blue-600 hover:to-electric-blue text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <Zap className="h-5 w-5" />
              <span>Join the Future of Trading</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 flex items-center justify-center space-x-2 text-gray-400"
            >
              <Shield className="h-5 w-5 text-profit-green" />
              <span className="text-sm">
                Trusted by{' '}
                <span className="text-white font-bold text-lg">
                  {count.toLocaleString()}+
                </span>{' '}
                traders worldwide
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                className="glass border border-dark-border rounded-xl p-6 hover:border-electric-blue/50 transition-all duration-300 group backdrop-blur-sm"
                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)' }}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
                <p className="text-electric-blue text-sm font-medium">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
