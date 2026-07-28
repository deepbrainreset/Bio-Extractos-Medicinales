import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  UserMinus, 
  Calendar, 
  FileText, 
  ArrowRight,
  ShieldAlert,
  Search,
  Sparkles,
  Users,
  Compass,
  MessageSquareHeart,
  Newspaper
} from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';
import { useApplication } from '../context/ApplicationContext';
import PaymentCheckoutModal from './PaymentCheckoutModal';
import SolicitarBajaModal from './SolicitarBajaModal';
import { AdherentApplication } from '../types';

interface SocialFeeProps {
  onOpenApplicationModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenSolicitarBajaModal?: () => void;
}

export default function SocialFee({ 
  onOpenApplicationModal, 
  onOpenTrackingModal,
  onOpenSolicitarBajaModal 
}: SocialFeeProps) {
  const { getApplicationByTracking } = useApplication();

  const [checkoutApp, setCheckoutApp] = useState<AdherentApplication | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isBajaModalOpen, setIsBajaModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleTestCheckoutSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    if (!searchInput.trim()) return;

    const found = getApplicationByTracking(searchInput);
    if (!found) {
      setSearchError("No se encontró ninguna solicitud registrada con ese código o DNI.");
      return;
    }

    if (found.estado !== 'aprobado_comision') {
      setSearchError(`La solicitud ${found.trackingCode} se encuentra en estado '${found.estado.replace('_', ' ')}'. El pago se habilita únicamente tras la Aprobación de la Comisión Directiva.`);
      return;
    }

    setCheckoutApp(found);
    setIsCheckoutOpen(true);
  };

  // Non-commercial institutional benefits
  const institutionalBenefits = [
    {
      title: "Información y Novedades Institucionales",
      description: "Acceso regular a boletines informativos sobre avances regulatorios, investigaciones científicas e informes de gestión de la Asociación Civil.",
      icon: Newspaper
    },
    {
      title: "Participación en Actividades Asociativas",
      description: "Invitación a asambleas, seminarios, talleres de formación comunitaria y jornadas de debate de la entidad.",
      icon: Users
    },
    {
      title: "Orientación Administrativa",
      description: "Acompañamiento en el cumplimiento de requisitos documentales e inscripción en el registro estatal oficial REPROCANN.",
      icon: Compass
    },
    {
      title: "Acompañamiento Comunitario",
      description: "Integración a una red social de contención, intercambio de experiencias y apoyo solidario no comercial.",
      icon: MessageSquareHeart
    }
  ];

  // Visual 7-step sequence required by prompt
  const flowSequence = [
    { num: 1, text: "El solicitante envía su solicitud de admisión digital." },
    { num: 2, text: "La Comisión Directiva evalúa la documentación y aprueba la adhesión." },
    { num: 3, text: "El administrador actualiza el estado formal a 'aprobado'." },
    { num: 4, text: "Recién entonces se habilita el enlace de pago seguro." },
    { num: 5, text: "El sistema confirma el pago mediante webhook verificado del proveedor." },
    { num: 6, text: "Se genera el recibo oficial de cuota social con número de operación y período abonado." },
    { num: 7, text: "El socio puede consultar su estado, próximos vencimientos y solicitar baja en cualquier momento." }
  ];

  return (
    <section id="cuota-social" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-emerald-950">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-950/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/80 inline-flex items-center gap-1.5 shadow-sm">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Sostenimiento Institucional y Membresía
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 text-white leading-tight">
            Cuota Social y Sostenimiento Asociativo
          </h2>
          <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Información transparente e institucional sobre el aporte asociativo para el funcionamiento no lucrativo de la Asociación Civil Bio Extractos Medicinales.
          </p>
        </div>

        {/* Highlight Banner - ARS 10.000 Cuota Social Mensual */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 mb-14 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/80 border border-emerald-600/60 rounded-full text-xs font-bold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Importe Aprobado por Asamblea Organigrama
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  Cuota social mensual:
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 font-mono">
                  ARS 10.000
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                El valor, periodicidad y modalidad de la cuota social pueden modificarse exclusivamente según los mecanismos institucionales correspondientes (resoluciones ordinarias de la Comisión Directiva y Asambleas de Socios conforme estatuto).
              </p>

              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-emerald-900/50 text-xs text-gray-300 space-y-1">
                <span className="font-bold text-emerald-400 block">Principio de Transparencia Económica:</span>
                <p>
                  Los fondos recaudados se destinan íntegramente al alquiler de la sede, equipamiento técnico, asesoría jurídica especializada y programas educativos en la Provincia del Chubut.
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="shrink-0 flex flex-col gap-3 w-full lg:w-80">
              <button
                onClick={onOpenApplicationModal}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg text-center flex items-center justify-center gap-2"
              >
                <span>Solicitar Adhesión Previa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTrackingModal}
                className="bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-700/60 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Consultar Estado / Pagar</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenSolicitarBajaModal) onOpenSolicitarBajaModal();
                  else setIsBajaModalOpen(true);
                }}
                className="bg-slate-950 hover:bg-rose-950/60 text-gray-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/50 font-semibold px-6 py-2.5 rounded-2xl text-xs transition-all text-center flex items-center justify-center gap-2"
              >
                <UserMinus className="w-3.5 h-3.5 text-rose-400" />
                <span>Solicitar Baja Societaria</span>
              </button>
            </div>

          </div>
        </div>

        {/* STRICT NORMATIVE RULE BANNER */}
        <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-3xl p-6 sm:p-8 mb-14 shadow-2xl relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-500 flex items-center justify-center text-emerald-300 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-white">
                Condición Exclusiva de Aporte Asociativo y Desvinculación de Productos
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                <strong className="text-emerald-300">Regla Estricta Institucional:</strong> La cuota corresponde exclusivamente a la condición de socio adherente y al sostenimiento institucional. <strong className="text-white">No está relacionada en la interfaz, recibos, descripciones de pago ni correos con gramos, flores, aceites, resinas, cannabis, tratamientos o entregas.</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/40 text-xs text-gray-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sin venta, comercialización ni e-commerce de productos.</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/40 text-xs text-gray-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Aporte voluntario y estatutario para fines asociativos.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Non-Commercial Institutional Benefits Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
              Derecho del Socio Adherente
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
              Beneficios Institucionales No Comerciales
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Derechos asociativos garantizados por el estatuto de la entidad civil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionalBenefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-900 border border-emerald-900/40 hover:border-emerald-600/60 rounded-2xl p-6 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
                    Beneficio Social No Comercial
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strict Warning Box about Medical Outcomes */}
          <div className="mt-6 p-4 bg-amber-950/50 border border-amber-500/40 rounded-2xl text-xs text-amber-200/90 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5">Aviso Importante sobre Tratamientos y Productos:</strong>
              <span>
                La Asociación Civil no promete resultados médicos, acceso preferencial a medicamentos ni provisión de productos. Toda indicación o tratamiento de salud corresponde de forma exclusiva a la relación libre entre el paciente y su profesional médico tratante matriculado.
              </span>
            </div>
          </div>
        </div>

        {/* Sequential 7-Step Payment Flow */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
              Transparencia en la Pasarela
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
              Circuito del Flujo Digital de Cuota Social
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Paso a paso desde la solicitud hasta la validación de webhook y emisión del recibo oficial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flowSequence.map((item) => (
              <div 
                key={item.num}
                className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-5 flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700/80 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                  {item.num}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">PASO {item.num}</span>
                  <p className="text-xs text-gray-200 leading-relaxed font-medium mt-0.5">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Payment Checkout Tester for Approved Members */}
        <div className="bg-slate-900 border border-emerald-800/60 rounded-3xl p-8 max-w-3xl mx-auto text-center relative shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CreditCard className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Ingreso Directo a la Pasarela para Socios Aprobados
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Si tu solicitud ya fue aprobada por la Comisión Directiva, podés ingresar tu Código de Seguimiento o DNI para simular o efectuar el pago mediante checkout alojado por Mercado Pago / Stripe con validación de webhook y emisión de recibo:
          </p>

          <form onSubmit={handleTestCheckoutSearch} className="max-w-md mx-auto space-y-3 mb-4">
            <div className="flex gap-2">
              <input 
                type="text"
                required
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Ej: BIO-2026-8921 o DNI (Prueba: BIO-2026-8921)"
                className="flex-1 bg-slate-950 border border-emerald-900/60 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs transition-all shrink-0 flex items-center gap-1.5"
              >
                Abonar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {searchError && (
              <p className="text-xs text-amber-300 bg-amber-950/80 p-2.5 rounded-xl border border-amber-500/40 text-left">
                {searchError}
              </p>
            )}
          </form>

          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            No se guardan datos de tarjetas. Activación sujeta a webhook firmado HMAC-SHA256.
          </p>
        </div>

      </div>

      {/* Payment Modal */}
      <PaymentCheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        application={checkoutApp}
      />

      {/* Solicitar Baja Modal */}
      <SolicitarBajaModal 
        isOpen={isBajaModalOpen}
        onClose={() => setIsBajaModalOpen(false)}
      />
    </section>
  );
}
