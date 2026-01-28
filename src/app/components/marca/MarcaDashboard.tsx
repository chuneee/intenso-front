import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { mockCampaigns, mockServicePurchases } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2,
  ArrowRight 
} from 'lucide-react';

interface MarcaDashboardProps {
  onNavigate: (page: string) => void;
}

const MarcaDashboard: React.FC<MarcaDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  
  const userCampaigns = mockCampaigns.filter(c => c.marcaId === user?.id);
  const userPurchases = mockServicePurchases.filter(p => p.marcaId === user?.id);

  const activeCampaigns = userCampaigns.filter(c => c.status === 'activa' || c.status === 'en_progreso');
  const totalBudget = userCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const completedCampaigns = userCampaigns.filter(c => c.status === 'completada').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700';
      case 'en_progreso': return 'bg-blue-100 text-blue-700';
      case 'completada': return 'bg-gray-100 text-gray-700';
      case 'borrador': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'activa': return 'Activa';
      case 'en_progreso': return 'En Progreso';
      case 'completada': return 'Completada';
      case 'borrador': return 'Borrador';
      case 'pendiente': return 'Pendiente';
      default: return status;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Bienvenido de vuelta, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Campañas Activas
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{activeCampaigns.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {userCampaigns.length} campañas totales
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Inversión Total
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">En todas las campañas</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Completadas
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{completedCampaigns}</div>
            <p className="text-xs text-slate-500 mt-1">Campañas exitosas</p>
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
              onClick={() => onNavigate('campaigns')}
            >
              <span className="hidden sm:inline">Ver todas</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCampaigns.slice(0, 3).map((campaign) => (
                <div 
                  key={campaign.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer gap-3"
                  onClick={() => onNavigate('campaigns')}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{campaign.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{campaign.category}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {campaign.creadores.length} creadores
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">
                      ${campaign.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {userCampaigns.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-slate-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                  </div>
                  <p className="font-medium text-sm sm:text-base">No tienes campañas aún</p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Crea tu primera campaña para comenzar</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Services */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900 text-base sm:text-lg">Servicios Contratados</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm"
              onClick={() => onNavigate('services')}
            >
              <span className="hidden sm:inline">Ver todos</span>
              <ArrowRight className="w-4 h-4 sm:ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userPurchases.map((purchase) => (
                <div 
                  key={purchase.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 border border-slate-200 rounded-lg gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{purchase.serviceName}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {new Date(purchase.purchaseDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <Badge className={`mt-2 ${getStatusColor(purchase.status)}`}>
                      {getStatusLabel(purchase.status)}
                    </Badge>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">
                      ${purchase.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {userPurchases.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-slate-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                  </div>
                  <p className="font-medium text-sm sm:text-base">No has contratado servicios aún</p>
                  <Button 
                    className="mt-4 bg-slate-900 hover:bg-slate-800 text-sm"
                    onClick={() => onNavigate('services')}
                  >
                    Explorar Servicios
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarcaDashboard;