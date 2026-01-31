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
import { mockCreadores } from "@/data/mockData";
import { CreadorProfile } from "@/types";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

const CreatorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [selectedCreator, setSelectedCreator] = useState<CreadorProfile | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const allNiches = Array.from(new Set(mockCreadores.flatMap((c) => c.niche)));

  const filteredCreators = mockCreadores.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche =
      nicheFilter === "all" || creator.niche.includes(nicheFilter);
    return matchesSearch && matchesNiche;
  });

  const viewCreatorDetails = (creator: CreadorProfile) => {
    setSelectedCreator(creator);
    setIsDetailOpen(true);
  };

  const getPlatformIcon = (platform: string) => {
    // Usaremos emoji para las redes sociales por simplicidad
    switch (platform.toLowerCase()) {
      case "instagram":
        return "📷";
      case "youtube":
        return "▶️";
      case "tiktok":
        return "🎵";
      case "twitter":
        return "🐦";
      default:
        return "📱";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-pink-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Red de Creadores
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-intenso-text tracking-tight">
          Red de Creadores
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Explora y conecta con creadores de contenido para tus campañas
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-5 h-5" />
          <Input
            placeholder="Buscar creadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-intenso-border bg-white/50 backdrop-blur-sm"
          />
        </div>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-full sm:w-48 border-intenso-border bg-white/50 backdrop-blur-sm">
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

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredCreators.map((creator) => {
          const totalFollowers = creator.platforms.reduce(
            (sum, p) => sum + p.followers,
            0,
          );
          const avgEngagement = (
            creator.platforms.reduce((sum, p) => sum + p.engagementRate, 0) /
            creator.platforms.length
          ).toFixed(1);

          return (
            <Card
              key={creator.id}
              className="border-none bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group"
            >
              <CardHeader className="text-center">
                <div className="flex flex-col items-center mb-3">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mb-3 border-2 border-white shadow-md">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback className="bg-intenso-purple-100 text-intenso-purple-700 font-bold">
                      {creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-display text-lg sm:text-xl text-intenso-text">
                    {creator.name}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 mt-2">
                    <img
                      src="/img/isotipo.png"
                      alt="Intenso"
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 saturate-100"
                      style={{
                        filter:
                          "invert(45%) sepia(68%) saturate(1000%) hue-rotate(145deg) brightness(95%) contrast(95%)",
                      }}
                    />
                    <span className="font-bold text-intenso-text">
                      {creator.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-intenso-text-muted ml-1">
                      ({creator.completedCampaigns} campañas)
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-intenso-text text-center mb-4 line-clamp-2">
                  {creator.bio}
                </p>

                {/* Niches */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {creator.niche.map((n) => (
                    <Badge
                      key={n}
                      variant="secondary"
                      className="text-xs bg-intenso-purple-50 text-intenso-purple-700 border border-intenso-purple-100"
                    >
                      {n}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 sm:p-4 border border-white/50 bg-white/40 rounded-lg">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-display font-bold text-intenso-text">
                      {totalFollowers >= 1000000
                        ? `${(totalFollowers / 1000000).toFixed(1)}M`
                        : `${(totalFollowers / 1000).toFixed(0)}K`}
                    </p>
                    <p className="text-xs text-intenso-text-muted">
                      Seguidores
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-display font-bold text-intenso-text">
                      {avgEngagement}%
                    </p>
                    <p className="text-xs text-intenso-text-muted">
                      Engagement
                    </p>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {creator.platforms.map((platform) => {
                    const icon = getPlatformIcon(platform.name);
                    return (
                      <div
                        key={platform.name}
                        className="flex items-center gap-1 px-2 py-1 bg-intenso-teal-50 rounded text-xs text-intenso-teal-700 border border-intenso-teal-100"
                      >
                        <span>{icon}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-intenso-border bg-white/50 hover:bg-white text-xs sm:text-sm group-hover:border-intenso-purple-200 transition-colors"
                  onClick={() => viewCreatorDetails(creator)}
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-intenso-text-muted" />
          </div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-intenso-text mb-2">
            No se encontraron creadores
          </h3>
          <p className="text-sm sm:text-base text-intenso-text-muted">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      )}

      {/* Creator Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 border-none bg-white/95 backdrop-blur-sm">
          {selectedCreator && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white shadow-md">
                    <AvatarImage src={selectedCreator.avatar} />
                    <AvatarFallback className="bg-intenso-purple-100 text-intenso-purple-700 font-bold">
                      {selectedCreator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="font-display text-xl sm:text-2xl text-intenso-text">
                      {selectedCreator.name}
                    </DialogTitle>
                    <DialogDescription className="text-intenso-text-muted">
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <img
                            src="/img/isotipo.png"
                            alt="Intenso"
                            className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 saturate-100"
                            style={{
                              filter:
                                "invert(45%) sepia(68%) saturate(1000%) hue-rotate(145deg) brightness(95%) contrast(95%)",
                            }}
                          />
                          <span className="font-bold text-base sm:text-lg text-intenso-text">
                            {selectedCreator.rating}
                          </span>
                        </div>
                        <span className="text-intenso-text-muted">•</span>
                        <span className="text-intenso-text-muted text-sm sm:text-base">
                          {selectedCreator.completedCampaigns} campañas
                          completadas
                        </span>
                      </div>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                    Biografía
                  </h4>
                  <p className="text-intenso-text-muted text-sm sm:text-base">
                    {selectedCreator.bio}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base">
                    Nichos de Contenido
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCreator.niche.map((n) => (
                      <Badge
                        key={n}
                        variant="secondary"
                        className="text-xs sm:text-sm bg-intenso-purple-50 text-intenso-purple-700 border border-intenso-purple-100"
                      >
                        {n}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-intenso-text text-sm sm:text-base">
                    Plataformas
                  </h4>
                  <div className="space-y-3">
                    {selectedCreator.platforms.map((platform) => {
                      const icon = getPlatformIcon(platform.name);
                      return (
                        <div
                          key={platform.name}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/50 bg-white/40 rounded-lg hover:bg-white/60 transition-colors"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-intenso-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                            {icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-intenso-text text-sm sm:text-base">
                              {platform.name}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-1 flex-wrap">
                              <span className="text-xs sm:text-sm text-intenso-text-muted">
                                <span className="font-bold text-intenso-text">
                                  {platform.followers.toLocaleString()}
                                </span>{" "}
                                seguidores
                              </span>
                              <span className="text-xs sm:text-sm text-intenso-text-muted hidden sm:inline">
                                •
                              </span>
                              <span className="text-xs sm:text-sm text-intenso-text-muted">
                                <span className="font-bold text-intenso-text">
                                  {platform.engagementRate}%
                                </span>{" "}
                                engagement
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
                    <h4 className="font-bold mb-2 text-intenso-text text-sm sm:text-base">
                      Portfolio
                    </h4>
                    <a
                      href={selectedCreator.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-intenso-teal-600 hover:text-intenso-teal-700 hover:underline font-medium text-sm sm:text-base break-all"
                    >
                      {selectedCreator.portfolio}
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-white/50">
                  <Button
                    className="w-full text-white shadow-lg text-sm sm:text-base hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: "#0e8d8d",
                      boxShadow:
                        "0 10px 15px -3px rgba(14, 141, 141, 0.3), 0 4px 6px -4px rgba(14, 141, 141, 0.3)",
                    }}
                  >
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
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
