# 🚀 Embudo IA Express

**Plantilla base para landing pages dinámicas por cliente**

Sistema de generación de embudos de conversión personalizados para negocios locales. No es un SaaS, sino una plantilla que se despliega por separado para cada cliente.

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Niveles de servicio](#-niveles-de-servicio)
- [Flujo de trabajo](#-flujo-de-trabajo-por-cliente)
- [Despliegue](#-despliegue)
- [Scripts disponibles](#-scripts-disponibles)

---

## 📖 Descripción

**Embudo IA Express** es una plantilla de Next.js 15 que permite crear landing pages personalizadas para clientes de forma rápida y escalable. Cada cliente obtiene su propia instancia desplegada con configuración única.

### ¿Qué NO es?

- ❌ No es un SaaS multi-tenant
- ❌ No incluye sistema de login
- ❌ No tiene base de datos compartida
- ❌ No tiene panel de administración

### ¿Qué SÍ es?

- ✅ Plantilla reutilizable por cliente
- ✅ Sistema de configuración basado en JSON
- ✅ Componentes React modulares y personalizables
- ✅ Deployment independiente por proyecto
- ✅ Tres niveles de servicio: Express, Pro, Monthly

---

## ✨ Características

### Técnicas

- **Next.js 15** con App Router
- **TypeScript** con tipado fuerte
- **Tailwind CSS** para estilos
- **Zod** para validación de esquemas
- **SEO optimizado** con Schema.org automático
- Soporte para temas claro/oscuro
- Renderizado del lado del cliente con carga dinámica

### Funcionales

- Configuración 100% basada en JSON
- Secciones modulares y condicionales
- Integración nativa con WhatsApp
- Soporte para múltiples niveles de servicio
- Sistema de gestión de clientes archivados

---

## 🏗️ Arquitectura

```
embudo-ia-express/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── config/          # Endpoint de configuración
│   │   └── testimonials/    # Endpoint de testimonios
│   ├── layout.tsx           # Layout principal con tema dinámico
│   ├── page.tsx             # Página principal (renderizado dinámico)
│   └── globals.css          # Estilos globales
│
├── components/
│   ├── core/                # Componentes base (casi inmutables)
│   │   ├── Hero.tsx         # Sección hero
│   │   ├── Features.tsx     # Lista de características
│   │   ├── Process.tsx      # Proceso en pasos
│   │   ├── Pricing.tsx      # Tabla de precios
│   │   ├── Testimonials.tsx # Testimonios de clientes
│   │   ├── CTA.tsx          # Call to action
│   │   └── Footer.tsx       # Footer con contacto
│   └── sections/            # Secciones personalizables (futuro)
│
├── content/                 # Configuraciones JSON
│   ├── base-config.json     # Plantilla base
│   ├── config.json          # Config ACTIVA del cliente actual
│   ├── testimonials.json    # Testimonios
│   ├── pricing.json         # Precios por nivel
│   ├── clients/             # Configs guardadas por cliente
│   │   └── taller-hernandez.json
│   └── clients-archived/    # Configs antiguas
│
├── lib/                     # Utilidades y helpers
│   ├── config-schema.ts     # Esquemas Zod de validación
│   ├── config.ts            # Funciones para leer configs
│   └── schema-org.ts        # Generación de JSON-LD para SEO
│
└── public/
    └── images/              # Imágenes del proyecto
```

---

## 🚀 Instalación

### Requisitos previos

- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/Digisenda/embudo-ia-express.git
cd embudo-ia-express

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuración

### Archivo de configuración: `content/config.json`

Este es el archivo que define TODO el comportamiento de la landing page del cliente actual.

#### Campos principales:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `clientId` | `string` | Identificador único del cliente (formato: `nombre-cliente-001`) |
| `deployUrl` | `string` | URL donde se desplegará el proyecto |
| `level` | `'express' \| 'pro' \| 'monthly'` | Nivel de servicio contratado |
| `businessName` | `string` | Nombre del negocio del cliente |
| `phone` | `string` | Teléfono de contacto |
| `whatsapp` | `string` | URL de WhatsApp (`https://wa.me/...`) |
| `email` | `string` | Email de contacto |
| `service` | `string` | Descripción del servicio principal |
| `theme` | `'light' \| 'dark'` | Tema visual |
| `customDomain` | `boolean` | Si el cliente tiene dominio propio |
| `hero` | `object` | Configuración de la sección hero |
| `showTestimonials` | `boolean` | Mostrar testimonios (solo pro/monthly) |
| `showProcess` | `boolean` | Mostrar sección de proceso |
| `showPricing` | `boolean` | Mostrar tabla de precios |
| `showFaq` | `boolean` | Mostrar FAQ |
| `showReports` | `boolean` | Mostrar reportes (solo monthly) |
| `features` | `string[]` | Lista de características |
| `processSteps` | `object[]` | Pasos del proceso |
| `pricingTiers` | `object[]` | Planes de precios |
| `seo` | `object` | Metadata para SEO |
| `social` | `object` | Enlaces a redes sociales |

### Ejemplo mínimo:

```json
{
  "clientId": "mi-negocio-001",
  "level": "express",
  "businessName": "Mi Negocio",
  "service": "Servicios profesionales",
  "theme": "light",
  "hero": {
    "title": "Tu título aquí",
    "subtitle": "Tu subtítulo persuasivo",
    "ctaText": "Empieza ahora"
  },
  "features": [
    "Característica 1",
    "Característica 2"
  ],
  "showProcess": true,
  "showPricing": true
}
```

---

## 🎯 Niveles de servicio

### Express (Nivel 1)

**Precio:** $497 pago único  
**Características:**
- Landing page ligera (4-5 secciones)
- Hero + Features + Process + Pricing + CTA + Footer
- Sin testimonios
- Soporte 30 días
- Instalación en 72 horas

**Uso típico:** Negocios que empiezan, servicios locales simples

---

### Pro (Nivel 2)

**Precio:** $997 pago único  
**Características adicionales:**
- Todo lo de Express +
- Sección de testimonios
- Proceso extendido con más pasos
- Diseño premium personalizado
- SEO avanzado
- Soporte 90 días

**Uso típico:** Negocios establecidos que quieren destacar

---

### Monthly (Nivel 3)

**Precio:** $297/mes  
**Características adicionales:**
- Todo lo de Pro +
- Sección de reportes mensuales
- Análisis de métricas
- Optimizaciones continuas
- Actualizaciones de contenido
- Soporte prioritario 24/7

**Uso típico:** Negocios que quieren gestión continua y optimización

---

## 🔄 Flujo de trabajo por cliente

### 1. Crear configuración de nuevo cliente

```bash
# Copiar plantilla base a carpeta de clientes
cp content/base-config.json content/clients/nombre-cliente.json

# Editar la configuración del cliente
# Cambiar: clientId, businessName, service, hero, features, etc.
```

### 2. Activar configuración del cliente

```bash
# Copiar config del cliente a config activo
cp content/clients/nombre-cliente.json content/config.json
```

### 3. Probar localmente

```bash
npm run dev
# Verificar en http://localhost:3000
```

### 4. Desplegar

```bash
# Build de producción
npm run build

# Desplegar en Vercel
vercel --prod

# O usar el método de deploy que prefieras
```

### 5. Archivar proyecto anterior (opcional)

```bash
# Mover config anterior a carpeta archived
mv content/config.json content/clients-archived/cliente-anterior-YYYY-MM-DD.json
```

---

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Crear proyecto en Vercel**
   ```bash
   vercel
   ```

2. **Configurar dominio personalizado** (si `customDomain: true`)
   - Ir a Vercel Dashboard → Settings → Domains
   - Agregar dominio del cliente

3. **Variables de entorno** (si las necesitas en el futuro)
   ```bash
   vercel env add VARIABLE_NAME
   ```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Otras plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Railway
- Render
- AWS Amplify
- Cloudflare Pages
- DigitalOcean App Platform

---

## 📜 Scripts disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint

# Placeholder para CLI de clientes (futuro)
npm run new-client
```

---

## 🎨 Personalización

### Cambiar estilos globales

Editar `app/globals.css` y `tailwind.config.ts`

### Agregar nuevos componentes

1. Crear componente en `components/core/` o `components/sections/`
2. Importar en `app/page.tsx`
3. Agregar condición basada en `config`

### Agregar nuevas secciones

Ejemplo para agregar sección de FAQ:

1. Crear `components/core/FAQ.tsx`
2. Agregar datos en `content/config.json`:
   ```json
   {
     "showFaq": true,
     "faqItems": [
       {
         "question": "¿Pregunta?",
         "answer": "Respuesta"
       }
     ]
   }
   ```
3. Importar y renderizar en `app/page.tsx`

---

## 🔒 Validación de configuración

El proyecto usa **Zod** para validar que todas las configuraciones sean correctas.

Si hay errores en `config.json`, la página mostrará un mensaje de error detallado en lugar de renderizar contenido incorrecto.

### Validar manualmente

```typescript
import { validateClientConfig } from '@/lib/config-schema';

const config = { /* tu config */ };
const validConfig = validateClientConfig(config); // Lanza error si es inválido
```

---

## 🛠️ Troubleshooting

### La página no carga

1. Verificar que existe `content/config.json`
2. Validar el JSON con un linter
3. Revisar la consola del navegador para errores
4. Verificar que todos los campos requeridos estén presentes

### Error de validación de schema

Mensaje de error te indicará qué campo tiene problema. Ejemplo:

```
Error: El clientId solo puede contener letras minúsculas, números y guiones
```

### Componente no se muestra

1. Verificar el flag correspondiente (`showTestimonials`, etc.)
2. Verificar el nivel del servicio (`level`)
3. Revisar la lógica condicional en `app/page.tsx`

---

## 📚 Próximos pasos / Roadmap

- [ ] CLI para crear nuevo cliente automáticamente
- [ ] Panel de preview de configs sin deploy
- [ ] Más componentes predefinidos (FAQ, Gallery, Contact Form)
- [ ] Integración con analytics (Google Analytics, Plausible)
- [ ] Generador de OG images automático
- [ ] Sistema de A/B testing para diferentes versiones

---

## 📄 Licencia

Este proyecto es privado y de uso interno de **Digisenda**.

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crear rama desde `main`
2. Hacer cambios
3. Crear Pull Request
4. Esperar revisión

---

## 📞 Soporte

Para dudas sobre este proyecto, contactar al equipo de desarrollo de Digisenda.

---

**Hecho con ❤️ por el equipo de Digisenda**
