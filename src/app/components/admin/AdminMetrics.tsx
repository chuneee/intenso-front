import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { mockMarcas, mockCreadores, mockCampaigns, mockServicePurchases } from '@/data/mockData';
import { TrendingUp, TrendingDown, Users, Briefcase, Sparkles, Megaphone, DollarSign, Calendar } from 'lucide-react';

const AdminMetrics: React.FC = () => {
  // Calcular crecimiento (mock)
  const marcasGrowth = 15.3;
  const creadoresGrowth = 22.7;
  const campaignsGrowth = 18.5;
  const revenueGrowth = 31.2;

  // Estadísticas por mes (mock)
  const monthlyData = [
    { month: 'Enero', marcas: 1, creadores: 2, campaigns: 2, revenue: 8500 },
    { month: 'Febrero', marcas: 1, creadores: 3, campaigns: 3, revenue: 12300 },
    { month: 'Marzo', marcas: 2, creadores: 4, campaigns: 5, revenue: 18900 },
  ];

  // Top marcas por inversión
  const marcasByBudget = mockMarcas.map(marca => {
    const campaigns = mockCampaigns.filter(c => c.marcaId === marca.id);
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const purchases = mockServicePurchases.filter(p => p.marcaId === marca.id);
    const totalPurchases = purchases.reduce((sum, p) => sum + p.price, 0);
    return {
      ...marca,
      totalBudget,
      totalPurchases,
      totalSpent: totalBudget + totalPurchases,
      campaignCount: campaigns.length
    };
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  // Top creadores por campañas
  const creadoresByCampaigns = mockCreadores.map(creador => {
    const campaigns = mockCampaigns.filter(c => c.creadores.includes(creador.id));
    return {
      ...creador,
      campaignCount: campaigns.length
    };
  }).sort((a, b) => b.campaignCount - a.campaignCount).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Métricas y Reportes</h1>
        <p className="text-gray-600 mt-1">Análisis detallado del rendimiento de la plataforma</p>
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Crecimiento Marcas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{mockMarcas.length}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{marcasGrowth}%</span>
                </div>
              </div>
              <Briefcase className="w-10 h-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Crecimiento Creadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{mockCreadores.length}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{creadoresGrowth}%</span>
                </div>
              </div>
              <Sparkles className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Campañas Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{mockCampaigns.length}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{campaignsGrowth}%</span>
                </div>
              </div>
              <Megaphone className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${mockServicePurchases.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{revenueGrowth}%</span>
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-emerald-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento Mensual</CardTitle>
            <CardDescription>Evolución de la plataforma en los últimos 3 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{data.month} 2024</span>
                    </div>
                    <Badge variant="secondary">${data.revenue.toLocaleString()}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Marcas</p>
                      <p className="text-lg font-semibold text-gray-900">{data.marcas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Creadores</p>
                      <p className="text-lg font-semibold text-gray-900">{data.creadores}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Campañas</p>
                      <p className="text-lg font-semibold text-gray-900">{data.campaigns}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Marcas */}
        <Card>
          <CardHeader>
            <CardTitle>Top Marcas por Inversión</CardTitle>
            <CardDescription>Marcas con mayor gasto en campañas y servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marcasByBudget.map((marca, index) => (
                <div key={marca.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100' : 
                      index === 1 ? 'bg-gray-100' : 'bg-orange-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        index === 0 ? 'text-yellow-600' : 
                        index === 1 ? 'text-gray-600' : 'text-orange-600'
                      }`}>
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{marca.companyName}</p>
                      <p className="text-xs text-gray-500">{marca.campaignCount} campañas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${marca.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total invertido</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Creadores */}
        <Card>
          <CardHeader>
            <CardTitle>Top Creadores por Actividad</CardTitle>
            <CardDescription>Creadores más activos en campañas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creadoresByCampaigns.map((creador, index) => (
                <div key={creador.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{creador.name}</p>
                      <div className="flex gap-1 mt-1">
                        {creador.niche.slice(0, 2).map(n => (
                          <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{creador.campaignCount}</p>
                    <p className="text-xs text-gray-500">campañas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Campañas</CardTitle>
            <CardDescription>Rendimiento general de campañas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-green-900">Tasa de Finalización</span>
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round((mockCampaigns.filter(c => c.status === 'completada').length / mockCampaigns.length) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  {mockCampaigns.filter(c => c.status === 'completada').length} de {mockCampaigns.length} campañas completadas
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-900">Inversión Promedio</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${Math.round(mockCampaigns.reduce((sum, c) => sum + c.budget, 0) / mockCampaigns.length).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-blue-700">Por campaña</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-purple-900">Creadores por Campaña</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {Math.round(mockCampaigns.reduce((sum, c) => sum + c.creadores.length, 0) / mockCampaigns.length * 10) / 10}
                  </span>
                </div>
                <p className="text-sm text-purple-700">Promedio de colaboradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMetrics;