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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
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
import { mockMarcas, mockCampaigns } from "@/data/mockData";
import { MarcaProfile } from "@/types";
import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";

const BrandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<MarcaProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const allIndustries = Array.from(new Set(mockMarcas.map((m) => m.industry)));

  const filteredBrands = mockMarcas.filter((brand) => {
    const matchesSearch =
      brand.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || brand.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const viewBrandDetails = (brand: MarcaProfile) => {
    setSelectedBrand(brand);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Marcas Disponibles
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
              Marcas Asociadas
            </h1>
            <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
              Descubre marcas que buscan colaboraciones con creadores
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-5 h-5" />
          <Input
            placeholder="Buscar marcas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-intenso-border bg-white/50 backdrop-blur-sm"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48 border-intenso-border bg-white/50 backdrop-blur-sm">
            <SelectValue placeholder="Industria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las industrias</SelectItem>
            {allIndustries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredBrands.map((brand) => {
          const brandCampaigns = mockCampaigns.filter(
            (c) => c.marcaId === brand.id,
          );
          const activeCampaigns = brandCampaigns.filter(
            (c) => c.status === "activa" || c.status === "en_progreso",
          );

          return (
            <Card
              key={brand.id}
              className="relative overflow-hidden border-none bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer"
              onClick={() => viewBrandDetails(brand)}
            >
              {/* Accent bar on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader>
                <div className="flex items-start gap-3 sm:gap-4 mb-3">
                  <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/50 group-hover:border-intenso-purple-200 transition-colors">
                    <AvatarImage src={brand.avatar} />
                    <AvatarFallback className="bg-intenso-purple-50 text-intenso-purple-700">
                      <BuildingOffice2Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="font-display text-lg sm:text-xl text-intenso-text truncate group-hover:text-intenso-purple-700 transition-colors">
                      {brand.companyName}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-100 text-xs"
                    >
                      {brand.industry}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-intenso-text mb-4 line-clamp-3">
                  {brand.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 p-3 sm:p-4 border border-white/50 bg-gradient-to-br from-white/60 to-white/30 rounded-lg backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-intenso-text">
                      {brandCampaigns.length}
                    </p>
                    <p className="text-xs text-intenso-text-muted">
                      Campañas Totales
                    </p>
                  </div>
                  <div className="text-center border-l border-white/50 pl-3">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-intenso-purple-500 animate-pulse" />
                      <p className="text-xl sm:text-2xl font-bold text-intenso-purple-600">
                        {activeCampaigns.length}
                      </p>
                    </div>
                    <p className="text-xs text-intenso-text-muted">
                      Activas Ahora
                    </p>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-intenso-text-muted">
                  <BriefcaseIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Contacto: {brand.name}</span>
                </div>

                {brand.website && (
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-intenso-text-muted">
                    <GlobeAltIcon className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-intenso-text hover:text-intenso-teal-700 hover:underline truncate font-medium"
                    >
                      {brand.website.replace("https://", "")}
                    </a>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full border-intenso-border hover:bg-white text-xs sm:text-sm group-hover:border-intenso-purple-300 group-hover:text-intenso-purple-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewBrandDetails(brand);
                  }}
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
          </div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-intenso-text mb-2">
            No se encontraron marcas
          </h3>
          <p className="text-sm sm:text-base text-intenso-text-muted">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      )}

      {/* Brand Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 border-none bg-white/95 backdrop-blur-sm">
          {selectedBrand && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/50">
                    <AvatarImage src={selectedBrand.avatar} />
                    <AvatarFallback className="bg-intenso-purple-50 text-intenso-purple-700">
                      <BuildingOffice2Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="font-display text-xl sm:text-2xl text-intenso-text">
                      {selectedBrand.companyName}
                    </DialogTitle>
                    <DialogDescription>
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-100 text-xs sm:text-sm"
                      >
                        {selectedBrand.industry}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Description Section */}
                <div className="p-4 bg-gradient-to-br from-intenso-purple-50/50 to-intenso-teal-50/50 rounded-xl border border-white/50">
                  <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base flex items-center gap-2">
                    <div className="w-1 h-4 bg-intenso-purple-500 rounded-full" />
                    Acerca de la Marca
                  </h4>
                  <p className="text-intenso-text-muted text-sm sm:text-base">
                    {selectedBrand.description}
                  </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/50">
                    <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base flex items-center gap-2">
                      <BriefcaseIcon className="w-4 h-4 text-intenso-purple-600" />
                      Persona de Contacto
                    </h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-white/50">
                        <AvatarImage src={selectedBrand.avatar} />
                        <AvatarFallback className="bg-intenso-purple-50 text-intenso-purple-700">
                          {selectedBrand.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-intenso-text text-sm sm:text-base truncate">
                          {selectedBrand.name}
                        </p>
                        <p className="text-xs sm:text-sm text-intenso-text-muted truncate">
                          {selectedBrand.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedBrand.website && (
                    <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/50">
                      <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4 text-intenso-teal-600" />
                        Sitio Web
                      </h4>
                      <a
                        href={selectedBrand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-intenso-text hover:text-intenso-teal-700 hover:underline flex items-center gap-1 font-medium text-sm sm:text-base break-all group"
                      >
                        <span className="truncate">
                          {selectedBrand.website.replace("https://", "")}
                        </span>
                        <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Active Campaigns Section */}
                <div className="p-4 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm rounded-xl border border-white/50">
                  <h4 className="font-bold mb-4 text-intenso-text text-sm sm:text-base flex items-center gap-2">
                    <MegaphoneIcon className="w-4 h-4 text-intenso-teal-600" />
                    Campañas Activas
                  </h4>
                  <div className="space-y-3">
                    {mockCampaigns
                      .filter(
                        (c) =>
                          c.marcaId === selectedBrand.id &&
                          (c.status === "activa" || c.status === "en_progreso"),
                      )
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="p-3 sm:p-4 border border-white/50 bg-white/40 rounded-lg"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-intenso-text text-sm sm:text-base">
                                {campaign.title}
                              </h5>
                              <p className="text-xs sm:text-sm text-intenso-text-muted mt-1 line-clamp-2">
                                {campaign.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  campaign.status === "activa"
                                    ? "bg-intenso-teal-500"
                                    : "bg-intenso-purple-500"
                                }`}
                              />
                              <Badge
                                className={
                                  campaign.status === "activa"
                                    ? "bg-intenso-teal-50 text-intenso-teal-700 border border-intenso-teal-200"
                                    : "bg-intenso-purple-50 text-intenso-purple-700 border border-intenso-purple-200"
                                }
                              >
                                {campaign.status === "activa"
                                  ? "Activa"
                                  : "En Progreso"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-intenso-text-muted mt-3">
                            <span className="font-bold text-intenso-text">
                              ${campaign.budget.toLocaleString()}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>{campaign.creadores.length} creadores</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{campaign.category}</span>
                          </div>
                        </div>
                      ))}

                    {mockCampaigns.filter(
                      (c) =>
                        c.marcaId === selectedBrand.id &&
                        (c.status === "activa" || c.status === "en_progreso"),
                    ).length === 0 && (
                      <p className="text-center text-intenso-text-muted py-4 text-sm sm:text-base">
                        No hay campañas activas en este momento
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/50">
                  <Button
                    className="w-full text-white shadow-lg text-sm sm:text-base hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#0e8d8d" }}
                  >
                    <MegaphoneIcon className="w-4 h-4 mr-2" />
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
