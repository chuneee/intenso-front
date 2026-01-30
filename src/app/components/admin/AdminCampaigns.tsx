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
import { Search, Eye, Edit, Trash2, DollarSign, Users } from "lucide-react";

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
          <Button className="bg-intenso-black hover:bg-gray-800 text-white w-full sm:w-auto">
            <Edit className="w-4 h-4 mr-2" />
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500 opacity-80" />
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
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-gray-100/50 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
              <Input
                placeholder="Buscar campaña o marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus-visible:ring-intenso-purple-500"
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
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-base sm:text-lg">
            Campañas ({filteredCampaigns.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600">Campaña</TableHead>
                    <TableHead className="text-slate-600 hidden md:table-cell">
                      Marca
                    </TableHead>
                    <TableHead className="text-slate-600 hidden sm:table-cell">
                      Presupuesto
                    </TableHead>
                    <TableHead className="text-slate-600 hidden lg:table-cell">
                      Creadores
                    </TableHead>
                    <TableHead className="text-slate-600 hidden xl:table-cell">
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
                      <TableCell className="font-medium text-intenso-text">
                        {campaign.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-intenso-text-muted">
                          <Users className="w-4 h-4 text-gray-400" />
                          {campaign.marcaName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(campaign.status)} border-0 font-medium`}
                        >
                          {getStatusLabel(campaign.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-intenso-text">
                        {new Date(campaign.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-intenso-text font-medium">
                          <DollarSign className="w-3.5 h-3.5 text-intenso-text-muted" />
                          {campaign.budget.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewDetails(campaign)}
                          className="hover:text-intenso-purple-600 hover:bg-intenso-purple-50"
                        >
                          <Eye className="w-4 h-4" />
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

                <div className="pt-4 border-t flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
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
                  <Button variant="outline" className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
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
