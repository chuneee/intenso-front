import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { mockCampaigns, mockCreadores } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  Plus, 
  Search, 
  Calendar, 
  DollarSign, 
  Users,
  Eye,
  Edit
} from 'lucide-react';
import { Campaign } from '@/types';

const CampaignsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const isMarca = user?.type === 'marca';
  
  const userCampaigns = isMarca 
    ? mockCampaigns.filter(c => c.marcaId === user?.id)
    : mockCampaigns.filter(c => c.creadores.includes(user?.id || ''));

  const filteredCampaigns = userCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700 border-green-200';
      case 'en_progreso': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completada': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'borrador': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelada': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'activa': return 'Activa';
      case 'en_progreso': return 'En Progreso';
      case 'completada': return 'Completada';
      case 'borrador': return 'Borrador';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const viewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isMarca ? 'Gestión de Campañas' : 'Mis Campañas'}
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            {isMarca 
              ? 'Crea y administra tus campañas de marketing' 
              : 'Colaboraciones asignadas y en progreso'}
          </p>
        </div>
        {isMarca && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-slate-900 hover:bg-slate-800 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Campaña
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle className="text-slate-900">Crear Nueva Campaña</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Define los detalles de tu nueva campaña
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700">Título de la Campaña</Label>
                  <Input id="title" placeholder="Ej: Lanzamiento Producto X" className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe los objetivos y detalles de la campaña"
                    rows={4}
                    className="border-slate-200"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-slate-700">Presupuesto</Label>
                    <Input id="budget" type="number" placeholder="10000" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-700">Categoría</Label>
                    <Select>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="belleza">Belleza</SelectItem>
                        <SelectItem value="comida">Comida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-slate-700">Fecha de Inicio</Label>
                    <Input id="startDate" type="date" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-slate-700">Fecha de Fin</Label>
                    <Input id="endDate" type="date" className="border-slate-200" />
                  </div>
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800">Crear Campaña</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Buscar campañas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-200"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-slate-200">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="borrador">Borrador</SelectItem>
            <SelectItem value="activa">Activa</SelectItem>
            <SelectItem value="en_progreso">En Progreso</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2 gap-2">
                <CardTitle className="text-base sm:text-lg text-slate-900 line-clamp-2">{campaign.title}</CardTitle>
                <Badge className={getStatusColor(campaign.status)}>
                  {getStatusLabel(campaign.status)}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">{campaign.marcaName}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                {campaign.description}
              </p>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-slate-900">${campaign.budget.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="truncate">{new Date(campaign.startDate).toLocaleDateString('es-ES')} - {new Date(campaign.endDate).toLocaleDateString('es-ES')}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{campaign.creadores.length} creadores asignados</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-200 hover:bg-slate-50 text-xs sm:text-sm"
                  onClick={() => viewCampaignDetails(campaign)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalles
                </Button>
                {isMarca && (
                  <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50">
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">No se encontraron campañas</h3>
          <p className="text-sm sm:text-base text-slate-600">
            {searchQuery || statusFilter !== 'all' 
              ? 'Intenta ajustar tus filtros de búsqueda'
              : isMarca 
                ? 'Crea tu primera campaña para comenzar'
                : 'Aún no tienes campañas asignadas'}
          </p>
        </div>
      )}

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-xl sm:text-2xl text-slate-900">{selectedCampaign.title}</DialogTitle>
                    <DialogDescription className="mt-1 text-slate-600">{selectedCampaign.marcaName}</DialogDescription>
                  </div>
                  <Badge className={getStatusColor(selectedCampaign.status)}>
                    {getStatusLabel(selectedCampaign.status)}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Descripción</h4>
                  <p className="text-slate-700 text-sm sm:text-base">{selectedCampaign.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Presupuesto</h4>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">
                      ${selectedCampaign.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Categoría</h4>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">{selectedCampaign.category}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Fecha de Inicio</h4>
                    <p className="text-slate-700 text-sm sm:text-base">
                      {new Date(selectedCampaign.startDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Fecha de Fin</h4>
                    <p className="text-slate-700 text-sm sm:text-base">
                      {new Date(selectedCampaign.endDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900 text-sm sm:text-base">Entregables</h4>
                  <ul className="space-y-2">
                    {selectedCampaign.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-slate-600">✓</span>
                        </span>
                        <span className="text-slate-700 text-sm sm:text-base">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900 text-sm sm:text-base">Creadores Asignados ({selectedCampaign.creadores.length})</h4>
                  <div className="space-y-2">
                    {selectedCampaign.creadores.map((creadorId) => {
                      const creador = mockCreadores.find(c => c.id === creadorId);
                      return creador ? (
                        <div key={creadorId} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          <img 
                            src={creador.avatar} 
                            alt={creador.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{creador.name}</p>
                            <p className="text-xs sm:text-sm text-slate-600 truncate">{creador.niche.join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs sm:text-sm font-semibold text-slate-900">⭐ {creador.rating}</p>
                            <p className="text-xs text-slate-600">{creador.completedCampaigns} campañas</p>
                          </div>
                        </div>
                      ) : null;
                    })}
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

export default CampaignsPage;