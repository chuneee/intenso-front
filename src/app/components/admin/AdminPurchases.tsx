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
import { mockServicePurchases, mockMarcas } from "@/data/mockData";
import { ServicePurchase } from "@/types";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const AdminPurchases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter] = useState<string>("all");
  const [selectedPurchase, setSelectedPurchase] =
    useState<ServicePurchase | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredPurchases = mockServicePurchases.filter((purchase) => {
    const matchesSearch =
      purchase.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.marcaName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewDetails = (purchase: ServicePurchase) => {
    setSelectedPurchase(purchase);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-intenso-teal-50 text-intenso-teal-700 border-intenso-teal-200";
      case "en_progreso":
        return "bg-intenso-purple-50 text-intenso-purple-700 border-intenso-purple-200";
      case "pendiente":
        return "bg-intenso-orange-50 text-intenso-orange-700 border-intenso-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completado: "Completado",
      en_progreso: "En Progreso",
      pendiente: "Pendiente",
    };
    return labels[status] || status;
  };

  // Calcular estadísticas
  const totalRevenue = mockServicePurchases.reduce(
    (sum, p) => sum + p.price,
    0,
  );
  const completedPurchases = mockServicePurchases.filter(
    (p) => p.status === "completado",
  ).length;
  const pendingPurchases = mockServicePurchases.filter(
    (p) => p.status === "pendiente",
  ).length;
  const inProcessPurchases = mockServicePurchases.filter(
    (p) => p.status === "en_progreso",
  ).length;

  const marca = selectedPurchase
    ? mockMarcas.find((m) => m.id === selectedPurchase.marcaId)
    : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-orange-500 to-intenso-magenta-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Transacciones
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-intenso-text tracking-tight">
          Gestión de Compras
        </h1>
        <p className="text-intenso-text-muted mt-1 text-sm sm:text-base">
          Historial de servicios contratados por las marcas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text tracking-tight">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Ingresos Totales
                </p>
              </div>
              <CurrencyDollarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-teal-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-purple-500 to-intenso-purple-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {completedPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Completados
                </p>
              </div>
              <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-purple-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-orange-500 to-intenso-orange-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {pendingPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Pendientes
                </p>
              </div>
              <ClockIcon className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-orange-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-magenta-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-magenta-500 to-intenso-magenta-600" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {inProcessPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  En Proceso
                </p>
              </div>
              <ChartBarSquareIcon className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-magenta-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 pb-4 bg-gradient-to-r from-white/80 to-transparent">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-intenso-orange-500 to-intenso-magenta-500 rounded-full"></div>
              <CardTitle className="text-intenso-text text-base sm:text-lg font-display">
                Historial de Transacciones
              </CardTitle>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
                <Input
                  placeholder="Buscar servicio o marca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 h-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="text-intenso-text-muted font-medium">
                      Servicio
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium">
                      Marca
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium">
                      Precio
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium">
                      Fecha
                    </TableHead>
                    <TableHead className="text-intenso-text-muted font-medium">
                      Estado
                    </TableHead>
                    <TableHead className="text-right text-intenso-text-muted font-medium">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((purchase) => (
                    <TableRow
                      key={purchase.id}
                      className="border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-intenso-text">
                        <div className="flex items-center gap-2">
                          <ShoppingBagIcon className="w-4 h-4 text-intenso-text-muted" />
                          {purchase.serviceName}
                        </div>
                      </TableCell>
                      <TableCell className="text-intenso-text">
                        {purchase.marcaName}
                      </TableCell>
                      <TableCell className="font-bold text-intenso-text">
                        ${purchase.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-intenso-text-muted">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{
                              backgroundColor:
                                purchase.status === "completado"
                                  ? "#0e8d8d"
                                  : purchase.status === "en_progreso"
                                    ? "#8a3bc0"
                                    : "#faba5f",
                              boxShadow: `0 0 0 2px ${
                                purchase.status === "completado"
                                  ? "rgba(14, 141, 141, 0.2)"
                                  : purchase.status === "en_progreso"
                                    ? "rgba(138, 59, 192, 0.2)"
                                    : "rgba(250, 186, 95, 0.2)"
                              }, 0 1px 2px rgba(0, 0, 0, 0.1)`,
                            }}
                          ></div>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(purchase.status)} font-medium`}
                          >
                            {getStatusLabel(purchase.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewDetails(purchase)}
                          className="hover:text-intenso-teal-600 hover:bg-intenso-teal-50"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-md border-none shadow-2xl">
          {selectedPurchase && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-display text-intenso-text flex items-center gap-2">
                      <ShoppingCartIcon className="w-6 h-6 text-intenso-magenta-500" />
                      {selectedPurchase.serviceName}
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              selectedPurchase.status === "completado"
                                ? "#0e8d8d"
                                : selectedPurchase.status === "en_progreso"
                                  ? "#8a3bc0"
                                  : "#faba5f",
                            boxShadow: `0 0 0 2px ${
                              selectedPurchase.status === "completado"
                                ? "rgba(14, 141, 141, 0.2)"
                                : selectedPurchase.status === "en_progreso"
                                  ? "rgba(138, 59, 192, 0.2)"
                                  : "rgba(250, 186, 95, 0.2)"
                            }`,
                          }}
                        ></div>
                        <Badge
                          className={`${getStatusColor(selectedPurchase.status)} font-medium`}
                        >
                          {getStatusLabel(selectedPurchase.status)}
                        </Badge>
                      </div>
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-2xl font-bold text-intenso-text">
                      <CurrencyDollarIcon className="w-6 h-6 text-intenso-orange-500" />
                      ${selectedPurchase.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-intenso-text-muted">
                      Monto Total
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-intenso-teal-50/50 p-4 rounded-lg border border-intenso-teal-100">
                    <h4 className="text-sm font-semibold text-intenso-text-muted mb-2 uppercase tracking-wide">
                      Marca
                    </h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10 ring-2 ring-intenso-teal-200">
                        <AvatarImage src={marca?.avatar} />
                        <AvatarFallback className="bg-intenso-teal-500 text-white font-bold">
                          {marca?.companyName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-intenso-text">
                          {selectedPurchase.marcaName}
                        </p>
                        <p className="text-sm text-intenso-text-muted">
                          {marca?.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-intenso-purple-50/50 p-4 rounded-lg border border-intenso-purple-100">
                    <h4 className="text-sm font-semibold text-intenso-text-muted mb-2 uppercase tracking-wide">
                      Fecha de Compra
                    </h4>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-intenso-purple-500" />
                      <p className="text-intenso-text font-medium">
                        {new Date(
                          selectedPurchase.purchaseDate,
                        ).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-semibold text-intenso-text-muted mb-2 uppercase tracking-wide">
                    Descripción del Servicio
                  </h4>
                  <p className="text-intenso-text text-sm">
                    Servicio contratado para optimizar la presencia digital de
                    la marca.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Select defaultValue={selectedPurchase.status}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_progreso">En Progreso</SelectItem>
                        <SelectItem value="completado">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-intenso-magenta-500 hover:bg-intenso-magenta-600 text-white shadow-md">
                      Actualizar Estado
                    </Button>
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

export default AdminPurchases;
