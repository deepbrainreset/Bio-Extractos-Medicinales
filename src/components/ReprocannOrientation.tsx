import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  AlertTriangle, 
  UserCheck, 
  Lock, 
  ShieldAlert, 
  Building2,
  Stethoscope,
  FolderCheck,
  Globe,
  FileCheck2,
  ClipboardList,
  Send
} from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function ReprocannOrientation() {
  // Visual Process - 6 Steps
  const processSteps = [
    {
      stepNumber: 1,
      title: "Consultá a un profesional de salud habilitado",
      description: "Realizá la consulta con un profesional médico matriculado que evalúe tu cuadro de salud y determine la indicación del tratamiento con cannabis medicinal conforme a la normativa vigente.",
      icon: Stethoscope
    },
    {
      stepNumber: 2,
      title: "Reuní la documentación que corresponda",
      description: "Contá con la orden o indicación médica, la historia clínica respaldatoria y la Declaración Jurada con Consentimiento Informado suscrito por el profesional de la salud.",
      icon: FolderCheck
    },
    {
      stepNumber: 3,
      title: "Iniciá o verificá tu trámite oficial en Mi Argentina / REPROCANN",
      description: "Ingresá al portal oficial del Ministerio de Salud de la Nación utilizando tu perfil digital verificado en la plataforma gubernamental Mi Argentina para registrar tu solicitud.",
      icon: Globe
    },
    {
      stepNumber: 4,
      title: "Presentá tu solicitud de socio adherente",
      description: "Completá el formulario digital de solicitud de ingreso en la Asociación Civil Bio Extractos Medicinales indicando tu situación documental y adjuntando los requisitos personales.",
      icon: ClipboardList
    },
    {
      stepNumber: 5,
      title: "La asociación evalúa la documentación y la Comisión Directiva resuelve la solicitud",
      description: "El órgano directivo verifica formalmente la documentación respaldatoria en sus sesiones ordinarias y emite el Acta de admisión correspondiente según los estatutos asociativos.",
      icon: FileCheck2
    },
    {
      stepNumber: 6,
      title: "Si corresponde, el equipo autorizado informa los pasos siguientes",
      description: "Una vez aprobada la admisión por Comisión Directiva, la Secretaría notifica en forma confidencial la resolución y coordina los aspectos administrativos y asociativos vigentes.",
      icon: Send
    }
  ];

  return (
    <section id="reprocann" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-emerald-950">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-950/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/80 inline-flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Orientación Institucional y Transparencia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 text-white leading-tight">
            Orientación para el trámite oficial REPROCANN
          </h2>
          <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Información objetiva, clara y prudente sobre el marco regulatorio del Registro del Programa de Cannabis (REPROCANN) del Ministerio de Salud de la Nación Argentina.
          </p>
        </div>

        {/* Informative Explanation Cards - Simple Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          
          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 shadow-lg hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                ¿Qué es el REPROCANN?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                REPROCANN es el <strong className="text-white">Registro del Programa de Cannabis</strong> creado en el ámbito del Ministerio de Salud de la Nación para autorizar el cultivo y tratamiento con fines medicinales, terapéuticos y de investigación conforme a la Ley Nacional N° 27.350 y su Decreto Reglamentario 883/2020.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
              Programa Oficial de Salud de la Nación
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 shadow-lg hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Validación de Identidad Digital
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                La inscripción oficial en el programa gubernamental requiere de manera indispensable la <strong className="text-white">validación de identidad a través de la plataforma digital Mi Argentina</strong> (nivel de seguridad validado), garantizando la titularidad del trámite sanitario ante la autoridad competente.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
              Autenticación Oficial en Mi Argentina
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 shadow-lg hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Requisitos Clínicos y Sanitarios
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                El trámite oficial requiere contar obligatoriamente con <strong className="text-white">indicación médica</strong> de un profesional de la salud matriculado, el respectivo <strong className="text-white">consentimiento informado</strong> firmado y el estricto cumplimiento de las exigencias que determine la autoridad competente.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
              Prescripción Médica Matriculada
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 shadow-lg hover:border-emerald-700/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Alcance Institucional de la Asociación
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {ORGANIZATION_CONFIG.name} brinda <strong className="text-white">orientación administrativa dentro de sus facultades</strong> asociativas. No podemos garantizar la aprobación del trámite ni reemplazar al profesional de la salud ni a la autoridad de aplicación del Ministerio de Salud.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
              Asistencia Técnica y Acompañamiento
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 shadow-lg hover:border-emerald-700/60 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Vinculación con Personas Jurídicas Autorizadas
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Una persona registrada o en proceso de registro puede <strong className="text-white">vincularse, cuando corresponda y conforme a la normativa legal vigente</strong>, con una persona jurídica permitida (organización civil autorizada) para la representación asociativa del cultivo o abastecimiento terapéutico en los términos del marco legal argentino (Ley 27.350 y Ley Chubut 790/24).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium flex items-center justify-between">
              <span>Marco Jurídico Ley Nacional N° 27.350 • Ley Provincial N° 790/24</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

        </div>

        {/* Mandatory Warnings Block */}
        <div className="bg-amber-950/60 border border-amber-500/50 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/80 border border-amber-500 flex items-center justify-center text-amber-300 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-amber-200">
                Advertencias Importantes y Recomendaciones de Seguridad
              </h3>
              
              <ul className="space-y-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>
                    <strong className="text-amber-200">Gratuidad del trámite estatal:</strong> La inscripción en REPROCANN no tiene costo por parte del Ministerio de Salud.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>
                    <strong className="text-amber-200">Carácter de la información:</strong> La información publicada tiene carácter orientativo y puede modificarse conforme a la normativa vigente.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>
                    <strong className="text-amber-200">Protección estricta de credenciales:</strong> No ingreses claves de Mi Argentina, códigos OTP ni credenciales gubernamentales en este sitio. La Asociación jamás te solicitará contraseñas ni accesos a portales estatales.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visual Process Section (6 steps) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
              Proceso Orientativo
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
              Pasos del Circuito de Orientación y Admisión
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guía secuencial desde la consulta médica oficial hasta la resolución de la Comisión Directiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={step.stepNumber}
                  className="bg-slate-900 border border-emerald-900/40 hover:border-emerald-600/60 rounded-2xl p-6 relative flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-3 py-1 rounded-xl">
                        PASO {step.stepNumber}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-emerald-900/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {step.title}
                    </h4>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Circuito Oficial</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* External Link Section */}
        <div className="bg-slate-900 border border-emerald-800/60 rounded-3xl p-8 text-center max-w-3xl mx-auto shadow-2xl relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <Globe className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Ingreso al Portal Oficial Gubernamental
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Podés acceder directamente al portal oficial del Ministerio de Salud de la Nación para iniciar sesión con tu cuenta de Mi Argentina, consultar el estado de tu trámite o validar la vigencia de tu registro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://reprocann.salud.gob.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Acceder al trámite oficial REPROCANN
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] text-gray-500 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            Redirección externa y segura hacia Argentina.gob.ar (reprocann.salud.gob.ar)
          </p>
        </div>

      </div>
    </section>
  );
}
