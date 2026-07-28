import React from 'react';
import { Shield, Building2, Lock, FileText, Search, Mail, Phone, MapPin } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';
import { useApplication } from '../context/ApplicationContext';

interface FooterSectionProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenTrackingModal: () => void;
  onOpenApplicationModal: () => void;
  onOpenSolicitarBajaModal?: () => void;
}

export default function FooterSection({ 
  onOpenPrivacy, 
  onOpenTerms, 
  onOpenTrackingModal,
  onOpenApplicationModal,
  onOpenSolicitarBajaModal
}: FooterSectionProps) {
  const { setActiveView } = useApplication();

  return (
    <footer className="bg-slate-950 border-t border-emerald-900/40 text-gray-400 text-xs py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://res.cloudinary.com/dw4k14vmn/image/upload/v1784507584/1000075422_jp4uoc.webp" 
                alt="Logo Bio Extractos Medicinales" 
                className="w-10 h-10 object-contain rounded-full border border-emerald-500/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-base font-bold text-white block leading-tight">
                  {ORGANIZATION_CONFIG.name}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {ORGANIZATION_CONFIG.legalType} • Chubut
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-xs max-w-sm">
              Entidad sin fines de lucro destinada a la investigación, salud comunitaria, asesoramiento legal y acompañamiento de pacientes en el marco de la Ley 27.350 y Ley Provincial Chubut 790/24.
            </p>

            <div className="p-3 bg-slate-900/90 rounded-2xl border border-emerald-900/30 space-y-1 text-[11px] text-gray-300">
              <div><strong className="text-white">CUIT:</strong> {ORGANIZATION_CONFIG.cuit}</div>
              <div><strong className="text-white">Matrícula Personería:</strong> {ORGANIZATION_CONFIG.matricula}</div>
              <div><strong className="text-white">Domicilio Legal:</strong> {ORGANIZATION_CONFIG.domicilioLegal}</div>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" onClick={() => setActiveView('home')} className="hover:text-emerald-400 transition-colors">Inicio</a></li>
              <li><a href="#asociacion" onClick={() => setActiveView('asociacion')} className="hover:text-emerald-400 transition-colors">La Asociación Civil</a></li>
              <li><a href="#admision" onClick={() => setActiveView('admision')} className="hover:text-emerald-400 transition-colors">Proceso de Admisión</a></li>
              <li><a href="#reprocann" onClick={() => setActiveView('reprocann')} className="hover:text-emerald-400 transition-colors">Guía REPROCANN</a></li>
              <li><a href="#cuota-social" onClick={() => setActiveView('cuota')} className="hover:text-emerald-400 transition-colors">Cuota Social</a></li>
              <li><a href="#transparencia" onClick={() => setActiveView('transparencia')} className="hover:text-emerald-400 transition-colors">Transparencia y Balances</a></li>
              <li><a href="#faq" onClick={() => setActiveView('faq')} className="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Services & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Gestión Digital</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenApplicationModal} className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                  Solicitar Adhesión Digital
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackingModal} className="hover:text-emerald-300 flex items-center gap-1">
                  <Search className="w-3 h-3 text-emerald-400" /> Consultar Estado de Solicitud
                </button>
              </li>
              {onOpenSolicitarBajaModal && (
                <li>
                  <button onClick={onOpenSolicitarBajaModal} className="hover:text-rose-300 flex items-center gap-1 text-gray-400">
                    Solicitar Baja / Cancelar Cuota
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-emerald-300 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Acceso Comisión Directiva
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-emerald-300">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-emerald-300">
                  Términos y Condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atención y Sede</h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Comodoro Rivadavia, Chubut</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{ORGANIZATION_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{ORGANIZATION_CONFIG.telefono}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Mandatory Disclaimers Banner */}
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 text-[11px] text-gray-300 space-y-2">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
            <Shield className="w-4 h-4" /> Marcos Regulatorios y Límites Legales
          </div>
          <p className="leading-relaxed">
            {ORGANIZATION_CONFIG.disclaimers.legalNotice}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div>
            © 2026 {ORGANIZATION_CONFIG.name}. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">
              Privacidad de Datos (Ley 25.326)
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors">
              Estatuto Social
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
