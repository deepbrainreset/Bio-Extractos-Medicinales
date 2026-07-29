import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, FileText, ArrowRight, Copy, Check, Building2 } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { AdherentApplication, SocialFeePayment } from '../types';
import { ORGANIZATION_CONFIG } from '../config/organization';
import ReceiptModal from './ReceiptModal';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: AdherentApplication | null;
}

export default function PaymentCheckoutModal({ isOpen, onClose, application }: PaymentCheckoutModalProps) {
  const { processPaymentWithWebhook } = useApplication();

  const [provider, setProvider] = useState<'Mercado Pago' | 'Stripe' | 'Transferencia CBU'>('Transferencia CBU');
  const [autoDebit, setAutoDebit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWebhookValidating, setIsWebhookValidating] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCvu, setCopiedCvu] = useState(false);
  const [comprobanteRef, setComprobanteRef] = useState('');
  
  const [completedPayment, setCompletedPayment] = useState<SocialFeePayment | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  if (!isOpen || !application) return null;

  const bankData = ORGANIZATION_CONFIG.subscripcionBancaria;

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(bankData.alias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const handleCopyCvu = () => {
    navigator.clipboard.writeText(bankData.cvu);
    setCopiedCvu(true);
    setTimeout(() => setCopiedCvu(false), 2000);
  };

  const handleSimulateHostedCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsWebhookValidating(true);

      // Simulate webhook server call with signature check
      setTimeout(() => {
        setIsWebhookValidating(false);
        const result = processPaymentWithWebhook(application.id, provider, autoDebit);
        if (result.success) {
          setCompletedPayment(result.payment);
        }
      }, 1800);

    }, 1200);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setIsWebhookValidating(false);
    setCompletedPayment(null);
    setShowReceiptModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="bg-slate-950 border border-emerald-800/70 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 text-white">
          
          {/* Header */}
          <div className="bg-slate-900 border-b border-emerald-900/50 p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Pasarela Digital de Cuota Social
                </h3>
                <span className="text-[11px] text-emerald-400 font-mono">
                  CHECKOUT HOSTED • AMBIENTE SEGURO ENCRYPTADO
                </span>
              </div>
            </div>
            <button
              onClick={() => { handleReset(); onClose(); }}
              className="text-gray-400 hover:text-white p-2 rounded-xl border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            
            {/* Member Info Card */}
            <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Socio Adherente Aprobado</span>
                <h4 className="text-sm font-bold text-white">{application.nombre} {application.apellido}</h4>
                <span className="text-xs text-gray-400">DNI: {application.dni} • Código: {application.trackingCode}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">IMPORTE MENSUAL</span>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">ARS $10.000</span>
              </div>
            </div>

            {!completedPayment ? (
              <>
                {/* Provider Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-emerald-300 block">
                    Seleccioná la Pasarela Oficial de Pago:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => setProvider('Mercado Pago')}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                        provider === 'Mercado Pago'
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900 border-white/10 text-gray-400 hover:border-emerald-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">Mercado Pago</span>
                        {provider === 'Mercado Pago' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] text-gray-400 leading-tight">Tarjetas, Dinero en cuenta, Rapipago/PagoFácil</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProvider('Stripe')}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                        provider === 'Stripe'
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900 border-white/10 text-gray-400 hover:border-emerald-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">Stripe</span>
                        {provider === 'Stripe' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] text-gray-400 leading-tight">Tarjetas internacionales de débito/crédito</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProvider('Transferencia CBU')}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                        provider === 'Transferencia CBU'
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900 border-white/10 text-gray-400 hover:border-emerald-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">CBU / CVU</span>
                        {provider === 'Transferencia CBU' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] text-gray-400 leading-tight">Transferencia bancaria directa con comprobante</span>
                    </button>

                  </div>
                </div>

                {/* PROVIDER DETAILS / BANK TRANSFER BOX */}
                {provider === 'Transferencia CBU' ? (
                  <div className="bg-slate-900 border-2 border-emerald-500/70 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2.5">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        Datos Bancarios Oficiales de la Asociación Civil
                      </div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-800">
                        CUENTA OFICIAL
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      Realizá la transferencia desde cualquier banco o billetera virtual (Mercado Pago, Ualá, Naranja X, etc.) a los siguientes datos institucionales:
                    </p>

                    <div className="space-y-2.5 bg-slate-950 p-3.5 rounded-xl border border-white/10 font-mono text-xs">
                      
                      {/* Alias Box */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-emerald-900/40">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-sans font-semibold">ALIAS INSTITUCIONAL:</span>
                          <span className="text-sm font-extrabold text-emerald-300 tracking-wider">{bankData.alias}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyAlias}
                          className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-[11px] font-sans font-bold rounded-lg border border-emerald-700 flex items-center justify-center gap-1.5 transition-all shrink-0"
                        >
                          {copiedAlias ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>¡Alias Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Alias</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* CVU Box */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-emerald-900/40">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-sans font-semibold">CVU INTERBANCARIO:</span>
                          <span className="text-xs sm:text-sm font-extrabold text-white tracking-widest break-all">{bankData.cvu}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyCvu}
                          className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-[11px] font-sans font-bold rounded-lg border border-emerald-700 flex items-center justify-center gap-1.5 transition-all shrink-0"
                        >
                          {copiedCvu ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>¡CVU Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar CVU</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Titular & CUIT */}
                      <div className="pt-1 text-[11px] font-sans space-y-1">
                        <div>
                          <span className="text-gray-400">Titular de la Cuenta:</span>{' '}
                          <strong className="text-white block font-mono text-[11px]">{bankData.nombreTitular}</strong>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>CUIT: <strong>{bankData.cuit}</strong></span>
                          <span>Entidad: <strong>{bankData.banco}</strong></span>
                        </div>
                      </div>

                    </div>

                    {/* Transfer Reference / Proof Input */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold text-gray-300 block">
                        Número de Comprobante / Referencia de Transferencia (Opcional):
                      </label>
                      <input 
                        type="text"
                        value={comprobanteRef}
                        onChange={e => setComprobanteRef(e.target.value)}
                        placeholder="Ej: N° de transacción de MP o banco (Ej: 83921049)"
                        className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  /* Optional Auto-Debit Box for MP/Stripe */
                  <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoDebit}
                        onChange={e => setAutoDebit(e.target.checked)}
                        className="mt-0.5 rounded border-gray-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Adherir a Débito Automático Recurrente (Opcional)
                        </span>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          Autorizo el débito mensual de ARS 10.000 para el sostenimiento social. Podrás solicitar la baja o cancelación del débito automático en cualquier momento desde la sección "Solicitar Baja".
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Security Warning about Hosted Checkout */}
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-emerald-900/30 text-[11px] text-gray-300 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Seguridad de Datos Financieros:</strong> Esta Asociación Civil NO almacena ni procesa números de tarjetas ni claves bancarias en servidores propios. La operación se efectúa mediante el checkout seguro alojado por {provider}.
                  </p>
                </div>

                {/* Processing State Indicator */}
                {isProcessing || isWebhookValidating ? (
                  <div className="bg-emerald-950/90 border border-emerald-500/80 rounded-2xl p-6 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                    <h4 className="text-sm font-bold text-white">
                      {isProcessing ? "Conectando con Checkout Alojado..." : "Validando Webhook Criptográfico (Signature Verification)..."}
                    </h4>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto">
                      {isWebhookValidating 
                        ? "Verificando token HTTP HMAC-SHA256 del servidor de pago antes de activar la membresía..." 
                        : "Redirigiendo a entorno seguro de cobro..."}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulateHostedCheckout}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <span>{provider === 'Transferencia CBU' ? 'Confirmar Transferencia y Generar Recibo' : `Proceder al Checkout Seguro (${provider})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              /* Payment Success & Receipt View */
              <div className="bg-emerald-950/90 border border-emerald-500/80 rounded-2xl p-6 text-center space-y-5">
                <div className="w-12 h-12 bg-emerald-900 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-300 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                    WEBHOOK VERIFICADO • FIRMA SH256 OK
                  </span>
                  <h4 className="text-xl font-extrabold text-white mt-1">
                    ¡Pago de Cuota Social Confirmado!
                  </h4>
                  <p className="text-xs text-gray-200 mt-1 max-w-sm mx-auto">
                    Tu condición de Socio Adherente ha sido activada en forma oficial para el período {completedPayment.periodo}.
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-emerald-800/60 text-xs text-left space-y-2 font-mono">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Operación ID:</span>
                    <span className="text-emerald-300 font-bold">{completedPayment.operacionId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Período Abonado:</span>
                    <span className="text-white">{completedPayment.periodo}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Próximo Vencimiento:</span>
                    <span className="text-emerald-400">{completedPayment.fechaVencimiento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Importe:</span>
                    <span className="text-white font-bold">$10.000 ARS</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Ver y Descargar Recibo Oficial
                  </button>
                  <button
                    onClick={() => { handleReset(); onClose(); }}
                    className="bg-slate-900 hover:bg-slate-800 text-gray-300 border border-white/10 font-semibold px-5 py-3 rounded-xl text-xs transition-all"
                  >
                    Finalizar
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-950 border-t border-emerald-900/40 p-4 text-center text-[11px] text-gray-500">
            Asociación Civil Bio Extractos Medicinales • Aporte de Sostenimiento Institucional
          </div>

        </div>
      </div>

      {/* Sub-Modal Receipt */}
      <ReceiptModal 
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        payment={completedPayment}
        application={application}
      />
    </>
  );
}
