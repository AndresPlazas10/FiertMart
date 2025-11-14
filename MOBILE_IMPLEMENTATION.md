# 📱 Guía de Implementación Móvil - Stockly

## 🎯 Objetivo

Crear una experiencia móvil óptima sin simplemente escalar elementos. Rediseñar completamente la UX para dispositivos táctiles.

---

## 📐 Principios de Diseño Móvil

### 1. **Touch Targets (Objetivos Táctiles)**
- **Mínimo 44x44px** para elementos clickeables (botones, links)
- **Espaciado mínimo 8px** entre elementos táctiles
- **Thumb zones**: Colocar acciones frecuentes en la zona inferior (alcance del pulgar)

### 2. **Tipografía**
- **Mínimo 14px** para texto de cuerpo
- **Mínimo 16px** para inputs (evita zoom en iOS)
- **Jerarquía clara**: Usar tamaños contrastantes (12px, 14px, 16px, 20px, 24px)

### 3. **Espaciado**
- **Padding generoso**: 16px-24px en contenedores
- **Margen entre secciones**: 24px-32px
- **Evitar elementos pegados**: Mínimo 12px de separación

### 4. **Layout**
- **Columna única** en móvil (evitar grids complejos)
- **Scroll vertical** preferido sobre horizontal
- **Modales full-screen** para formularios complejos

---

## 🧩 Componentes Disponibles

### **Navegación**

#### `MobileBottomNav`
Navegación inferior sticky con máximo 5 items.

```jsx
import { MobileBottomNav } from '../components/mobile';

<MobileBottomNav
  currentView="ventas"
  onNavigate={(view) => setActiveSection(view)}
/>
```

#### `MobileHeader`
Header compacto (56px) con menú hamburguesa y acciones rápidas.

```jsx
import { MobileHeader } from '../components/mobile';

<MobileHeader
  businessName="Mi Negocio"
  onMenuClick={() => setDrawerOpen(true)}
  showSearch={true}
  showNotifications={true}
  onSearchClick={() => {}}
  onNotificationClick={() => {}}
/>
```

#### `MobileDrawer`
Drawer lateral swipeable para navegación completa.

```jsx
import { MobileDrawer } from '../components/mobile';

<MobileDrawer
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  currentView="ventas"
  onNavigate={(view) => {
    setActiveSection(view);
    setDrawerOpen(false);
  }}
  userName="Juan Pérez"
  businessName="Mi Negocio"
/>
```

---

### **Cards**

#### `MobileCard`
Card básica con padding táctil.

```jsx
import { MobileCard } from '../components/mobile';

<MobileCard 
  onClick={() => handleClick()}
  interactive={true}
  showArrow={true}
>
  <h3>Título</h3>
  <p>Contenido</p>
</MobileCard>
```

#### `MobileStatCard`
Card para mostrar estadísticas.

```jsx
import { MobileStatCard } from '../components/mobile';
import { DollarSign } from 'lucide-react';

<MobileStatCard
  icon={DollarSign}
  label="Ventas del día"
  value="$45,230"
  trend={{ positive: true, value: "+12.5%" }}
  color="text-green-600"
/>
```

#### `MobileListCard`
Card optimizada para listas.

```jsx
import { MobileListCard } from '../components/mobile';
import { Package } from 'lucide-react';

<MobileListCard
  icon={Package}
  title="Laptop Dell XPS 13"
  subtitle="Categoría: Electrónica"
  meta="Stock: 15 unidades"
  badge={{ text: "Activo", variant: "success" }}
  onClick={() => handleEdit(product)}
  actions={
    <>
      <button>Editar</button>
      <button>Eliminar</button>
    </>
  }
/>
```

---

### **Tablas**

#### `MobileTable`
Renderiza tabla en desktop, lista de cards en móvil.

```jsx
import { MobileTable } from '../components/mobile';

<MobileTable
  data={products}
  columns={[
    { 
      key: 'name', 
      label: 'Nombre', 
      primary: true 
    },
    { 
      key: 'price', 
      label: 'Precio', 
      format: (val) => `$${val}`,
      secondary: true 
    },
    { 
      key: 'stock', 
      label: 'Stock' 
    }
  ]}
  onRowClick={(product) => handleEdit(product)}
  loading={loading}
  emptyMessage="No hay productos disponibles"
  actions={(product) => (
    <button onClick={() => handleDelete(product)}>
      Eliminar
    </button>
  )}
/>
```

**Custom rendering:**

```jsx
<MobileTable
  data={products}
  renderMobileCard={(product, index) => (
    <MobileListCard
      key={product.id}
      icon={Package}
      title={product.name}
      subtitle={`$${product.price}`}
      meta={`Stock: ${product.stock}`}
      onClick={() => handleEdit(product)}
    />
  )}
/>
```

---

### **Formularios**

#### `MobileInput`
Input de altura 48px, texto 16px.

```jsx
import { MobileInput } from '../components/mobile';
import { User } from 'lucide-react';

<MobileInput
  label="Nombre completo"
  icon={User}
  placeholder="Juan Pérez"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={errors.name}
  helperText="Ingresa tu nombre y apellido"
  required
/>
```

#### `MobileTextarea`
Textarea adaptada a móvil.

```jsx
import { MobileTextarea } from '../components/mobile';

<MobileTextarea
  label="Descripción"
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
/>
```

#### `MobileSelect`
Select de altura 48px.

```jsx
import { MobileSelect } from '../components/mobile';

<MobileSelect
  label="Categoría"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={[
    { value: '', label: 'Seleccionar...' },
    { value: 'electronics', label: 'Electrónica' },
    { value: 'food', label: 'Alimentos' }
  ]}
  required
/>
```

#### `MobileButton`
Botón de altura mínima 48px con feedback táctil.

```jsx
import { MobileButton } from '../components/mobile';
import { Save } from 'lucide-react';

<MobileButton
  variant="primary" // primary | secondary | danger | ghost
  size="md" // sm | md | lg
  fullWidth={true}
  icon={Save}
  loading={saving}
  onClick={handleSave}
>
  Guardar cambios
</MobileButton>
```

---

### **Modales**

#### `MobileModal`
Full-screen en móvil, centrado en desktop.

```jsx
import { MobileModal } from '../components/mobile';
import { MobileButton } from '../components/mobile';

<MobileModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Añadir producto"
  size="md" // sm | md | lg | full
  footer={
    <div className="flex gap-3">
      <MobileButton 
        variant="secondary" 
        fullWidth 
        onClick={() => setShowModal(false)}
      >
        Cancelar
      </MobileButton>
      <MobileButton 
        variant="primary" 
        fullWidth 
        onClick={handleSave}
        loading={saving}
      >
        Guardar
      </MobileButton>
    </div>
  }
>
  {/* Formulario aquí */}
</MobileModal>
```

---

### **Acciones**

#### `FloatingActionButton`
Botón flotante para acción principal.

```jsx
import { FloatingActionButton } from '../components/mobile';
import { Plus } from 'lucide-react';

<FloatingActionButton
  icon={Plus}
  label="Añadir venta"
  variant="primary" // primary | secondary | accent
  onClick={() => setShowAddModal(true)}
  show={!loading}
/>
```

---

## 🔧 Hooks Útiles

### `useViewport`
Detecta el tamaño del viewport y tipo de dispositivo.

```jsx
import { useViewport } from '../hooks/useViewport';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, width, orientation } = useViewport();

  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

### `useIsIOS`
Detecta si el usuario está en iOS.

```jsx
import { useIsIOS } from '../hooks/useViewport';

function MyComponent() {
  const isIOS = useIsIOS();

  // Aplicar estilos específicos para iOS
  return (
    <input 
      className={isIOS ? 'ios-input' : 'android-input'} 
    />
  );
}
```

---

## 📋 Ejemplo Completo: Adaptar Componente Existente

### **Antes: Vista Desktop**

```jsx
function Inventario({ businessId }) {
  const [products, setProducts] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Inventario</h1>
      
      <button onClick={() => setShowAdd(true)}>
        Añadir producto
      </button>

      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### **Después: Móvil + Desktop**

```jsx
import { useViewport } from '../../hooks/useViewport';
import { 
  MobileTable, 
  FloatingActionButton, 
  MobileModal,
  MobileInput,
  MobileButton 
} from '../mobile';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';

function Inventario({ businessId }) {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const { isMobile } = useViewport();

  return (
    <div className="space-y-4">
      {/* Header adaptivo */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">Inventario</h1>
        
        {/* Botón solo visible en desktop */}
        {!isMobile && (
          <button 
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Añadir producto
          </button>
        )}
      </div>

      {/* Tabla adaptiva */}
      <MobileTable
        data={products}
        columns={[
          { key: 'name', label: 'Nombre', primary: true },
          { 
            key: 'price', 
            label: 'Precio', 
            format: (val) => `$${val}`,
            secondary: true 
          },
          { key: 'stock', label: 'Stock' },
          { 
            key: 'category', 
            label: 'Categoría',
            format: (val) => val || 'Sin categoría'
          }
        ]}
        onRowClick={(product) => handleEdit(product)}
        loading={loading}
        emptyMessage="No hay productos en inventario"
        actions={(product) => (
          <div className="flex gap-2">
            <button 
              onClick={() => handleEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={() => handleDelete(product)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      />

      {/* FAB solo visible en móvil */}
      <FloatingActionButton
        icon={Plus}
        label="Añadir producto"
        onClick={() => setShowAdd(true)}
      />

      {/* Modal adaptivo */}
      <MobileModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title="Añadir producto"
        footer={
          <div className="flex gap-3">
            <MobileButton 
              variant="secondary" 
              fullWidth 
              onClick={() => setShowAdd(false)}
            >
              Cancelar
            </MobileButton>
            <MobileButton 
              variant="primary" 
              fullWidth 
              onClick={handleSave}
            >
              Guardar
            </MobileButton>
          </div>
        }
      >
        <div className="space-y-4">
          <MobileInput
            label="Nombre del producto"
            icon={Package}
            placeholder="Ej: Laptop Dell XPS 13"
            required
          />
          <MobileInput
            label="Precio"
            type="number"
            placeholder="0.00"
            required
          />
          <MobileInput
            label="Stock"
            type="number"
            placeholder="0"
            required
          />
        </div>
      </MobileModal>
    </div>
  );
}
```

---

## ✅ Checklist de Adaptación

Al adaptar un componente, verifica:

- [ ] **Touch targets** mínimo 44x44px
- [ ] **Inputs** mínimo 48px de altura
- [ ] **Texto** mínimo 16px en inputs (evita zoom iOS)
- [ ] **Espaciado** generoso (16-24px padding)
- [ ] **Modales** full-screen en móvil
- [ ] **Tablas** convertidas a lista de cards
- [ ] **Botones primarios** accesibles con el pulgar
- [ ] **FAB** para acción principal en móvil
- [ ] **Navegación** inferior en móvil
- [ ] **Animaciones** optimizadas (<0.3s)
- [ ] **Feedback táctil** en todos los elementos interactivos
- [ ] **Loading states** visibles
- [ ] **Mensajes de error** claros y visibles

---

## 🎨 Utilidades CSS Móviles

Añadidas en `src/index.css`:

```css
/* Safe area para notch de iPhone */
.pt-safe { padding-top: env(safe-area-inset-top); }
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }

/* Touch feedback */
.active\:scale-98:active { transform: scale(0.98); }
.active\:opacity-80:active { opacity: 0.8; }

/* Scroll suave */
.scroll-smooth { scroll-behavior: smooth; }

/* Ocultar scrollbar pero mantener funcionalidad */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## 🚀 Mejores Prácticas

### 1. **Mobile-First**
Diseña primero para móvil, luego añade funcionalidad desktop.

```jsx
// ✅ BIEN
<div className="flex-col sm:flex-row">

// ❌ MAL
<div className="flex-row mobile:flex-col">
```

### 2. **Condicionales de Renderizado**
Usa `useViewport` para componentes completamente diferentes.

```jsx
const { isMobile } = useViewport();

return (
  <>
    {isMobile ? <MobileView /> : <DesktopView />}
  </>
);
```

### 3. **Evita Overflow Horizontal**
```jsx
// ✅ BIEN
<div className="overflow-x-auto">
  <div className="min-w-full">

// ❌ MAL
<div className="w-[1200px]">
```

### 4. **Optimiza Imágenes**
```jsx
<img 
  src={image} 
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

### 5. **Teclado Virtual**
El teclado virtual reduce el viewport. Usa `position: fixed` para elementos que deben permanecer visibles.

---

## 📊 Breakpoints

```javascript
// Tailwind breakpoints
sm: 640px   // Tablets pequeñas
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Pantallas grandes
```

**Estrategia:**
- `< 640px`: Móvil (layout columna, bottom nav, modales full-screen)
- `640px - 1024px`: Tablet (híbrido)
- `>= 1024px`: Desktop (layout completo con sidebar)

---

## 🎯 Próximos Pasos

1. Adaptar **Ventas.jsx** (POS móvil optimizado)
2. Adaptar **Mesas.jsx** (gestión táctil de mesas)
3. Adaptar **Inventario.jsx** (catálogo móvil)
4. Adaptar componentes restantes
5. Testing en dispositivos reales (iOS + Android)
6. PWA optimization (manifest, service worker, offline)

---

## 📞 Soporte

¿Dudas sobre la implementación? Consulta los ejemplos en:
- `src/components/mobile/` - Componentes móviles
- `src/components/layout/DashboardLayout.jsx` - Ejemplo de integración
- Esta guía - Patrones y mejores prácticas
