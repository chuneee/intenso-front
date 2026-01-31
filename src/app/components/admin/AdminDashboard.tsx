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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  mockMarcas,
  mockCreadores,
  mockCampaigns,
  mockServicePurchases,
} from "@/data/mockData";
import { ArrowRight, DollarSign } from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/solid";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const totalMarcas = mockMarcas.length;
  const totalCreadores = mockCreadores.length;
  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter(
    (c) => c.status === "activa" || c.status === "en_progreso",
  ).length;
  const completedCampaigns = mockCampaigns.filter(
    (c) => c.status === "completada",
  ).length;

  const totalRevenue = mockServicePurchases.reduce(
    (sum, p) => sum + p.price,
    0,
  );
  const recentPurchases = mockServicePurchases.slice(0, 5);
  const recentCampaigns = mockCampaigns.slice(0, 5);

  const serviceStats = mockServicePurchases.reduce(
    (acc, purchase) => {
      acc[purchase.serviceName] = (acc[purchase.serviceName] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topServices = Object.entries(serviceStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-200 border";
      case "en_progreso":
        return "bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-200 border";
      case "completada":
        return "bg-slate-100 text-slate-700 border-slate-200 border";
      case "borrador":
        return "bg-intenso-yellow-50 text-yellow-700 border-intenso-yellow-200 border";
      case "pendiente":
        return "bg-intenso-orange-50 text-orange-700 border-intenso-orange-200 border";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 border";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      activa: "Activa",
      en_progreso: "En Progreso",
      completada: "Completada",
      borrador: "Borrador",
      pendiente: "Pendiente",
      completado: "Completada",
    };
    return labels[status] || status;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-teal-500 to-intenso-purple-500" />
            <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
              Dashboard
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-intenso-text-muted mt-1 text-sm sm:text-base max-w-2xl">
            Bienvenido al centro de control de Intenso. Gestiona marcas,
            campañas y talento desde aquí.
          </p>
        </div>
        <Button
          variant="outline"
          className="hidden sm:flex border-intenso-teal-200 text-intenso-teal-700 hover:bg-intenso-teal-50 hover:text-intenso-teal-800"
          onClick={() => navigate("/admin/campaigns")}
        >
          <SparklesIcon className="w-4 h-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI: Marcas - Purple Theme */}
        <Card
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/admin/marcas")}
        >
          {/* Background Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider">
              Marcas Registradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1">
              {totalMarcas}
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                +12%
              </span>
              <span className="opacity-70 ml-1">vs mes anterior</span>
            </p>
          </CardContent>
        </Card>

        {/* KPI: Creadores - Teal Theme */}
        <Card
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/admin/creadores")}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider">
              Creadores Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1">
              {totalCreadores}
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                +5%
              </span>
              <span className="opacity-70 ml-1">nuevos talentos</span>
            </p>
          </CardContent>
        </Card>

        {/* KPI: Campañas - Magenta/Pink Theme */}
        <Card
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group cursor-pointer sm:col-span-2 lg:col-span-1"
          onClick={() => navigate("/admin/campaigns")}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-pink-500 to-intenso-magenta-500 opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider">
              Campañas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1">
              {activeCampaigns}
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                {Math.round((activeCampaigns / totalCampaigns) * 100)}%
              </span>
              <span className="opacity-70 ml-1">
                del total ({totalCampaigns})
              </span>
            </p>
          </CardContent>
        </Card>

        {/* KPI: Ingresos - Orange/Yellow Theme */}
        <Card
          className="relative overflow-hidden border-none bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
          onClick={() => navigate("/admin/purchases")}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-yellow to-intenso-orange opacity-80" />

          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium text-intenso-text-muted uppercase tracking-wider">
              Ingresos Servicios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold text-intenso-text mb-1 tracking-tight">
              ${(totalRevenue / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-intenso-text-muted flex items-center gap-1">
              <span className="text-intenso-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                {mockServicePurchases.length}
              </span>
              <span className="opacity-70 ml-1">transacciones</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-none bg-white/50 backdrop-blur-sm shadow-sm h-full">
          <CardHeader>
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-teal-500 rounded-full"></div>
              Estado de campañas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white/40 p-4 rounded-xl border border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-intenso-teal-500 rounded-full animate-pulse"></span>
                    <span className="font-medium text-intenso-text">
                      Activas
                    </span>
                  </div>
                  <span className="font-bold text-intenso-teal-700 bg-teal-50 px-2 py-0.5 rounded-md text-sm">
                    {mockCampaigns.filter((c) => c.status === "activa").length}
                  </span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-1.5">
                  <div
                    className="bg-intenso-teal-500 h-1.5 rounded-full"
                    style={{
                      width: `${
                        (mockCampaigns.filter((c) => c.status === "activa")
                          .length /
                          totalCampaigns) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-white/40 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-intenso-purple-600 border border-purple-100">
                    <span className="text-xs font-bold">P</span>
                  </div>
                  <span className="text-sm font-medium text-intenso-text">
                    En Progreso
                  </span>
                </div>
                <span className="text-sm font-semibold text-intenso-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  {
                    mockCampaigns.filter((c) => c.status === "en_progreso")
                      .length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-white/40 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-intenso-pink-600 border border-pink-100">
                    <span className="text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm font-medium text-intenso-text">
                    Completadas
                  </span>
                </div>
                <span className="text-sm font-semibold text-intenso-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  {completedCampaigns}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-white/40 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-intenso-orange-600 border border-orange-100">
                    <span className="text-xs font-bold">B</span>
                  </div>
                  <span className="text-sm font-medium text-intenso-text">
                    Borradores
                  </span>
                </div>
                <span className="text-sm font-semibold text-intenso-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                  {mockCampaigns.filter((c) => c.status === "borrador").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm h-full">
          <CardHeader>
            <CardTitle className="font-display text-lg text-intenso-text flex items-center gap-2">
              <div className="w-1.5 h-6 bg-intenso-purple-500 rounded-full"></div>
              Top Servicios Contratados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map(([serviceName, count], index) => (
                <div
                  key={serviceName}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        index === 0
                          ? "bg-white"
                          : index === 1
                            ? "bg-white"
                            : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {index === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8A3BC0] to-[#F15BA6] rounded-xl opacity-100" />
                      )}
                      {index === 1 && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0E8D8D] to-[#14b6b6] rounded-xl opacity-100" />
                      )}
                      <span
                        className={`relative text-lg font-black ${
                          index === 0 || index === 1
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                        style={
                          index === 0 || index === 1
                            ? { textShadow: "0 1px 2px rgba(0,0,0,0.3)" }
                            : {}
                        }
                      >
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-intenso-text truncate">
                        {serviceName}
                      </p>
                      <p className="text-xs text-intenso-text-muted">
                        Categoría popular
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white border border-gray-200 shadow-sm text-xs whitespace-nowrap px-3 py-1"
                  >
                    {count} ventas
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="shadow-sm border-none overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="font-display text-lg text-intenso-text">
              Campañas recientes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/campaigns")}
              className="text-intenso-teal-600 hover:text-intenso-teal-700 hover:bg-intenso-teal-50"
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-100">
                    <TableHead className="pl-6">Campaña</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Marca
                    </TableHead>
                    <TableHead className="pr-6">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCampaigns.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="cursor-pointer hover:bg-gray-50 border-gray-100 transition-colors"
                      onClick={() => navigate("/admin/campaigns")}
                    >
                      <TableCell className="font-medium text-sm pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                            {campaign.title.substring(0, 2)}
                          </div>
                          <div>
                            <div className="max-w-[150px] sm:max-w-none truncate font-semibold text-intenso-text">
                              {campaign.title}
                            </div>
                            <div className="sm:hidden text-xs text-intenso-text-muted mt-0.5">
                              {campaign.marcaName}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-intenso-text-muted hidden sm:table-cell">
                        {campaign.marcaName}
                      </TableCell>
                      <TableCell className="pr-6">
                        <Badge
                          className={`${getStatusColor(campaign.status)} shadow-none font-medium`}
                        >
                          {getStatusLabel(campaign.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="font-display text-lg text-intenso-text">
              Transacciones recientes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/purchases")}
              className="text-intenso-teal-600 hover:text-intenso-teal-700 hover:bg-intenso-teal-50"
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-100">
                    <TableHead className="pl-6">Servicio</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Marca
                    </TableHead>
                    <TableHead className="text-right pr-6">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPurchases.map((purchase) => (
                    <TableRow
                      key={purchase.id}
                      className="cursor-pointer hover:bg-gray-50 border-gray-100 transition-colors"
                      onClick={() => navigate("/admin/purchases")}
                    >
                      <TableCell className="font-medium text-sm pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                            <DollarSign className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="max-w-[130px] sm:max-w-none truncate font-semibold text-intenso-text">
                              {purchase.serviceName}
                            </div>
                            <div className="sm:hidden text-xs text-intenso-text-muted mt-0.5">
                              {purchase.marcaName}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-intenso-text-muted hidden sm:table-cell">
                        {purchase.marcaName}
                      </TableCell>
                      <TableCell className="text-right font-bold text-intenso-text text-sm pr-6">
                        ${purchase.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
