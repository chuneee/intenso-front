import { MarcaProfile, CreadorProfile, Campaign, Service, ServicePurchase } from '@/types';

// Usuario Admin
export const mockAdmin = {
  id: 'admin1',
  email: 'admin@creatorhub.com',
  name: 'Admin Principal',
  type: 'admin' as const,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  createdAt: '2023-01-01',
  status: 'active' as const
};

// Usuarios Marcas
export const mockMarcas: MarcaProfile[] = [
  {
    id: 'm1',
    email: 'contacto@techbrand.com',
    name: 'Ana García',
    type: 'marca',
    companyName: 'TechBrand',
    industry: 'Tecnología',
    description: 'Marca líder en dispositivos tecnológicos para el mercado latinoamericano',
    website: 'https://techbrand.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 'm2',
    email: 'marketing@fitlife.com',
    name: 'Carlos Mendoza',
    type: 'marca',
    companyName: 'FitLife',
    industry: 'Fitness y Bienestar',
    description: 'Suplementos y productos para un estilo de vida saludable',
    website: 'https://fitlife.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    createdAt: '2024-02-20',
    status: 'active'
  }
];

// Usuarios Creadores
export const mockCreadores: CreadorProfile[] = [
  {
    id: 'c1',
    email: 'contact@mariarodriguez.com',
    name: 'María Rodríguez',
    type: 'creador',
    niche: ['Tech', 'Lifestyle', 'Gadgets'],
    platforms: [
      { name: 'Instagram', followers: 125000, engagementRate: 4.5 },
      { name: 'TikTok', followers: 230000, engagementRate: 6.2 },
      { name: 'YouTube', followers: 85000, engagementRate: 3.8 }
    ],
    bio: 'Creadora de contenido tech apasionada por gadgets y tecnología accesible',
    portfolio: 'https://mariarodriguez.com',
    rating: 4.8,
    completedCampaigns: 34,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    createdAt: '2023-06-10',
    status: 'active'
  },
  {
    id: 'c2',
    email: 'hello@luisfitness.com',
    name: 'Luis Hernández',
    type: 'creador',
    niche: ['Fitness', 'Nutrition', 'Wellness'],
    platforms: [
      { name: 'Instagram', followers: 180000, engagementRate: 5.1 },
      { name: 'TikTok', followers: 320000, engagementRate: 7.3 },
      { name: 'YouTube', followers: 150000, engagementRate: 4.2 }
    ],
    bio: 'Entrenador personal certificado, ayudando a miles a transformar su vida',
    rating: 4.9,
    completedCampaigns: 42,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    createdAt: '2023-04-15',
    status: 'active'
  },
  {
    id: 'c3',
    email: 'sofia@beautyworld.com',
    name: 'Sofía Martínez',
    type: 'creador',
    niche: ['Beauty', 'Fashion', 'Lifestyle'],
    platforms: [
      { name: 'Instagram', followers: 290000, engagementRate: 5.8 },
      { name: 'TikTok', followers: 450000, engagementRate: 8.1 },
      { name: 'YouTube', followers: 95000, engagementRate: 3.5 }
    ],
    bio: 'Maquilladora profesional compartiendo tips y tutoriales de belleza',
    rating: 4.7,
    completedCampaigns: 28,
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    createdAt: '2023-08-22',
    status: 'active'
  },
  {
    id: 'c4',
    email: 'diego@foodlover.com',
    name: 'Diego Torres',
    type: 'creador',
    niche: ['Food', 'Lifestyle', 'Travel'],
    platforms: [
      { name: 'Instagram', followers: 210000, engagementRate: 6.2 },
      { name: 'TikTok', followers: 380000, engagementRate: 7.8 }
    ],
    bio: 'Foodie explorando la mejor gastronomía de Latinoamérica',
    rating: 4.6,
    completedCampaigns: 31,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    createdAt: '2023-05-30',
    status: 'active'
  }
];

// Campañas
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp1',
    marcaId: 'm1',
    marcaName: 'TechBrand',
    title: 'Lanzamiento Smartphone X200',
    description: 'Campaña de lanzamiento para el nuevo smartphone insignia de TechBrand',
    status: 'activa',
    budget: 15000,
    startDate: '2026-01-20',
    endDate: '2026-02-20',
    creadores: ['c1'],
    createdAt: '2026-01-10',
    deliverables: ['3 posts en Instagram', '2 videos TikTok', '1 review en YouTube'],
    category: 'Tecnología'
  },
  {
    id: 'camp2',
    marcaId: 'm2',
    marcaName: 'FitLife',
    title: 'Proteína FitLife Pro',
    description: 'Promoción de la nueva línea de proteínas vegetales',
    status: 'en_progreso',
    budget: 12000,
    startDate: '2026-01-05',
    endDate: '2026-02-05',
    creadores: ['c2', 'c4'],
    createdAt: '2025-12-20',
    deliverables: ['5 posts en Instagram', '3 videos TikTok', 'Stories diarios por 7 días'],
    category: 'Fitness'
  },
  {
    id: 'camp3',
    marcaId: 'm1',
    marcaName: 'TechBrand',
    title: 'Auriculares Premium',
    description: 'Campaña de posicionamiento para auriculares de alta gama',
    status: 'completada',
    budget: 8500,
    startDate: '2025-11-01',
    endDate: '2025-12-15',
    creadores: ['c1', 'c3'],
    createdAt: '2025-10-15',
    deliverables: ['4 posts en Instagram', '2 videos TikTok', '1 unboxing en YouTube'],
    category: 'Tecnología'
  },
  {
    id: 'camp4',
    marcaId: 'm2',
    marcaName: 'FitLife',
    title: 'Desafío 30 Días FitLife',
    description: 'Challenge de transformación con plan de nutrición y ejercicio',
    status: 'borrador',
    budget: 20000,
    startDate: '2026-02-01',
    endDate: '2026-03-05',
    creadores: [],
    createdAt: '2026-01-08',
    deliverables: ['Plan completo de contenido', 'Posts diarios', 'Lives semanales'],
    category: 'Fitness'
  }
];

// Servicios disponibles
export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'Estrategia de Contenido 360',
    type: 'estrategia',
    description: 'Plan completo de contenido para redes sociales con análisis de mercado y competencia',
    price: 2500,
    duration: '4 semanas',
    features: [
      'Análisis de audiencia objetivo',
      'Calendario de contenido mensual',
      'Estrategia de crecimiento',
      'KPIs y métricas de éxito'
    ]
  },
  {
    id: 's2',
    name: 'Diseño Gráfico Premium',
    type: 'diseno',
    description: 'Diseño de piezas gráficas profesionales para redes sociales',
    price: 1800,
    duration: '2 semanas',
    features: [
      '20 diseños personalizados',
      'Formatos para todas las redes',
      'Revisiones ilimitadas',
      'Archivos editables'
    ]
  },
  {
    id: 's3',
    name: 'Edición de Video Profesional',
    type: 'edicion',
    description: 'Edición profesional de videos para YouTube, TikTok e Instagram',
    price: 3200,
    duration: '3 semanas',
    features: [
      'Hasta 10 videos editados',
      'Motion graphics incluidos',
      'Corrección de color',
      'Subtítulos y efectos'
    ]
  },
  {
    id: 's4',
    name: 'Community Management',
    type: 'community_management',
    description: 'Gestión completa de comunidades en redes sociales',
    price: 2200,
    duration: '1 mes',
    features: [
      'Respuesta a comentarios y mensajes',
      'Moderación de comunidad',
      'Reporte semanal de métricas',
      'Gestión de crisis'
    ]
  },
  {
    id: 's5',
    name: 'Campaña de Ads en Meta',
    type: 'ads',
    description: 'Configuración y gestión de campañas publicitarias en Facebook e Instagram',
    price: 1500,
    duration: '1 mes',
    features: [
      'Setup de campañas',
      'Optimización diaria',
      'A/B Testing',
      'Reporte de resultados'
    ]
  },
  {
    id: 's6',
    name: 'Consultoría Estratégica',
    type: 'consultoria',
    description: 'Sesiones personalizadas de consultoría para crecimiento digital',
    price: 800,
    duration: '2 sesiones',
    features: [
      '2 sesiones de 2 horas',
      'Análisis personalizado',
      'Plan de acción',
      'Seguimiento post-consultoría'
    ]
  }
];

// Compras de servicios
export const mockServicePurchases: ServicePurchase[] = [
  {
    id: 'sp1',
    marcaId: 'm1',
    marcaName: 'TechBrand',
    serviceId: 's1',
    serviceName: 'Estrategia de Contenido 360',
    price: 2500,
    purchaseDate: '2026-01-05',
    status: 'en_progreso'
  },
  {
    id: 'sp2',
    marcaId: 'm2',
    marcaName: 'FitLife',
    serviceId: 's3',
    serviceName: 'Edición de Video Profesional',
    price: 3200,
    purchaseDate: '2025-12-28',
    status: 'completado'
  },
  {
    id: 'sp3',
    marcaId: 'm1',
    marcaName: 'TechBrand',
    serviceId: 's2',
    serviceName: 'Diseño Gráfico Premium',
    price: 1800,
    purchaseDate: '2026-01-10',
    status: 'pendiente'
  }
];