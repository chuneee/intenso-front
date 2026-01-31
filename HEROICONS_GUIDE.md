# Guía de Heroicons para Intenso

## ✨ Instalado exitosamente

Ya tienes `@heroicons/react` instalado y listo para usar.

## 🎨 Estilos Disponibles

Heroicons viene en 3 variantes:

- **24/solid** - Iconos sólidos (como los de la imagen del cliente) ✅
- **24/outline** - Iconos con outline
- **20/solid** - Versión más pequeña

## 📦 Ejemplos de Iconos Similares a la Imagen del Cliente

### ⭐ Estrella (Star)

```tsx
import { StarIcon } from "@heroicons/react/24/solid";

<StarIcon className="w-6 h-6 text-purple-500" />;
```

### ✉️ Email/Sobre

```tsx
import { EnvelopeIcon } from "@heroicons/react/24/solid";

<EnvelopeIcon className="w-6 h-6 text-purple-500" />;
```

### 🔔 Campana/Notificación

```tsx
import { BellIcon } from "@heroicons/react/24/solid";

<BellIcon className="w-6 h-6 text-purple-500" />;
```

### 🔍 Lupa/Búsqueda

```tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

<MagnifyingGlassIcon className="w-6 h-6 text-purple-500" />;
```

### ▶️ Play/Flecha

```tsx
import { PlayIcon } from "@heroicons/react/24/solid";

<PlayIcon className="w-6 h-6 text-purple-500" />;
```

## 🎯 Iconos Útiles para el Dashboard

### Para KPIs y Métricas

```tsx
import {
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
```

### Para Navegación

```tsx
import {
  HomeIcon,
  Squares2X2Icon,
  UserGroupIcon,
  BriefcaseIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
```

### Para Acciones

```tsx
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
```

## 💡 Cómo Usarlos en Intenso

### Ejemplo en KPI Cards:

```tsx
import { UsersIcon } from "@heroicons/react/24/solid";

<Card>
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-intenso-purple-100">
        <UsersIcon className="w-6 h-6 text-intenso-purple-600" />
      </div>
      <CardTitle>Creadores Activos</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">247</div>
  </CardContent>
</Card>;
```

### Ejemplo en Botones:

```tsx
import { SparklesIcon } from "@heroicons/react/24/solid";

<Button className="gap-2">
  <SparklesIcon className="w-5 h-5" />
  Nueva Campaña
</Button>;
```

## 🎨 Aplicando el Estilo de la Imagen

Para que los iconos se vean exactamente como la imagen del cliente (sólidos, redondeados, con fondo):

```tsx
<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
  <StarIcon className="w-6 h-6 text-white" />
</div>
```

## 📚 Referencia Completa

Todos los iconos disponibles: https://heroicons.com/

## 🔄 Migración de Lucide a Heroicons

Si necesitas reemplazar iconos de Lucide:

| Lucide          | Heroicons Solid           |
| --------------- | ------------------------- |
| Users           | UsersIcon                 |
| Megaphone       | MegaphoneIcon             |
| ShoppingBag     | ShoppingBagIcon           |
| BarChart3       | ChartBarIcon              |
| Sparkles        | SparklesIcon              |
| Settings        | CogIcon                   |
| LogOut          | ArrowRightOnRectangleIcon |
| Bell            | BellIcon                  |
| Search          | MagnifyingGlassIcon       |
| LayoutDashboard | Squares2X2Icon            |
| Briefcase       | BriefcaseIcon             |

---

✅ **Ya comenzamos a usar Heroicons en el AdminDashboard** (botón "Nueva Campaña")
