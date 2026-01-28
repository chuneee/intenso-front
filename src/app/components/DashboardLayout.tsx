import React, { ReactNode, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  ShoppingBag, 
  LogOut,
  Sparkles,
  Shield,
  Briefcase,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const isMarca = user.type === 'marca';
  const isAdmin = user.type === 'admin';

  const navigation = isAdmin ? [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Marcas', icon: Briefcase, page: 'admin-marcas' },
    { name: 'Creadores', icon: Users, page: 'admin-creadores' },
    { name: 'Campañas', icon: Megaphone, page: 'admin-campaigns' },
    { name: 'Servicios', icon: ShoppingBag, page: 'admin-services' },
    { name: 'Compras', icon: BarChart3, page: 'admin-purchases' },
    { name: 'Métricas', icon: BarChart3, page: 'admin-metrics' },
  ] : isMarca ? [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Campañas', icon: Megaphone, page: 'campaigns' },
    { name: 'Creadores', icon: Users, page: 'creators' },
    { name: 'Servicios', icon: ShoppingBag, page: 'services' }
  ] : [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Mis Campañas', icon: Megaphone, page: 'campaigns' },
    { name: 'Marcas', icon: Users, page: 'brands' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900">
            CreatorHub
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-900" />
          ) : (
            <Menu className="w-6 h-6 text-slate-900" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:left-0
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">
              CreatorHub
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium text-sm ${
                  isActive 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2 mb-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-slate-200 text-slate-700 text-sm font-medium">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user.type}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;