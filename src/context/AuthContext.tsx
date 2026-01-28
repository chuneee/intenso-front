import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, MarcaProfile, CreadorProfile } from '@/types';
import { mockMarcas, mockCreadores, mockAdmin } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Buscar admin
    if (mockAdmin.email === email) {
      setUser(mockAdmin);
      return true;
    }

    // Buscar en marcas
    const marca = mockMarcas.find(m => m.email === email);
    if (marca) {
      setUser(marca);
      return true;
    }

    // Buscar en creadores
    const creador = mockCreadores.find(c => c.email === email);
    if (creador) {
      setUser(creador);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};