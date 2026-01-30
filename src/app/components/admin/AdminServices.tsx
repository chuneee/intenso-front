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
import { Edit, Plus, Power, DollarSign } from "lucide-react";

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
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-teal-500 to-emerald-500" />
              <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
                Catálogo
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
            className="bg-intenso-black hover:bg-gray-800 w-full sm:w-auto text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Servicio
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-none shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl font-bold font-display text-intenso-text">
              {totalServices}
            </div>
            <p className="text-xs uppercase tracking-wider text-intenso-text-muted font-medium mt-1">
              Total Servicios
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl font-bold font-display text-intenso-text">
              {activeServices}
            </div>
            <p className="text-xs uppercase tracking-wider text-intenso-text-muted font-medium mt-1">
              Activos
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="text-3xl font-bold font-display text-intenso-text">
              ${avgPrice.toLocaleString()}
            </div>
            <p className="text-xs uppercase tracking-wider text-intenso-text-muted font-medium mt-1">
              Precio Promedio
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border-none shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full"
          >
            <CardHeader className="pb-4 relative">
              <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl grayscale group-hover:grayscale-0">
                {getIconForService(service.name)}
              </div>
              <div className="flex justify-between items-start">
                <Badge
                  variant="outline"
                  className={`mb-2 font-normal border-0 ${service.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {service.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <CardTitle className="text-xl text-intenso-text font-display pr-8 leading-tight">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              <div className="text-2xl font-bold text-intenso-text mb-3 tracking-tight">
                ${service.price.toLocaleString()}
              </div>
              <p className="text-sm text-intenso-text-muted mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="space-y-1">
                {service.features.slice(0, 3).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center text-xs text-intenso-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-intenso-teal-400 mr-2" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-xs text-intenso-text-muted pl-3.5 pt-1 italic">
                    +{service.features.length - 3} características más
                  </div>
                )}
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-intenso-text hover:bg-gray-50 hover:text-intenso-purple-600"
                  onClick={() => openEditDialog(service)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 hover:bg-red-50 hover:text-red-600 text-intenso-text-muted"
                >
                  <Power className="w-4 h-4" />
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? "Crear Nuevo Servicio" : "Editar Servicio"}
            </DialogTitle>
            <DialogDescription>
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
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  <Plus className="w-4 h-4 mr-1" />
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
            >
              Cancelar
            </Button>
            <Button>
              {isCreateOpen ? "Crear Servicio" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
