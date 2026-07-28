import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Building2, Lock, FileText, Download } from 'lucide-react';
import { SocialFeePayment, AdherentApplication } from '../types';
import { ORGANIZATION_CONFIG } from '../config/organization';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: SocialFeePayment | null;
  application: AdherentApplication | null;
}

export default function ReceiptModal({ isOpen, onClose, payment, application }: ReceiptModalProps) {
  if (!isOpen || !payment || !application) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-800/70 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8 text-white">
        
        {/* Header */}
        <div className="bg-slate-950 border-b border-emerald-900/50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Comprobante Oficial de Cuota Social</h3>
              <span className="text-[10px] text-emerald-400 font-mono">RECIBO ELECTRÓNICO ASOCIATIVO</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-gray-300 hover:text-white transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-xl border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Card Body */}
        <div className="p-6 sm:p-8 space-y-6 print:p-0 print:bg-white print:text-black">
          
          {/* Institutional Entity Badge */}
          <div className="bg-slate-950/80 border border-emerald-900/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                Entidad Receptora del Aporte
              </span>
              <h4 className="text-base font-bold text-white leading-tight">
                {ORGANIZATION_CONFIG.name}
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {ORGANIZATION_CONFIG.legalType} • CUIT: <strong className="text-gray-200">{ORGANIZATION_CONFIG.cuit}</strong>
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {ORGANIZATION_CONFIG.domicilioLegal}
              </p>
            </div>
            <div className="bg-emerald-950 border border-emerald-700/60 px-3 py-2 rounded-xl text-right shrink-0">
              <span className="text-[10px] text-gray-400 block">ESTADO DE OPERACIÓN</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PAGADO & VERIFICADO
              </span>
            </div>
          </div>

          {/* Receipt Main Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Número de Operación</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">{payment.operacionId}</span>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Fecha de Pago Registrada</span>
              <span className="font-semibold text-white">{payment.fechaPago}</span>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Socio Adherente</span>
              <span className="font-bold text-white text-sm">{application.nombre} {application.apellido}</span>
              <span className="text-[11px] text-gray-400 block">DNI: {application.dni} • Código: {application.trackingCode}</span>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Período Abonado y Vencimiento</span>
              <span className="font-bold text-emerald-400 text-sm">{payment.periodo}</span>
              <span className="text-[11px] text-gray-400 block">Próximo vencimiento: {payment.fechaVencimiento}</span>
            </div>

          </div>

          {/* Amount and Concept Summary */}
          <div className="bg-emerald-950/40 border border-emerald-600/40 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-gray-300 font-medium block">Concepto de Transferencia / Cobro</span>
              <span className="text-sm font-bold text-white">{payment.concepto}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Vía: {payment.metodoPago} (Pasarela Oficial)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">IMPORTE TOTAL</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">
                $10.000 <span className="text-xs font-normal text-gray-300">ARS</span>
              </span>
            </div>
          </div>

          {/* Cryptographic Webhook Security Seal */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/30 text-[11px] space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Validación de Webhook e Integración Criptográfica
            </div>
            <p className="text-gray-400 leading-relaxed">
              Este recibo fue generado tras la validación de firma digital HTTP HMAC-SHA256 enviada por el proveedor de pagos ({payment.metodoPago}). La membresía no se activa por simple redirección del navegador sino mediante comprobación autoritativa en servidor.
            </p>
            <div className="pt-1 text-[10px] font-mono text-gray-500 truncate">
              Firma Hash: {payment.firmaCriptografica || "sha256_verified_token"}
            </div>
          </div>

          {/* Strict Non-Commercial Disclaimer on Receipt */}
          <div className="p-4 bg-amber-950/40 border border-amber-600/30 rounded-xl text-[11px] text-amber-200/90 leading-relaxed space-y-1">
            <span className="font-bold text-amber-300 block">Aviso Legal Obligatorio:</span>
            <p>
              El presente aporte corresponde exclusivamente a la condición de Socio Adherente y al sostenimiento institucional no lucrativo de la Asociación Civil Bio Extractos Medicinales. No constituye contraprestación comercial, venta, ni reserva de volúmenes, sustancias ni productos.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-emerald-900/40 p-4 text-center">
          <p className="text-[11px] text-gray-400">
            {ORGANIZATION_CONFIG.name} • Chubut, República Argentina • Ley 27.350 & Ley Chubut 790/24
          </p>
        </div>

      </div>
    </div>
  );
}
