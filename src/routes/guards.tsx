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
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // O puedes retornar un spinner/loading component
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.login} replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}

export function RequireRole({
  role,
  children,
}: {
  role: UserType;
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // O puedes retornar un spinner/loading component
  }

  if (!user) {
    return (
      <Navigate to={paths.login} replace state={{ from: location.pathname }} />
    );
  }

  if (user.type !== role) {
    return <Navigate to={getDefaultPathForRole(user.type)} replace />;
  }

  return <>{children}</>;
}
