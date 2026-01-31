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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { mockCampaigns, mockCreadores } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Campaign } from "@/types";

const CampaignsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const isMarca = user?.type === "marca";

  const userCampaigns = isMarca
    ? mockCampaigns.filter((c) => c.marcaId === user?.id)
    : mockCampaigns.filter((c) => c.creadores.includes(user?.id || ""));

  const filteredCampaigns = userCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-100";
      case "en_progreso":
        return "bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-100";
      case "completada":
        return "bg-slate-50 text-slate-600 border-slate-100";
      case "borrador":
        return "bg-intenso-yellow-200 text-yellow-800 border-yellow-300";
      case "cancelada":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "activa":
        return "bg-intenso-teal-500";
      case "en_progreso":
        return "bg-intenso-purple-500";
      case "completada":
        return "bg-slate-400";
      case "borrador":
        return "bg-yellow-500";
      case "cancelada":
        return "bg-red-500";
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
      case "borrador":
        return "Borrador";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const viewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500" />
            <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
              {isMarca ? "Gestión de Campañas" : "Mis Campañas"}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
            {isMarca ? "Gestión de Campañas" : "Mis Campañas"}
          </h1>
          <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
            {isMarca
              ? "Crea y administra tus campañas de marketing"
              : "Colaboraciones asignadas y en progreso"}
          </p>
        </div>
        {isMarca && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-intenso-magenta-500 text-white hover:bg-intenso-magenta-600 shadow-lg shadow-intenso-magenta-500/30 transition-all duration-300 w-full sm:w-auto">
                <PlusIcon className="w-4 h-4 mr-2" />
                Nueva Campaña
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 border-none bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="font-display text-intenso-text">
                  Crear Nueva Campaña
                </DialogTitle>
                <DialogDescription className="text-intenso-text-muted">
                  Define los detalles de tu nueva campaña
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-intenso-text font-medium"
                  >
                    Título de la Campaña
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej: Lanzamiento Producto X"
                    className="border-intenso-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-intenso-text font-medium"
                  >
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe los objetivos y detalles de la campaña"
                    rows={4}
                    className="border-intenso-border"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="budget"
                      className="text-intenso-text font-medium"
                    >
                      Presupuesto
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="10000"
                      className="border-intenso-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-intenso-text font-medium"
                    >
                      Categoría
                    </Label>
                    <Select>
                      <SelectTrigger className="border-intenso-border">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="belleza">Belleza</SelectItem>
                        <SelectItem value="comida">Comida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="startDate"
                      className="text-intenso-text font-medium"
                    >
                      Fecha de Inicio
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="border-intenso-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="text-intenso-text font-medium"
                    >
                      Fecha de Fin
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      className="border-intenso-border"
                    />
                  </div>
                </div>
                <Button className="w-full bg-intenso-purple-500 hover:bg-intenso-purple-600 text-white shadow-lg shadow-intenso-purple-500/30">
                  Crear Campaña
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-5 h-5" />
          <Input
            placeholder="Buscar campañas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-intenso-border bg-white/50 backdrop-blur-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-intenso-border bg-white/50 backdrop-blur-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="borrador">Borrador</SelectItem>
            <SelectItem value="activa">Activa</SelectItem>
            <SelectItem value="en_progreso">En Progreso</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="border-none bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2 gap-2">
                <CardTitle className="font-display text-base sm:text-lg text-intenso-text line-clamp-2">
                  {campaign.title}
                </CardTitle>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusDotColor(campaign.status)}`}
                  />
                  <Badge className={getStatusColor(campaign.status)}>
                    {getStatusLabel(campaign.status)}
                  </Badge>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-intenso-text-muted font-medium">
                {campaign.marcaName}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-intenso-text mb-4 line-clamp-2">
                {campaign.description}
              </p>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-intenso-text-muted">
                  <CurrencyDollarIcon className="w-4 h-4 text-intenso-teal-600" />
                  <span className="font-bold text-intenso-text">
                    ${campaign.budget.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-intenso-text-muted">
                  <CalendarIcon className="w-4 h-4 text-intenso-purple-600" />
                  <span className="truncate">
                    {new Date(campaign.startDate).toLocaleDateString("es-ES")} -{" "}
                    {new Date(campaign.endDate).toLocaleDateString("es-ES")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-intenso-text-muted">
                  <UsersIcon className="w-4 h-4 text-intenso-magenta-600" />
                  <span>{campaign.creadores.length} creadores asignados</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/50 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-intenso-border bg-white/50 hover:bg-white text-xs sm:text-sm group-hover:border-intenso-purple-200 transition-colors"
                  onClick={() => viewCampaignDetails(campaign)}
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Ver Detalles
                </Button>
                {isMarca && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-intenso-border bg-white/50 hover:bg-white hover:border-intenso-purple-200 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
          </div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-intenso-text mb-2">
            No se encontraron campañas
          </h3>
          <p className="text-sm sm:text-base text-intenso-text-muted">
            {searchQuery || statusFilter !== "all"
              ? "Intenta ajustar tus filtros de búsqueda"
              : isMarca
                ? "Crea tu primera campaña para comenzar"
                : "Aún no tienes campañas asignadas"}
          </p>
        </div>
      )}

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 border-none bg-white/95 backdrop-blur-sm">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="font-display text-xl sm:text-2xl text-intenso-text">
                      {selectedCampaign.title}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-intenso-text-muted">
                      {selectedCampaign.marcaName}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusDotColor(selectedCampaign.status)}`}
                    />
                    <Badge className={getStatusColor(selectedCampaign.status)}>
                      {getStatusLabel(selectedCampaign.status)}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                    Descripción
                  </h4>
                  <p className="text-intenso-text-muted text-sm sm:text-base">
                    {selectedCampaign.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                      Presupuesto
                    </h4>
                    <p className="text-xl sm:text-2xl font-display font-bold text-intenso-text">
                      ${selectedCampaign.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                      Categoría
                    </h4>
                    <Badge
                      variant="secondary"
                      className="bg-intenso-purple-50 text-intenso-purple-700 border border-intenso-purple-100"
                    >
                      {selectedCampaign.category}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                      Fecha de Inicio
                    </h4>
                    <p className="text-intenso-text-muted text-sm sm:text-base">
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
                    <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                      Fecha de Fin
                    </h4>
                    <p className="text-intenso-text-muted text-sm sm:text-base">
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
                  <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base">
                    Entregables
                  </h4>
                  <ul className="space-y-2">
                    {selectedCampaign.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-intenso-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-intenso-teal-700 font-bold">
                            ✓
                          </span>
                        </span>
                        <span className="text-intenso-text text-sm sm:text-base">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base">
                    Creadores Asignados ({selectedCampaign.creadores.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedCampaign.creadores.map((creadorId) => {
                      const creador = mockCreadores.find(
                        (c) => c.id === creadorId,
                      );
                      return creador ? (
                        <div
                          key={creadorId}
                          className="flex items-center gap-3 p-3 border border-white/50 bg-white/40 rounded-lg hover:bg-white/60 transition-colors"
                        >
                          <img
                            src={creador.avatar}
                            alt={creador.name}
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-intenso-text text-sm sm:text-base truncate">
                              {creador.name}
                            </p>
                            <p className="text-xs sm:text-sm text-intenso-text-muted truncate">
                              {creador.niche.join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-1 mb-0.5">
                              <img
                                src="/img/isotipo.png"
                                alt="Intenso"
                                className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 saturate-100"
                                style={{
                                  filter:
                                    "invert(45%) sepia(68%) saturate(1000%) hue-rotate(145deg) brightness(95%) contrast(95%)",
                                }}
                              />
                              <p className="text-xs sm:text-sm font-bold text-intenso-text">
                                {creador.rating}
                              </p>
                            </div>
                            <p className="text-xs text-intenso-text-muted">
                              {creador.completedCampaigns} campañas
                            </p>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
