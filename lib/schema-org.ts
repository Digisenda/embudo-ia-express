import { ClientConfig } from './config-schema';

/**
 * Tipos de Schema.org para SEO
 */
export interface SchemaOrgOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: string;
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: 'customer service';
    email?: string;
  };
  sameAs?: string[];
}

export interface SchemaOrgWebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url?: string;
  description?: string;
}

export interface SchemaOrgService {
  '@context': 'https://schema.org';
  '@type': 'Service';
  serviceType: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed?: string;
  description?: string;
}

/**
 * Genera el Schema.org para Organization
 */
export function generateOrganizationSchema(config: ClientConfig): SchemaOrgOrganization {
  const socialLinks: string[] = [];
  
  if (config.social) {
    if (config.social.facebook) socialLinks.push(config.social.facebook);
    if (config.social.instagram) socialLinks.push(config.social.instagram);
    if (config.social.twitter) socialLinks.push(config.social.twitter);
    if (config.social.linkedin) socialLinks.push(config.social.linkedin);
  }

  const schema: SchemaOrgOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.businessName,
  };

  if (config.deployUrl) {
    schema.url = config.deployUrl;
  }

  if (config.logo) {
    schema.logo = config.logo;
  }

  if (config.phone || config.email) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
    };

    if (config.phone) {
      schema.contactPoint.telephone = config.phone;
    }

    if (config.email) {
      schema.contactPoint.email = config.email;
    }
  }

  if (socialLinks.length > 0) {
    schema.sameAs = socialLinks;
  }

  return schema;
}

/**
 * Genera el Schema.org para WebSite
 */
export function generateWebSiteSchema(config: ClientConfig): SchemaOrgWebSite {
  const schema: SchemaOrgWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.seo?.title || `${config.businessName} - ${config.service}`,
  };

  if (config.deployUrl) {
    schema.url = config.deployUrl;
  }

  if (config.seo?.description) {
    schema.description = config.seo.description;
  }

  return schema;
}

/**
 * Genera el Schema.org para Service
 */
export function generateServiceSchema(config: ClientConfig): SchemaOrgService {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: config.service,
    provider: {
      '@type': 'Organization',
      name: config.businessName,
    },
    description: config.hero.subtitle,
  };
}

/**
 * Genera todos los schemas recomendados para una página
 */
export function generateAllSchemas(config: ClientConfig) {
  return {
    organization: generateOrganizationSchema(config),
    website: generateWebSiteSchema(config),
    service: generateServiceSchema(config),
  };
}

/**
 * Convierte los schemas a JSON-LD para insertar en <head>
 */
export function schemasToJsonLd(config: ClientConfig): string {
  const schemas = generateAllSchemas(config);
  
  return JSON.stringify([
    schemas.organization,
    schemas.website,
    schemas.service,
  ]);
}
