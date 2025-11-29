import fs from 'fs';
import path from 'path';
import { ClientConfig, validateClientConfig, safeValidateClientConfig } from './config-schema';

/**
 * Ruta al archivo de configuración activo
 */
const CONFIG_PATH = path.join(process.cwd(), 'content', 'config.json');

/**
 * Ruta al archivo de configuración base
 */
const BASE_CONFIG_PATH = path.join(process.cwd(), 'content', 'base-config.json');

/**
 * Obtiene la configuración del cliente actual
 * Lee desde content/config.json
 * 
 * @throws Error si el archivo no existe o no es válido
 */
export function getClientConfig(): ClientConfig {
  try {
    const configFile = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const configData = JSON.parse(configFile);
    return validateClientConfig(configData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al cargar la configuración: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Obtiene la configuración del cliente de forma segura
 * No lanza errores, retorna un objeto con success/error
 */
export function safeGetClientConfig():
  | { success: true; data: ClientConfig }
  | { success: false; error: string } {
  try {
    const configFile = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const configData = JSON.parse(configFile);
    const result = safeValidateClientConfig(configData);
    
    if (result.success) {
      return result;
    }
    
    return {
      success: false,
      error: `Errores de validación: ${result.error.errors.map(e => e.message).join(', ')}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'Error desconocido al cargar configuración',
    };
  }
}

/**
 * Obtiene la configuración base (plantilla)
 */
export function getBaseConfig(): ClientConfig {
  try {
    const configFile = fs.readFileSync(BASE_CONFIG_PATH, 'utf-8');
    const configData = JSON.parse(configFile);
    return validateClientConfig(configData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al cargar la configuración base: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Obtiene la configuración de un cliente específico desde /content/clients
 */
export function getClientConfigById(clientId: string): ClientConfig {
  const clientConfigPath = path.join(
    process.cwd(),
    'content',
    'clients',
    `${clientId}.json`
  );
  
  try {
    const configFile = fs.readFileSync(clientConfigPath, 'utf-8');
    const configData = JSON.parse(configFile);
    return validateClientConfig(configData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al cargar configuración del cliente ${clientId}: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Lista todos los clientes disponibles en /content/clients
 */
export function listClientConfigs(): string[] {
  const clientsDir = path.join(process.cwd(), 'content', 'clients');
  
  try {
    const files = fs.readdirSync(clientsDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch {
    return [];
  }
}

/**
 * Verifica si existe una configuración activa
 */
export function hasActiveConfig(): boolean {
  return fs.existsSync(CONFIG_PATH);
}

/**
 * Determina qué secciones deben mostrarse según el nivel del servicio
 */
export function getSectionVisibility(config: ClientConfig) {
  const { level, showTestimonials, showProcess, showPricing, showFaq, showReports } = config;
  
  return {
    // Hero siempre se muestra
    hero: true,
    
    // Features siempre se muestran
    features: true,
    
    // Proceso según flag y nivel
    process: showProcess,
    
    // Precios según flag
    pricing: showPricing,
    
    // Testimonios solo en pro y monthly
    testimonials: showTestimonials && (level === 'pro' || level === 'monthly'),
    
    // FAQ según flag
    faq: showFaq,
    
    // Reportes solo en monthly
    reports: showReports && level === 'monthly',
    
    // CTA siempre se muestra
    cta: true,
    
    // Footer siempre se muestra
    footer: true,
  };
}
