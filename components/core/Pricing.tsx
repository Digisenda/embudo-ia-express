import { PricingTier } from '@/lib/config-schema';

interface PricingProps {
  tiers?: PricingTier[];
  theme?: 'light' | 'dark';
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Plan Básico',
    price: '$497',
    currency: 'USD',
    period: 'pago único',
    description: 'Perfecto para empezar a generar clientes',
    features: [
      'Landing page personalizada',
      'Integración con WhatsApp',
      'Instalación en 72 horas',
      'Soporte básico por 30 días',
    ],
    highlighted: true,
    ctaText: 'Empezar ahora',
  },
];

export default function Pricing({ tiers = defaultTiers, theme = 'light' }: PricingProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Planes y precios
        </h2>
        <p
          className={`text-center text-lg mb-12 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Elige el plan que mejor se adapte a tu negocio
        </p>

        <div
          className={`grid gap-8 max-w-5xl mx-auto ${
            tiers.length === 1
              ? 'md:grid-cols-1 max-w-md'
              : tiers.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-3'
          }`}
        >
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                tier.highlighted
                  ? 'ring-4 ring-blue-500'
                  : isDark
                  ? 'bg-gray-700'
                  : 'bg-gray-50'
              }`}
            >
              {tier.highlighted && (
                <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                  ⭐ Más popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>

                {tier.description && (
                  <p
                    className={`mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {tier.description}
                  </p>
                )}

                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span
                    className={`ml-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    / {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (tier.ctaUrl) {
                      window.location.href = tier.ctaUrl;
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : isDark
                      ? 'bg-gray-600 hover:bg-gray-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
