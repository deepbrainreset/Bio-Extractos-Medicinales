import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Building2, 
  Stethoscope, 
  Scale, 
  ArrowDown, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

type CategoryType = 'all' | 'burocratico' | 'medico' | 'legal';

interface FAQItem {
  id: string;
  category: 'burocratico' | 'medico' | 'legal';
  question: string;
  answer: string;
  badge: string;
  subtext?: string;
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [openIndex, setOpenIndex] = useState<string | null>('bur-1');

  const faqs: FAQItem[] = [
    // --- TÓPICOS BUROCRÁTICOS Y ADMINISTRATIVOS ---
    {
      id: 'bur-1',
      category: 'burocratico',
      badge: '🏢 BUROCRÁTICO & ADMISIÓN',
      question: "¿Puedo abonar la cuota social al momento de enviar el formulario?",
      answer: "No. Por disposición reglamentaria de nuestra Comisión Directiva y en estricto cumplimiento normativo, el cobro de la cuota social se habilita ÚNICAMENTE una vez que la solicitud de admisión haya sido revisada, evaluada y formalmente aprobada en acta directiva. Ningún cobro es exigido antes del dictamen de admisión.",
      subtext: "Administración Societaria • Estado Diferido de Pago"
    },
    {
      id: 'bur-2',
      category: 'burocratico',
      badge: '🏢 BUROCRÁTICO & TRÁMITES',
      question: "¿Cómo consulto el estado de mi trámite de ingreso con mi código único?",
      answer: "Una vez completado el formulario digital, el sistema genera automáticamente un código único de seguimiento (ejemplo: BIO-2026-X892). Ingresando a la solapa 'Consultar Trámite' en el menú principal e introduciendo tu DNI y código, podrás verificar si tu solicitud se encuentra en revisión, aprobada o requiriendo documentación adicional.",
      subtext: "Sistema de Seguimiento Digital • Transparencia de Legajo"
    },
    {
      id: 'bur-3',
      category: 'burocratico',
      badge: '🏢 BUROCRÁTICO & ASOCIATIVO',
      question: "¿Qué ocurre si la solicitud es realizada por un menor de edad?",
      answer: "En caso de solicitantes menores de 18 años, el formulario requiere obligatoriamente la intervención, datos de identidad (DNI, nombre completo) y adjuntos del representante legal (madre, padre o tutor nombrado). El legajo es analizado de forma prioritaria y bajo estricta auditoría asociativa.",
      subtext: "Representación Legal • Protección de Menores"
    },
    {
      id: 'bur-4',
      category: 'burocratico',
      badge: '🏢 BUROCRÁTICO & BAJA',
      question: "¿Cómo solicitar la baja voluntaria o cancelación de la adhesión?",
      answer: "El socio adherente puede solicitar la baja voluntaria en cualquier momento y de forma gratuita mediante nuestro portal en la sección 'Solicitar Baja' o enviando una comunicación al email institucional. La baja interrumpe de inmediato todo cobro futuro de cuotas de sostenimiento.",
      subtext: "Derecho de Desistimiento • Gestión de Afiliación"
    },

    // --- TÓPICOS MÉDICOS Y SANITARIOS ---
    {
      id: 'med-1',
      category: 'medico',
      badge: '🩺 MÉDICO & REPROCANN',
      question: "¿La Asociación aprueba, emite o acelera el trámite de REPROCANN?",
      answer: "No. El REPROCANN es un registro público oficial dependiente del Ministerio de Salud de la Nación Argentina. La Asociación no aprueba, reemplaza ni acelera decisiones de organismos estatales. Brindamos orientación técnica e informativa a nuestros socios para que completen el trámite junto a su profesional médico tratante.",
      subtext: "Ministerio de Salud de la Nación • Registro Oficial"
    },
    {
      id: 'med-2',
      category: 'medico',
      badge: '🩺 MÉDICO & REPRESCRIPCIÓN',
      question: "¿Qué ocurre si no cuento con una orden o prescripción médica para uso de cannabis?",
      answer: "Para solicitar la adhesión como socio adherente es requisito indispensable contar con una indicación médica emitida por un profesional matriculado en Argentina. Si aún no contás con profesional o indicación, nuestro equipo te brindará orientación sobre profesionales capacitados en endocannabinología e investigación de la Ley 27.350.",
      subtext: "Indicación Médica Obligatoria • Profesional Matriculado"
    },
    {
      id: 'med-3',
      category: 'medico',
      badge: '🩺 MÉDICO & SALUD',
      question: "¿Quién evalúa los aspectos sanitarios del legajo del postulante?",
      answer: "El legajo de salud es revisado por el equipo asesor médico y sanitario de la Asociación para constatar la consistencia formal de la orden médica, vigencia de matrícula y adecuación con los programas de investigación y salud asociativos respaldados por la normativa de Chubut.",
      subtext: "Comisión de Salud • Verificación de Diagnóstico"
    },

    // --- TÓPICOS LEGALES Y PROTECCIÓN DE DATOS ---
    {
      id: 'leg-1',
      category: 'legal',
      badge: '⚖️ LEGAL & ESTATUTO',
      question: "¿La Asociación Civil es un dispensario, tienda o e-commerce de cannabis?",
      answer: "No, en absoluto. La Asociación Civil Bio Extractos Medicinales es una entidad de bien público sin fines de lucro enmarcada en la Ley Nacional 27.350 y Ley Provincial de Chubut 790/24. No comercializamos, vendemos ni distribuimos productos como e-commerce o catálogo. Tampoco vinculamos cuotas sociales con gramos o volúmenes.",
      subtext: "Estatuto Asociativo • Ausencia de Fines Comerciales"
    },
    {
      id: 'leg-2',
      category: 'legal',
      badge: '⚖️ LEGAL & LEY 25.326',
      question: "¿Cómo se resguardan mis datos personales y diagnósticos médicos (Ley 25.326)?",
      answer: "Toda la información personal, copias de DNI e indicación médica que ingresás se tratan bajo la estricta confidencialidad regulada por la Ley Nacional 25.326 de Protección de Datos Personales. Tus datos de salud son considerados 'Datos Sensibles' (Art. 2°) y están resguardados con encriptación, reserva médica y prohibición absoluta de cesión comercial.",
      subtext: "Habeas Data • Secreto y Confidencialidad Sanitaria"
    },
    {
      id: 'leg-3',
      category: 'legal',
      badge: '⚖️ LEGAL & DERECHOS ARCO',
      question: "¿Cómo ejercer los derechos de Acceso, Rectificación y Supresión de mis datos?",
      answer: "Podés ejercer tus derechos ARCO en cualquier momento enviando un correo electrónico a nuestro canal específico de privacidad: privacidad@fundacionbioextractosmedicinales.com. El plazo de respuesta es de un máximo de 10 días para acceso y 5 días para rectificación o supresión, conforme a las directivas de la AAIP.",
      subtext: "Agencia de Acceso a la Información Pública • Canal Exclusivo ARCO"
    },
    {
      id: 'leg-4',
      category: 'legal',
      badge: '⚖️ LEGAL & MARCO CHUBUT',
      question: "¿Cuál es el marco regulatorio que respalda el funcionamiento en la provincia de Chubut?",
      answer: "Operamos bajo el amparo de la Ley Nacional 27.350 (Investigación Médica y Científica del Cannabis), su Decreto Reglamentario 883/2020 y la Ley Provincial de Chubut VII N° 790/24, que regula la producción asociativa y el acceso seguro para pacientes y socios en la provincia.",
      subtext: "Ley Provincial Chubut VII N° 790/24 • Decreto 883/2020"
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const burocraticFaqs = faqs.filter(f => f.category === 'burocratico');
  const medicalFaqs = faqs.filter(f => f.category === 'medico');
  const legalFaqs = faqs.filter(f => f.category === 'legal');

  const scrollToNextBlock = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-4 py-1.5 rounded-full border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Guía de Preguntas & Diferenciación Temática
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Consultas Frecuentes Diferenciadas por Tópico
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Distinguimos claramente los aspectos <strong className="text-sky-300">Burocráticos y Administrativos</strong>, <strong className="text-emerald-300">Médicos y Sanitarios</strong>, y <strong className="text-amber-300">Legales y de Privacidad</strong> para una lectura precisa de usuarios y autoridades.
          </p>
        </div>

        {/* TOP CATEGORY SELECTOR / TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900 border border-white/10 rounded-2xl max-w-2xl mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Todos los Tópicos ({faqs.length})
          </button>

          <button
            onClick={() => setActiveCategory('burocratico')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'burocratico'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-sky-400/80 hover:text-sky-300 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            🏢 Burocrático ({burocraticFaqs.length})
          </button>

          <button
            onClick={() => setActiveCategory('medico')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'medico'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-slate-800'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            🩺 Médico ({medicalFaqs.length})
          </button>

          <button
            onClick={() => setActiveCategory('legal')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'legal'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-400" />
            ⚖️ Legal ({legalFaqs.length})
          </button>
        </div>


        {/* ===================================================================== */}
        {/* VIEW MODE 1: ALL TOPICS WITH CLEAR DISTINCT VISUAL BLOCKS & TRANSITIONS */}
        {/* ===================================================================== */}
        {activeCategory === 'all' ? (
          <div className="space-y-16">
            
            {/* ----------------------------------------------------------------- */}
            {/* BLOCK 1: TÓPICOS BUROCRÁTICOS Y ADMINISTRATIVOS */}
            {/* ----------------------------------------------------------------- */}
            <div id="bloque-burocratico" className="bg-slate-900/90 border-2 border-sky-600/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-mono font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                BLOQUE 1 DE 3 • BUROCRACIA & ADMINISTRACIÓN
              </div>

              {/* Block Header */}
              <div className="flex items-center gap-3 border-b border-sky-800/40 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-500/50 flex items-center justify-center text-sky-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    🏢 Sección 1: Tópicos Burocráticos y Administrativos
                  </h3>
                  <p className="text-xs text-sky-300">
                    Proceso de solicitud, cobro diferido de cuota social, código de seguimiento y gestión societaria.
                  </p>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {burocraticFaqs.map((faq) => {
                  const isOpen = openIndex === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className="bg-slate-950/80 border border-sky-900/50 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-sky-300 transition-colors focus:outline-none"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded-md border border-sky-800 inline-block">
                            {faq.badge}
                          </span>
                          <span className="block">{faq.question}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-sky-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-sky-900/30 bg-sky-950/20 space-y-2">
                          <p>{faq.answer}</p>
                          {faq.subtext && (
                            <span className="text-[10px] text-sky-400 font-mono block pt-1 border-t border-white/5">
                              📌 {faq.subtext}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SECTION END & TRANSITION BANNER 1 */}
              <div className="p-4 bg-sky-950/80 border border-sky-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    <strong>FIN DE SECCIÓN BUROCRÁTICA Y ADMINISTRATIVA</strong> — Ha revisado todas las consultas societarias.
                  </span>
                </div>
                <button
                  onClick={() => scrollToNextBlock('bloque-medico')}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow"
                >
                  Continuar a Sección Médica & Sanitaria
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>


            {/* ----------------------------------------------------------------- */}
            {/* BLOCK 2: TÓPICOS MÉDICOS, SANITARIOS Y REPROCANN */}
            {/* ----------------------------------------------------------------- */}
            <div id="bloque-medico" className="bg-slate-900/90 border-2 border-emerald-600/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-mono font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                BLOQUE 2 DE 3 • SALUD, MÉDICA & REPROCANN
              </div>

              {/* Block Header */}
              <div className="flex items-center gap-3 border-b border-emerald-800/40 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    🩺 Sección 2: Tópicos Médicos, Sanitarios y REPROCANN
                  </h3>
                  <p className="text-xs text-emerald-300">
                    Indicación médica obligatoria, orientación médica profesional y estatus en el Registro Nacional.
                  </p>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {medicalFaqs.map((faq) => {
                  const isOpen = openIndex === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className="bg-slate-950/80 border border-emerald-900/50 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-emerald-300 transition-colors focus:outline-none"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800 inline-block">
                            {faq.badge}
                          </span>
                          <span className="block">{faq.question}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-emerald-900/30 bg-emerald-950/20 space-y-2">
                          <p>{faq.answer}</p>
                          {faq.subtext && (
                            <span className="text-[10px] text-emerald-400 font-mono block pt-1 border-t border-white/5">
                              📌 {faq.subtext}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SECTION END & TRANSITION BANNER 2 */}
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>FIN DE SECCIÓN MÉDICA Y SANITARIA</strong> — Ha revisado los aspectos médicos y de REPROCANN.
                  </span>
                </div>
                <button
                  onClick={() => scrollToNextBlock('bloque-legal')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow"
                >
                  Continuar a Sección Legal & Protección de Datos
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>


            {/* ----------------------------------------------------------------- */}
            {/* BLOCK 3: TÓPICOS LEGALES, NORMATIVOS Y PROTECCIÓN DE DATOS */}
            {/* ----------------------------------------------------------------- */}
            <div id="bloque-legal" className="bg-slate-900/90 border-2 border-amber-600/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-mono font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                BLOQUE 3 DE 3 • MARCO LEGAL & PROTECCIÓN DE DATOS
              </div>

              {/* Block Header */}
              <div className="flex items-center gap-3 border-b border-amber-800/40 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    ⚖️ Sección 3: Tópicos Legales, Normativos y Protección de Datos
                  </h3>
                  <p className="text-xs text-amber-300">
                    Marco de la Ley 27.350, Ley Chubut 790/24, Protección de Datos Ley 25.326 y Derechos ARCO.
                  </p>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {legalFaqs.map((faq) => {
                  const isOpen = openIndex === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className="bg-slate-950/80 border border-amber-900/50 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors focus:outline-none"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-800 inline-block">
                            {faq.badge}
                          </span>
                          <span className="block">{faq.question}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-amber-900/30 bg-amber-950/20 space-y-2">
                          <p>{faq.answer}</p>
                          {faq.subtext && (
                            <span className="text-[10px] text-amber-400 font-mono block pt-1 border-t border-white/5">
                              📌 {faq.subtext}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SECTION END & TRANSITION BANNER 3 */}
              <div className="p-4 bg-amber-950/80 border border-amber-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>FIN DE SECCIÓN LEGAL Y NORMATIVA</strong> — Ha finalizado la revisión de todos los bloques temáticos.
                  </span>
                </div>
                <button
                  onClick={() => scrollToNextBlock('contacto')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow"
                >
                  Avanzar a Sección de Contacto e Institucional
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* VIEW MODE 2: FILTERED SINGLE CATEGORY VIEW */
          /* ===================================================================== */
          <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                Categoría Seleccionada: {activeCategory.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Ver todos los bloques
              </button>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors focus:outline-none"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800 inline-block">
                          {faq.badge}
                        </span>
                        <span className="block">{faq.question}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-slate-900/50 space-y-2">
                        <p>{faq.answer}</p>
                        {faq.subtext && (
                          <span className="text-[10px] text-emerald-400 font-mono block pt-1 border-t border-white/5">
                            📌 {faq.subtext}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
