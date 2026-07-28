import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Cookie, 
  Scale, 
  HeartPulse, 
  AlertTriangle, 
  Copy, 
  Check, 
  Download, 
  Building2, 
  Mail, 
  UserCheck, 
  Calendar,
  Eye,
  FileCode,
  Info
} from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

interface LegalDraftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacidad' | 'terminos' | 'consentimiento' | 'cookies' | 'arco' | 'sanitario';
}

export function LegalDraftsModal({ isOpen, onClose, initialTab = 'privacidad' }: LegalDraftsModalProps) {
  const [activeTab, setActiveTab] = useState<
    'privacidad' | 'terminos' | 'consentimiento' | 'cookies' | 'arco' | 'sanitario'
  >(initialTab);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const draftNotice = "BORRADOR SUJETO A REVISIÓN LEGAL ANTES DE PUBLICACIÓN O APLICACIÓN DEFINITIVA";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-800/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-6 text-white flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="bg-slate-900 border-b border-emerald-900/50 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-amber-950 border border-amber-700/80 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                {draftNotice}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                Especialidad: Privacidad, Salud y Regulación Cannabis (Argentina)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Documentación Legal Institucional & Borradores Normativos
            </h3>
            <p className="text-xs text-gray-400">
              Textos adaptados a la Ley 25.326, Ley 27.350, Ley Chubut 790/24 y regulaciones sanitarias de Argentina.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-xl border border-white/10 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RESPONSIBLE DATA CONTROLLER BANNER */}
        <div className="bg-slate-900/90 border-b border-white/5 p-4 text-xs shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 space-y-0.5">
              <span className="text-gray-400 text-[10px] block font-semibold">Razón Social / Entidad:</span>
              <strong className="text-white block truncate">{ORGANIZATION_CONFIG.razonSocial}</strong>
              <span className="text-[10px] text-emerald-400 font-mono">CUIT: {ORGANIZATION_CONFIG.cuit}</span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 space-y-0.5">
              <span className="text-gray-400 text-[10px] block font-semibold">Domicilio Legal:</span>
              <span className="text-gray-200 block truncate">{ORGANIZATION_CONFIG.domicilioLegal}</span>
              <span className="text-[10px] text-gray-400">{ORGANIZATION_CONFIG.city}, {ORGANIZATION_CONFIG.province}</span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 space-y-0.5">
              <span className="text-gray-400 text-[10px] block font-semibold">Email Privacidad / ARCO:</span>
              <strong className="text-emerald-300 font-mono block truncate">{ORGANIZATION_CONFIG.emailPrivacidad}</strong>
              <span className="text-[10px] text-gray-400">Canal exclusivo de datos</span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 space-y-0.5">
              <span className="text-gray-400 text-[10px] block font-semibold">Responsable Designado:</span>
              <span className="text-white block truncate">{ORGANIZATION_CONFIG.responsableDesignado}</span>
              <span className="text-[10px] text-emerald-400 font-mono">AAIP Ley 25.326</span>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="bg-slate-950 border-b border-white/5 p-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('privacidad')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'privacidad'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 1. Política de Privacidad
          </button>

          <button
            onClick={() => setActiveTab('terminos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'terminos'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" /> 2. Términos de Adhesión
          </button>

          <button
            onClick={() => setActiveTab('consentimiento')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'consentimiento'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" /> 3. Consentimiento de Datos
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'cookies'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cookie className="w-4 h-4" /> 4. Política de Cookies
          </button>

          <button
            onClick={() => setActiveTab('arco')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'arco'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" /> 5. Protocolo Derechos ARCO
          </button>

          <button
            onClick={() => setActiveTab('sanitario')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'sanitario'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-gray-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <HeartPulse className="w-4 h-4 text-emerald-300" /> 6. Información Sanitaria
          </button>
        </div>

        {/* TAB CONTENT AREA */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed grow">
          
          {/* MANDATORY WARNING WATERMARK */}
          <div className="p-3 bg-amber-950/40 border border-amber-600/60 rounded-2xl text-amber-200 text-xs font-semibold flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>ADVERTENCIA LEGAL:</strong> {draftNotice}
              </span>
            </div>
            <span className="text-[10px] font-mono bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-700 shrink-0">
              ESTADO: DRAFT v2026.1
            </span>
          </div>


          {/* 1. POLÍTICA DE PRIVACIDAD */}
          {activeTab === 'privacidad' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  En cumplimiento de la Ley Nacional N° 25.326 y Disposiciones de la AAIP
                </p>
              </div>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">1. Responsable del Tratamiento de la Base de Datos</h5>
                <p>
                  La base de datos de este sitio web es administrada por la <strong className="text-white">{ORGANIZATION_CONFIG.razonSocial}</strong>, en su carácter de Responsable del Tratamiento:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Razón Social:</strong> {ORGANIZATION_CONFIG.razonSocial}</li>
                  <li><strong>CUIT:</strong> {ORGANIZATION_CONFIG.cuit}</li>
                  <li><strong>Domicilio Legal:</strong> {ORGANIZATION_CONFIG.domicilioLegal}</li>
                  <li><strong>Email exclusivo para Privacidad y Datos:</strong> <span className="text-emerald-400 font-mono">{ORGANIZATION_CONFIG.emailPrivacidad}</span></li>
                  <li><strong>Responsable Designado de Protección de Datos:</strong> {ORGANIZATION_CONFIG.responsableDesignado}</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">2. Categorización Diferenciada de Datos Recolectados</h5>
                <p>
                  La Entidad distingue estrictamente las siguientes categorías de datos personales, aplicando niveles de seguridad proporcionales al nivel de sensibilidad de cada una:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">a) Datos Identificatorios:</strong>
                    <p className="text-gray-300">Nombres, apellidos, número de DNI, CUIL, nacionalidad y fecha de nacimiento.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">b) Datos de Contacto:</strong>
                    <p className="text-gray-300">Correo electrónico, número de teléfono celular y domicilio real de residencia.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">c) Datos Administrativos y Societarios:</strong>
                    <p className="text-gray-300">Código único de seguimiento (BIO-2026-XXXX), estado de la solicitud, dictámenes de Comisión Directiva y número de acta asociativa.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">d) Datos de Pago y Recaudación:</strong>
                    <p className="text-gray-300">Historial de contribuciones por cuota social, comprobantes de transferencia y firmas criptográficas HMAC recibidas de pasarelas de pago.</p>
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 md:col-span-2 space-y-1">
                    <strong className="text-emerald-300 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" /> e) Datos de Salud y Datos Sensibles (Tratamiento Restringido):
                    </strong>
                    <p className="text-gray-200">
                      Copia de la receta o indicación médica expedida por profesional matriculado, diagnóstico/resumen de historia clínica, número de matrícula del profesional de la salud, estado de trámite y credencial en el Registro del Programa de Cannabis (REPROCANN).
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">3. Finalidades Específicas del Tratamiento</h5>
                <p>
                  Los datos recolectados serán utilizados <strong className="text-white">única y exclusivamente</strong> para las siguientes finalidades legítimas e informadas:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Evaluación de la Solicitud:</strong> Verificación de requisitos estatutarios e indicación médica por la Comisión Directiva y Dirección Médica para evaluar la adhesión como socio.</li>
                  <li><strong>Gestión Administrativa e Institucional:</strong> Registro formal en el Libro de Socios Adherentes y emisión de acreditaciones institucionales.</li>
                  <li><strong>Comunicación Institucional:</strong> Envío de notificaciones relativas al estado del trámite, asambleas e información asociativa requerida.</li>
                  <li><strong>Gestión de Cuotas Sociales:</strong> Administración del sostenimiento económico asociativo mediante cuotas mensuales comunitarias.</li>
                  <li><strong>Cumplimiento Normativo:</strong> Verificación y resguardo ante inspecciones de autoridades competentes en el marco de la Ley 27.350, Decreto Reglamentario 883/2020 y Ley Provincial de Chubut 790/24.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">4. Destinatarios Autorizados y Prohibición de Uso Comercial</h5>
                <p>
                  Los datos serán accesibles únicamente por el personal formalmente autorizado de la Asociación (Comisión Directiva, Equipo de Admisión y Dirección Médica) bajo el <strong className="text-white">Principio de Mínimo Privilegio (RBAC)</strong>.
                </p>
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-200 text-xs font-semibold">
                  PROHIBICIÓN STRICTA DE USO COMERCIAL: Queda expresamente prohibida la comercialización, cesión, alquiler, venta o transferencia de datos personales o sensibles a terceros ajenos a la Entidad, como así también su utilización para fines publicitarios o de perfilamiento comercial no consentidos.
                </div>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">5. Plazos Configurables de Conservación y Purga</h5>
                <p>Los datos personales se conservarán conforme a las siguientes políticas temporales sujetas a revisión legal:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Postulantes Rechazados o Incompletos:</strong> {ORGANIZATION_CONFIG.plazosRetencion.solicitudesIncompletasOuRechazadas}. Cumplido el plazo, la documentación adjunta será anonimizada o purgada.</li>
                  <li><strong>Socios Adherentes Activos:</strong> {ORGANIZATION_CONFIG.plazosRetencion.sociosActivos}.</li>
                  <li><strong>Socios en Baja Definitiva:</strong> {ORGANIZATION_CONFIG.plazosRetencion.sociosBaja}.</li>
                  <li><strong>Documentación y Registros de Salud:</strong> {ORGANIZATION_CONFIG.plazosRetencion.registrosSaludEIndicacion}.</li>
                </ul>
              </section>
            </div>
          )}


          {/* 2. TÉRMINOS DE ADHESIÓN */}
          {activeTab === 'terminos' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  TÉRMINOS Y CONDICIONES DE ADHESIÓN COMO SOCIO ADHERENTE
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  Estatuto Asociativo y Normas de Incorpación a la Asociación Civil
                </p>
              </div>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">1. Naturaleza Jurídica de la Entidad y Ausencia de Fines Comerciales</h5>
                <p>
                  La <strong className="text-white">{ORGANIZATION_CONFIG.razonSocial}</strong> es una entidad sin fines de lucro constituida al amparo del Código Civil y Comercial de la Nación y la legislación asociativa de la Provincia de Chubut.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/40 text-xs text-emerald-300">
                  INEXISTENCIA DE TRANSACCIONES COMERCIALES: La Asociación Civil no vende, comercializa ni distribuye con fines de lucro cannabis, flores, aceites ni extractos. La cuota social abonada por los socios adherentes constituye una contribución exclusiva de sostenimiento asociativo para el cumplimiento de los fines comunitarios e investigativos de la institución.
                </div>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">2. Procedimiento de Solicitud y No Otorgamiento Automático</h5>
                <p>
                  El completamiento del formulario digital de solicitud de adhesión constituye una <strong className="text-white">postulación condicional</strong> y no otorga la calidad automática de socio adherente.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>La admisión definitiva está sujeta a la evaluación formal de los antecedentes y documentación por la Comisión Directiva.</li>
                  <li>El sistema informático de la Entidad mantiene inhabilitada la emisión y cobro de cuotas sociales a todo postulante cuyo legajo se encuentre en estado pendiente o no haya sido aprobado expresamente en Actas de Comisión Directiva.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">3. Requisito Ineludible de Indicación Médica y REPROCANN</h5>
                <p>
                  Conforme a la Ley Nacional 27.350, el Decreto Reglamentario 883/2020 y la Ley Provincial de Chubut VII N° 790/24, para mantener la calidad de Socio Adherente vinculado a los programas de salud de la Entidad, el titular deberá:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Contar con prescripción o indicación médica vigente emitida por profesional de la salud matriculado.</li>
                  <li>Poseer inscripción aprobada o en trámite regular ante el Registro del Programa de Cannabis (REPROCANN) del Ministerio de Salud de la Nación.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">4. Cuota Social, Sostenimiento e Inhabiliación de Pagos</h5>
                <p>
                  La cuota social de sostenimiento es fijada por la Asamblea de Socios y tiene periodicidad mensual. El no pago reiterado o el incumplimiento de las normas asociativas dará lugar a las sanciones contempladas en el Estatuto Social, previa notificación formal.
                </p>
              </section>

              <section className="space-y-2">
                <h5 className="font-bold text-white text-sm">5. Procedimiento de Baja Voluntaria</h5>
                <p>
                  El socio adherente podrá solicitar la baja en cualquier momento a través del portal institucional o enviando una comunicación al email de administración, procediéndose a la cancelación inmediata de débitos o cobros futuros.
                </p>
              </section>
            </div>
          )}


          {/* 3. CONSENTIMIENTO DE TRATAMIENTO DE DATOS */}
          {activeTab === 'consentimiento' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  CONSENTIMIENTO INFORMADO DE TRATAMIENTO DE DATOS PERSONALES Y SENSIBLES
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  Manifestación Expresa del Titular (Artículos 5° y 6° de la Ley Nacional N° 25.326)
                </p>
              </div>

              <section className="space-y-3">
                <p>
                  Al completar el formulario de solicitud y tildar la casilla de aceptación, el solicitante manifiesta haber leído, comprendido y aceptado libremente el presente consentimiento informado:
                </p>

                <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-900/50 space-y-3 text-xs">
                  <div className="font-bold text-emerald-300 text-sm">
                    Declaración Expresa del Titular de Datos:
                  </div>

                  <p>
                    1. <strong className="text-white">Autorización Específica:</strong> Autorizo a la <strong className="text-white">{ORGANIZATION_CONFIG.razonSocial}</strong> (CUIT {ORGANIZATION_CONFIG.cuit}) a recolectar y tratar mis datos personales identificatorios, de contacto y societarios con el único fin de evaluar mi solicitud de adhesión y gestionar la relación asociativa.
                  </p>

                  <p>
                    2. <strong className="text-white">Consentimiento Reforzado sobre Datos de Salud:</strong> Consiento de manera expresa y destacada el tratamiento confidencial de mis datos relativos a la salud (orden médica, diagnóstico, certificado REPROCANN), comprendiendo su carácter de <strong className="text-white">Dato Sensible</strong> conforme al Art. 2° de la Ley 25.326.
                  </p>

                  <p>
                    3. <strong className="text-white">Revocabilidad sin Efecto Retroactivo:</strong> Comprendo que tengo el derecho de revocar este consentimiento en cualquier momento mediante comunicación al correo <span className="text-emerald-400 font-mono">{ORGANIZATION_CONFIG.emailPrivacidad}</span>, sin que dicha revocación afecte la legalidad del tratamiento realizado previamente.
                  </p>

                  <p>
                    4. <strong className="text-white">Ausencia de Cláusulas Ambiguas o Perpetuas:</strong> La presente autorización se limita estrictamente a las finalidades asociativas informadas y no otorga derechos de cesión comercial ni usos no contemplados en esta política.
                  </p>
                </div>
              </section>
            </div>
          )}


          {/* 4. POLÍTICA DE COOKIES */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  POLÍTICA DE COOKIES Y TECNOLOGÍAS TÉCNICAS DE SESIÓN
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  Uso Exclusivo de Cookies Técnicas y de Seguridad
                </p>
              </div>

              <section className="space-y-3">
                <p>
                  El sitio web de la <strong className="text-white">{ORGANIZATION_CONFIG.razonSocial}</strong> utiliza cookies y tecnologías de almacenamiento local estrictamente necesarias para garantizar el correcto funcionamiento técnico de la plataforma.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">Cookies Técnicas de Sesión:</strong>
                    <p className="text-gray-300">Permiten la navegación segura, mantenimiento de sesión durante el completamiento de formularios y gestión de tokens anti-falsificación (CSRF).</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">Almacenamiento Local (Local State):</strong>
                    <p className="text-gray-300">Utilizado para conservar temporalmente el estado de la búsqueda de seguimiento de trámite en el navegador del usuario.</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-900/40 text-xs text-gray-300 space-y-1">
                  <strong className="text-white block">Inexistencia de Cookies Publicitarias o de Perfilamiento:</strong>
                  <p>
                    Este sitio web <strong className="text-emerald-300">NO utiliza cookies de rastreo publicitario de terceros, píxeles de remarketing ni herramientas de perfilamiento comercial</strong>.
                  </p>
                </div>
              </section>
            </div>
          )}


          {/* 5. PROTOCOLO DE DERECHOS ARCO */}
          {activeTab === 'arco' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  PROTOCOLO PARA EL EJERCICIO DE DERECHOS ARCO (LEY N° 25.326)
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  Acceso, Rectificación, Cancelación/Supresión, Oposición y Portabilidad
                </p>
              </div>

              <section className="space-y-3">
                <p>
                  El titular de los datos personales o sus representantes legales tienen garantizado el ejercicio gratuito de sus derechos en el marco de la Ley 25.326 (Habeas Data):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">🔍 Derecho de Acceso:</strong>
                    <p className="text-gray-300">Conocer de forma gratuita si la Entidad trata sus datos personales y solicitar copia de la información registrada (intervalos no inferiores a 6 meses).</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">✏️ Derecho de Rectificación y Actualización:</strong>
                    <p className="text-gray-300">Corregir o actualizar datos inexactos, incompletos o desactualizados adjuntando constancia que lo acredite.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">🗑️ Derecho de Cancelación y Supresión:</strong>
                    <p className="text-gray-300">Solicitar la eliminación de sus datos personales cuando hayan dejado de ser necesarios o finalizado la relación asociativa.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">🛡️ Derecho de Oposición:</strong>
                    <p className="text-gray-300">Oponerse al tratamiento de sus datos por motivos legítimos o revocar la autorización previamente otorgada.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-900/60 space-y-2 text-xs">
                  <h6 className="font-bold text-white">Canal Designado y Plazos de Respuesta:</h6>
                  <p>
                    Para iniciar una solicitud ARCO, enuncie su requerimiento enviando un correo electrónico a: <strong className="text-emerald-400 font-mono">{ORGANIZATION_CONFIG.emailPrivacidad}</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li><strong>Acreditación de Identidad:</strong> Adjuntar copia clara escaneada del DNI para verificar titularidad.</li>
                    <li><strong>Plazo de Respuesta para Derecho de Acceso:</strong> Máximo de diez (10) días corridos desde la recepción.</li>
                    <li><strong>Plazo de Respuesta para Rectificación o Supresión:</strong> Máximo de cinco (5) días hábiles desde la recepción.</li>
                  </ul>
                  <p className="text-[11px] text-gray-400 pt-1">
                    Órgano de Control: La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA (AAIP), en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos.
                  </p>
                </div>
              </section>
            </div>
          )}


          {/* 6. AVISO DE INFORMACIÓN SANITARIA */}
          {activeTab === 'sanitario' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h4 className="text-lg font-black text-white mb-1">
                  AVISO DE INFORMACIÓN SANITARIA Y LÍMITES DE RESPONSABILIDAD
                </h4>
                <p className="text-xs text-emerald-400 font-mono">
                  Delimitación del Rol Institucional y Ley de Derechos del Paciente (Ley 26.529)
                </p>
              </div>

              <section className="space-y-3">
                <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-900/50 space-y-3 text-xs">
                  <div className="font-bold text-emerald-300 text-sm">
                    Límites Regulatorios y Alcance Institucional:
                  </div>

                  <p>
                    1. <strong className="text-white">Ausencia de Prescripción Médica Directa:</strong> La <strong className="text-white">{ORGANIZATION_CONFIG.razonSocial}</strong> es una entidad asociativa y no reemplaza la relación médico-paciente ni realiza prescripciones, diagnósticos ni indicación directa de tratamientos.
                  </p>

                  <p>
                    2. <strong className="text-white">Responsabilidad del Profesional Matriculado:</strong> Toda indicación de tratamiento con cannabis medicinal debe ser evaluada de forma independiente por un profesional de la salud matriculado dentro del marco ético y regulatorio vigente.
                  </p>

                  <p>
                    3. <strong className="text-white">Orientación sobre REPROCANN:</strong> La orientación bridada sobre el trámite ante el REPROCANN del Ministerio de Salud de la Nación es puramente informativa. La Entidad no otorga, aprueba ni garantiza el resultado de trámites estateles.
                  </p>

                  <p>
                    4. <strong className="text-white">Confidencialidad Médica (Ley 26.529):</strong> La información médica resguardada por la Entidad se encuentra protegida por las previsiones de la Ley de Derechos del Paciente, la reserva médica profesional y el secreto confidencial.
                  </p>
                </div>
              </section>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-slate-900 border-t border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Formato listo para revisión de asesoría legal especializada.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleCopyText(`DOCUMENTO LEGAL (${activeTab.toUpperCase()})\nORGANIZACIÓN: ${ORGANIZATION_CONFIG.razonSocial} (CUIT ${ORGANIZATION_CONFIG.cuit})\nAVISO: ${draftNotice}\nCANAL ARCO: ${ORGANIZATION_CONFIG.emailPrivacidad}`)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-white/10 w-full sm:w-auto transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
              {copied ? '¡Copiado!' : 'Copiar Resumen Legal'}
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs w-full sm:w-auto shadow transition-colors"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
