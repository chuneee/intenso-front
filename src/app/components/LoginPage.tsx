import React, { useMemo, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  Briefcase,
  Sparkles,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";

type RolePreset = {
  id: "marca" | "creador" | "admin";
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeVariant: "purple" | "pink" | "secondary";
  onFill: () => void;
};

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

  const fillMarcaDemo = () => {
    setEmail("contacto@techbrand.com");
    setPassword("demo123");
    setError("");
  };

  const fillCreadorDemo = () => {
    setEmail("contact@mariarodriguez.com");
    setPassword("demo123");
    setError("");
  };

  const fillAdminDemo = () => {
    setEmail("admin@creatorhub.com");
    setPassword("demo123");
    setError("");
  };

  const rolePresets: RolePreset[] = useMemo(
    () => [
      {
        id: "marca",
        label: "Entrar como Marca",
        description: "Gestiona campanas, compras y resultados.",
        icon: Briefcase,
        badgeVariant: "purple",
        onFill: fillMarcaDemo,
      },
      {
        id: "creador",
        label: "Entrar como Creador",
        description: "Colaboraciones, entregables y metrics.",
        icon: Sparkles,
        badgeVariant: "pink",
        onFill: fillCreadorDemo,
      },
      {
        id: "admin",
        label: "Entrar como Admin",
        description: "Control total del sistema y usuarios.",
        icon: Shield,
        badgeVariant: "secondary",
        onFill: fillAdminDemo,
      },
    ],
    [],
  );

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
                <h1 className="font-display text-4xl xl:text-5xl leading-[1.05] tracking-tight">
                  Trabajamos con
                  <br />
                  marcas humanas.
                </h1>

                <p className="mt-5 text-white/85 text-base xl:text-lg leading-relaxed">
                  Orden para tu operacion creativa: campañas, creadores y resultados en un
                  solo lugar.
                </p>

                {/* Cards */}
                <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
                  <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-3">
                    <div className="font-display text-xl">Orden</div>
                    <div className="text-xs text-white/80 mt-1">Operacion clara</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-3">
                    <div className="font-display text-xl">Foco</div>
                    <div className="text-xs text-white/80 mt-1">KPIs y control</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-3">
                    <div className="font-display text-xl">Alma</div>
                    <div className="text-xs text-white/80 mt-1">Creatividad viva</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer al fondo */}
            <div className="pt-10 text-xs text-white/70">
              La estrella representa la "o" de intenso y guia tu experiencia.
            </div>
          </div>
        </aside>

        {/* Right - Form */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-intenso-surface border border-intenso-border shadow-sm p-6 sm:p-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
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
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-intenso-text">
                  Bienvenido de vuelta
                </h2>
                <p className="text-sm sm:text-base text-intenso-text-muted">
                  Inicia sesion y continua tu operacion con claridad.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-intenso-text">
                    Correo electronico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tucorreo@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm text-intenso-text"
                  >
                    Contrasena
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contrasena"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-intenso-text-muted hover:text-intenso-text hover:bg-muted"
                      aria-label={
                        showPassword
                          ? "Ocultar contrasena"
                          : "Mostrar contrasena"
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
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-intenso-border" />
                <div className="text-xs text-intenso-text-muted">
                  Accesos rapidos
                </div>
                <div className="h-px flex-1 bg-intenso-border" />
              </div>

              <div className="space-y-2">
                {rolePresets.map((preset) => {
                  const Icon = preset.icon;

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={preset.onFill}
                      className="w-full group flex items-center gap-3 rounded-xl border border-intenso-border bg-intenso-surface px-3 py-3 text-left transition-[background-color,box-shadow,border-color] hover:bg-intenso-teal-soft/35 hover:border-intenso-teal/25"
                    >
                      <div
                        className={`size-9 rounded-lg flex items-center justify-center text-white shadow-sm ${
                          preset.badgeVariant === "purple"
                            ? "bg-intenso-purple"
                            : preset.badgeVariant === "pink"
                              ? "bg-intenso-pink"
                              : "bg-intenso-teal"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-intenso-text">
                          {preset.label}
                        </div>
                        <div className="text-xs text-intenso-text-muted">
                          {preset.description}
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-intenso-text-muted group-hover:text-intenso-teal" />
                    </button>
                  );
                })}
              </div>

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
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
