import { z } from 'zod';

/**
 * Esquema de configuración para clientes de Embudo IA Express
 * Define todos los niveles: express, pro, monthly
 */

// Niveles de servicio disponibles
export const ServiceLevel = z.enum(['express', 'pro', 'monthly']);
export type ServiceLevel = z.infer<typeof ServiceLevel>;

// Tipos de tabla de precios
export const PricingTableType = z.enum([
  'basic-only',
  'basic-premium',
  'three-tiers',
  'custom',
]);
export type PricingTableType = z.infer<typeof PricingTableType>;

// Temas disponibles
export const Theme = z.enum(['light', 'dark']);
export type Theme = z.infer<typeof Theme>;

// Configuración de Hero
export const HeroConfigSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  subtitle: z.string().min(10, 'El subtítulo debe tener al menos 10 caracteres'),
  ctaText: z.string().min(3, 'El texto del CTA debe tener al menos 3 caracteres'),
  ctaUrl: z.string().url().optional(),
  backgroundImage: z.string().url().optional(),
});
export type HeroConfig = z.infer<typeof HeroConfigSchema>;

// Configuración de características/features
export const FeatureSchema = z.string().min(5);

// Configuración de proceso/steps
export const ProcessStepSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(3),
  description: z.string().min(10),
  icon: z.string().optional(),
});
export type ProcessStep = z.infer<typeof ProcessStepSchema>;

// Configuración de precios individual
export const PricingTierSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1),
  currency: z.string().default('USD'),
  period: z.string().default('mes'),
  description: z.string().optional(),
  features: z.array(z.string()),
  highlighted: z.boolean().default(false),
  ctaText: z.string().default('Contratar'),
  ctaUrl: z.string().url().optional(),
});
export type PricingTier = z.infer<typeof PricingTierSchema>;

// Configuración completa del cliente
export const ClientConfigSchema = z.object({
  // Identificación del cliente
  clientId: z
    .string()
    .min(3, 'El clientId debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El clientId solo puede contener letras minúsculas, números y guiones'),
  
  deployUrl: z
    .string()
    .url('La URL de deploy debe ser válida')
    .optional()
    .describe('URL donde se desplegará este proyecto'),

  // Nivel de servicio
  level: ServiceLevel.describe('Nivel del servicio: express, pro o monthly'),

  // Información del negocio
  businessName: z
    .string()
    .min(2, 'El nombre del negocio debe tener al menos 2 caracteres'),
  
  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .optional(),
  
  whatsapp: z
    .string()
    .url('La URL de WhatsApp debe ser válida')
    .optional(),
  
  email: z
    .string()
    .email('El email debe ser válido')
    .optional(),
  
  service: z
    .string()
    .min(5, 'La descripción del servicio debe tener al menos 5 caracteres'),

  // Configuración visual
  theme: Theme.default('light').describe('Tema visual: light o dark'),
  
  customDomain: z
    .boolean()
    .default(false)
    .describe('Si el cliente tiene dominio personalizado'),
  
  logo: z
    .string()
    .url()
    .optional()
    .describe('URL del logo del cliente'),

  // Secciones del Hero
  hero: HeroConfigSchema,

  // Flags de visibilidad de secciones
  showTestimonials: z
    .boolean()
    .default(false)
    .describe('Mostrar sección de testimonios (nivel pro+)'),
  
  showProcess: z
    .boolean()
    .default(true)
    .describe('Mostrar sección de proceso'),
  
  showPricing: z
    .boolean()
    .default(true)
    .describe('Mostrar sección de precios'),
  
  showFaq: z
    .boolean()
    .default(false)
    .describe('Mostrar sección de FAQ'),
  
  showReports: z
    .boolean()
    .default(false)
    .describe('Mostrar sección de reportes (solo monthly)'),

  // Contenido de secciones
  features: z
    .array(FeatureSchema)
    .min(1, 'Debe haber al menos una característica')
    .max(10, 'Máximo 10 características')
    .describe('Lista de características principales del servicio'),
  
  processSteps: z
    .array(ProcessStepSchema)
    .optional()
    .describe('Pasos del proceso (opcional para nivel express)'),

  // Configuración de precios
  pricingTable: PricingTableType.default('basic-only').describe('Tipo de tabla de precios'),
  
  pricingTiers: z
    .array(PricingTierSchema)
    .optional()
    .describe('Planes de precios personalizados'),

  // Metadata SEO
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      ogImage: z.string().url().optional(),
    })
    .optional()
    .describe('Configuración de SEO'),

  // Redes sociales
  social: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    })
    .optional()
    .describe('Enlaces a redes sociales'),
});

export type ClientConfig = z.infer<typeof ClientConfigSchema>;

/**
 * Valida una configuración de cliente
 */
export function validateClientConfig(data: unknown): ClientConfig {
  return ClientConfigSchema.parse(data);
}

/**
 * Valida una configuración de cliente sin lanzar errores
 */
export function safeValidateClientConfig(
  data: unknown
): { success: true; data: ClientConfig } | { success: false; error: z.ZodError } {
  const result = ClientConfigSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, error: result.error };
}
