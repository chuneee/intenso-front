import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { mockCampaigns, mockMarcas, mockCreadores } from "@/data/mockData";
import { Campaign } from "@/types";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CurrencyDollarIcon,
  UsersIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const AdminCampaigns: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.marcaName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-200";
      case "en_progreso":
        return "bg-intenso-purple-50 text-intenso-purple-700 border border-intenso-purple-200";
      case "completada":
        return "bg-intenso-pink-50 text-intenso-pink-700 border border-intenso-pink-200";
      case "borrador":
        return "bg-intenso-orange-50 text-intenso-orange-700 border border-intenso-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      activa: "Activa",
      en_progreso: "En Progreso",
      completada: "Completada",
      borrador: "Borrador",
    };
    return labels[status] || status;
  };

  const marca = selectedCampaign
    ? mockMarcas.find((m) => m.id === selectedCampaign.marcaId)
    : null;
  const creadores = selectedCampaign
    ? mockCreadores.filter((c) => selectedCampaign.creadores.includes(c.id))
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-pink-500 to-intenso-magenta-500" />
              <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
                Campañas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
              Gestión de Campañas
            </h1>
            <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
              Administra todas las campañas de la plataforma
            </p>
          </div>
          <Button className="bg-intenso-magenta-500 hover:bg-intenso-magenta-600 text-white w-full sm:w-auto shadow-md">
            <PlusIcon className="w-4 h-4 mr-2" />
            Crear Campaña
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
              {mockCampaigns.filter((c) => c.status === "activa").length}
            </div>
            <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
              Activas
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
              {mockCampaigns.filter((c) => c.status === "en_progreso").length}
            </div>
            <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
              En Progreso
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-pink-500 to-intenso-magenta-500 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
              {mockCampaigns.filter((c) => c.status === "completada").length}
            </div>
            <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
              Completadas
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-yellow-500 to-intenso-orange-500 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
              {mockCampaigns.filter((c) => c.status === "borrador").length}
            </div>
            <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
              Borradores
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm mb-4 sm:mb-6">
        <CardHeader className="border-b border-gray-100 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
              <Input
                placeholder="Buscar campaña o marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus-visible:ring-intenso-magenta-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 border-gray-200">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="activa">Activas</SelectItem>
                <SelectItem value="en_progreso">En Progreso</SelectItem>
                <SelectItem value="completada">Completadas</SelectItem>
                <SelectItem value="borrador">Borradores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 pb-4 bg-gradient-to-r from-white/80 to-transparent">
          <div className="flex items-center justify-between">
            <CardTitle className="text-intenso-text text-base sm:text-lg font-display flex items-center gap-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-magenta-500 to-intenso-pink-500 rounded-full"></div>
              Campañas ({filteredCampaigns.length})
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-intenso-magenta-50 text-intenso-magenta-700 border border-intenso-magenta-200 font-medium"
            >
              {filteredCampaigns.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="text-intenso-text-muted font-medium">
                      Campaña
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden md:table-cell">
                      Marca
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden sm:table-cell">
                      Presupuesto
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden lg:table-cell">
                      Creadores
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden xl:table-cell">
                      Fechas
                    </TableHead>
                    <TableHead className="text-slate-600">Estado</TableHead>
                    <TableHead className="text-right text-slate-600">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="font-bold text-intenso-text">
                        {campaign.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2 text-intenso-text-muted">
                          <UsersIcon className="w-4 h-4 opacity-60" />
                          <span className="text-sm">{campaign.marcaName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-intenso-text font-bold">
                          <CurrencyDollarIcon className="w-4 h-4 text-intenso-orange-500" />
                          ${(campaign.budget / 1000).toFixed(0)}K
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant="secondary"
                          className="bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-200 font-medium"
                        >
                          {campaign.creadores.length} creadores
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-intenso-text-muted">
                        {new Date(campaign.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{
                              backgroundColor:
                                campaign.status === "activa"
                                  ? "#0e8d8d"
                                  : campaign.status === "en_progreso"
                                    ? "#8a3bc0"
                                    : campaign.status === "completada"
                                      ? "#f15ba6"
                                      : "#faba5f",
                              boxShadow: `0 0 0 2px ${
                                campaign.status === "activa"
                                  ? "rgba(14, 141, 141, 0.2)"
                                  : campaign.status === "en_progreso"
                                    ? "rgba(138, 59, 192, 0.2)"
                                    : campaign.status === "completada"
                                      ? "rgba(241, 91, 166, 0.2)"
                                      : "rgba(250, 186, 95, 0.2)"
                              }, 0 1px 2px rgba(0, 0, 0, 0.1)`,
                            }}
                          ></div>
                          <Badge
                            className={`${getStatusColor(campaign.status)} font-medium`}
                          >
                            {getStatusLabel(campaign.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewDetails(campaign)}
                          className="hover:text-intenso-magenta-600 hover:bg-intenso-magenta-50"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedCampaign.title}
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                      <Badge
                        className={getStatusColor(selectedCampaign.status)}
                      >
                        {getStatusLabel(selectedCampaign.status)}
                      </Badge>
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${selectedCampaign.budget.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">Presupuesto</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Campaign Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Marca
                    </h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={marca?.avatar} />
                        <AvatarFallback>
                          {marca?.companyName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedCampaign.marcaName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {marca?.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Categoria
                    </h4>
                    <p className="text-gray-900">{selectedCampaign.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Fecha de Inicio
                    </h4>
                    <p className="text-gray-900">
                      {new Date(selectedCampaign.startDate).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">
                      Fecha de Fin
                    </h4>
                    <p className="text-gray-900">
                      {new Date(selectedCampaign.endDate).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    Descripción
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {selectedCampaign.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    Entregables ({selectedCampaign.deliverables.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedCampaign.deliverables.map((deliverable, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {deliverable}
                        </span>
                        <Badge variant="secondary">Requerido</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creators */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    Creadores Asignados ({creadores.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {creadores.map((creador) => (
                      <div key={creador.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={creador.avatar} />
                            <AvatarFallback>
                              {creador.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                              {creador.name}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {creador.niche.slice(0, 2).map((n) => (
                                <Badge
                                  key={n}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {n}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-intenso-teal-200 text-intenso-teal-700 hover:bg-intenso-teal-50"
                  >
                    <PencilSquareIcon className="w-4 h-4 mr-2" />
                    Editar Campaña
                  </Button>
                  <Select defaultValue={selectedCampaign.status}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activa">Activa</SelectItem>
                      <SelectItem value="en_progreso">En Progreso</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                      <SelectItem value="borrador">Borrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCampaigns;
