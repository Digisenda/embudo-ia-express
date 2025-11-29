'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/core/Hero';
import Features from '@/components/core/Features';
import Process from '@/components/core/Process';
import Pricing from '@/components/core/Pricing';
import Testimonials from '@/components/core/Testimonials';
import CTA from '@/components/core/CTA';
import Footer from '@/components/core/Footer';
import type { ClientConfig } from '@/lib/config-schema';

export default function HomePage() {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar configuración desde el API route
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setConfig(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError('Error al cargar la configuración');
        console.error(err);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error de configuración
          </h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Asegúrate de que existe un archivo <code>content/config.json</code>{' '}
            válido.
          </p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  // Determinar qué secciones mostrar según el nivel y configuración
  const showTestimonials =
    config.showTestimonials && (config.level === 'pro' || config.level === 'monthly');
  
  const showReports = config.showReports && config.level === 'monthly';

  return (
    <main>
      {/* Hero - Siempre se muestra */}
      <Hero
        config={config.hero}
        businessName={config.businessName}
        whatsapp={config.whatsapp}
        theme={config.theme}
      />

      {/* Features - Siempre se muestran */}
      <Features features={config.features} theme={config.theme} />

      {/* Process - Según configuración */}
      {config.showProcess && (
        <Process steps={config.processSteps} theme={config.theme} />
      )}

      {/* Pricing - Según configuración */}
      {config.showPricing && (
        <Pricing tiers={config.pricingTiers} theme={config.theme} />
      )}

      {/* Testimonials - Solo en pro y monthly si está activado */}
      {showTestimonials && (
        <div id="testimonials">
          {/* Componente de testimonials se carga dinámicamente */}
          <TestimonialsSection theme={config.theme} />
        </div>
      )}

      {/* Reports Section - Solo en monthly */}
      {showReports && (
        <section className={`py-20 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Reportes mensuales
            </h2>
            <p className={`text-lg mb-8 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Recibe análisis detallados del rendimiento de tu embudo cada mes
            </p>
            <div className="max-w-2xl mx-auto text-left">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Métricas de conversión detalladas</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Análisis de fuentes de tráfico</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Recomendaciones de optimización</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA - Siempre se muestra */}
      <CTA
        buttonUrl={config.hero.ctaUrl}
        whatsapp={config.whatsapp}
        theme={config.theme}
      />

      {/* Footer - Siempre se muestra */}
      <Footer
        businessName={config.businessName}
        phone={config.phone}
        email={config.email}
        whatsapp={config.whatsapp}
        social={config.social}
        theme={config.theme}
      />
    </main>
  );
}

// Componente auxiliar para cargar testimonios
function TestimonialsSection({ theme }: { theme: 'light' | 'dark' }) {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.testimonials) {
          setTestimonials(data.data.testimonials);
        }
      })
      .catch((err) => {
        console.error('Error cargando testimonios:', err);
      });
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  return <Testimonials testimonials={testimonials} theme={theme} />;
}
