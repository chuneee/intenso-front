# INTENSO UI System (Frontend)

Esta guia define el estandar visual y tecnico para mantener consistencia al crear o modificar componentes en INTENSO.

## 1) Donde vive la identidad

- Estilos globales (entry): `FrontEnd/src/styles/index.css`
  - Importa: `fonts.css` + `tailwind.css` + `theme.css`
- Fuentes (carga + variables): `FrontEnd/src/styles/fonts.css`
- Tokens de color, mapeo Tailwind, utilities y base styles: `FrontEnd/src/styles/theme.css`
- Carga global en la app: `FrontEnd/src/main.tsx` con `import "./styles/index.css";`

## 2) Tipografia (reglas y uso)

Regla madre:
- Numeros / KPIs / headings = **Poppins** (energia y jerarquia)
- Texto operativo (tablas, labels, descripciones) = **Open Sans** (claridad y lectura)

### Variables oficiales
Definidas en `FrontEnd/src/styles/fonts.css`:
- `--intenso-font-display`: Poppins
- `--intenso-font-body`: Open Sans

### Defaults globales
Definidos en `FrontEnd/src/styles/theme.css`:
- `body` usa `--intenso-font-body`
- `h1-h4` usan `--intenso-font-display`
- `label`, `button`, `input` usan `--intenso-font-body`

### Uso en componentes (Tailwind)
- Texto normal: `font-sans` (Open Sans)
- Titulos / numeros: `font-display` (Poppins)

### KPIs (patrones recomendados)
Utilities existentes en `FrontEnd/src/styles/theme.css`:
- `.kpi-number`: display font + tabular nums + tracking sutil
- `.kpi-label`: body font + color muted
- `.kpi-emphasis`: aplica color primario

Ejemplo de uso:
```tsx
<div className="kpi-label text-sm">Campanas activas</div>
<div className="kpi-number text-3xl font-semibold">24</div>
<div className="kpi-number kpi-emphasis text-3xl font-semibold">$120,450</div>
```

## 3) Color (paleta y proposito)

Regla de uso:
- 70-80% neutrales
- 15-20% Teal (primario)
- 5-10% secundarios (morado/rosa/amarillo) solo con intencion

### Brand tokens (no usar hex directo en componentes)
Definidos en `FrontEnd/src/styles/theme.css`:

Teal (marca/accion):
- `--intenso-teal-500` (#408B8C): primario / CTA / activo
- `--intenso-teal-600` (#35797A): hover
- `--intenso-teal-700` (#2C6768): pressed/active
- `--intenso-teal-50`  (#E6F2F2): background suave

Secundarios (significado):
- `--intenso-purple-500` (#8A3BC0): crecimiento / rankings / highlights estrategicos
- `--intenso-pink-500`   (#B447CC): humano / microinteracciones / branding puntual
- `--intenso-yellow-500` (#F1BA5F): borrador / atencion suave

Neutrales:
- `--intenso-bg` (#F7F7F9): fondo general
- `--intenso-surface` (#FFFFFF): superficies/cards
- `--intenso-border` (#E5E7EB): bordes/divisores
- `--intenso-text` (#111827): texto principal
- `--intenso-text-muted` (#6B7280): texto secundario

### Semantic tokens (base UI)
Tambien en `FrontEnd/src/styles/theme.css`:
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`, `--ring`

Regla practica:
- Componentes deben depender de semanticos (`bg-card`, `text-foreground`, `border-border`) como base.
- Usar tokens de marca (teal/purple/pink/yellow) solo cuando haya intencion (estado, jerarquia o foco).

## 4) Colores como clases Tailwind (como se usan)

Tailwind v4 permite mapear tokens via `@theme inline` en `FrontEnd/src/styles/theme.css`.

Ya estan disponibles clases de marca como:
- Teal:
  - `bg-intenso-teal`, `text-intenso-teal`
  - `bg-intenso-teal-hover`, `bg-intenso-teal-active`
  - `bg-intenso-teal-soft`
- Secundarios:
  - `bg-intenso-purple`, `text-intenso-purple`
  - `bg-intenso-pink`, `text-intenso-pink`
  - `bg-intenso-yellow`, `text-intenso-yellow`
- Neutrales:
  - `bg-intenso-bg`, `bg-intenso-surface`
  - `border-intenso-border`
  - `text-intenso-text`, `text-intenso-text-muted`

## 5) Componentes base (estandar de estilo)

Estos componentes son la base del sistema. Si necesitas un nuevo patron reusable, primero intenta extenderlos.

### Button
- Archivo: `FrontEnd/src/app/components/ui/button.tsx`
- Variants alineados a INTENSO:
  - `default`: CTA Teal
  - `secondary`: Teal soft (acciones secundarias)
  - `outline`: superficie blanca + borde neutral
  - `ghost`: accion discreta
  - `link`: link teal

Uso:
```tsx
<Button>Guardar</Button>
<Button variant="secondary">Ver detalles</Button>
<Button variant="outline">Cancelar</Button>
```

### Badge
- Archivo: `FrontEnd/src/app/components/ui/badge.tsx`
- Variants:
  - `default`, `secondary`, `outline`, `muted`
  - `purple` (crecimiento/ranking)
  - `pink` (detalle humano)
  - `yellow` (atencion suave)
  - `draft` (borrador)

Uso:
```tsx
<Badge>Activo</Badge>
<Badge variant="draft">Borrador</Badge>
<Badge variant="purple">+12% growth</Badge>
```

### Card
- Archivo: `FrontEnd/src/app/components/ui/card.tsx`
- Props del sistema:
  - `variant="kpi"` para cards KPI (mas protagonicas)
  - `interactive={true}` para hover/elevacion intencional (solo si es clickeable)

Uso:
```tsx
<Card variant="kpi" interactive>
  <CardHeader className="pb-2">
    <CardTitle className="kpi-label text-sm">Ingresos</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="kpi-number kpi-emphasis text-3xl font-semibold">$120,450</div>
  </CardContent>
</Card>
```

## 6) Estandar al crear un componente nuevo (checklist)

- Tipografia:
  - Titulos/numeros importantes: `font-display` (y si aplica KPI: `kpi-number`)
  - Texto descriptivo/labels/tablas: `font-sans` (y si aplica KPI: `kpi-label`)
- Color:
  - Base: `bg-card`, `border-border`, `text-foreground`
  - Interaccion/activo/CTA: `bg-intenso-teal` / `text-intenso-teal`
  - Secundarios (morado/rosa/amarillo) solo si hay significado
- Evitar:
  - Hex directos
  - `bg-slate-*`, `text-slate-*`, `border-slate-*` en componentes nuevos

## 7) Nota de mantenimiento

Si encuentras pantallas con estilos legacy (mucho `slate-*`), la estrategia recomendada es migrar gradualmente:
- Primero: usa `Button`, `Badge`, `Card` (y tokens) para nuevos componentes.
- Luego: reemplaza colores `slate-*` por tokens INTENSO cuando toques esas vistas.
