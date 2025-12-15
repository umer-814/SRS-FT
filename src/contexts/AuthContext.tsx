import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000';

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('smartRecoveryToken');
    const storedUser = localStorage.getItem('smartRecoveryUser');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('smartRecoveryToken');
        localStorage.removeItem('smartRecoveryUser');
      }
    }
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed. Please try again.' };
      }

      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('smartRecoveryToken', data.token);
        localStorage.setItem('smartRecoveryUser', JSON.stringify(data.user));
        return { success: true };
      }

      return { success: false, error: 'Invalid response from server' };
    } catch (error) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signup = async (name: string, emailOrPhone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, emailOrPhone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Registration failed. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('smartRecoveryToken');
    localStorage.removeItem('smartRecoveryUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};