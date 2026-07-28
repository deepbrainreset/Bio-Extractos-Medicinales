import React, { useState } from 'react';
import { X, Search, ShieldCheck, CheckCircle2, Clock, AlertCircle, Lock, ExternalLink, FileText } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { AdherentApplication } from '../types';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatusTrackerModal({ isOpen, onClose }: StatusTrackerModalProps) {
  const { getApplicationByTracking, activeTrackingSearch, setActiveTrackingSearch } = useApplication();
  const [searchInput, setSearchInput] = useState(activeTrackingSearch || '');
  const [foundApp, setFoundApp] = useState<AdherentApplication | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const result = getApplicationByTracking(searchInput);
    setFoundApp(result || null);
    setSearched(true);
    setActiveTrackingSearch(searchInput);
  };

  const getStatusBadge = (status: AdherentApplication['estado']) => {
    switch (status) {
      case 'aprobado_comision':
        return (
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 inline-flex">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Aprobado por Comisión Directiva
          </span>
        );
      case 'en_evaluacion_medica':
        return (
          <span className="bg-blue-950 text-blue-300 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 inline-flex">
            <Clock className="w-4 h-4 text-blue-400" /> En Evaluación Médica y Legal
          </span>
        );
      case 'requiere_documentacion':
        return (
          <span className="bg-amber-950 text-amber-300 border border-amber-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 inline-flex">
            <AlertCircle className="w-4 h-4 text-amber-400" /> Requiere Documentación Adicional
          </span>
        );
      case 'rechazado':
        return (
          <span className="bg-rose-950 text-rose-300 border border-rose-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 inline-flex">
            <X className="w-4 h-4 text-rose-400" /> Solicitud No Aprobada
          </span>
        );
      default:
        return (
          <span className="bg-slate-900 text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 inline-flex">
            <Clock className="w-4 h-4 text-emerald-400" /> Pendiente de Revisión Directiva
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-800/60 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 text-white">
        
        {/* Header */}
        <div className="bg-slate-900 border-b border-emerald-900/40 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Consulta de Estado de Solicitud Digital
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text"
              required
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Ingresá tu Código (Ej: BIO-2026-8921) o tu DNI"
              className="flex-1 bg-slate-900 border border-emerald-900/60 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl text-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" /> Buscar
            </button>
          </form>

          {searched && (
            <div>
              {foundApp ? (
                <div className="bg-slate-900 border border-emerald-800/50 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-mono">CÓDIGO: {foundApp.trackingCode}</span>
                      <h4 className="text-base font-bold text-white">
                        Solicitante: {foundApp.nombre} {foundApp.apellido}
                      </h4>
                      <span className="text-xs text-gray-400">DNI: {foundApp.dni} • Fecha: {foundApp.fechaSolicitud}</span>
                    </div>
                    {getStatusBadge(foundApp.estado)}
                  </div>

                  {/* Commission Notes */}
                  {foundApp.notasComision && (
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/30 text-xs space-y-1">
                      <span className="font-semibold text-emerald-400 block">Dictamen de la Comisión Directiva:</span>
                      <p className="text-gray-300 leading-relaxed">{foundApp.notasComision}</p>
                      {foundApp.revisadoPor && (
                        <span className="text-[10px] text-gray-500 block pt-1">Firmado: {foundApp.revisadoPor} ({foundApp.fechaRevision})</span>
                      )}
                    </div>
                  )}

                  {/* Payment Enabled Box if Approved */}
                  {foundApp.estado === 'aprobado_comision' ? (
                    <div className="bg-emerald-950/90 border border-emerald-500 p-4 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ¡Adhesión Aprobada! Pago de Cuota Social Habilitado:
                      </div>
                      <p className="text-xs text-gray-200">
                        La Comisión Directiva ha aprobado tu solicitud como Socio Adherente. Podés realizar el abono de tu cuota social asociativa mediante el enlace seguro de pasarela:
                      </p>
                      <button
                        onClick={() => alert(`SISTEMA DE PAGO DIGITAL\n\nPasarela de Pago Habilitada para ${foundApp.nombre} ${foundApp.apellido}.\n\nSe abre la plataforma Mercado Pago / Transferencia bancaria oficial de la Asociación Civil.\n\nLink Generado: ${foundApp.linkPagoGenerado}`)}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Abonar Cuota Social Digital
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                      <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-300">
                        <strong className="text-white">Aviso de Cobro:</strong> El enlace de pago de la cuota social está deshabilitado temporalmente hasta que la Comisión Directiva resuelva la aprobación de tu expediente.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-slate-900 rounded-2xl border border-gray-800 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Código o DNI no encontrado</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Verificá haber ingresado correctamente tu código (Ej: BIO-2026-8921) o tu número de DNI.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
