import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { mockServicePurchases, mockMarcas } from '@/data/mockData';
import { ServicePurchase } from '@/types';
import { Search, Eye, Calendar, DollarSign, Package, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const AdminPurchases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPurchase, setSelectedPurchase] = useState<ServicePurchase | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredPurchases = mockServicePurchases.filter(purchase => {
    const matchesSearch = purchase.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.marcaName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewDetails = (purchase: ServicePurchase) => {
    setSelectedPurchase(purchase);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return 'bg-green-100 text-green-700';
      case 'en_proceso': return 'bg-blue-100 text-blue-700';
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completado: 'Completado',
      en_proceso: 'En Proceso',
      pendiente: 'Pendiente'
    };
    return labels[status] || status;
  };

  // Calcular estadísticas
  const totalRevenue = mockServicePurchases.reduce((sum, p) => sum + p.price, 0);
  const completedPurchases = mockServicePurchases.filter(p => p.status === 'completado').length;
  const pendingPurchases = mockServicePurchases.filter(p => p.status === 'pendiente').length;
  const inProcessPurchases = mockServicePurchases.filter(p => p.status === 'en_proceso').length;

  const marca = selectedPurchase ? mockMarcas.find(m => m.id === selectedPurchase.marcaId) : null;

  // Agrupar compras por servicio
  const purchasesByService = mockServicePurchases.reduce((acc, purchase) => {
    acc[purchase.serviceName] = (acc[purchase.serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topServices = Object.entries(purchasesByService)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Gestión de Compras</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Historial de servicios contratados por las marcas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Ingresos Totales</p>
              </div>
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{completedPurchases}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Completados</p>
              </div>
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{inProcessPurchases}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">En Proceso</p>
              </div>
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{pendingPurchases}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Pendientes</p>
              </div>
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar por servicio o marca..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="completado">Completados</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Compras ({filteredPurchases.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        <div className="font-semibold text-gray-900">{purchase.serviceName}</div>
                      </TableCell>
                      <TableCell className="text-sm">{purchase.marcaName}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(purchase.purchaseDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900">
                          ${purchase.price.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(purchase.status)}>
                          {getStatusLabel(purchase.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewDetails(purchase)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Servicios Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topServices.map(([serviceName, count], index) => (
                  <div key={serviceName} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        index === 0 ? 'bg-purple-100' : 
                        index === 1 ? 'bg-blue-100' : 
                        index === 2 ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <span className={`text-sm font-semibold ${
                          index === 0 ? 'text-purple-600' : 
                          index === 1 ? 'text-blue-600' : 
                          index === 2 ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 line-clamp-1">{serviceName}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Month (Mock) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingresos Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Enero 2024</span>
                  <span className="font-semibold">$12,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Febrero 2024</span>
                  <span className="font-semibold">$18,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Marzo 2024</span>
                  <span className="font-semibold text-green-600">$25,800</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+42% vs mes anterior</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedPurchase && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{selectedPurchase.serviceName}</DialogTitle>
                    <DialogDescription className="mt-2">
                      <Badge className={getStatusColor(selectedPurchase.status)}>
                        {getStatusLabel(selectedPurchase.status)}
                      </Badge>
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${selectedPurchase.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">Monto</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Marca</h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={marca?.avatar} />
                        <AvatarFallback>{marca?.companyName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{selectedPurchase.marcaName}</p>
                        <p className="text-sm text-gray-500">{marca?.industry}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Fecha de Compra</h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">
                        {new Date(selectedPurchase.purchaseDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Descripción del Servicio</h4>
                  <p className="text-gray-700 text-sm">
                    {selectedPurchase.serviceDescription || 'Servicio contratado para optimizar la presencia digital de la marca.'}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-3">
                    <Select defaultValue={selectedPurchase.status}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_proceso">En Proceso</SelectItem>
                        <SelectItem value="completado">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Actualizar Estado</Button>
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

export default AdminPurchases;