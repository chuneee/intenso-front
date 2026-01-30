export const paths = {
  login: "/login",

  admin: {
    root: "/admin",
    marcas: "/admin/marcas",
    creadores: "/admin/creadores",
    campaigns: "/admin/campaigns",
    services: "/admin/services",
    purchases: "/admin/purchases",
    metrics: "/admin/metrics",
  },

  marca: {
    root: "/marca",
    campaigns: "/marca/campaigns",
    creators: "/marca/creators",
    services: "/marca/services",
  },

  creador: {
    root: "/creador",
    campaigns: "/creador/campaigns",
    brands: "/creador/brands",
  },
} as const;
