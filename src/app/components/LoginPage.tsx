import React, { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ChevronRight, Mail, Lock } from "lucide-react";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (!success) setError("Credenciales incorrectas");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-intenso-teal via-intenso-teal to-intenso-teal-active flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* --- Ambient Background --- */}
      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08]">
          <img
            src="/img/isotipo.png"
            alt=""
            className="absolute -top-[10%] -right-[5%] w-[800px] rotate-12 select-none"
            draggable={false}
          />
          <img
            src="/img/isotipo.png"
            alt=""
            className="absolute -bottom-[10%] -left-[10%] w-[900px] rotate-12 select-none"
            draggable={false}
          />
        </div>
        {/* Soft Spotlights & Color Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_90%_85%,color-mix(in_srgb,var(--intenso-purple-500)_15%,transparent),transparent_45%)]" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        {/* Left Column: Brand Narrative (Desktop) */}
        <div className="hidden lg:flex flex-col text-white pl-4 xl:pl-0">
          <div className="flex items-center gap-3 mb-10">
            <img
              src="/img/logo.png"
              alt="intenso"
              className="h-10 xl:h-12 w-auto origin-left scale-[1.3]"
              draggable={false}
            />
          </div>

          <h1 className="font-display text-5xl xl:text-7xl leading-[0.95] tracking-tight">
            Trabajamos con
            <br />
            marcas humanas.
          </h1>

          <p className="mt-8 text-white/90 text-lg xl:text-xl leading-relaxed max-w-lg font-light">
            Orden para tu operación creativa: campañas, creadores y resultados
            en un solo lugar.
          </p>

          {/* Pillars Cards */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-intenso-teal-500/30 hover:shadow-[0_0_20px_rgba(14,141,141,0.15)]">
              <div className="font-display text-xl mb-1 group-hover:text-intenso-teal-50 transition-colors">
                Orden
              </div>
              <div className="text-xs text-white/80 leading-snug">
                Operación clara
              </div>
            </div>
            <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-intenso-purple-500/30 hover:shadow-[0_0_20px_rgba(138,59,192,0.15)] delay-75">
              <div className="font-display text-xl mb-1 group-hover:text-purple-100 transition-colors">
                Foco
              </div>
              <div className="text-xs text-white/80 leading-snug">
                KPIs y control
              </div>
            </div>
            <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-intenso-yellow-500/30 hover:shadow-[0_0_20px_rgba(241,186,95,0.15)] delay-150">
              <div className="font-display text-xl mb-1 group-hover:text-yellow-100 transition-colors">
                Alma
              </div>
              <div className="text-xs text-white/80 leading-snug">
                Creatividad viva
              </div>
            </div>
          </div>

          <div className="mt-16 text-xs text-white/60 font-medium">
            Una estrella para guiar tu operación creativa.
          </div>
        </div>

        {/* Right Column: Floating Login Card */}
        <div className="w-full flex justify-center lg:justify-end">
          {/* Mobile Brand Header */}
          <div className="lg:hidden absolute top-8 left-0 w-full text-center text-white pointer-events-none">
            <img
              src="/img/logo.png"
              alt="Intenso"
              className="h-8 mx-auto opacity-90 drop-shadow-md"
            />
          </div>

          <div className="bg-white/100 rounded-[32px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] p-8 md:p-10 xl:p-12 w-full max-w-[480px] backdrop-blur-sm relative overflow-hidden ring-1 ring-white/50">
            {/* Inner content */}
            <div className="relative z-10">
              <div className="space-y-2 mb-8">
                <h2 className="font-display text-3xl tracking-tight text-intenso-text">
                  Inicia sesión
                </h2>
                <p className="text-sm text-intenso-text-muted">
                  Te dejamos todo listo para continuar.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-intenso-text"
                  >
                    Correo electrónico
                  </Label>
                  <div className="relative group">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-intenso-text-muted group-focus-within:text-intenso-teal transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-intenso-text"
                    >
                      Contraseña
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-intenso-text-muted hover:text-intenso-teal font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-intenso-text-muted group-focus-within:text-intenso-teal transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-10 pr-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-intenso-text-muted hover:text-intenso-text hover:bg-gray-100"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-intenso-teal focus:ring-intenso-teal/20"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-intenso-text-muted cursor-pointer select-none"
                  >
                    Recordar mi sesión
                  </label>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-2">
                    <span className="block w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-intenso-teal hover:bg-intenso-teal-600 text-white shadow-lg shadow-intenso-teal/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Iniciar sesión
                  <ChevronRight className="size-4 ml-1 opacity-80" />
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-intenso-text-muted">
                  ¿Aún no tienes cuenta?{" "}
                  <button
                    type="button"
                    className="font-semibold text-intenso-teal hover:text-intenso-teal-700 transition-colors"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
