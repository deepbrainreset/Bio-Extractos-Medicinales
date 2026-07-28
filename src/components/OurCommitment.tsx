import React from 'react';
import { HeartHandshake, ShieldCheck, FileText, Stethoscope, Scale } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function OurCommitment() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: "Acompañamiento Responsable",
      desc: "Brindamos contención humana e información clara durante la vinculación asociativa y el seguimiento del paciente."
    },
    {
      icon: ShieldCheck,
      title: "Confidencialidad y Privacidad",
      desc: "Tratamiento y protección rigurosa de datos personales y sensibles amparados en la Ley Nacional 25.326 de Habeas Data."
    },
    {
      icon: FileText,
      title: "Transparencia Institucional",
      desc: "Gestión bajo personería jurídica de asociación civil, actas de Comisión Directiva y rendición asociativa permanente."
    },
    {
      icon: Stethoscope,
      title: "Respeto por la Indicación Médica",
      desc: "Toda participación requiere orden e indicación médica emitida por profesional de la salud matriculado en Argentina."
    },
    {
      icon: Scale,
      title: "Cumplimiento de la Normativa Vigente",
      desc: "Actuación enmarcada en la Ley 27.350, Ley Provincial de Chubut 790/24 y decretos reglamentarios correspondientes."
    }
  ];

  return (
    <section className="py-16 bg-slate-950 border-y border-emerald-900/30 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800/50">
            Valores de Gestión
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">
            Nuestro Compromiso Institucional
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Fundamentamos nuestro trabajo diario en la ética asociativa, el rigor científico y el respeto irrestricto al marco regulatorio argentino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/70 border border-emerald-900/30 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                  Pilar 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
