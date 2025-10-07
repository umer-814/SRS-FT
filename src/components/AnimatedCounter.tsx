import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  // Add random fluctuations to make it more realistic
  useEffect(() => {
    if (count === target) {
      const fluctuationTimer = setInterval(() => {
        const randomChange = Math.floor(Math.random() * 1000) + 100;
        setCount(prevCount => prevCount + randomChange);
      }, 3000);

      return () => clearInterval(fluctuationTimer);
    }
  }, [count, target]);

  return (
    <span className="font-mono text-2xl font-bold text-yellow-400">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;