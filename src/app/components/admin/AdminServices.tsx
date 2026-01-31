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
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { mockServices } from "@/data/mockData";
import { Service } from "@/types";
import {
  PencilSquareIcon,
  PlusIcon,
  PowerIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

type ServiceStatus = "active" | "inactive";

type ServiceWithStatus = Service & { status: ServiceStatus };

const AdminServices: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    features: [""],
  });

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      features: service.features,
    });
    setIsEditOpen(true);
  };

  const openCreateDialog = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      features: [""],
    });
    setIsCreateOpen(true);
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const getIconForService = (name: string) => {
    if (name.includes("Estrategia") || name.includes("Consultoría"))
      return "📊";
    if (name.includes("Diseño")) return "🎨";
    if (name.includes("Video")) return "🎥";
    if (name.includes("Community")) return "💬";
    if (name.includes("Publicidad") || name.includes("Ads")) return "📢";
    return "📦";
  };

  // Calcular estadísticas
  const services = mockServices as ServiceWithStatus[];

  const totalServices = services.length;
  const activeServices = services.filter((s) => s.status === "active").length;
  const avgPrice = Math.round(
    services.reduce((sum, s) => sum + s.price, 0) / services.length,
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-magenta-500" />
              <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
                Catálogo Digital
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
              Gestión de Servicios
            </h1>
            <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
              Administra los servicios digitales de la agencia
            </p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="bg-intenso-magenta-500 hover:bg-intenso-magenta-600 w-full sm:w-auto text-white shadow-md"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Crear Servicio
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                {totalServices}
              </div>
              <ChartBarIcon className="w-8 h-8 text-intenso-teal-500 opacity-50" />
            </div>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-intenso-text-muted font-medium">
              Total Servicios
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                {activeServices}
              </div>
              <CheckCircleIcon className="w-8 h-8 text-intenso-purple-500 opacity-50" />
            </div>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-intenso-text-muted font-medium">
              Activos
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-orange-500 to-intenso-orange-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                ${avgPrice.toLocaleString()}
              </div>
              <CurrencyDollarIcon className="w-8 h-8 text-intenso-orange-500 opacity-50" />
            </div>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-intenso-text-muted font-medium">
              Precio Promedio
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border-none shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full bg-white/60 backdrop-blur-sm hover:bg-white/80"
          >
            <CardHeader className="pb-4 relative bg-gradient-to-br from-white/50 to-transparent">
              <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-30 transition-all duration-300 text-5xl">
                {getIconForService(service.name)}
              </div>
              <div className="flex justify-between items-start">
                <Badge
                  variant="outline"
                  className={`mb-2 font-medium border-0 ${service.status === "active" ? "bg-intenso-teal-50 text-intenso-teal-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {service.status === "active" ? (
                    <CheckCircleIcon className="w-3.5 h-3.5 mr-1 inline" />
                  ) : (
                    <XCircleIcon className="w-3.5 h-3.5 mr-1 inline" />
                  )}
                  {service.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <CardTitle className="text-xl text-intenso-text font-display pr-8 leading-tight group-hover:text-intenso-magenta-600 transition-colors">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <CurrencyDollarIcon className="w-5 h-5 text-intenso-orange-500" />
                <div className="text-2xl font-bold text-intenso-text tracking-tight">
                  ${service.price.toLocaleString()}
                </div>
              </div>
              <p className="text-sm text-intenso-text-muted mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="space-y-2">
                {service.features.slice(0, 3).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start text-xs text-intenso-text-muted"
                  >
                    <SparklesIcon className="w-3.5 h-3.5 text-intenso-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-xs text-intenso-magenta-600 pl-5 pt-1 font-medium">
                    +{service.features.length - 3} características más
                  </div>
                )}
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-intenso-text hover:bg-intenso-magenta-50 hover:text-intenso-magenta-600 hover:border-intenso-magenta-200 transition-all"
                  onClick={() => openEditDialog(service)}
                >
                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 hover:bg-red-50 hover:text-red-600 text-intenso-text-muted transition-all"
                >
                  <PowerIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-intenso-text flex items-center gap-2">
              <SparklesIcon className="w-6 h-6 text-intenso-magenta-500" />
              {isCreateOpen ? "Crear Nuevo Servicio" : "Editar Servicio"}
            </DialogTitle>
            <DialogDescription className="text-intenso-text-muted">
              {isCreateOpen
                ? "Completa la información del nuevo servicio digital"
                : "Modifica los detalles del servicio"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Nombre del Servicio</Label>
              <Input
                id="name"
                placeholder="Ej: Estrategia de Contenido"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe el servicio..."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="price">Precio (USD)</Label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Características / Incluye</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Agregar
                </Button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Característica del servicio"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        className="text-red-600"
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
              }}
              className="border-gray-200 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button className="bg-intenso-magenta-500 hover:bg-intenso-magenta-600 text-white shadow-md">
              {isCreateOpen ? "Crear Servicio" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
