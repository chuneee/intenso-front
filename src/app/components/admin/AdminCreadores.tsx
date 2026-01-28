import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { mockCreadores } from '@/data/mockData';
import { Search, Eye, Edit, Ban, Star } from 'lucide-react';

const AdminCreadores: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nicheFilter, setNicheFilter] = useState<string>('all');

  const allNiches = Array.from(new Set(mockCreadores.flatMap(c => c.niche)));

  const filteredCreadores = mockCreadores.filter(creador => {
    const matchesSearch = creador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creador.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche = nicheFilter === 'all' || creador.niche.includes(nicheFilter);
    return matchesSearch && matchesNiche;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Gestión de Creadores</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Administra la red de creadores de contenido</p>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6 border-slate-200 shadow-sm">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200"
              />
            </div>
            <Select value={nicheFilter} onValueChange={setNicheFilter}>
              <SelectTrigger className="w-full sm:w-56 border-slate-200">
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-base sm:text-lg">Creadores Registrados ({filteredCreadores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600">Creador</TableHead>
                    <TableHead className="text-slate-600 hidden lg:table-cell">Nichos</TableHead>
                    <TableHead className="text-slate-600 hidden xl:table-cell">Plataformas</TableHead>
                    <TableHead className="text-slate-600 hidden sm:table-cell">Seguidores</TableHead>
                    <TableHead className="text-slate-600 hidden md:table-cell">Rating</TableHead>
                    <TableHead className="text-slate-600 hidden xl:table-cell">Campañas</TableHead>
                    <TableHead className="text-slate-600 hidden sm:table-cell">Estado</TableHead>
                    <TableHead className="text-right text-slate-600">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreadores.map((creador) => {
                    const totalFollowers = creador.platforms.reduce((sum, p) => sum + p.followers, 0);
                    return (
                      <TableRow key={creador.id} className="border-slate-200">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-slate-100">
                              <AvatarImage src={creador.avatar} />
                              <AvatarFallback className="bg-slate-200 text-slate-700">{creador.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 text-sm truncate max-w-[150px] sm:max-w-none">{creador.name}</div>
                              <div className="text-xs sm:text-sm text-slate-500 truncate max-w-[150px] sm:max-w-none">{creador.email}</div>
                              <div className="sm:hidden text-xs text-slate-500 mt-1">
                                {totalFollowers >= 1000000 
                                  ? `${(totalFollowers / 1000000).toFixed(1)}M seguidores`
                                  : `${(totalFollowers / 1000).toFixed(0)}K seguidores`}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {creador.niche.slice(0, 2).map(n => (
                              <Badge key={n} variant="secondary" className="text-xs bg-slate-100 text-slate-700">{n}</Badge>
                            ))}
                            {creador.niche.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">+{creador.niche.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-900 hidden xl:table-cell">{creador.platforms.length}</TableCell>
                        <TableCell className="text-sm font-medium text-slate-900 hidden sm:table-cell">
                          {totalFollowers >= 1000000 
                            ? `${(totalFollowers / 1000000).toFixed(1)}M`
                            : `${(totalFollowers / 1000).toFixed(0)}K`}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-slate-900">{creador.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-900 hidden xl:table-cell">{creador.completedCampaigns}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className={creador.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {creador.status === 'active' ? 'Activo' : 'Bloqueado'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-slate-100 hidden sm:inline-flex">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hidden sm:inline-flex">
                              <Ban className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreadores;