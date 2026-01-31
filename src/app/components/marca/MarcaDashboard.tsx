import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { mockCampaigns, mockServicePurchases } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  SparklesIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";

const MarcaDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userCampaigns = mockCampaigns.filter((c) => c.marcaId === user?.id);
  const userPurchases = mockServicePurchases.filter(
    (p) => p.marcaId === user?.id,
  );

  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "activa" || c.status === "en_progreso",
  );
  const totalBudget = userCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const completedCampaigns = userCampaigns.filter(
    (c) => c.status === "completada",
  ).length;

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500" />
            <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
              Marca Dashboard
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
            Hola, {user?.name}
          </h1>
          <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
            Gestiona tus campañas y creadores desde aquí.
          </p>
        </div>
        <Button
          className="hidden sm:flex bg-intenso-magenta-500 text-white hover:bg-intenso-magenta-600 shadow-lg shadow-intenso-magenta-500/30 transition-all duration-300"
          onClick={() => navigate("/marca/campaigns")}
        >
          <SparklesIcon className="w-4 h-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* KPI: Campañas Activas */}
        <Card
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/marca/campaigns")}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider flex justify-between items-center">
              Campañas activas
              <div className="w-8 h-8 bg-intenso-purple-50 rounded-lg flex items-center justify-center">
                <MegaphoneIcon className="w-4 h-4 text-intenso-purple-600" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1">
              {activeCampaigns.length}
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-purple-600 font-bold bg-intenso-purple-50 px-2 py-0.5 rounded-full border border-intenso-purple-100">
                {userCampaigns.length}
              </span>
              <span className="opacity-70 ml-1">en total</span>
            </p>
          </CardContent>
        </Card>

        {/* KPI: Inversión Total */}
        <Card className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-emerald-500 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider flex justify-between items-center">
              Inversión total
              <div className="w-8 h-8 bg-intenso-teal-50 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-4 h-4 text-intenso-teal-600" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1 tracking-tight">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-intenso-text-muted mt-1">
              Presupuesto asignado
            </p>
          </CardContent>
        </Card>

        {/* KPI: Completadas */}
        <Card className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-yellow-400 to-intenso-orange-500 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider flex justify-between items-center">
              Completadas
              <div className="w-8 h-8 bg-intenso-orange-50 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-intenso-orange-600" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1">
              {completedCampaigns}
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-orange-600 font-bold bg-intenso-orange-50 px-2 py-0.5 rounded-full border border-intenso-orange-100">
                100%
              </span>
              <span className="opacity-70 ml-1">tasa de éxito</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-purple-500 rounded-full"></div>
              Campañas recientes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/marca/campaigns")}
              className="hover:bg-white/50"
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRightIcon className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCampaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white/40 border border-white/50 rounded-xl hover:bg-white/60 transition-all cursor-pointer gap-3 group"
                  onClick={() => navigate("/marca/campaigns")}
                >
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-intenso-purple-100 to-white flex items-center justify-center shadow-sm">
                      <MegaphoneIcon className="w-5 h-5 text-intenso-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-intenso-text text-sm sm:text-base truncate group-hover:text-intenso-purple-700 transition-colors">
                        {campaign.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              campaign.status === "activa"
                                ? "bg-intenso-teal-500"
                                : campaign.status === "en_progreso"
                                  ? "bg-intenso-purple-500"
                                  : campaign.status === "completada"
                                    ? "bg-slate-400"
                                    : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                              campaign.status === "activa"
                                ? "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-100"
                                : campaign.status === "en_progreso"
                                  ? "bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-100"
                                  : campaign.status === "completada"
                                    ? "bg-slate-50 text-slate-600 border-slate-100"
                                    : "bg-gray-50 text-gray-500 border-gray-100"
                            }`}
                          >
                            {getStatusLabel(campaign.status)}
                          </span>
                        </div>
                        <span className="text-xs text-intenso-text-muted">
                          • {campaign.creadores.length} creadores
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right pl-12 sm:pl-0">
                    <p className="font-bold text-intenso-text text-sm sm:text-base">
                      ${campaign.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {userCampaigns.length === 0 && (
                <div className="text-center py-12 text-intenso-text-muted bg-white/20 rounded-xl border border-dashed border-white/40">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <SparklesIcon className="w-8 h-8 text-intenso-purple-300" />
                  </div>
                  <p className="font-medium text-intenso-text">
                    No tienes campañas aún
                  </p>
                  <Button
                    className="mt-4 bg-intenso-purple-500 text-white hover:bg-intenso-purple-600 shadow-lg shadow-intenso-purple-500/30"
                    onClick={() => navigate("/marca/campaigns")}
                  >
                    Crear primera campaña
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-teal-500 rounded-full"></div>
              Servicios contratados
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/marca/services")}
              className="hover:bg-white/50"
            >
              <span className="hidden sm:inline">Ver todos</span>
              <ArrowRightIcon className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white/40 border border-white/50 rounded-xl hover:bg-white/60 transition-all gap-3"
                >
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-intenso-teal-100 to-white flex items-center justify-center shadow-sm">
                      <CurrencyDollarIcon className="w-5 h-5 text-intenso-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-intenso-text text-sm sm:text-base truncate">
                        {purchase.serviceName}
                      </h4>
                      <p className="text-xs text-intenso-text-muted">
                        {new Date(purchase.purchaseDate).toLocaleDateString(
                          "es-ES",
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right pl-12 sm:pl-0">
                    <p className="font-bold text-intenso-text text-sm sm:text-base">
                      ${purchase.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 justify-start sm:justify-end mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          purchase.status === "completado"
                            ? "bg-intenso-teal-500"
                            : "bg-intenso-orange-500"
                        }`}
                      />
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          purchase.status === "completado"
                            ? "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-100"
                            : "bg-intenso-orange-50 text-intenso-orange-700 border-intenso-orange-100"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {userPurchases.length === 0 && (
                <div className="text-center py-12 text-intenso-text-muted bg-white/20 rounded-xl border border-dashed border-white/40">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-intenso-text-muted/50" />
                  </div>
                  <p className="font-medium text-intenso-text">
                    No has contratado servicios aún
                  </p>
                  <Button
                    className="mt-4 border-intenso-purple/20 bg-white/50 hover:bg-white"
                    variant="outline"
                    onClick={() => navigate("/marca/services")}
                  >
                    Explorar Marketplace
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
