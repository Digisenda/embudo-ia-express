import { HeroConfig } from '@/lib/config-schema';

interface HeroProps {
  config: HeroConfig;
  businessName: string;
  whatsapp?: string;
  theme?: 'light' | 'dark';
}

export default function Hero({ config, businessName, whatsapp, theme = 'light' }: HeroProps) {
  const isDark = theme === 'dark';
  
  const handleCTA = () => {
    if (config.ctaUrl) {
      window.location.href = config.ctaUrl;
    } else if (whatsapp) {
      window.location.href = whatsapp;
    }
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
      style={
        config.backgroundImage
          ? {
              backgroundImage: `url(${config.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay si hay imagen de fondo */}
      {config.backgroundImage && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark || config.backgroundImage ? 'text-white' : 'text-gray-900'
          }`}
        >
          {config.title}
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            isDark || config.backgroundImage ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {config.subtitle}
        </p>

        <button
          onClick={handleCTA}
          className={`px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {config.ctaText}
        </button>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className={`w-6 h-6 ${isDark || config.backgroundImage ? 'text-white' : 'text-gray-600'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
