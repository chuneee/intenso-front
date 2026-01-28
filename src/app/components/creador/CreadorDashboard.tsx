import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { mockCampaigns, mockCreadores } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { CreadorProfile } from '@/types';
import { 
  Megaphone, 
  Star, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Instagram,
  Youtube
} from 'lucide-react';

interface CreadorDashboardProps {
  onNavigate: (page: string) => void;
}

const CreadorDashboard: React.FC<CreadorDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  
  const creadorProfile = mockCreadores.find(c => c.id === user?.id) as CreadorProfile;
  const userCampaigns = mockCampaigns.filter(c => c.creadores.includes(user?.id || ''));

  const activeCampaigns = userCampaigns.filter(c => c.status === 'activa' || c.status === 'en_progreso');
  const completedCampaigns = userCampaigns.filter(c => c.status === 'completada').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700';
      case 'en_progreso': return 'bg-blue-100 text-blue-700';
      case 'completada': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'activa': return 'Activa';
      case 'en_progreso': return 'En Progreso';
      case 'completada': return 'Completada';
      default: return status;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      default: return TrendingUp;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Bienvenido de vuelta, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
              {userCampaigns.length} totales
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Completadas
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {creadorProfile?.completedCampaigns || 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">Colaboraciones exitosas</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Rating
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {creadorProfile?.rating || 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">De 5.0 estrellas</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Seguidores
            </CardTitle>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {creadorProfile?.platforms.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Total en todas las plataformas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Active Campaigns */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900 text-base sm:text-lg">Mis Campañas Activas</CardTitle>
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
            <div className="space-y-3 sm:space-y-4">
              {activeCampaigns.slice(0, 3).map((campaign) => (
                <div 
                  key={campaign.id}
                  className="p-3 sm:p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('campaigns')}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{campaign.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">{campaign.marcaName}</p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-slate-600">Progreso</span>
                      <span className="text-slate-900 font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <span>Finaliza: {new Date(campaign.endDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              ))}
              
              {activeCampaigns.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-slate-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                  </div>
                  <p className="font-medium text-sm sm:text-base">No tienes campañas activas</p>
                  <Button 
                    className="mt-4 bg-slate-900 hover:bg-slate-800 text-sm" 
                    onClick={() => onNavigate('brands')}
                  >
                    Explorar Marcas
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-base sm:text-lg">Estadísticas de Plataformas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {creadorProfile?.platforms.map((platform) => {
                const Icon = getPlatformIcon(platform.name);
                return (
                  <div key={platform.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                        <span className="font-medium text-slate-900 text-sm sm:text-base">{platform.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {platform.followers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Progress 
                        value={platform.engagementRate * 10} 
                        className="h-2 flex-1" 
                      />
                      <span className="text-xs sm:text-sm text-slate-600 w-12 sm:w-16 text-right">
                        {platform.engagementRate}% eng.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Niche Tags */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
              <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-3">Nichos</h4>
              <div className="flex flex-wrap gap-2">
                {creadorProfile?.niche.map((n) => (
                  <Badge key={n} variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                    {n}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreadorDashboard;