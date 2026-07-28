import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Search, UserCheck, Lock, FileText, HelpCircle, HeartHandshake, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApplication } from '../context/ApplicationContext';
import { ORGANIZATION_CONFIG } from '../config/organization';

interface NavbarProps {
  onOpenTrackingModal: () => void;
  onOpenApplicationModal: () => void;
}

export default function Navbar({ onOpenTrackingModal, onOpenApplicationModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeView, setActiveView, isAdminAuthenticated } = useApplication();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio', view: 'home' as const },
    { name: 'La Asociación', href: '#asociacion', view: 'asociacion' as const },
    { name: 'Admisión', href: '#admision', view: 'admision' as const },
    { name: 'Orientación REPROCANN', href: '#reprocann', view: 'reprocann' as const },
    { name: 'Cuota Social', href: '#cuota-social', view: 'cuota' as const },
    { name: 'Transparencia', href: '#transparencia', view: 'transparencia' as const },
    { name: 'FAQ', href: '#faq', view: 'faq' as const },
    { name: 'Contacto', href: '#contacto', view: 'contacto' as const },
  ];

  const handleNavClick = (href: string, viewName: any) => {
    setActiveView(viewName);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-emerald-900/40 py-3 shadow-2xl' : 'bg-gradient-to-b from-black/90 via-black/70 to-transparent py-4'
    }`}>
      {/* Top Banner Disclaimer */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/30 text-emerald-300/90 text-xs py-1 px-4 text-center hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Asociación Civil sin fines de lucro enmarcada en Ley Nacional 27.350 y Ley Provincial Chubut 790/24
          </span>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenTrackingModal}
              className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-2"
            >
              <Search className="w-3 h-3" /> Consultar Estado de Solicitud
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveView('admin')}
              className="hover:text-emerald-200 transition-colors flex items-center gap-1 font-medium"
            >
              <Lock className="w-3 h-3" /> Panel Directiva {isAdminAuthenticated ? '(Autenticado)' : ''}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button 
            onClick={() => handleNavClick('#inicio', 'home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img 
              src="https://res.cloudinary.com/dw4k14vmn/image/upload/v1784507584/1000075422_jp4uoc.webp" 
              alt="Logo Bio Extractos Medicinales" 
              className="w-10 h-10 object-contain rounded-full border border-emerald-500/30 shadow-md group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight group-hover:text-emerald-400 transition-colors">
                Bio Extractos Medicinales
              </span>
              <span className="text-[11px] font-medium text-emerald-400/80 tracking-wide uppercase">
                Asociación Civil • Chubut
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.view);
                }}
                className={`font-medium transition-colors ${
                  activeView === link.view 
                    ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400 pb-1' 
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTrackingModal}
              className="px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white border border-emerald-800/50 hover:border-emerald-600 rounded-full transition-all flex items-center gap-1.5 bg-emerald-950/20"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              Estado Solicitud
            </button>

            <button
              onClick={() => {
                onOpenApplicationModal();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              Solicitar Adhesión
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={onOpenApplicationModal}
              className="md:hidden bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold"
            >
              Adherirse
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg border border-white/10"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-black/98 backdrop-blur-xl border-b border-emerald-900/40 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 text-xs text-emerald-200/90 mb-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Asociación Civil sin fines de lucro regulada por Ley 27.350 y Ley Provincial 790/24.</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.view);
                  }}
                  className="block px-3.5 py-2.5 text-base font-medium text-gray-200 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenApplicationModal();
                  }}
                  className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <UserCheck className="w-5 h-5" />
                  Solicitar Adhesión a la Asociación
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTrackingModal();
                  }}
                  className="w-full text-center bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  Consultar Estado de Mi Solicitud
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveView('admin');
                  }}
                  className="w-full text-center text-xs text-gray-400 hover:text-emerald-300 py-2 flex items-center justify-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5" /> Acceso Exclusivo Comisión Directiva
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
