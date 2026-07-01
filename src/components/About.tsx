import { motion } from 'motion/react';
import { Microscope, Sprout, ShieldCheck } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-bio-green" />,
      title: "Cultivo Indoor Tecnificado",
      description: "Instalaciones de última generación en Comodoro Rivadavia, garantizando condiciones óptimas y estandarizadas para cada cepa."
    },
    {
      icon: <Microscope className="w-8 h-8 text-bio-green" />,
      title: "Laboratorio de Extracción",
      description: "Procesos de extracción de grado médico para asegurar la pureza, concentración y trazabilidad de nuestros aceites y resinas."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-bio-green" />,
      title: "Bioseguridad Estricta",
      description: "Protocolos rigurosos de higiene y control de calidad en cada etapa, desde la semilla hasta el producto final dispensado."
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Excelencia Médica en <span className="text-bio-green">Chubut</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              En la Fundación Bio Extractos Medicinales, nos dedicamos a proveer acceso seguro, legal y de alta calidad a terapias basadas en cannabis. Nuestro compromiso es mejorar la calidad de vida de nuestros socios a través de productos estandarizados y un acompañamiento profesional continuo.
            </p>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative">
              <img 
                src="https://picsum.photos/seed/indoor-grow/800/1000" 
                alt="Instalaciones de cultivo indoor tecnificado de cannabis medicinal en Chubut" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <p className="text-white font-medium text-lg mb-1">Calidad Farmacéutica</p>
                  <p className="text-bio-green-light text-sm">Control total de variables ambientales</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
