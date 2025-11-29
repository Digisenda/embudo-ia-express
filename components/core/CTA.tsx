interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  whatsapp?: string;
  theme?: 'light' | 'dark';
}

export default function CTA({
  title = '¿Listo para conseguir más clientes?',
  subtitle = 'Empieza hoy mismo y transforma tu negocio',
  buttonText = 'Quiero empezar ahora',
  buttonUrl,
  whatsapp,
  theme = 'light',
}: CTAProps) {
  const isDark = theme === 'dark';

  const handleClick = () => {
    if (buttonUrl) {
      window.location.href = buttonUrl;
    } else if (whatsapp) {
      window.location.href = whatsapp;
    }
  };

  return (
    <section
      className={`py-20 ${
        isDark
          ? 'bg-gradient-to-r from-blue-900 to-indigo-900'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <button
          onClick={handleClick}
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
