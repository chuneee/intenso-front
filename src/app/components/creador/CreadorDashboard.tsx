import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { mockCampaigns, mockCreadores } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import type { CreadorProfile } from "@/types";
import {
  MegaphoneIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const CreadorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const creadorProfile = mockCreadores.find(
    (c) => c.id === user?.id,
  ) as CreadorProfile;
  const userCampaigns = mockCampaigns.filter((c) =>
    c.creadores.includes(user?.id || ""),
  );

  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "activa" || c.status === "en_progreso",
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-green-50 text-green-700 border-green-200";
      case "en_progreso":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completada":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-green-500";
      case "en_progreso":
        return "bg-blue-500";
      case "completada":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
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
              Creador Dashboard
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
            Hola, {user?.name}
          </h1>
          <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
            Aquí están tus métricas y campañas activas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI: Campañas Activas */}
        <Card
          variant="default"
          interactive
          onClick={() => navigate("/creador/campaigns")}
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500 opacity-80" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
            <CardTitle className="kpi-label text-sm text-intenso-text-muted uppercase tracking-wider">
              Campañas activas
            </CardTitle>
            <div className="w-8 h-8 bg-intenso-purple-50 rounded-lg flex items-center justify-center">
              <MegaphoneIcon className="w-4 h-4 text-intenso-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-bold text-intenso-text">
              {activeCampaigns.length}
            </div>
            <p className="kpi-label text-xs mt-1 text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                {userCampaigns.length}
              </span>
              <span className="opacity-70 ml-1">totales</span>
            </p>
          </CardContent>
        </Card>

        {/* KPI: Completadas */}
        <Card
          variant="default"
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-400 to-emerald-500 opacity-80" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
            <CardTitle className="kpi-label text-sm text-intenso-text-muted uppercase tracking-wider">
              Completadas
            </CardTitle>
            <div className="w-8 h-8 bg-intenso-teal-50 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-4 h-4 text-intenso-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-bold text-intenso-text">
              {creadorProfile?.completedCampaigns || 0}
            </div>
            <p className="kpi-label text-xs mt-1 text-intenso-text-muted">
              Colaboraciones exitosas
            </p>
          </CardContent>
        </Card>

        {/* KPI: Rating */}
        <Card
          variant="default"
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-400 to-intenso-teal-600 opacity-80" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
            <CardTitle className="kpi-label text-sm text-intenso-text-muted uppercase tracking-wider">
              Rating
            </CardTitle>
            <div className="w-8 h-8 bg-intenso-teal-50 rounded-lg flex items-center justify-center">
              <img
                src="/img/isotipo.png"
                alt="Rating"
                className="w-4 h-4 object-contain"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-bold text-intenso-text">
              {creadorProfile?.rating || 0}
            </div>
            <p className="kpi-label text-xs mt-1 text-intenso-text-muted">
              De 5.0
            </p>
          </CardContent>
        </Card>

        {/* KPI: Seguidores */}
        <Card
          variant="default"
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-slate-500 opacity-80" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
            <CardTitle className="kpi-label text-sm text-intenso-text-muted uppercase tracking-wider">
              Seguidores
            </CardTitle>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-bold text-intenso-text">
              {creadorProfile?.platforms
                .reduce((sum, p) => sum + p.followers, 0)
                .toLocaleString()}
            </div>
            <p className="kpi-label text-xs mt-1 text-intenso-text-muted">
              Total en todas las plataformas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-purple-500 rounded-full"></div>
              Mis campañas activas
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/creador/campaigns")}
              className="hover:bg-white/50"
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRightIcon className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {activeCampaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-3 sm:p-4 bg-white/40 border border-white/50 rounded-xl hover:bg-white/60 transition-all cursor-pointer group"
                  onClick={() => navigate("/creador/campaigns")}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-intenso-text text-sm sm:text-base truncate group-hover:text-intenso-purple-700 transition-colors">
                        {campaign.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-intenso-text-muted mt-1">
                        {campaign.marcaName}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusDotColor(campaign.status)}`}
                      />
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusColor(campaign.status)}`}
                      >
                        {getStatusLabel(campaign.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-intenso-text-muted font-medium">
                        Progreso
                      </span>
                      <span className="text-intenso-text font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-1.5" />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-intenso-text-muted">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      Finaliza:{" "}
                      {new Date(campaign.endDate).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
              ))}

              {activeCampaigns.length === 0 && (
                <div className="text-center py-12 text-intenso-text-muted bg-white/20 rounded-xl border border-dashed border-white/40">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MegaphoneIcon className="w-8 h-8 text-intenso-text-muted/50" />
                  </div>
                  <p className="font-medium text-intenso-text">
                    No tienes campañas activas
                  </p>
                  <Button
                    className="mt-4 text-white shadow-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#0e8d8d" }}
                    onClick={() => navigate("/creador/brands")}
                  >
                    Explorar marcas
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm h-full">
          <CardHeader>
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-teal-500 rounded-full"></div>
              Estadísticas de plataformas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {creadorProfile?.platforms.map((platform) => {
                const platformLower = platform.name.toLowerCase();
                return (
                  <div
                    key={platform.name}
                    className="space-y-3 bg-white/40 p-4 rounded-xl border border-white/50 hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            platformLower === "instagram"
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : platformLower === "youtube"
                                ? "bg-red-500"
                                : platformLower === "tiktok"
                                  ? "bg-black"
                                  : "bg-intenso-teal-500"
                          }`}
                        >
                          {platformLower === "instagram" && (
                            <svg
                              className="w-4 h-4 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                            </svg>
                          )}
                          {platformLower === "youtube" && (
                            <svg
                              className="w-4 h-4 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          )}
                          {platformLower === "tiktok" && (
                            <svg
                              className="w-4 h-4 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                          )}
                          {!["instagram", "youtube", "tiktok"].includes(
                            platformLower,
                          ) && (
                            <ArrowTrendingUpIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="font-bold text-intenso-text text-sm sm:text-base capitalize">
                          {platform.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-intenso-text bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                        {platform.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Progress
                        value={platform.engagementRate * 10}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs sm:text-sm text-intenso-text-muted font-medium w-12 sm:w-16 text-right">
                        {platform.engagementRate}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <h4 className="text-xs sm:text-sm font-bold text-intenso-text-muted mb-3 uppercase tracking-wider">
                Nichos
              </h4>
              <div className="flex flex-wrap gap-2">
                {creadorProfile?.niche.map((n) => (
                  <Badge
                    key={n}
                    variant="secondary"
                    className="text-xs bg-white border border-gray-200 text-intenso-text px-3 py-1 shadow-sm"
                  >
                    {n}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreadorDashboard;
