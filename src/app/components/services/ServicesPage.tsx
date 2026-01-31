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
} from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { mockServices, mockServicePurchases } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Service } from "@/types";
import { toast } from "sonner";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  PaintBrushIcon,
  VideoCameraIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const ServicesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const userPurchases = mockServicePurchases.filter(
    (p) => p.marcaId === user?.id,
  );

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || service.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "estrategia":
        return SparklesIcon;
      case "diseno":
        return PaintBrushIcon;
      case "edicion":
        return VideoCameraIcon;
      case "community_management":
        return UsersIcon;
      case "ads":
        return ArrowTrendingUpIcon;
      case "consultoria":
        return BookOpenIcon;
      default:
        return SparklesIcon;
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case "estrategia":
        return "Estrategia";
      case "diseno":
        return "Diseño";
      case "edicion":
        return "Edición";
      case "community_management":
        return "Community Management";
      case "ads":
        return "Publicidad";
      case "consultoria":
        return "Consultoría";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-100";
      case "en_progreso":
        return "bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-100";
      case "pendiente":
        return "bg-intenso-orange-50 text-intenso-orange-700 border-intenso-orange-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-intenso-teal-500";
      case "en_progreso":
        return "bg-intenso-purple-500";
      case "pendiente":
        return "bg-intenso-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completado":
        return "Completado";
      case "en_progreso":
        return "En Progreso";
      case "pendiente":
        return "Pendiente";
      default:
        return status;
    }
  };

  const handlePurchase = (service: Service) => {
    setSelectedService(service);
    setIsPurchaseOpen(true);
  };

  const confirmPurchase = () => {
    toast.success("¡Servicio contratado exitosamente!", {
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setIsPurchaseOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Servicios Digitales
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
          Servicios Digitales
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Impulsa tu marca con nuestros servicios profesionales
        </p>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm border border-intenso-border w-full sm:w-auto">
          <TabsTrigger
            value="catalog"
            className="data-[state=active]:bg-white flex-1 sm:flex-initial text-xs sm:text-sm font-medium"
          >
            Catálogo de Servicios
          </TabsTrigger>
          <TabsTrigger
            value="purchases"
            className="data-[state=active]:bg-white flex-1 sm:flex-initial text-xs sm:text-sm font-medium"
          >
            Mis Servicios ({userPurchases.length})
          </TabsTrigger>
        </TabsList>

        {/* Services Catalog */}
        <TabsContent value="catalog" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-5 h-5" />
              <Input
                placeholder="Buscar servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-intenso-border bg-white/50 backdrop-blur-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-56 border-intenso-border bg-white/50 backdrop-blur-sm">
                <SelectValue placeholder="Tipo de servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                <SelectItem value="estrategia">Estrategia</SelectItem>
                <SelectItem value="diseno">Diseño</SelectItem>
                <SelectItem value="edicion">Edición</SelectItem>
                <SelectItem value="community_management">
                  Community Management
                </SelectItem>
                <SelectItem value="ads">Publicidad</SelectItem>
                <SelectItem value="consultoria">Consultoría</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredServices.map((service) => {
              const Icon = getServiceIcon(service.type);
              return (
                <Card
                  key={service.id}
                  className="border-none bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-intenso-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-intenso-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="font-display text-base sm:text-lg text-intenso-text line-clamp-2">
                          {service.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="mt-1 bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-100 text-xs"
                        >
                          {getServiceTypeLabel(service.type)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-intenso-text mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm text-intenso-text-muted">
                      <ClockIcon className="w-4 h-4 text-intenso-orange-600" />
                      <span>{service.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm font-bold text-intenso-text mb-2">
                        Incluye:
                      </p>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-xs sm:text-sm text-intenso-text"
                          >
                            <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-intenso-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-auto pt-4 border-t border-white/50">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <p className="text-xs sm:text-sm text-intenso-text-muted">
                            Precio
                          </p>
                          <p className="text-2xl sm:text-3xl font-display font-bold text-intenso-text">
                            ${service.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="w-full text-white shadow-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                        style={{
                          backgroundColor: "#0e8d8d",
                          boxShadow:
                            "0 10px 15px -3px rgba(14, 141, 141, 0.3), 0 4px 6px -4px rgba(14, 141, 141, 0.3)",
                        }}
                        onClick={() => handlePurchase(service)}
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-2" />
                        Contratar Servicio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-intenso-text mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-sm sm:text-base text-intenso-text-muted">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </TabsContent>

        {/* My Purchases */}
        <TabsContent value="purchases" className="space-y-6">
          {userPurchases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {userPurchases.map((purchase) => {
                const service = mockServices.find(
                  (s) => s.id === purchase.serviceId,
                );
                const Icon = service
                  ? getServiceIcon(service.type)
                  : SparklesIcon;

                return (
                  <Card
                    key={purchase.id}
                    className="border-none bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-intenso-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-intenso-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="font-display text-base sm:text-lg text-intenso-text line-clamp-2">
                            {purchase.serviceName}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 mt-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusDotColor(purchase.status)}`}
                            />
                            <Badge
                              className={`${getStatusColor(purchase.status)} border`}
                            >
                              {getStatusLabel(purchase.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs sm:text-sm text-intenso-text-muted">
                            Fecha de Contratación
                          </p>
                          <p className="font-medium text-intenso-text text-sm sm:text-base">
                            {new Date(purchase.purchaseDate).toLocaleDateString(
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
                          <p className="text-xs sm:text-sm text-intenso-text-muted">
                            Inversión
                          </p>
                          <p className="text-xl sm:text-2xl font-display font-bold text-intenso-text">
                            ${purchase.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-intenso-border bg-white/50 hover:bg-white text-xs sm:text-sm"
                      >
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <ShoppingCartIcon className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-intenso-text mb-2">
                No has contratado servicios aún
              </h3>
              <p className="text-sm sm:text-base text-intenso-text-muted mb-4">
                Explora nuestro catálogo y potencia tu marca
              </p>
              <Button
                className="text-white shadow-lg text-sm hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "#0e8d8d",
                  boxShadow:
                    "0 10px 15px -3px rgba(14, 141, 141, 0.3), 0 4px 6px -4px rgba(14, 141, 141, 0.3)",
                }}
                onClick={() =>
                  document
                    .querySelector<HTMLButtonElement>('[value="catalog"]')
                    ?.click()
                }
              >
                Ver Catálogo de Servicios
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="mx-4 border-none bg-white/95 backdrop-blur-sm">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-intenso-text text-lg sm:text-xl">
                  Confirmar Contratación
                </DialogTitle>
                <DialogDescription className="text-intenso-text-muted text-sm sm:text-base">
                  Estás a punto de contratar el siguiente servicio
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-3 sm:p-4 border border-white/50 bg-white/40 rounded-lg">
                  <h4 className="font-bold text-base sm:text-lg mb-1 text-intenso-text">
                    {selectedService.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-intenso-text-muted mb-3">
                    {selectedService.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-intenso-text-muted text-xs sm:text-sm">
                      Duración
                    </span>
                    <span className="font-medium text-intenso-text text-xs sm:text-sm">
                      {selectedService.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/50">
                    <span className="text-intenso-text-muted text-sm sm:text-base">
                      Total a pagar
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-bold text-intenso-text">
                      ${selectedService.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-intenso-teal-50 border border-intenso-teal-100 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-intenso-teal-900">
                    <strong>Nota:</strong> Al confirmar, nuestro equipo se
                    pondrá en contacto contigo en las próximas 24 horas para
                    coordinar los detalles del servicio.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-intenso-border bg-white/50 hover:bg-white text-sm"
                    onClick={() => setIsPurchaseOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 text-white shadow-lg text-sm hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: "#0e8d8d",
                      boxShadow:
                        "0 10px 15px -3px rgba(14, 141, 141, 0.3), 0 4px 6px -4px rgba(14, 141, 141, 0.3)",
                    }}
                    onClick={confirmPurchase}
                  >
                    Confirmar Contratación
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

export default ServicesPage;
