import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    motivo: 'Consulta de Admisión',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
            Canal de Comunicación
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">
            Atención Institucional e Informes
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Estamos a tu disposición para orientarte sobre la adhesión asociativa y el marco normativo de salud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Sede e Información Institucional
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Ubicación y Sede:</span>
                    <span className="text-gray-300">{ORGANIZATION_CONFIG.domicilioLegal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Correo Electrónico Oficial:</span>
                    <a href={`mailto:${ORGANIZATION_CONFIG.email}`} className="text-emerald-400 hover:underline">
                      {ORGANIZATION_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Atención Telefónica:</span>
                    <span className="text-gray-300">{ORGANIZATION_CONFIG.telefono}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Horarios de Atención:</span>
                    <span className="text-gray-300">{ORGANIZATION_CONFIG.horariosAtencion}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Urgencias Médicas:
              </span>
              <p className="leading-relaxed text-gray-300">
                La entidad no brinda guardia médica. Ante cualquier síntoma agudo o emergencia de salud, comuníquese telefónicamente al 107 (SAME / Emergencias Médicas) o diríjase al nosocomio más cercano.
              </p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-emerald-900/40 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Formulario de Consulta Institucional
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Envianos tu inquietud y responderemos dentro de las 24 a 48 horas hábiles.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Consulta Enviada Correctamente</h4>
                <p className="text-xs text-emerald-200">
                  Gracias por comunicarte con la Asociación Civil Bio Extractos Medicinales. Un representante de la Secretaría Administrativa te responderá a la brevedad.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-emerald-500 transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nombre}
                      onChange={e => setFormData({...formData, nombre: e.target.value})}
                      placeholder="Ej: Juan Manuel Pérez"
                      className="w-full bg-slate-900 border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="nombre@ejemplo.com"
                      className="w-full bg-slate-900 border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Teléfono de Contacto</label>
                    <input 
                      type="tel" 
                      value={formData.telefono}
                      onChange={e => setFormData({...formData, telefono: e.target.value})}
                      placeholder="Ej: 297 4123456"
                      className="w-full bg-slate-900 border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Motivo de la Consulta *</label>
                    <select
                      value={formData.motivo}
                      onChange={e => setFormData({...formData, motivo: e.target.value})}
                      className="w-full bg-slate-900 border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Consulta de Admisión">Consulta de Admisión</option>
                      <option value="Orientación REPROCANN">Orientación REPROCANN</option>
                      <option value="Duda sobre Cuota Social">Duda sobre Cuota Social</option>
                      <option value="Medios o Prensa">Prensa e Institucional</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Mensaje o Inquietud *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={e => setFormData({...formData, mensaje: e.target.value})}
                    placeholder="Escriba aquí su consulta institucional..."
                    className="w-full bg-slate-900 border border-emerald-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-900/30 text-[11px] text-gray-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Protegido bajo la Ley Nacional 25.326 de Protección de Datos Personales.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Enviar Consulta
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
