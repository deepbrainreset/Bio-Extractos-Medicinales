import React, { useState } from 'react';
import { X, UserMinus, ShieldAlert, AlertCircle, CheckCircle2, Lock, Search, FileText } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { AdherentApplication } from '../types';

interface SolicitarBajaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolicitarBajaModal({ isOpen, onClose }: SolicitarBajaModalProps) {
  const { getApplicationByTracking, submitResignationRequest } = useApplication();

  const [searchInput, setSearchInput] = useState('');
  const [foundApp, setFoundApp] = useState<AdherentApplication | null>(null);
  const [searched, setSearched] = useState(false);

  const [motivo, setMotivo] = useState('');
  const [cancelaDebitos, setCancelaDebitos] = useState(true);
  const [aceptaTerminosBaja, setAceptaTerminosBaja] = useState(false);

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmittedMessage(null);
    if (!searchInput.trim()) return;

    const result = getApplicationByTracking(searchInput);
    setFoundApp(result || null);
    setSearched(true);
  };

  const handleSubmitBaja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundApp) return;

    if (!aceptaTerminosBaja) {
      setErrorMessage("Debés confirmar la lectura y aceptación sobre el tratamiento de las cuotas devengadas.");
      return;
    }

    const res = submitResignationRequest(foundApp.trackingCode, motivo, cancelaDebitos);
    if (res.success) {
      setSubmittedMessage(res.message);
      setErrorMessage(null);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    setFoundApp(null);
    setSearched(false);
    setMotivo('');
    setCancelaDebitos(true);
    setAceptaTerminosBaja(false);
    setSubmittedMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-800/70 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 text-white">
        
        {/* Header */}
        <div className="bg-slate-900 border-b border-emerald-900/50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-950 border border-rose-700/60 flex items-center justify-center text-rose-400">
              <UserMinus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Solicitud de Baja y Desvinculación Societaria
              </h3>
              <span className="text-[11px] text-gray-400">
                Cancelación de cuota social y retiro voluntario de la Asociación
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

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Statutory Rule Banner on Accrued Fees */}
          <div className="bg-amber-950/70 border border-amber-500/50 rounded-2xl p-4.5 text-xs text-amber-100 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              Tratamiento Estatutario de Cuotas Devengadas
            </div>
            <p className="text-amber-100/90 leading-relaxed text-[11px]">
              Conforme al estatuto asociativo y la normativa vigente, <strong className="text-white">las cuotas sociales abonadas o devengadas con anterioridad corresponden al período transcurrido de sostenimiento institucional</strong> y no son reembolsables. La solicitud de baja detiene en forma inmediata la generación de nuevos vencimientos y cancela renovaciones automáticas futuras.
            </p>
          </div>

          {!submittedMessage ? (
            <>
              {/* Step 1: Search Application or Member */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-300 block">
                  1. Buscá tu perfil de socio o solicitud digital:
                </label>
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
              </div>

              {/* Search Result */}
              {searched && (
                <div>
                  {foundApp ? (
                    <div className="bg-slate-900 border border-emerald-800/60 rounded-2xl p-5 space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] text-gray-400 font-mono block">CÓDIGO: {foundApp.trackingCode}</span>
                          <h4 className="text-sm font-bold text-white">
                            {foundApp.nombre} {foundApp.apellido}
                          </h4>
                          <span className="text-xs text-gray-400">DNI: {foundApp.dni} • Email: {foundApp.email}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          foundApp.membresiaActiva ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-950 text-gray-400 border border-gray-700'
                        }`}>
                          {foundApp.membresiaActiva ? 'Socio Activo' : 'Solicitante'}
                        </span>
                      </div>

                      {foundApp.solicitudBaja ? (
                        <div className="bg-rose-950/80 border border-rose-500/60 p-4 rounded-xl text-xs text-rose-200 space-y-1">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-400" />
                            Solicitud de Baja Previamente Registrada
                          </span>
                          <p className="text-[11px] text-gray-300">
                            Ya existe un trámite de desvinculación para este socio ({foundApp.solicitudBaja.fechaSolicitud}). Estado actual: <strong className="uppercase text-rose-300">{foundApp.solicitudBaja.estadoBaja}</strong>.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitBaja} className="space-y-4 pt-2">
                          <div>
                            <label className="text-xs font-semibold text-gray-300 block mb-1">
                              Motivo de la desvinculación (Opcional):
                            </label>
                            <textarea
                              rows={2}
                              value={motivo}
                              onChange={e => setMotivo(e.target.value)}
                              placeholder="Podés indicarnos brevemente el motivo para ayudarnos a mejorar..."
                              className="w-full bg-slate-950 border border-emerald-900/50 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-2.5 bg-slate-950 p-3.5 rounded-xl border border-white/5">
                            <label className="flex items-start gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={cancelaDebitos}
                                onChange={e => setCancelaDebitos(e.target.checked)}
                                className="mt-0.5 rounded border-gray-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-xs text-gray-200">
                                <strong className="text-white">Cancelar renovaciones futuras:</strong> Solicito detener cualquier débito automático o cobro recurrente programado para períodos posteriores.
                              </span>
                            </label>

                            <label className="flex items-start gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                required
                                checked={aceptaTerminosBaja}
                                onChange={e => setAceptaTerminosBaja(e.target.checked)}
                                className="mt-0.5 rounded border-gray-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-xs text-amber-200">
                                <strong className="text-amber-300">Aceptación de tratamiento de cuotas devengadas:</strong> Entiendo que las cuotas sociales abonadas hasta la fecha corresponden al período transcurrido de sostenimiento institucional y no son reembolsables según el estatuto.
                              </span>
                            </label>
                          </div>

                          {errorMessage && (
                            <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              <span>{errorMessage}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                          >
                            <UserMinus className="w-4 h-4" />
                            Confirmar y Enviar Solicitud de Baja
                          </button>
                        </form>
                      )}

                    </div>
                  ) : (
                    <div className="p-6 bg-slate-900 rounded-2xl border border-gray-800 text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Código o DNI no encontrado</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto">
                        Verificá haber ingresado correctamente tu código de trámite (Ej: BIO-2026-8921) o tu número de DNI.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="bg-emerald-950/90 border border-emerald-500/80 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-900 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-300 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-extrabold text-white">
                Solicitud de Baja Registrada
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed max-w-md mx-auto">
                {submittedMessage}
              </p>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-emerald-800/50 text-[11px] text-gray-300 text-left space-y-1">
                <span className="font-bold text-emerald-400 block">Resumen del Trámite de Baja:</span>
                <p>• Socio: {foundApp?.nombre} {foundApp?.apellido} (DNI {foundApp?.dni})</p>
                <p>• Código: {foundApp?.trackingCode}</p>
                <p>• Cancelación de Débitos Futuros: CONFIRMADA</p>
                <p>• Notificación enviada a la Comisión Directiva para actualización del libro de socios.</p>
              </div>
              <button
                onClick={() => { handleReset(); onClose(); }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all"
              >
                Cerrar Ventana
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-emerald-900/40 p-4 text-center text-[11px] text-gray-500">
          Asociación Civil Bio Extractos Medicinales • Estatuto Social & Ley de Protección de Datos Personales N° 25.326
        </div>

      </div>
    </div>
  );
}
