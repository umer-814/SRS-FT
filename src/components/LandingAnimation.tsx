import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LandingAnimationProps {
  onComplete: () => void;
}

const LandingAnimation: React.FC<LandingAnimationProps> = ({ onComplete }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(particleArray);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-electric-blue rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Central Animation Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Orbiting Coins Container */}
        <div className="relative w-64 h-64 mb-8">
          {/* Center Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-electric-blue opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* AI Core */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-electric-blue/30 flex items-center justify-center">
              <motion.div
                className="text-4xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>

          {/* Bitcoin Orbit */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 152, 0, 0.6))',
              }}
            >
              🟠
            </motion.div>
          </motion.div>

          {/* Ethereum Orbit */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.6))',
              }}
            >
              💎
            </motion.div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'blur(1px)' }}>
            <motion.circle
              cx="50%"
              cy="50%"
              r="80"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              strokeDasharray="5 5"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-2"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            animate={{
              textShadow: [
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 30px rgba(59, 130, 246, 0.8)',
                '0 0 20px rgba(59, 130, 246, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ⚡ Empowering Future Traders
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Smart Recovery for Smarter Decisions
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          className="mt-8 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-electric-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingAnimation;
