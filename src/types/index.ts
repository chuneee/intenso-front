// Tipos de usuario
export type UserType = 'marca' | 'creador' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  avatar?: string;
  createdAt: string;
  status: 'active' | 'blocked';
}

export interface MarcaProfile extends User {
  type: 'marca';
  companyName: string;
  industry: string;
  description: string;
  website?: string;
}

export interface CreadorProfile extends User {
  type: 'creador';
  niche: string[];
  platforms: Platform[];
  bio: string;
  portfolio?: string;
  rating: number;
  completedCampaigns: number;
}

export interface Platform {
  name: string;
  followers: number;
  engagementRate: number;
}

export type CampaignStatus = 'borrador' | 'activa' | 'en_progreso' | 'completada' | 'cancelada';

export interface Campaign {
  id: string;
  marcaId: string;
  marcaName: string;
  title: string;
  description: string;
  status: CampaignStatus;
  budget: number;
  startDate: string;
  endDate: string;
  creadores: string[]; // IDs de creadores asignados
  createdAt: string;
  deliverables: string[];
  category: string;
}

export type ServiceType = 'estrategia' | 'diseno' | 'edicion' | 'community_management' | 'ads' | 'consultoria';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  price: number;
  duration: string;
  features: string[];
}

export interface ServicePurchase {
  id: string;
  marcaId: string;
  marcaName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  purchaseDate: string;
  status: 'pendiente' | 'en_progreso' | 'completado';
}