import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-dark-border via-gray-700 to-dark-border bg-[length:200%_100%]';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export const PriceSkeleton: React.FC = () => (
  <div className="space-y-2">
    <Skeleton width="60%" height="1.5rem" />
    <Skeleton width="80%" height="2rem" />
    <Skeleton width="40%" height="1rem" />
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="glass rounded-xl p-6 border border-dark-border space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton width="30%" height="1.5rem" />
    </div>
    <Skeleton width="100%" height="2rem" />
    <Skeleton width="70%" height="1rem" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center justify-between space-x-4">
        <Skeleton width="40%" />
        <Skeleton width="20%" />
        <Skeleton width="30%" />
      </div>
    ))}
  </div>
);

export default Skeleton;
