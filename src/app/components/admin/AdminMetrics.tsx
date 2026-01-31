import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  mockMarcas,
  mockCreadores,
  mockCampaigns,
  mockServicePurchases,
} from "@/data/mockData";
import {
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  SparklesIcon,
  MegaphoneIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

const AdminMetrics: React.FC = () => {
  // Calcular crecimiento (mock)
  const marcasGrowth = 15.3;
  const creadoresGrowth = 22.7;
  const campaignsGrowth = 18.5;
  const revenueGrowth = 31.2;

  // Estadísticas por mes (mock)
  const monthlyData = [
    { month: "Enero", marcas: 1, creadores: 2, campaigns: 2, revenue: 8500 },
    { month: "Febrero", marcas: 1, creadores: 3, campaigns: 3, revenue: 12300 },
    { month: "Marzo", marcas: 2, creadores: 4, campaigns: 5, revenue: 18900 },
  ];

  // Top marcas por inversión
  const marcasByBudget = mockMarcas
    .map((marca) => {
      const campaigns = mockCampaigns.filter((c) => c.marcaId === marca.id);
      const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
      const purchases = mockServicePurchases.filter(
        (p) => p.marcaId === marca.id,
      );
      const totalPurchases = purchases.reduce((sum, p) => sum + p.price, 0);
      return {
        ...marca,
        totalBudget,
        totalPurchases,
        totalSpent: totalBudget + totalPurchases,
        campaignCount: campaigns.length,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);

  // Top creadores por campañas
  const creadoresByCampaigns = mockCreadores
    .map((creador) => {
      const campaigns = mockCampaigns.filter((c) =>
        c.creadores.includes(creador.id),
      );
      return {
        ...creador,
        campaignCount: campaigns.length,
      };
    })
    .sort((a, b) => b.campaignCount - a.campaignCount)
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-teal-500 to-intenso-purple-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Analisis
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
          Métricas y Reportes
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Análisis detallado del rendimiento de la plataforma
        </p>
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wide">
              Crecimiento Marcas
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-display text-intenso-text">
                  {mockMarcas.length}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-intenso-teal-600" />
                  <span className="text-sm font-medium text-intenso-teal-600">
                    +{marcasGrowth}%
                  </span>
                </div>
              </div>
              <BriefcaseIcon className="w-10 h-10 text-intenso-purple-500 opacity-30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wide">
              Crecimiento Creadores
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-display text-intenso-text">
                  {mockCreadores.length}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-intenso-teal-600" />
                  <span className="text-sm font-medium text-intenso-teal-600">
                    +{creadoresGrowth}%
                  </span>
                </div>
              </div>
              <SparklesIcon className="w-10 h-10 text-intenso-teal-500 opacity-30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-magenta-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-magenta-500 to-intenso-magenta-600" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wide">
              Campañas Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-display text-intenso-text">
                  {mockCampaigns.length}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-intenso-teal-600" />
                  <span className="text-sm font-medium text-intenso-teal-600">
                    +{campaignsGrowth}%
                  </span>
                </div>
              </div>
              <MegaphoneIcon className="w-10 h-10 text-intenso-magenta-500 opacity-30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-orange-500 to-intenso-orange-600" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wide">
              Ingresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-display text-intenso-text">
                  $
                  {mockServicePurchases
                    .reduce((sum, p) => sum + p.price, 0)
                    .toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-intenso-teal-600" />
                  <span className="text-sm font-medium text-intenso-teal-600">
                    +{revenueGrowth}%
                  </span>
                </div>
              </div>
              <CurrencyDollarIcon className="w-10 h-10 text-intenso-orange-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Growth */}
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-teal-500 to-intenso-purple-500 rounded-full"></div>
              <div>
                <CardTitle className="text-intenso-text font-display">
                  Crecimiento Mensual
                </CardTitle>
                <CardDescription className="text-intenso-text-muted">
                  Evolución de la plataforma en los últimos 3 meses
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div
                  key={data.month}
                  className="p-4 bg-gradient-to-r from-intenso-purple-50/50 to-intenso-teal-50/50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-intenso-purple-500" />
                      <span className="font-bold text-intenso-text">
                        {data.month} 2024
                      </span>
                    </div>
                    <Badge className="bg-intenso-orange-500 text-white font-bold">
                      ${data.revenue.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/60 p-3 rounded-lg">
                      <p className="text-xs text-intenso-text-muted uppercase tracking-wide">
                        Marcas
                      </p>
                      <p className="text-lg font-bold font-display text-intenso-text">
                        {data.marcas}
                      </p>
                    </div>
                    <div className="bg-white/60 p-3 rounded-lg">
                      <p className="text-xs text-intenso-text-muted uppercase tracking-wide">
                        Creadores
                      </p>
                      <p className="text-lg font-bold font-display text-intenso-text">
                        {data.creadores}
                      </p>
                    </div>
                    <div className="bg-white/60 p-3 rounded-lg">
                      <p className="text-xs text-intenso-text-muted uppercase tracking-wide">
                        Campañas
                      </p>
                      <p className="text-lg font-bold font-display text-intenso-text">
                        {data.campaigns}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Marcas */}
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-orange-500 to-intenso-magenta-500 rounded-full"></div>
              <div>
                <CardTitle className="text-intenso-text font-display">
                  Top Marcas por Inversión
                </CardTitle>
                <CardDescription className="text-intenso-text-muted">
                  Marcas con mayor gasto en campañas y servicios
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {marcasByBudget.map((marca, index) => (
                <div
                  key={marca.id}
                  className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-intenso-magenta-200 hover:bg-intenso-magenta-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                          : index === 1
                            ? "bg-gradient-to-br from-gray-300 to-gray-400"
                            : "bg-gradient-to-br from-orange-400 to-orange-500"
                      } shadow-md`}
                    >
                      {index < 3 ? (
                        <TrophyIcon className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          #{index + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-intenso-text group-hover:text-intenso-magenta-600 transition-colors">
                        {marca.companyName}
                      </p>
                      <p className="text-xs text-intenso-text-muted">
                        {marca.campaignCount} campañas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-intenso-text">
                      ${marca.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-xs text-intenso-text-muted">
                      Total invertido
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Creadores */}
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-teal-500 to-intenso-orange-500 rounded-full"></div>
              <div>
                <CardTitle className="text-intenso-text font-display">
                  Top Creadores por Actividad
                </CardTitle>
                <CardDescription className="text-intenso-text-muted">
                  Creadores más activos en campañas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {creadoresByCampaigns.map((creador, index) => (
                <div
                  key={creador.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-intenso-teal-200 hover:bg-intenso-teal-50/30 transition-all group bg-white/60 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-intenso-teal-500 to-intenso-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-intenso-text group-hover:text-intenso-teal-600 transition-colors">
                        {creador.name}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {creador.niche.slice(0, 2).map((n) => (
                          <Badge
                            key={n}
                            className="text-xs bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-200"
                          >
                            {n}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-display text-intenso-text">
                      {creador.campaignCount}
                    </p>
                    <p className="text-xs text-intenso-text-muted">campañas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Stats */}
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-magenta-500 to-intenso-pink-500 rounded-full"></div>
              <div>
                <CardTitle className="text-intenso-text font-display">
                  Estadísticas de Campañas
                </CardTitle>
                <CardDescription className="text-intenso-text-muted">
                  Rendimiento general de campañas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-intenso-teal-50 to-white border border-intenso-teal-200 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-intenso-text">
                    Tasa de Finalización
                  </span>
                  <span className="text-3xl font-bold font-display text-intenso-teal-600">
                    {Math.round(
                      (mockCampaigns.filter((c) => c.status === "completada")
                        .length /
                        mockCampaigns.length) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <p className="text-sm text-intenso-text-muted">
                  {
                    mockCampaigns.filter((c) => c.status === "completada")
                      .length
                  }{" "}
                  de {mockCampaigns.length} campañas completadas
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-intenso-purple-50 to-white border border-intenso-purple-200 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-intenso-text">
                    Inversión Promedio
                  </span>
                  <span className="text-3xl font-bold font-display text-intenso-purple-600">
                    $
                    {Math.round(
                      mockCampaigns.reduce((sum, c) => sum + c.budget, 0) /
                        mockCampaigns.length,
                    ).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-intenso-text-muted">Por campaña</p>
              </div>

              <div className="p-5 bg-gradient-to-br from-intenso-magenta-50 to-white border border-intenso-magenta-200 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-intenso-text">
                    Creadores por Campaña
                  </span>
                  <span className="text-3xl font-bold font-display text-intenso-magenta-600">
                    {Math.round(
                      (mockCampaigns.reduce(
                        (sum, c) => sum + c.creadores.length,
                        0,
                      ) /
                        mockCampaigns.length) *
                        10,
                    ) / 10}
                  </span>
                </div>
                <p className="text-sm text-intenso-text-muted">
                  Promedio de colaboradores
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMetrics;
