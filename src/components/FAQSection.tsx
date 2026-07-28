import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, FileText, Stethoscope } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿La Asociación Civil es un dispensario, tienda o e-commerce de cannabis?",
      answer: "No, en absoluto. La Asociación Civil Bio Extractos Medicinales es una entidad de salud y bien público sin fines de lucro enmarcada en la Ley 27.350 y Ley Chubut 790/24. No comercializamos, vendemos ni distribuimos productos como e-commerce o catálogo. Tampoco vinculamos cuotas sociales con gramos o volúmenes."
    },
    {
      question: "¿Puedo abonar la cuota social al momento de enviar el formulario?",
      answer: "No. Por disposición reglamentaria de nuestra Comisión Directiva y en estricto cumplimiento normativo, el cobro de la cuota social se habilita ÚNICAMENTE una vez que la solicitud de admisión haya sido revisada, evaluada y formalmente aprobada en acta directiva."
    },
    {
      question: "¿La Asociación aprueba, emite o acelera el trámite de REPROCANN?",
      answer: "No. El REPROCANN es un registro público oficial del Ministerio de Salud de la Nación Argentina. La Asociación no aprueba, reemplaza ni acelera decisiones gubernamentales. Brindamos orientación técnica e informativa a nuestros socios para que completen el trámite junto a su médico tratante."
    },
    {
      question: "¿Qué ocurre si no cuento con una orden médica para uso de cannabis?",
      answer: "Para solicitar la adhesión como socio adherente es requisito indispensable contar con una indicación médica emitida por un profesional matriculado en Argentina. Si aún no contás con profesional o indicación, nuestro equipo te brindará orientación sobre profesionales capacitados en endocannabinología."
    },
    {
      question: "¿Cómo se resguardan mis datos personales y diagnósticos médicos?",
      answer: "Toda la información personal, copias de DNI e historial o indicación médica que ingresás en el sitio se tratan bajo la estricta confidencialidad regulada por la Ley Nacional 25.326 de Protección de Datos Personales. Tus datos no se comparten con terceros no autorizados."
    },
    {
      question: "¿Cuál es el marco legal que respalda las actividades de la entidad en Chubut?",
      answer: "Operamos bajo el amparo de la Ley Nacional 27.350 (Investigación Médica y Científica del Cannabis), su Decreto Reglamentario 883/2020 y la Ley Provincial de Chubut VII N° 790/24, que regula la producción asociativa y el acceso seguro para pacientes."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
            Dudas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">
            Preguntas Frecuentes e Información Clara
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Respuestas institucionales sobre el proceso de adhesión, marco normativo y derechos del socio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-900 border border-emerald-900/40 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
