import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import type { UserType } from "@/types";
import { paths } from "@/routes/paths";

export const getDefaultPathForRole = (role: UserType) => {
  switch (role) {
    case "admin":
      return paths.admin.root;
    case "marca":
      return paths.marca.root;
    case "creador":
      return paths.creador.root;
    default:
      return paths.login;
  }
};

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export function RequireRole({ role, children }: { role: UserType; children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={paths.login} replace />;
  }

  if (user.type !== role) {
    return <Navigate to={getDefaultPathForRole(user.type)} replace />;
  }

  return <>{children}</>;
}
