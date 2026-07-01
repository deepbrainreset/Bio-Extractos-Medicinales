import { motion } from 'motion/react';
import { Stethoscope, Activity, FileCheck } from 'lucide-react';

export default function MedicalTracking() {
  return (
    <section className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <img 
                src="https://picsum.photos/seed/medical-consultation/800/800" 
                alt="Seguimiento médico profesional y tratamiento de cannabis medicinal en Comodoro Rivadavia" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Seguimiento Médico <span className="text-bio-green">Especializado</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              No solo dispensamos; acompañamos. Nuestro equipo de profesionales de la salud diseña y monitorea tu tratamiento para asegurar la máxima eficacia y seguridad.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Stethoscope className="w-6 h-6 text-bio-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Consulta Inicial y Dosificación</h3>
                  <p className="text-gray-400">Evaluación del cuadro clínico y prescripción de la cepa, ratio CBD/THC y vía de administración adecuada.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Activity className="w-6 h-6 text-bio-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Monitoreo de Evolución</h3>
                  <p className="text-gray-400">Controles periódicos para ajustar dosis, evaluar tolerancia y documentar mejoras en la historia clínica.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FileCheck className="w-6 h-6 text-bio-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Historia Clínica Legal</h3>
                  <p className="text-gray-400">Documentación respaldatoria fundamental para mantener el estatus en REPROCANN y proteger al paciente.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
