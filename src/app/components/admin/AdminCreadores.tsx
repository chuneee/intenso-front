import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { mockCreadores } from "@/data/mockData";
import { Search, Eye, Edit, Star } from "lucide-react";

const AdminCreadores: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");

  const allNiches = Array.from(new Set(mockCreadores.flatMap((c) => c.niche)));

  const filteredCreadores = mockCreadores.filter((creador) => {
    const matchesSearch =
      creador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creador.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche =
      nicheFilter === "all" || creador.niche.includes(nicheFilter);
    return matchesSearch && matchesNiche;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Talento
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
          Gestión de Creadores
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Administra la red de creadores de contenido
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6 border-none shadow-sm">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus-visible:ring-intenso-teal-500"
              />
            </div>
            <Select value={nicheFilter} onValueChange={setNicheFilter}>
              <SelectTrigger className="w-full sm:w-56 border-gray-200">
                <SelectValue placeholder="Nicho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los nichos</SelectItem>
                {allNiches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-100/50 pb-4">
          <CardTitle className="text-intenso-text text-base sm:text-lg font-display">
            Creadores Registrados ({filteredCreadores.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="text-intenso-text-muted font-medium">
                      Creador
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden lg:table-cell">
                      Nichos
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden xl:table-cell">
                      Plataformas
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden sm:table-cell">
                      Seguidores
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden md:table-cell">
                      Rating
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden xl:table-cell">
                      Campañas
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden sm:table-cell">
                      Estado
                    </TableHead>
                    <TableHead className="text-right text-intenso-text-muted font-medium">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreadores.map((creador) => {
                    const totalFollowers = creador.platforms.reduce(
                      (sum, p) => sum + p.followers,
                      0,
                    );
                    return (
                      <TableRow
                        key={creador.id}
                        className="border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-white shadow-sm">
                              <AvatarImage src={creador.avatar} />
                              <AvatarFallback className="bg-intenso-teal-50 text-intenso-teal-700">
                                {creador.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-bold text-intenso-text text-sm truncate max-w-[150px] sm:max-w-none">
                                {creador.name}
                              </div>
                              <div className="text-xs sm:text-sm text-intenso-text-muted truncate max-w-[150px] sm:max-w-none">
                                {creador.email}
                              </div>
                              <div className="sm:hidden text-xs text-intenso-text-muted mt-1">
                                {totalFollowers >= 1000000
                                  ? `${(totalFollowers / 1000000).toFixed(1)}M seguidores`
                                  : `${(totalFollowers / 1000).toFixed(0)}K seguidores`}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {creador.niche.slice(0, 2).map((n) => (
                              <Badge
                                key={n}
                                variant="outline"
                                className="border-gray-200 text-intenso-text-muted font-normal text-xs"
                              >
                                {n}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="flex gap-2">
                            {creador.platforms.map((p) => (
                              <span
                                key={p.name}
                                title={p.name}
                                className="text-xs bg-gray-50 px-2 py-0.5 rounded border border-gray-100 text-intenso-text-muted capitalize"
                              >
                                {p.name}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-medium text-intenso-text">
                          {(totalFollowers / 1000).toFixed(1)}K
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center text-intenso-orange-500 font-bold">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            {creador.rating}
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <span className="text-sm text-intenso-text-muted">
                            12
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            Activo
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-intenso-teal-600 hover:bg-intenso-teal-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-intenso-purple-600 hover:bg-intenso-purple-50"
                            >
                              <Edit className="w-4 h-4" />
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
