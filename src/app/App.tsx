import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Toaster } from '@/app/components/ui/sonner';
import LoginPage from '@/app/components/LoginPage';
import DashboardLayout from '@/app/components/DashboardLayout';
import MarcaDashboard from '@/app/components/marca/MarcaDashboard';
import CreadorDashboard from '@/app/components/creador/CreadorDashboard';
import CampaignsPage from '@/app/components/campaigns/CampaignsPage';
import CreatorsPage from '@/app/components/creators/CreatorsPage';
import BrandsPage from '@/app/components/brands/BrandsPage';
import ServicesPage from '@/app/components/services/ServicesPage';
import AdminDashboard from '@/app/components/admin/AdminDashboard';
import AdminMarcas from '@/app/components/admin/AdminMarcas';
import AdminCreadores from '@/app/components/admin/AdminCreadores';
import AdminCampaigns from '@/app/components/admin/AdminCampaigns';
import AdminServices from '@/app/components/admin/AdminServices';
import AdminPurchases from '@/app/components/admin/AdminPurchases';
import AdminMetrics from '@/app/components/admin/AdminMetrics';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isMarca = user?.type === 'marca';
  const isAdmin = user?.type === 'admin';

  const renderPage = () => {
    // Admin routes
    if (isAdmin) {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard onNavigate={setCurrentPage} />;
        case 'admin-marcas':
          return <AdminMarcas />;
        case 'admin-creadores':
          return <AdminCreadores />;
        case 'admin-campaigns':
          return <AdminCampaigns />;
        case 'admin-services':
          return <AdminServices />;
        case 'admin-purchases':
          return <AdminPurchases />;
        case 'admin-metrics':
          return <AdminMetrics />;
        default:
          return <AdminDashboard onNavigate={setCurrentPage} />;
      }
    }

    // Marca/Creador routes
    switch (currentPage) {
      case 'dashboard':
        return isMarca 
          ? <MarcaDashboard onNavigate={setCurrentPage} />
          : <CreadorDashboard onNavigate={setCurrentPage} />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'creators':
        return <CreatorsPage />;
      case 'brands':
        return <BrandsPage />;
      case 'services':
        return <ServicesPage />;
      default:
        return isMarca 
          ? <MarcaDashboard onNavigate={setCurrentPage} />
          : <CreadorDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}