import React from 'react';
import { Shield, Building2, MapPin, Award, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function AboutAssociation() {
  return (
    <section id="asociacion" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Image & Official Identifiers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
              <img 
                src="https://res.cloudinary.com/dw4k14vmn/image/upload/v1784514650/Imagen_generada_1_2_zbzmgd.png" 
                alt="Instalaciones e investigación asociativa de Bio Extractos Medicinales en Chubut" 
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-400 block mb-1">
                  Comodoro Rivadavia • Chubut
                </span>
                <p className="text-xs text-gray-300">
                  Desarrollo de proyectos asociativos orientados a la salud, la investigación científica y la estandarización fitoterapéutica.
                </p>
              </div>
            </div>

            {/* Config Central - Legal Placeholders Card */}
            <div className="bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-5 text-xs text-gray-300 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm pb-2 border-b border-white/10">
                <Building2 className="w-4 h-4" />
                Datos de Registro Institucional
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Entidad:</span>
                <span className="font-semibold text-white">{ORGANIZATION_CONFIG.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Tipo Jurídico:</span>
                <span className="text-emerald-300">{ORGANIZATION_CONFIG.legalType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">CUIT:</span>
                <span className="font-mono text-gray-200">{ORGANIZATION_CONFIG.cuit}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Matrícula Personería:</span>
                <span className="font-mono text-gray-200">{ORGANIZATION_CONFIG.matricula}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Domicilio Legal:</span>
                <span className="text-right text-gray-200">{ORGANIZATION_CONFIG.domicilioLegal}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Text & Institutional Governance */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
                La Asociación Civil
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white leading-tight">
                Investigación, salud y contención social para pacientes en Chubut
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed text-base">
              La <strong className="text-white">{ORGANIZATION_CONFIG.name}</strong> es una institución sin fines de lucro constituida para garantizar a sus socios adherentes un ámbito de acompañamiento integral, asesoramiento legal y articulación médico-paciente para el uso terapéutico del cannabis y sus derivados.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm">
              Operamos en estricta conformidad con el marco regulatorio nacional y provincial, promoviendo el cultivo colectivo amparado en la ley, el control de calidad, el seguimiento de la respuesta clínica y el respeto irrestricto por los derechos del usuario de salud.
            </p>

            {/* List of Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-emerald-900/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Carácter No Comercial</h4>
                  <p className="text-xs text-gray-400">No comercializamos ni comercializaremos cannabis ni derivados. La cuota financia el objeto social.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-emerald-900/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Comisión Directiva</h4>
                  <p className="text-xs text-gray-400">Órgano colegiado de gestión, responsable de la revisión y aprobación de las solicitudes de adhesión.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-emerald-900/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Acompañamiento Médico</h4>
                  <p className="text-xs text-gray-400">Articulación constante con profesionales de la salud capacitados en fitoterapéuticos y endocannabinología.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-emerald-900/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Resguardo Legal</h4>
                  <p className="text-xs text-gray-400">Protección y orientación legal permanente ante traslados o tenencia en territorio provincial y nacional.</p>
                </div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 text-xs text-emerald-200/90 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {ORGANIZATION_CONFIG.disclaimers.nonCommercial}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
