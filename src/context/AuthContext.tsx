import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import type { User } from "@/types";
import { mockMarcas, mockCreadores, mockAdmin } from "@/data/mockData";
import { safeStorage } from "@/lib/storage";

const AUTH_SESSION_KEY = "intenso.auth.session";
const AUTH_LOCAL_KEY = "intenso.auth.local";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUser = safeStorage.get<User>(AUTH_LOCAL_KEY);
    const sessionUser = safeStorage.get<User>(AUTH_SESSION_KEY);
    setUser(localUser ?? sessionUser);
    setIsLoading(false);
  }, []);

  const persistUser = (nextUser: User, remember?: boolean) => {
    safeStorage.remove(AUTH_LOCAL_KEY);
    safeStorage.remove(AUTH_SESSION_KEY);

    if (remember) {
      safeStorage.set(AUTH_LOCAL_KEY, nextUser, "local");
    } else {
      safeStorage.set(AUTH_SESSION_KEY, nextUser, "session");
    }
  };

  const login = React.useCallback(
    (email: string, _password: string, remember?: boolean): boolean => {
      // Buscar admin
      if (mockAdmin.email === email) {
        setUser(mockAdmin);
        persistUser(mockAdmin, remember);
        return true;
      }

      // Buscar en marcas
      const marca = mockMarcas.find((m) => m.email === email);
      if (marca) {
        setUser(marca);
        persistUser(marca, remember);
        return true;
      }

      // Buscar en creadores
      const creador = mockCreadores.find((c) => c.email === email);
      if (creador) {
        setUser(creador);
        persistUser(creador, remember);
        return true;
      }

      return false;
    },
    [],
  );

  const logout = () => {
    setUser(null);
    safeStorage.remove(AUTH_LOCAL_KEY);
    safeStorage.remove(AUTH_SESSION_KEY);
  };

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: Boolean(user), isLoading }),
    [user, login, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
