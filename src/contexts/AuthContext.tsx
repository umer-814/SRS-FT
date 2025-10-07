import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('smartRecoveryAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials validation
    if (email === 'demo@crypto.com' && password === 'Demo1234') {
      const userData = { email, name: 'Demo User' };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('smartRecoveryAuth', JSON.stringify({ user: userData }));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    // Simulate signup success
    const userData = { email, name: email.split('@')[0] };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('smartRecoveryAuth', JSON.stringify({ user: userData }));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('smartRecoveryAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};