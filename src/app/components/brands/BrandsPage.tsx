import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { mockMarcas, mockCampaigns } from '@/data/mockData';
import { MarcaProfile } from '@/types';
import { 
  Search, 
  Briefcase, 
  Globe, 
  Eye,
  ExternalLink,
  Building2,
  Megaphone
} from 'lucide-react';

const BrandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<MarcaProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const allIndustries = Array.from(new Set(mockMarcas.map(m => m.industry)));

  const filteredBrands = mockMarcas.filter(brand => {
    const matchesSearch = brand.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || brand.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const viewBrandDetails = (brand: MarcaProfile) => {
    setSelectedBrand(brand);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Marcas Asociadas</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">
          Descubre marcas que buscan colaboraciones con creadores
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Buscar marcas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-200"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48 border-slate-200">
            <SelectValue placeholder="Industria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las industrias</SelectItem>
            {allIndustries.map(industry => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredBrands.map((brand) => {
          const brandCampaigns = mockCampaigns.filter(c => c.marcaId === brand.id);
          const activeCampaigns = brandCampaigns.filter(c => c.status === 'activa' || c.status === 'en_progreso');

          return (
            <Card key={brand.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3 sm:gap-4 mb-3">
                  <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-slate-100">
                    <AvatarImage src={brand.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">
                      <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl text-slate-900 truncate">{brand.companyName}</CardTitle>
                    <Badge variant="secondary" className="mt-1 bg-slate-100 text-slate-700 text-xs">
                      {brand.industry}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4 line-clamp-3">
                  {brand.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">
                      {brandCampaigns.length}
                    </p>
                    <p className="text-xs text-slate-600">Campañas Totales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">
                      {activeCampaigns.length}
                    </p>
                    <p className="text-xs text-slate-600">Activas Ahora</p>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Contacto: {brand.name}</span>
                </div>

                {brand.website && (
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
                    <Globe className="w-4 h-4 flex-shrink-0" />
                    <a 
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 hover:underline truncate font-medium"
                    >
                      {brand.website.replace('https://', '')}
                    </a>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full border-slate-200 hover:bg-slate-50 text-xs sm:text-sm"
                  onClick={() => viewBrandDetails(brand)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">No se encontraron marcas</h3>
          <p className="text-sm sm:text-base text-slate-600">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      )}

      {/* Brand Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
          {selectedBrand && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-slate-100">
                    <AvatarImage src={selectedBrand.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">
                      <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-xl sm:text-2xl text-slate-900">{selectedBrand.companyName}</DialogTitle>
                    <DialogDescription>
                      <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-700 text-xs sm:text-sm">
                        {selectedBrand.industry}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Acerca de la Marca</h4>
                  <p className="text-slate-700 text-sm sm:text-base">{selectedBrand.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Persona de Contacto</h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-slate-100">
                        <AvatarImage src={selectedBrand.avatar} />
                        <AvatarFallback className="bg-slate-200 text-slate-700">{selectedBrand.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{selectedBrand.name}</p>
                        <p className="text-xs sm:text-sm text-slate-600 truncate">{selectedBrand.email}</p>
                      </div>
                    </div>
                  </div>

                  {selectedBrand.website && (
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Sitio Web</h4>
                      <a 
                        href={selectedBrand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 hover:underline flex items-center gap-1 font-medium text-sm sm:text-base break-all"
                      >
                        {selectedBrand.website.replace('https://', '')}
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900 text-sm sm:text-base">Campañas Activas</h4>
                  <div className="space-y-3">
                    {mockCampaigns
                      .filter(c => c.marcaId === selectedBrand.id && (c.status === 'activa' || c.status === 'en_progreso'))
                      .map(campaign => (
                        <div key={campaign.id} className="p-3 sm:p-4 border border-slate-200 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-slate-900 text-sm sm:text-base">{campaign.title}</h5>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">{campaign.description}</p>
                            </div>
                            <Badge className={
                              campaign.status === 'activa' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }>
                              {campaign.status === 'activa' ? 'Activa' : 'En Progreso'}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 mt-3">
                            <span className="font-semibold text-slate-900">${campaign.budget.toLocaleString()}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{campaign.creadores.length} creadores</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{campaign.category}</span>
                          </div>
                        </div>
                      ))}
                    
                    {mockCampaigns.filter(c => c.marcaId === selectedBrand.id && (c.status === 'activa' || c.status === 'en_progreso')).length === 0 && (
                      <p className="text-center text-slate-500 py-4 text-sm sm:text-base">
                        No hay campañas activas en este momento
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-sm sm:text-base">
                    <Megaphone className="w-4 h-4 mr-2" />
                    Expresar Interés en Colaborar
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

export default BrandsPage;