import React from 'react';
import { UserPlus, FileSearch, CheckCircle, CreditCard, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

interface AdmissionProcessProps {
  onOpenApplicationModal: () => void;
  onOpenTrackingModal: () => void;
}

export default function AdmissionProcess({ onOpenApplicationModal, onOpenTrackingModal }: AdmissionProcessProps) {
  const steps = [
    {
      num: "01",
      icon: UserPlus,
      title: "Solicitud Digital de Adhesión",
      desc: "Completás el formulario digital declarando tus datos personales, domicilio en Argentina, adjuntando foto de tu DNI e indicación médica de un profesional matriculado.",
      details: ["Declaración jurada de datos", "Carga segura de DNI e indicación médica", "Generación de código de seguimiento único"]
    },
    {
      num: "02",
      icon: FileSearch,
      title: "Evaluación Directiva y Médica",
      desc: "La Comisión Directiva y el equipo asesor revisan la documentación presentada para verificar el cumplimiento de los criterios de admisión y la normativa de salud vigente.",
      details: ["Verificación de indicación médica", "Validación de estatus REPROCANN", "Criterios asociativos de la Ley 27.350"]
    },
    {
      num: "03",
      icon: CheckCircle,
      title: "Dictamen y Notificación Oficial",
      desc: "Una vez tratada tu solicitud en acta de la Comisión Directiva, recibirás la resolución formal por correo electrónico y mediante el sistema de consulta web.",
      details: ["Notificación formal por correo", "Alta en el libro de socios adherentes", "Disposición de credencial asociativa"]
    },
    {
      num: "04",
      icon: CreditCard,
      title: "Habilitación de Cuota Social",
      desc: "ÚNICAMENTE una vez aprobada la adhesión, el sistema habilitará el enlace seguro para el abono de la cuota social mensual de sostenimiento asociativo.",
      details: ["Pago habilitado SÓLO tras aprobación", "Cobro digital transparente (Mercado Pago / Transferencia)", "Sin vinculación con gramos ni compra de productos"]
    }
  ];

  return (
    <section id="admision" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
            Proceso Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">
            ¿Cómo funciona la admisión de socios adherentes?
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Un trámite 100% digital, transparente y seguro. Seguimiento en tiempo real con resguardo estricto de tu privacidad.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/90 border border-emerald-900/40 rounded-3xl p-6 relative flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  <ul className="space-y-1.5 pt-3 border-t border-white/10">
                    {step.details.map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {idx === 3 && (
                  <div className="mt-4 p-2.5 bg-emerald-950/90 border border-emerald-600/40 rounded-xl text-[10px] text-emerald-200 font-semibold text-center">
                    🔒 Cobro habilitado SÓLO tras aprobación
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callouts */}
        <div className="bg-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              <ShieldCheck className="w-4 h-4" /> Solicitud Sujeta a Evaluación
            </div>
            <h4 className="text-xl font-bold text-white">
              ¿Listo para iniciar tu solicitud de adhesión?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              El proceso toma menos de 5 minutos. Ten a mano tu DNI y tu indicación médica (si contás con ella) o solicitá orientación inicial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenApplicationModal}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Iniciar Formulario Digital
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTrackingModal}
              className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-gray-600 px-5 py-3 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              Consultar Mi Código
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
