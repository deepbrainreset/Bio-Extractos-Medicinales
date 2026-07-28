import React from 'react';
import { LegalDraftsModal } from './LegalDraftsModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: ModalProps) {
  return (
    <LegalDraftsModal 
      isOpen={isOpen}
      onClose={onClose}
      initialTab="privacidad"
    />
  );
}

export function TermsModal({ isOpen, onClose }: ModalProps) {
  return (
    <LegalDraftsModal 
      isOpen={isOpen}
      onClose={onClose}
      initialTab="terminos"
    />
  );
}
