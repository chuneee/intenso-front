import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { mockServices } from '@/data/mockData';
import { Service } from '@/types';
import { Edit, Plus, Power, DollarSign, Package, TrendingUp } from 'lucide-react';

const AdminServices: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: ['']
  });

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      features: service.features
    });
    setIsEditOpen(true);
  };

  const openCreateDialog = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      features: ['']
    });
    setIsCreateOpen(true);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const getIconForService = (name: string) => {
    if (name.includes('Estrategia') || name.includes('Consultoría')) return '📊';
    if (name.includes('Diseño')) return '🎨';
    if (name.includes('Video')) return '🎥';
    if (name.includes('Community')) return '💬';
    if (name.includes('Publicidad') || name.includes('Ads')) return '📢';
    return '📦';
  };

  // Calcular estadísticas
  const totalServices = mockServices.length;
  const activeServices = mockServices.filter(s => s.status === 'active').length;
  const avgPrice = Math.round(mockServices.reduce((sum, s) => sum + s.price, 0) / mockServices.length);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Gestión de Servicios</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Administra los servicios digitales de la agencia</p>
          </div>
          <Button onClick={openCreateDialog} className="bg-slate-900 hover:bg-slate-800 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Crear Servicio
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{totalServices}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Servicios Totales</p>
              </div>
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{activeServices}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Servicios Activos</p>
              </div>
              <Power className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm sm:col-span-3 lg:col-span-1">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">${avgPrice.toLocaleString()}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Precio Promedio</p>
              </div>
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {mockServices.map((service) => (
          <Card key={service.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{getIconForService(service.name)}</div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge 
                      className={service.status === 'active' 
                        ? 'bg-green-100 text-green-700 mt-2' 
                        : 'bg-gray-100 text-gray-700 mt-2'}
                    >
                      {service.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 min-h-[3rem]">
                {service.description}
              </CardDescription>

              <div className="mb-4">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${service.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-gray-700">Incluye:</p>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-gray-500">
                      +{service.features.length - 3} más...
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => openEditDialog(service)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className={service.status === 'active' ? 'text-red-600' : 'text-green-600'}
                >
                  <Power className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? 'Crear Nuevo Servicio' : 'Editar Servicio'}
            </DialogTitle>
            <DialogDescription>
              {isCreateOpen 
                ? 'Completa la información del nuevo servicio digital' 
                : 'Modifica los detalles del servicio'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Nombre del Servicio</Label>
              <Input
                id="name"
                placeholder="Ej: Estrategia de Contenido"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe el servicio..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Características / Incluye</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
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
            <Button variant="outline" onClick={() => {
              setIsCreateOpen(false);
              setIsEditOpen(false);
            }}>
              Cancelar
            </Button>
            <Button>
              {isCreateOpen ? 'Crear Servicio' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;