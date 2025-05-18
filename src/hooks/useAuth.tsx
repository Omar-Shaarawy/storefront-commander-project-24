
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = 'admin123@gmail.com';
const ADMIN_PASSWORD = '123456789OO';
const MOCK_ADMIN_USER: User = {
  id: '1',
  email: ADMIN_EMAIL,
  name: 'Admin User',
  role: 'admin',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ecomm-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('ecomm-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser(MOCK_ADMIN_USER);
      localStorage.setItem('ecomm-user', JSON.stringify(MOCK_ADMIN_USER));
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
      return true;
    }
    
    // Check for registered users
    const users = JSON.parse(localStorage.getItem('ecomm-registered-users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);
    
    if (foundUser && foundUser.password === password) {
      const loggedInUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: 'user'
      };
      
      setUser(loggedInUser);
      localStorage.setItem('ecomm-user', JSON.stringify(loggedInUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email is already registered (including admin)
    if (email === ADMIN_EMAIL) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      });
      return false;
    }
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('ecomm-registered-users') || '[]');
    if (existingUsers.some((user: any) => user.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      });
      return false;
    }
    
    // Register new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In a real app, this should be hashed
      role: 'user'
    };
    
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('ecomm-registered-users', JSON.stringify(updatedUsers));
    
    // Auto login after registration
    const loggedInUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: 'user'
    };
    
    setUser(loggedInUser);
    localStorage.setItem('ecomm-user', JSON.stringify(loggedInUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome to ShopVista, ${name}!`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecomm-user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
