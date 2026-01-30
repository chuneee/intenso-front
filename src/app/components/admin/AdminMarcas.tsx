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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { mockMarcas, mockCampaigns } from "@/data/mockData";
import { MarcaProfile } from "@/types";
import { Search, Eye, Edit, Ban, Building2 } from "lucide-react";

const AdminMarcas: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [selectedMarca, setSelectedMarca] = useState<MarcaProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const allIndustries = Array.from(new Set(mockMarcas.map((m) => m.industry)));

  const filteredMarcas = mockMarcas.filter((marca) => {
    const matchesSearch =
      marca.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marca.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marca.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || marca.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const viewDetails = (marca: MarcaProfile) => {
    setSelectedMarca(marca);
    setIsDetailOpen(true);
  };

  const marcaCampaigns = selectedMarca
    ? mockCampaigns.filter((c) => c.marcaId === selectedMarca.id)
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-700" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Directorio
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
          Gestión de Marcas
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Administra todas las empresas registradas
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6 border-none shadow-sm">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, empresa o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus-visible:ring-intenso-purple-500"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full sm:w-56 border-gray-200">
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-100/50 pb-4">
          <CardTitle className=" text-intenso-text text-base sm:text-lg font-display">
            Marcas Registradas ({filteredMarcas.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="text-intenso-text-muted font-medium">
                      Empresa
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden md:table-cell">
                      Contacto
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden lg:table-cell">
                      Industria
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden xl:table-cell">
                      Fecha Registro
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium hidden sm:table-cell">
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
                  {filteredMarcas.map((marca) => {
                    const campaigns = mockCampaigns.filter(
                      (c) => c.marcaId === marca.id,
                    );
                    return (
                      <TableRow
                        key={marca.id}
                        className="border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-intenso-purple-50 flex items-center justify-center text-intenso-purple-600 font-bold text-lg border border-intenso-purple-100">
                              {marca.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-intenso-text text-base">
                                {marca.companyName}
                              </div>
                              <div className="text-sm text-intenso-text-muted">
                                {marca.name}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="text-sm text-intenso-text">
                            {marca.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            variant="outline"
                            className="text-intenso-text-muted border-gray-200 bg-gray-50 font-normal"
                          >
                            <Building2 className="w-3 h-3 mr-1 opacity-70" />
                            {marca.industry}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-sm text-intenso-text-muted">
                          {new Date(marca.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant="secondary"
                            className="bg-intenso-teal-50 text-intenso-teal-700 hover:bg-intenso-teal-100 border-0"
                          >
                            {campaigns.length} campañas
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            Activo
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(marca)}
                              className="hover:text-intenso-purple-600 hover:bg-intenso-purple-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:text-intenso-teal-600 hover:bg-intenso-teal-50"
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

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
          {selectedMarca && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-slate-100">
                    <AvatarImage src={selectedMarca.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-700">
                      <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-xl sm:text-2xl text-slate-900">
                      {selectedMarca.companyName}
                    </DialogTitle>
                    <DialogDescription>
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-slate-100 text-slate-700"
                      >
                        {selectedMarca.industry}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-600 mb-1">
                      Persona de Contacto
                    </h4>
                    <p className="text-slate-900 text-sm sm:text-base">
                      {selectedMarca.name}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-600 mb-1">
                      Email
                    </h4>
                    <p className="text-slate-900 text-sm sm:text-base break-all">
                      {selectedMarca.email}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-600 mb-1">
                      Sitio Web
                    </h4>
                    <p className="text-slate-900 text-sm sm:text-base break-all">
                      {selectedMarca.website || "No especificado"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-600 mb-1">
                      Fecha de Registro
                    </h4>
                    <p className="text-slate-900 text-sm sm:text-base">
                      {new Date(selectedMarca.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">
                    Descripción
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base">
                    {selectedMarca.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">
                    Campañas ({marcaCampaigns.length})
                  </h4>
                  {marcaCampaigns.length > 0 ? (
                    <div className="space-y-2">
                      {marcaCampaigns.map((campaign) => (
                        <div
                          key={campaign.id}
                          className="p-3 border border-slate-200 rounded-lg"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="font-medium text-slate-900 text-sm sm:text-base">
                              {campaign.title}
                            </span>
                            <Badge
                              className={
                                campaign.status === "activa"
                                  ? "bg-green-100 text-green-700"
                                  : campaign.status === "en_progreso"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 mt-1">
                            ${campaign.budget.toLocaleString()} •{" "}
                            {campaign.creadores.length} creadores
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">
                      No tiene campañas registradas
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Información
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50 text-sm sm:text-base"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Bloquear Marca
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

export default AdminMarcas;
