import type { Metadata } from 'next';
import './globals.css';
import { getClientConfig } from '@/lib/config';
import { schemasToJsonLd } from '@/lib/schema-org';

// Generar metadata dinámica basada en la configuración
export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = getClientConfig();
    
    const title = config.seo?.title || `${config.businessName} - ${config.service}`;
    const description = config.seo?.description || config.hero.subtitle;
    const keywords = config.seo?.keywords?.join(', ') || '';

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: config.deployUrl,
        siteName: config.businessName,
        images: config.seo?.ogImage ? [{ url: config.seo.ogImage }] : [],
        locale: 'es_ES',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: config.seo?.ogImage ? [config.seo.ogImage] : [],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generando metadata:', error);
    
    return {
      title: 'Embudo IA Express',
      description: 'Sistema automático de generación de clientes',
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme = 'light';
  let jsonLd = '[]';

  try {
    const config = getClientConfig();
    theme = config.theme || 'light';
    jsonLd = schemasToJsonLd(config);
  } catch (error) {
    console.error('Error cargando configuración en layout:', error);
  }

  return (
    <html lang="es" className={theme}>
      <head>
        {/* Schema.org JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
