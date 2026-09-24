import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types/index.ts';
import { INITIAL_USERS } from '../data/initialData.ts';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => boolean;
  loginAsDemo: (role: Role, specificUserId?: string) => void;
  register: (user: Omit<User, 'id'>) => User;
  logout: () => void;
  hasRole: (roles: Role | Role[]) => boolean;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'gms_auth_user_v1';
const USERS_STORAGE_KEY = 'gms_users_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users', e);
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse active user', e);
      }
    }
    // Default to Subrata Maity (Admin) so the user immediately experiences the full system
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (email: string, role?: Role): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (role && found.role !== role) {
        return false;
      }
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const loginAsDemo = (role: Role, specificUserId?: string) => {
    if (specificUserId) {
      const match = users.find(u => u.id === specificUserId);
      if (match) {
        setCurrentUser(match);
        return;
      }
    }
    const match = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
    }
  };

  const switchRole = (role: Role) => {
    const targetUser = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const register = (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    // Switch to null or back to Customer demo
    setCurrentUser(null);
  };

  const hasRole = (roles: Role | Role[]): boolean => {
    if (!currentUser) return false;
    if (Array.isArray(roles)) {
      return roles.includes(currentUser.role);
    }
    return currentUser.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        loginAsDemo,
        register,
        logout,
        hasRole,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
