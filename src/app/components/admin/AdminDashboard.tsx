import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { mockMarcas, mockCreadores, mockCampaigns, mockServicePurchases } from '@/data/mockData';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  Megaphone, 
  ShoppingBag,
  TrendingUp,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const totalMarcas = mockMarcas.length;
  const totalCreadores = mockCreadores.length;
  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'activa' || c.status === 'en_progreso').length;
  const completedCampaigns = mockCampaigns.filter(c => c.status === 'completada').length;
  
  const totalRevenue = mockServicePurchases.reduce((sum, p) => sum + p.price, 0);
  const recentPurchases = mockServicePurchases.slice(0, 5);
  const recentCampaigns = mockCampaigns.slice(0, 5);

  // Servicios más contratados
  const serviceStats = mockServicePurchases.reduce((acc, purchase) => {
    acc[purchase.serviceName] = (acc[purchase.serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topServices = Object.entries(serviceStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700';
      case 'en_progreso': return 'bg-blue-100 text-blue-700';
      case 'completada': return 'bg-gray-100 text-gray-700';
      case 'borrador': return 'bg-yellow-100 text-yellow-700';
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'completado': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      activa: 'Activa',
      en_progreso: 'En Progreso',
      completada: 'Completada',
      borrador: 'Borrador',
      pendiente: 'Pendiente',
      completado: 'Completado'
    };
    return labels[status] || status;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Vista general de la plataforma CreatorHub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('admin-marcas')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Marcas Registradas
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{totalMarcas}</div>
            <p className="text-xs text-slate-500 mt-1">Total de empresas activas</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('admin-creadores')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Creadores Activos
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{totalCreadores}</div>
            <p className="text-xs text-slate-500 mt-1">Creadores de contenido</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer sm:col-span-2 lg:col-span-1" onClick={() => onNavigate('admin-campaigns')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Campañas Activas
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{activeCampaigns}</div>
            <p className="text-xs text-slate-500 mt-1">De {totalCampaigns} totales</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Ingresos por Servicios
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">{mockServicePurchases.length} servicios contratados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Campaign Stats */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-base sm:text-lg">Estado de Campañas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Activas</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {mockCampaigns.filter(c => c.status === 'activa').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">En Progreso</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {mockCampaigns.filter(c => c.status === 'en_progreso').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Completadas</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {completedCampaigns}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Borradores</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {mockCampaigns.filter(c => c.status === 'borrador').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-base sm:text-lg">Servicios Más Contratados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {topServices.map(([serviceName, count], index) => (
                <div key={serviceName} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-purple-100' : 
                      index === 1 ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        index === 0 ? 'text-purple-600' : 
                        index === 1 ? 'text-blue-600' : 'text-slate-600'
                      }`}>
                        #{index + 1}
                      </span>
                    </div>
                    <span className="text-sm text-slate-700 truncate">{serviceName}</span>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs whitespace-nowrap">{count} contrataciones</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Campaigns */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900 text-base sm:text-lg">Campañas Recientes</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm"
              onClick={() => onNavigate('admin-campaigns')}
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600">Campaña</TableHead>
                      <TableHead className="text-slate-600 hidden sm:table-cell">Marca</TableHead>
                      <TableHead className="text-slate-600">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCampaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="cursor-pointer hover:bg-slate-50 border-slate-200">
                        <TableCell className="font-medium text-slate-900 text-sm">
                          <div className="max-w-[200px] sm:max-w-none truncate">{campaign.title}</div>
                          <div className="sm:hidden text-xs text-slate-500 mt-1">{campaign.marcaName}</div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 hidden sm:table-cell">{campaign.marcaName}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {getStatusLabel(campaign.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900 text-base sm:text-lg">Compras Recientes</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm"
              onClick={() => onNavigate('admin-purchases')}
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600">Servicio</TableHead>
                      <TableHead className="text-slate-600 hidden sm:table-cell">Marca</TableHead>
                      <TableHead className="text-right text-slate-600">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPurchases.map((purchase) => (
                      <TableRow key={purchase.id} className="cursor-pointer hover:bg-slate-50 border-slate-200">
                        <TableCell className="font-medium text-sm text-slate-900">
                          <div className="max-w-[150px] sm:max-w-none truncate">{purchase.serviceName}</div>
                          <div className="sm:hidden text-xs text-slate-500 mt-1">{purchase.marcaName}</div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 hidden sm:table-cell">{purchase.marcaName}</TableCell>
                        <TableCell className="text-right font-semibold text-slate-900 text-sm">${purchase.price.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;