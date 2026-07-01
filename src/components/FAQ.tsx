import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "¿Es legal asociarse a la Fundación?",
      answer: "Sí, absolutamente. Operamos bajo el amparo de la Ley Nacional 27.350 (REPROCANN) y la Ley Provincial de Chubut 790/24, que regulan y protegen la actividad de las fundaciones y clubes de cultivo para fines medicinales."
    },
    {
      question: "¿Qué necesito para asociarme?",
      answer: "Necesitás ser mayor de 18 años, contar con DNI argentino y tener una indicación médica para el uso de cannabis. Si no tenés médico tratante, nuestro equipo puede realizar la evaluación inicial y gestionar tu inscripción en REPROCANN."
    },
    {
      question: "¿Cómo funciona el Carnet QR?",
      answer: "Al asociarte, recibís una credencial digital con un código QR único. Ante cualquier control de las fuerzas de seguridad, el escaneo del QR redirige a un portal seguro que valida tu identidad, tu vinculación a la Fundación y tus límites legales de transporte."
    },
    {
      question: "¿Qué productos dispensan?",
      answer: "Dispensamos flores secas estandarizadas y aceites/extractos de espectro completo (Full Spectrum), producidos en nuestro laboratorio bajo normas de bioseguridad, con perfiles de cannabinoides (CBD/THC) específicos para cada patología."
    },
    {
      question: "¿Puedo retirar si no vivo en Comodoro Rivadavia?",
      answer: "Sí, la ley permite el transporte en todo el territorio nacional. Además, realizamos envíos seguros a toda la provincia de Chubut y el resto del país, siempre que el paciente cuente con su REPROCANN vigente y vinculado a la Fundación."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Preguntas <span className="text-bio-green">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Resolvemos tus dudas sobre el marco legal, los tratamientos y el funcionamiento de la Fundación.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-bio-green shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
