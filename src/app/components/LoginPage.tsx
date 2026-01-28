import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Sparkles, Shield, ArrowRight, Eye, EyeOff, Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (!success) {
      setError('Credenciales incorrectas');
    }
  };

  const fillMarcaDemo = () => {
    setEmail('contacto@techbrand.com');
    setPassword('demo123');
    setError('');
  };

  const fillCreadorDemo = () => {
    setEmail('contact@mariarodriguez.com');
    setPassword('demo123');
    setError('');
  };

  const fillAdminDemo = () => {
    setEmail('admin@creatorhub.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Side - Hero with Image */}
        <div 
          className="relative bg-slate-900 p-8 sm:p-10 lg:p-16 flex flex-col justify-between min-h-[400px] lg:min-h-[600px] hidden lg:flex"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1656187304167-f5efa9b94dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBvbHlnb24lMjBkYXJrJTIwYmx1ZXxlbnwxfHx8fDE3NjgyNjI4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-12 lg:mb-16">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-slate-900" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white">CreatorHub</span>
            </div>

            {/* Main Content */}
            <div className="space-y-4 lg:space-y-6 max-w-md">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Conecta Marcas.<br />
                Impulsa Creadores.<br />
                Logra Resultados.
              </h1>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed">
                La plataforma todo-en-uno para campañas de influencer marketing. Gestiona colaboraciones, mide rendimiento y escala la presencia digital de tu marca.
              </p>
            </div>
          </div>

          {/* Bottom Indicator */}
          <div className="flex gap-2">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 sm:p-8 lg:p-12 xl:p-16 flex items-center">
          <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900">CreatorHub</span>
            </div>

            {/* Header */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">¡Bienvenido de nuevo!</h2>
              <p className="text-sm sm:text-base text-slate-600">Inicia sesión para empezar a gestionar tus campañas con facilidad.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 sm:h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 sm:h-12 pr-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  <span className="text-sm text-slate-600">Recordarme</span>
                </label>
                <button type="button" className="text-sm text-slate-600 hover:text-slate-900 text-left sm:text-right">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 sm:h-12 bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-medium rounded-full"
              >
                Iniciar sesión
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-slate-500">O continúa con</span>
              </div>
            </div>

            {/* Demo Accounts as "SSO" buttons */}
            <div className="space-y-2.5 sm:space-y-3">
              <button
                type="button"
                onClick={fillMarcaDemo}
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-slate-700 text-sm sm:text-base">Continuar como Marca</span>
              </button>

              <button
                type="button"
                onClick={fillCreadorDemo}
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-slate-700 text-sm sm:text-base">Continuar como Creador</span>
              </button>

              <button
                type="button"
                onClick={fillAdminDemo}
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-slate-700 text-sm sm:text-base">Continuar como Admin</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs sm:text-sm text-slate-500">
              ¿No tienes una cuenta? <button type="button" className="font-medium text-slate-900 hover:underline">Regístrate aquí</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;