import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/app/components/DashboardLayout";
import LoginPage from "@/app/components/LoginPage";

import AdminDashboard from "@/app/components/admin/AdminDashboard";
import AdminMarcas from "@/app/components/admin/AdminMarcas";
import AdminCreadores from "@/app/components/admin/AdminCreadores";
import AdminCampaigns from "@/app/components/admin/AdminCampaigns";
import AdminServices from "@/app/components/admin/AdminServices";
import AdminPurchases from "@/app/components/admin/AdminPurchases";
import AdminMetrics from "@/app/components/admin/AdminMetrics";

import MarcaDashboard from "@/app/components/marca/MarcaDashboard";
import CampaignsPage from "@/app/components/campaigns/CampaignsPage";
import CreatorsPage from "@/app/components/creators/CreatorsPage";
import ServicesPage from "@/app/components/services/ServicesPage";

import CreadorDashboard from "@/app/components/creador/CreadorDashboard";
import BrandsPage from "@/app/components/brands/BrandsPage";

import { paths } from "@/routes/paths";
import { getDefaultPathForRole, RequireAuth, RequireRole } from "@/routes/guards";

function LoginRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultPathForRole(user.type)} replace />;
  }

  return <LoginPage />;
}

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.login} element={<LoginRoute />} />

        <Route
          path="/"
          element={
            isAuthenticated && user ? (
              <Navigate to={getDefaultPathForRole(user.type)} replace />
            ) : (
              <Navigate to={paths.login} replace />
            )
          }
        />

        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          {/* Admin */}
          <Route
            path={paths.admin.root}
            element={
              <RequireRole role="admin">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.marcas}
            element={
              <RequireRole role="admin">
                <AdminMarcas />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.creadores}
            element={
              <RequireRole role="admin">
                <AdminCreadores />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.campaigns}
            element={
              <RequireRole role="admin">
                <AdminCampaigns />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.services}
            element={
              <RequireRole role="admin">
                <AdminServices />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.purchases}
            element={
              <RequireRole role="admin">
                <AdminPurchases />
              </RequireRole>
            }
          />
          <Route
            path={paths.admin.metrics}
            element={
              <RequireRole role="admin">
                <AdminMetrics />
              </RequireRole>
            }
          />

          {/* Marca */}
          <Route
            path={paths.marca.root}
            element={
              <RequireRole role="marca">
                <MarcaDashboard />
              </RequireRole>
            }
          />
          <Route
            path={paths.marca.campaigns}
            element={
              <RequireRole role="marca">
                <CampaignsPage />
              </RequireRole>
            }
          />
          <Route
            path={paths.marca.creators}
            element={
              <RequireRole role="marca">
                <CreatorsPage />
              </RequireRole>
            }
          />
          <Route
            path={paths.marca.services}
            element={
              <RequireRole role="marca">
                <ServicesPage />
              </RequireRole>
            }
          />

          {/* Creador */}
          <Route
            path={paths.creador.root}
            element={
              <RequireRole role="creador">
                <CreadorDashboard />
              </RequireRole>
            }
          />
          <Route
            path={paths.creador.campaigns}
            element={
              <RequireRole role="creador">
                <CampaignsPage />
              </RequireRole>
            }
          />
          <Route
            path={paths.creador.brands}
            element={
              <RequireRole role="creador">
                <BrandsPage />
              </RequireRole>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
