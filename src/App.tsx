import React, { useState } from 'react';
import { ApplicationProvider, useApplication } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurCommitment from './components/OurCommitment';
import AboutAssociation from './components/AboutAssociation';
import AdmissionProcess from './components/AdmissionProcess';
import ReprocannOrientation from './components/ReprocannOrientation';
import SocialFee from './components/SocialFee';
import Transparency from './components/Transparency';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import FooterSection from './components/FooterSection';
import AdherentFormModal from './components/AdherentFormModal';
import StatusTrackerModal from './components/StatusTrackerModal';
import SolicitarBajaModal from './components/SolicitarBajaModal';
import { PrivacyModal, TermsModal } from './components/PrivacyModal';

function MainAppContent() {
  const { activeView, setActiveView } = useApplication();

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isBajaModalOpen, setIsBajaModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-black">
      {/* Top Fixed Header */}
      <Navbar 
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onOpenApplicationModal={() => setIsApplicationModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="relative z-10">
        {activeView === 'admin' ? (
          <AdminPanel />
        ) : (
          <>
            {/* Hero Section */}
            <Hero 
              onOpenApplicationModal={() => setIsApplicationModalOpen(true)}
              onOpenProcess={() => scrollToSection('admision')}
              onOpenReprocannGuide={() => scrollToSection('reprocann')}
            />

            {/* Nuestro Compromiso (5 Pilares) */}
            <OurCommitment />

            {/* La Asociación Civil */}
            <AboutAssociation />

            {/* Admisión de Socios Adherentes */}
            <AdmissionProcess 
              onOpenApplicationModal={() => setIsApplicationModalOpen(true)}
              onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
            />

            {/* Orientación REPROCANN */}
            <ReprocannOrientation />

            {/* Cuota Social y Sostenimiento */}
            <SocialFee 
              onOpenApplicationModal={() => setIsApplicationModalOpen(true)}
              onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
              onOpenSolicitarBajaModal={() => setIsBajaModalOpen(true)}
            />

            {/* Transparencia y Gobierno */}
            <Transparency />

            {/* Preguntas Frecuentes */}
            <FAQSection />

            {/* Contacto Institucional */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <FooterSection 
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onOpenApplicationModal={() => setIsApplicationModalOpen(true)}
        onOpenSolicitarBajaModal={() => setIsBajaModalOpen(true)}
      />

      {/* Modals Layer */}
      <AdherentFormModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
      />

      <StatusTrackerModal 
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />

      <SolicitarBajaModal 
        isOpen={isBajaModalOpen}
        onClose={() => setIsBajaModalOpen(false)}
      />

      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ApplicationProvider>
      <MainAppContent />
    </ApplicationProvider>
  );
}
