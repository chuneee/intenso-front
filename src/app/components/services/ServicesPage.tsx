import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { mockServices, mockServicePurchases } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Service } from '@/types';
import { toast } from 'sonner';
import { 
  Search, 
  ShoppingCart, 
  CheckCircle2,
  Clock,
  Sparkles,
  Palette,
  Video,
  Users,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const userPurchases = mockServicePurchases.filter(p => p.marcaId === user?.id);

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'estrategia': return Sparkles;
      case 'diseno': return Palette;
      case 'edicion': return Video;
      case 'community_management': return Users;
      case 'ads': return TrendingUp;
      case 'consultoria': return BookOpen;
      default: return Sparkles;
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'estrategia': return 'Estrategia';
      case 'diseno': return 'Diseño';
      case 'edicion': return 'Edición';
      case 'community_management': return 'Community Management';
      case 'ads': return 'Publicidad';
      case 'consultoria': return 'Consultoría';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return 'bg-green-100 text-green-700';
      case 'en_progreso': return 'bg-blue-100 text-blue-700';
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completado': return 'Completado';
      case 'en_progreso': return 'En Progreso';
      case 'pendiente': return 'Pendiente';
      default: return status;
    }
  };

  const handlePurchase = (service: Service) => {
    setSelectedService(service);
    setIsPurchaseOpen(true);
  };

  const confirmPurchase = () => {
    toast.success('¡Servicio contratado exitosamente!', {
      description: 'Nos pondremos en contacto contigo pronto.'
    });
    setIsPurchaseOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Servicios Digitales</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">
          Impulsa tu marca con nuestros servicios profesionales
        </p>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="bg-white border border-slate-200 w-full sm:w-auto">
          <TabsTrigger value="catalog" className="data-[state=active]:bg-slate-100 flex-1 sm:flex-initial text-xs sm:text-sm">Catálogo de Servicios</TabsTrigger>
          <TabsTrigger value="purchases" className="data-[state=active]:bg-slate-100 flex-1 sm:flex-initial text-xs sm:text-sm">Mis Servicios ({userPurchases.length})</TabsTrigger>
        </TabsList>

        {/* Services Catalog */}
        <TabsContent value="catalog" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-56 border-slate-200">
                <SelectValue placeholder="Tipo de servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                <SelectItem value="estrategia">Estrategia</SelectItem>
                <SelectItem value="diseno">Diseño</SelectItem>
                <SelectItem value="edicion">Edición</SelectItem>
                <SelectItem value="community_management">Community Management</SelectItem>
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
                <Card key={service.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-slate-900 line-clamp-2">{service.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-slate-100 text-slate-700 text-xs">
                          {getServiceTypeLabel(service.type)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-slate-700 mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Incluye:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-auto pt-4 border-t border-slate-200">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <p className="text-xs sm:text-sm text-slate-600">Precio</p>
                          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                            ${service.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm"
                        onClick={() => handlePurchase(service)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Contratar Servicio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">No se encontraron servicios</h3>
              <p className="text-sm sm:text-base text-slate-600">
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
                const service = mockServices.find(s => s.id === purchase.serviceId);
                const Icon = service ? getServiceIcon(service.type) : Sparkles;
                
                return (
                  <Card key={purchase.id} className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg text-slate-900 line-clamp-2">{purchase.serviceName}</CardTitle>
                          <Badge className={`mt-2 ${getStatusColor(purchase.status)}`}>
                            {getStatusLabel(purchase.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs sm:text-sm text-slate-600">Fecha de Contratación</p>
                          <p className="font-medium text-slate-900 text-sm sm:text-base">
                            {new Date(purchase.purchaseDate).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-slate-600">Inversión</p>
                          <p className="text-xl sm:text-2xl font-bold text-slate-900">
                            ${purchase.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 border-slate-200 hover:bg-slate-50 text-xs sm:text-sm">
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                No has contratado servicios aún
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4">
                Explora nuestro catálogo y potencia tu marca
              </p>
              <Button 
                className="bg-slate-900 hover:bg-slate-800 text-sm"
                onClick={() => document.querySelector<HTMLButtonElement>('[value="catalog"]')?.click()}
              >
                Ver Catálogo de Servicios
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="mx-4">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-lg sm:text-xl">Confirmar Contratación</DialogTitle>
                <DialogDescription className="text-slate-600 text-sm sm:text-base">
                  Estás a punto de contratar el siguiente servicio
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-semibold text-base sm:text-lg mb-1 text-slate-900">{selectedService.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3">{selectedService.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs sm:text-sm">Duración</span>
                    <span className="font-medium text-slate-900 text-xs sm:text-sm">{selectedService.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-600 text-sm sm:text-base">Total a pagar</span>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                      ${selectedService.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-blue-900">
                    <strong>Nota:</strong> Al confirmar, nuestro equipo se pondrá en contacto contigo 
                    en las próximas 24 horas para coordinar los detalles del servicio.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-200 hover:bg-slate-50 text-sm"
                    onClick={() => setIsPurchaseOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-sm"
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