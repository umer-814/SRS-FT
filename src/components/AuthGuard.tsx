import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AuthRequiredModal from './AuthRequiredModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <AuthRequiredModal isOpen={showModal} onClose={() => setShowModal(false)} />
        <Navigate to="/" replace />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;