import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { paths } from "@/routes/paths";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Squares2X2Icon,
  UsersIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  CogIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";

type NavItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
};

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const homePath =
    user?.type === "admin"
      ? paths.admin.root
      : user?.type === "marca"
        ? paths.marca.root
        : paths.creador.root;

  // Determine user role colors/gradients
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const roleTheme = useMemo(() => {
    switch (user?.type) {
      case "admin":
        return {
          gradient: "from-[#2A213B] via-[#431B69] to-[#8A3BC0]", // Deep Purple Admin
          accent: "text-intenso-purple",
          dot: "bg-intenso-purple",
          bg: "bg-[#2A213B]",
        };
      case "marca":
        return {
          gradient: "from-[#052e2e] via-[#0E8D8D] to-[#14b6b6]", // Teal Brand
          accent: "text-intenso-teal",
          dot: "bg-intenso-teal",
          bg: "bg-[#052e2e]",
        };
      case "creador":
        return {
          gradient: "from-[#332400] via-[#c27a00] to-[#FABA5F]", // Orange Creator
          accent: "text-intenso-orange",
          dot: "bg-intenso-orange",
          bg: "bg-[#332400]",
        };
      default:
        return {
          gradient: "from-gray-900 to-gray-800",
          accent: "text-gray-900",
          dot: "bg-gray-500",
          bg: "bg-gray-900",
        };
    }
  }, [user?.type]);

  const navigation: NavItem[] = useMemo(() => {
    if (!user) return [];

    if (user.type === "admin") {
      return [
        { name: "Dashboard", icon: Squares2X2Icon, to: paths.admin.root },
        { name: "Marcas", icon: BriefcaseIcon, to: paths.admin.marcas },
        { name: "Creadores", icon: UsersIcon, to: paths.admin.creadores },
        { name: "Campañas", icon: MegaphoneIcon, to: paths.admin.campaigns },
        { name: "Servicios", icon: ShoppingBagIcon, to: paths.admin.services },
        { name: "Compras", icon: ChartBarIcon, to: paths.admin.purchases },
        {
          name: "Métricas",
          icon: PresentationChartLineIcon,
          to: paths.admin.metrics,
        },
      ];
    }

    if (user.type === "marca") {
      return [
        { name: "Dashboard", icon: Squares2X2Icon, to: paths.marca.root },
        { name: "Campañas", icon: MegaphoneIcon, to: paths.marca.campaigns },
        { name: "Creadores", icon: UsersIcon, to: paths.marca.creators },
        { name: "Servicios", icon: ShoppingBagIcon, to: paths.marca.services },
      ];
    }

    return [
      { name: "Dashboard", icon: Squares2X2Icon, to: paths.creador.root },
      {
        name: "Mis Campañas",
        icon: MegaphoneIcon,
        to: paths.creador.campaigns,
      },
      { name: "Marcas", icon: UsersIcon, to: paths.creador.brands },
    ];
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate(paths.login, { replace: true });
  };

  return (
    <div
      className={`flex h-screen w-full overflow-hidden bg-gradient-to-br from-intenso-purple via-[#B447CC] to-[#F15BA6] relative font-sans`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Deep Purple/Magenta Base */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-intenso-purple-600/40 blur-[120px] mix-blend-overlay" />
        <div className="absolute top-[40%] right-[-20%] w-[60%] h-[60%] rounded-full bg-intenso-magenta-500/30 blur-[120px] mix-blend-overlay" />

        {/* Branding Accents (Teal & Orange) to pop through glass */}
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-intenso-teal-500/30 blur-[100px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-intenso-orange-500/30 blur-[80px] mix-blend-screen" />

        {/* Texture Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[url('/img/isotipo.png')] bg-repeat space mix-blend-overlay"
          style={{ backgroundSize: "180px" }}
        />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => navigate(homePath)}
          className="flex items-center"
        >
          <img
            src="/img/logo.png"
            alt="Intenso Logo"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-72 z-50 transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-72 lg:flex-shrink-0
          flex flex-col p-6
        `}
      >
        {/* Brand Logo */}
        <div className="h-28 flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(homePath)}
            className="flex items-center justify-center w-full"
          >
            <img
              src="/img/logo.png"
              className="h-20 w-auto object-contain brightness-0 invert transition-transform hover:scale-105"
              alt="Intenso Logo"
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            // Check if active (exact match for root, or starts with for others)
            const isActive =
              item.to === homePath
                ? location.pathname === homePath
                : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] text-intenso-purple font-bold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`w-[22px] h-[22px] ${isActive ? "text-intenso-purple" : "text-white/70 group-hover:text-white"}`}
                />
                <span className="text-sm tracking-wide">{item.name}</span>

                {/* Active Indicator Dot (Optional embellishment) */}
                {isActive && (
                  <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-intenso-magenta animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Card */}
        <div className="mt-6 pt-6 border-t border-white/10">
          {/* Quick Actions (Design Element) */}
          <div className="flex gap-2 mb-4 px-2">
            <button
              onClick={() => {
                /* Settings? */
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <CogIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-200 transition-colors ml-auto"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/15 transition-colors cursor-pointer group">
            <Avatar className="w-10 h-10 ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
              <AvatarImage src={user.avatar} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-intenso-purple to-intenso-pink text-white font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-white/60 truncate capitalize">
                {user.type}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Rounded Card */}
      <main className="flex-1 relative z-10 p-2 lg:p-4 lg:pl-0 h-full overflow-hidden">
        <div className="group/main-card bg-gradient-to-br from-white/95 via-white/85 to-white/70 backdrop-blur-2xl w-full h-full rounded-[20px] lg:rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col border border-white/60 box-border ring-1 ring-white/40">
          {/* Decorative Gloss Line at top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

          {/* Subtle inner glow/gradient */}
          <div className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] bg-intenso-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Header inside Content Area */}
          <div className="h-16 lg:h-20 min-h-[64px] px-6 lg:px-8 py-4 flex items-center justify-end bg-white/40 backdrop-blur-md border-b border-white/30 z-20 sticky top-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />{" "}
            {/* Header distinct sheen */}
            <div className="flex items-center gap-3 lg:gap-6 relative z-10">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-white/60 rounded-full px-4 py-2 w-64 border border-white/50 focus-within:border-intenso-purple/50 focus-within:bg-white/90 transition-all shadow-sm focus-within:shadow-md focus-within:ring-2 focus-within:ring-intenso-purple/10">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-500"
                />
              </div>

              <button className="relative p-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
              </button>

              <div className="h-8 w-px bg-gray-300/50 hidden md:block" />

              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium tracking-tight">
                <span>
                  {new Date().toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide relative">
            <div className="min-h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
