import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { mockCampaigns, mockServicePurchases } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Megaphone, TrendingUp, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";

const MarcaDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userCampaigns = mockCampaigns.filter((c) => c.marcaId === user?.id);
  const userPurchases = mockServicePurchases.filter((p) => p.marcaId === user?.id);

  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "activa" || c.status === "en_progreso",
  );
  const totalBudget = userCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completada").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-green-100 text-green-700";
      case "en_progreso":
        return "bg-blue-100 text-blue-700";
      case "completada":
        return "bg-gray-100 text-gray-700";
      case "borrador":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "activa":
        return "Activa";
      case "en_progreso":
        return "En Progreso";
      case "completada":
        return "Completada";
      case "borrador":
        return "Borrador";
      case "pendiente":
        return "Pendiente";
      default:
        return status;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-intenso-bg">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-intenso-text">
          Dashboard
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Bienvenido de vuelta, {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card variant="kpi" interactive onClick={() => navigate("/marca/campaigns")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Campanas activas</CardTitle>
            <div className="w-10 h-10 bg-intenso-purple/10 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-intenso-purple" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">{activeCampaigns.length}</div>
            <p className="kpi-label text-xs mt-1">{userCampaigns.length} campanas totales</p>
          </CardContent>
        </Card>

        <Card variant="kpi">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Inversion total</CardTitle>
            <div className="w-10 h-10 bg-intenso-teal-soft rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-intenso-teal" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number kpi-emphasis text-3xl font-semibold">${totalBudget.toLocaleString()}</div>
            <p className="kpi-label text-xs mt-1">En todas las campanas</p>
          </CardContent>
        </Card>

        <Card variant="kpi" className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Completadas</CardTitle>
            <div className="w-10 h-10 bg-intenso-yellow/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-intenso-yellow" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">{completedCampaigns}</div>
            <p className="kpi-label text-xs mt-1">Campanas exitosas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base sm:text-lg text-intenso-text">
              Campanas recientes
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/marca/campaigns")}>
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCampaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 border border-border rounded-xl hover:bg-muted transition-colors cursor-pointer gap-3"
                  onClick={() => navigate("/marca/campaigns")}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-intenso-text text-sm sm:text-base truncate">
                      {campaign.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-intenso-text-muted mt-1">{campaign.category}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                      <span className="text-xs text-intenso-text-muted">
                        {campaign.creadores.length} creadores
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-intenso-text text-sm sm:text-base">
                      ${campaign.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {userCampaigns.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-intenso-text-muted">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
                  </div>
                  <p className="font-medium text-sm sm:text-base text-intenso-text">
                    No tienes campanas aun
                  </p>
                  <p className="text-xs sm:text-sm text-intenso-text-muted mt-1">
                    Crea tu primera campana para comenzar
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base sm:text-lg text-intenso-text">
              Servicios contratados
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/marca/services")}>
              <span className="hidden sm:inline">Ver todos</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 border border-border rounded-xl gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-intenso-text text-sm sm:text-base truncate">
                      {purchase.serviceName}
                    </h4>
                    <p className="text-xs sm:text-sm text-intenso-text-muted mt-1">
                      {new Date(purchase.purchaseDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <Badge className={`mt-2 ${getStatusColor(purchase.status)}`}>
                      {getStatusLabel(purchase.status)}
                    </Badge>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-intenso-text text-sm sm:text-base">
                      ${purchase.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {userPurchases.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-intenso-text-muted">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
                  </div>
                  <p className="font-medium text-sm sm:text-base text-intenso-text">
                    No has contratado servicios aun
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/marca/services")}>
                    Explorar servicios
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarcaDashboard;
