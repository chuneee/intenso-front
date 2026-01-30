import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { mockCampaigns, mockCreadores } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import type { CreadorProfile } from "@/types";
import {
  Megaphone,
  Star,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Instagram,
  Youtube,
} from "lucide-react";

const CreadorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const creadorProfile = mockCreadores.find((c) => c.id === user?.id) as CreadorProfile;
  const userCampaigns = mockCampaigns.filter((c) => c.creadores.includes(user?.id || ""));

  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "activa" || c.status === "en_progreso",
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-green-100 text-green-700";
      case "en_progreso":
        return "bg-blue-100 text-blue-700";
      case "completada":
        return "bg-gray-100 text-gray-700";
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
      default:
        return status;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return Instagram;
      case "youtube":
        return Youtube;
      default:
        return TrendingUp;
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card variant="kpi" interactive onClick={() => navigate("/creador/campaigns")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Campanas activas</CardTitle>
            <div className="w-10 h-10 bg-intenso-purple/10 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-intenso-purple" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">{activeCampaigns.length}</div>
            <p className="kpi-label text-xs mt-1">{userCampaigns.length} totales</p>
          </CardContent>
        </Card>

        <Card variant="kpi">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Completadas</CardTitle>
            <div className="w-10 h-10 bg-intenso-teal-soft rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-intenso-teal" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">
              {creadorProfile?.completedCampaigns || 0}
            </div>
            <p className="kpi-label text-xs mt-1">Colaboraciones exitosas</p>
          </CardContent>
        </Card>

        <Card variant="kpi">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Rating</CardTitle>
            <div className="w-10 h-10 bg-intenso-yellow/20 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-intenso-yellow" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">
              {creadorProfile?.rating || 0}
            </div>
            <p className="kpi-label text-xs mt-1">De 5.0</p>
          </CardContent>
        </Card>

        <Card variant="kpi" className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="kpi-label text-sm">Seguidores</CardTitle>
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-intenso-text" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="kpi-number text-3xl font-semibold text-intenso-text">
              {creadorProfile?.platforms
                .reduce((sum, p) => sum + p.followers, 0)
                .toLocaleString()}
            </div>
            <p className="kpi-label text-xs mt-1">Total en todas las plataformas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base sm:text-lg text-intenso-text">
              Mis campanas activas
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/creador/campaigns")}>
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {activeCampaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-3 sm:p-4 border border-border rounded-xl hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => navigate("/creador/campaigns")}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-intenso-text text-sm sm:text-base truncate">
                        {campaign.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-intenso-text-muted mt-1">
                        {campaign.marcaName}
                      </p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-intenso-text-muted">Progreso</span>
                      <span className="text-intenso-text font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-intenso-text-muted">
                    <span>Finaliza: {new Date(campaign.endDate).toLocaleDateString("es-ES")}</span>
                  </div>
                </div>
              ))}

              {activeCampaigns.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-intenso-text-muted">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
                  </div>
                  <p className="font-medium text-sm sm:text-base text-intenso-text">
                    No tienes campanas activas
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/creador/brands")}>
                    Explorar marcas
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-base sm:text-lg text-intenso-text">
              Estadisticas de plataformas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {creadorProfile?.platforms.map((platform) => {
                const Icon = getPlatformIcon(platform.name);
                return (
                  <div key={platform.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-intenso-text-muted" />
                        <span className="font-medium text-intenso-text text-sm sm:text-base">
                          {platform.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-intenso-text">
                        {platform.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Progress value={platform.engagementRate * 10} className="h-2 flex-1" />
                      <span className="text-xs sm:text-sm text-intenso-text-muted w-12 sm:w-16 text-right">
                        {platform.engagementRate}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
              <h4 className="text-xs sm:text-sm font-medium text-intenso-text-muted mb-3">Nichos</h4>
              <div className="flex flex-wrap gap-2">
                {creadorProfile?.niche.map((n) => (
                  <Badge key={n} variant="secondary" className="text-xs">
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
