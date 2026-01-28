import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { mockCreadores } from '@/data/mockData';
import { CreadorProfile } from '@/types';
import { 
  Search, 
  Star, 
  TrendingUp, 
  Eye,
  Instagram,
  Youtube,
  Mail
} from 'lucide-react';

const CreatorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nicheFilter, setNicheFilter] = useState<string>('all');
  const [selectedCreator, setSelectedCreator] = useState<CreadorProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const allNiches = Array.from(new Set(mockCreadores.flatMap(c => c.niche)));

  const filteredCreators = mockCreadores.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche = nicheFilter === 'all' || creator.niche.includes(nicheFilter);
    return matchesSearch && matchesNiche;
  });

  const viewCreatorDetails = (creator: CreadorProfile) => {
    setSelectedCreator(creator);
    setIsDetailOpen(true);
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
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Red de Creadores</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">
          Explora y conecta con creadores de contenido para tus campañas
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Buscar creadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-200"
          />
        </div>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-full sm:w-48 border-slate-200">
            <SelectValue placeholder="Nicho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los nichos</SelectItem>
            {allNiches.map(niche => (
              <SelectItem key={niche} value={niche}>{niche}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredCreators.map((creator) => {
          const totalFollowers = creator.platforms.reduce((sum, p) => sum + p.followers, 0);
          const avgEngagement = (creator.platforms.reduce((sum, p) => sum + p.engagementRate, 0) / creator.platforms.length).toFixed(1);

          return (
            <Card key={creator.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center mb-3">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mb-3 border-2 border-slate-100">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg sm:text-xl text-slate-900">{creator.name}</CardTitle>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-slate-900">{creator.rating}</span>
                    <span className="text-xs sm:text-sm text-slate-600 ml-1">
                      ({creator.completedCampaigns} campañas)
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 text-center mb-4 line-clamp-2">
                  {creator.bio}
                </p>

                {/* Niches */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {creator.niche.map(n => (
                    <Badge key={n} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                      {n}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">
                      {totalFollowers >= 1000000 
                        ? `${(totalFollowers / 1000000).toFixed(1)}M`
                        : `${(totalFollowers / 1000).toFixed(0)}K`}
                    </p>
                    <p className="text-xs text-slate-600">Seguidores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">{avgEngagement}%</p>
                    <p className="text-xs text-slate-600">Engagement</p>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {creator.platforms.map(platform => {
                    const Icon = getPlatformIcon(platform.name);
                    return (
                      <div 
                        key={platform.name}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700"
                      >
                        <Icon className="w-3 h-3" />
                        <span>{platform.name}</span>
                      </div>
                    );
                  })}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-slate-200 hover:bg-slate-50 text-xs sm:text-sm"
                  onClick={() => viewCreatorDetails(creator)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">No se encontraron creadores</h3>
          <p className="text-sm sm:text-base text-slate-600">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      )}

      {/* Creator Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
          {selectedCreator && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-slate-100">
                    <AvatarImage src={selectedCreator.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">{selectedCreator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-xl sm:text-2xl text-slate-900">{selectedCreator.name}</DialogTitle>
                    <DialogDescription className="text-slate-600">
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-base sm:text-lg text-slate-900">{selectedCreator.rating}</span>
                        </div>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-600 text-sm sm:text-base">{selectedCreator.completedCampaigns} campañas completadas</span>
                      </div>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Biografía</h4>
                  <p className="text-slate-700 text-sm sm:text-base">{selectedCreator.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900 text-sm sm:text-base">Nichos de Contenido</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCreator.niche.map(n => (
                      <Badge key={n} variant="secondary" className="text-xs sm:text-sm bg-slate-100 text-slate-700">
                        {n}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900 text-sm sm:text-base">Plataformas</h4>
                  <div className="space-y-3">
                    {selectedCreator.platforms.map(platform => {
                      const Icon = getPlatformIcon(platform.name);
                      return (
                        <div key={platform.name} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-slate-200 rounded-lg">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 text-sm sm:text-base">{platform.name}</p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-1 flex-wrap">
                              <span className="text-xs sm:text-sm text-slate-600">
                                <span className="font-semibold text-slate-900">
                                  {platform.followers.toLocaleString()}
                                </span> seguidores
                              </span>
                              <span className="text-xs sm:text-sm text-slate-600 hidden sm:inline">•</span>
                              <span className="text-xs sm:text-sm text-slate-600">
                                <span className="font-semibold text-slate-900">
                                  {platform.engagementRate}%
                                </span> engagement
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedCreator.portfolio && (
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 text-sm sm:text-base">Portfolio</h4>
                    <a 
                      href={selectedCreator.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 hover:underline font-medium text-sm sm:text-base break-all"
                    >
                      {selectedCreator.portfolio}
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-sm sm:text-base">
                    <Mail className="w-4 h-4 mr-2" />
                    Contactar para Campaña
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

export default CreatorsPage;