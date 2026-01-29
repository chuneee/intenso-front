import React, { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  ChevronRight,
  Mail,
  Lock,
} from "lucide-react";

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
    <div className="min-h-screen bg-intenso-bg">
      <div className="min-h-screen flex items-stretch">
        {/* Left - Brand */}
        <aside className="hidden lg:flex relative w-[46%] min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-intenso-teal via-intenso-teal to-intenso-teal-active" />

          {/* Star pattern layer */}
          <div className="absolute inset-0 opacity-[0.10]">
            <img
              src="/img/isotipo.png"
              alt=""
              className="absolute -top-24 -right-24 w-[520px] rotate-12 select-none pointer-events-none"
              draggable={false}
            />
            <img
              src="/img/isotipo.png"
              alt=""
              className="absolute -bottom-28 -left-24 w-[560px] -rotate-6 select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Soft glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.16),transparent_50%)]" />

          <div className="relative z-10 flex flex-col p-10 xl:p-14 text-white w-full">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <img
                  src="/img/logo.png"
                  alt="intenso"
                  className="h-10 xl:h-12 w-auto transform-gpu origin-left scale-[1.35] xl:scale-[1.45]"
                  draggable={false}
                />
            </div>

            {/* Hero copy (centrado en el alto disponible) */}
            <div className="flex-1 flex items-center">
              <div className="max-w-md">
                <h1 className="font-display text-5xl xl:text-6xl leading-[1.02] tracking-tight">
                  Trabajamos con
                  <br />
                  marcas humanas.
                </h1>

                <p className="mt-6 text-white/85 text-lg xl:text-xl leading-relaxed">
                  Orden para tu operacion creativa: campañas, creadores y resultados en un
                  solo lugar.
                </p>

                {/* Cards */}
                <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
                  <div className="min-h-[72px] rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="font-display text-lg xl:text-xl leading-none">
                      Orden
                    </div>
                    <div className="mt-1 text-[11px] xl:text-xs leading-snug text-white/80">
                      Operacion clara
                    </div>
                  </div>
                  <div className="min-h-[72px] rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="font-display text-lg xl:text-xl leading-none">Foco</div>
                    <div className="mt-1 text-[11px] xl:text-xs leading-snug text-white/80">
                      KPIs y control
                    </div>
                  </div>
                  <div className="min-h-[72px] rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="font-display text-lg xl:text-xl leading-none">Alma</div>
                    <div className="mt-1 text-[11px] xl:text-xs leading-snug text-white/80">
                      Creatividad viva
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer al fondo */}
            <div className="pt-10 text-xs text-white/70">
              Una estrella para guiar tu operacion creativa.
            </div>
          </div>
        </aside>

        {/* Right - Form */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-intenso-surface border border-intenso-border shadow-sm overflow-hidden animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              {/* Brand rail */}
              <div className="h-1.5 bg-gradient-to-r from-intenso-teal via-intenso-teal-hover to-intenso-teal-active" />

              <div className="p-6 sm:p-8">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-center mb-6">
                  <img
                    src="/img/logo.png"
                    alt="INTENSO"
                    className="h-11 w-auto"
                    draggable={false}
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-intenso-text">
                    Inicia sesion
                  </h2>
                  <p className="text-sm sm:text-base text-intenso-text-muted">
                    Te dejamos todo listo para continuar.
                  </p>
                </div>


              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-intenso-text">
                    Correo electronico
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-intenso-text-muted" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-intenso-text">
                    Contrasena
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-intenso-text-muted" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contrasena"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-9 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-intenso-text-muted hover:text-intenso-text hover:bg-muted"
                      aria-label={
                        showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-intenso-border text-intenso-teal focus:ring-2 focus:ring-ring/50"
                    />
                    <span className="text-sm text-intenso-text-muted">
                      Recordarme
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-sm text-intenso-text-muted hover:text-intenso-teal"
                  >
                    Olvide mi contrasena
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full h-11 rounded-xl">
                  Iniciar sesion
                  <ChevronRight className="size-4" />
                </Button>

                <p className="text-center text-xs text-intenso-text-muted">
                  Tus datos estan protegidos. Acceso seguro.
                </p>
              </form>

              <p className="mt-6 text-center text-xs text-intenso-text-muted">
                No tienes cuenta?{" "}
                <button
                  type="button"
                  className="font-medium text-intenso-teal hover:underline"
                >
                  Registrate
                </button>
              </p>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
