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
  Search,
  Eye,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";

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
        return "bg-green-100 text-green-700";
      case "en_progreso":
        return "bg-blue-100 text-blue-700";
      case "pendiente":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
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

  // Agrupar compras por servicio
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const purchasesByService = mockServicePurchases.reduce(
    (acc, purchase) => {
      acc[purchase.serviceName] = (acc[purchase.serviceName] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const topServices = Object.entries(purchasesByService)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-intenso-orange-500 to-intenso-yellow-500" />
          <span className="text-xs font-bold tracking-wider text-intenso-text-muted uppercase">
            Finanzas
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
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-80" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text tracking-tight">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Ingresos Totales
                </p>
              </div>
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {completedPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Completados
                </p>
              </div>
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-yellow-500 to-intenso-orange-500 opacity-80" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {pendingPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  Pendientes
                </p>
              </div>
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intenso-teal-500 to-intenso-teal-600 opacity-80" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-intenso-text">
                  {inProcessPurchases}
                </div>
                <p className="text-xs sm:text-sm font-medium text-intenso-text-muted mt-1 uppercase tracking-wide">
                  En Proceso
                </p>
              </div>
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-intenso-teal-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-100/50 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <CardTitle className=" text-intenso-text text-base sm:text-lg font-display">
              Historial de Transacciones
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intenso-text-muted w-4 h-4" />
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
                          <Package className="w-4 h-4 text-intenso-text-muted" />
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
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(purchase.status)} border-0 font-medium`}
                        >
                          {getStatusLabel(purchase.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewDetails(purchase)}
                          className="hover:text-intenso-teal-600 hover:bg-intenso-teal-50"
                        >
                          <Eye className="w-4 h-4" />
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
        <DialogContent className="max-w-2xl">
          {selectedPurchase && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedPurchase.serviceName}
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                      <Badge
                        className={getStatusColor(selectedPurchase.status)}
                      >
                        {getStatusLabel(selectedPurchase.status)}
                      </Badge>
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${selectedPurchase.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">Monto</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      Marca
                    </h4>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={marca?.avatar} />
                        <AvatarFallback>
                          {marca?.companyName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedPurchase.marcaName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {marca?.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      Fecha de Compra
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">
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

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    Descripción del Servicio
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Servicio contratado para optimizar la presencia digital de
                    la marca.
                  </p>
                </div>

                <div className="pt-4 border-t">
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
                    <Button>Actualizar Estado</Button>
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
