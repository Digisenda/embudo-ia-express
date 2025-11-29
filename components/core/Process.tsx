import { ProcessStep } from '@/lib/config-schema';

interface ProcessProps {
  steps?: ProcessStep[];
  theme?: 'light' | 'dark';
}

const defaultSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Contacto inicial',
    description: 'Nos ponemos en contacto contigo para entender tus necesidades',
  },
  {
    number: 2,
    title: 'Configuración',
    description: 'Personalizamos el sistema según tu negocio',
  },
  {
    number: 3,
    title: 'Lanzamiento',
    description: 'Activamos tu embudo y comienzas a recibir clientes',
  },
];

export default function Process({ steps = defaultSteps, theme = 'light' }: ProcessProps) {
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Cómo funciona
        </h2>
        <p
          className={`text-center text-lg mb-12 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Un proceso simple y efectivo
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Línea conectora (solo en desktop) */}
            <div
              className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 ${
                isDark ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              style={{ transform: 'translateX(-50%)' }}
            />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Contenido */}
                  <div className="md:w-5/12 w-full">
                    <div
                      className={`p-6 rounded-lg shadow-lg ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p
                        className={isDark ? 'text-gray-300' : 'text-gray-600'}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Número central */}
                  <div className="md:w-2/12 w-full flex justify-center my-4 md:my-0">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      {step.number}
                    </div>
                  </div>

                  {/* Espacio vacío del otro lado */}
                  <div className="md:w-5/12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
