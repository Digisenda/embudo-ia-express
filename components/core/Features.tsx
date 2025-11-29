interface FeaturesProps {
  features: string[];
  theme?: 'light' | 'dark';
}

export default function Features({ features, theme = 'light' }: FeaturesProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icono de checkmark */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-500"
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
                </div>

                <p className="text-lg">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
