import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Lock, 
  User, 
  Heart, 
  ArrowRight, 
  ArrowLeft,
  Printer,
  Edit3,
  Building2,
  FileSpreadsheet,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { ReprocannStatus, MedicalIndicationStatus, AdherentApplication } from '../types';
import { ORGANIZATION_CONFIG } from '../config/organization';

interface AdherentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrackingModal: () => void;
}

export default function AdherentFormModal({ isOpen, onClose, onOpenTrackingModal }: AdherentFormModalProps) {
  const { submitApplication } = useApplication();
  
  // Steps: 1: Personales, 2: Situación Documental, 3: Declaraciones, 4: Revisión, 5: Confirmación/Comprobante
  const [step, setStep] = useState<number>(1);
  const [submittedApp, setSubmittedApp] = useState<AdherentApplication | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCvu, setCopiedCvu] = useState(false);

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

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Data
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    domicilio: '',
    localidad: 'Comodoro Rivadavia',
    provincia: 'Chubut',
    email: '',
    telefono: '',
    ocupacion: '',

    // Minor / Legal Representative
    esMenorEdad: false,
    nombreRepresentanteLegal: '',
    dniRepresentanteLegal: '',
    vinculoRepresentanteLegal: 'Padre/Madre',

    // Step 2: Medical / REPROCANN
    indicacionMedicaStatus: 'si' as MedicalIndicationStatus,
    fechaEmisionReceta: '',
    nombreMedico: '',
    matriculaMedico: '',
    especialidadMedico: 'Clínica Médica / Endocannabinología',
    motivoSalud: '',
    archivoMedicoNombre: '',

    estadoReprocann: 'vigente' as ReprocannStatus,
    numeroVinculacionReprocann: '',

    // Simulated Attachments
    adjuntoDNI: 'DNI_Frente_Dorso.pdf',
    adjuntoOrdenMedica: 'Indicacion_Medica_Digital.pdf',
    adjuntoPoderLegal: '',

    // Step 3: Declarations
    declaracionUsoMedicinal: false,
    aceptaTerminos: false,
    aceptaProteccionDatos: false,
    aceptaCondicionesAdmision: false,
  });

  if (!isOpen) return null;

  // Age calculation
  const calculateAge = (birthDateStr: string) => {
    if (!birthDateStr) return 0;
    const birth = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge(formData.fechaNacimiento);
  const isMinor = formData.fechaNacimiento !== '' && currentAge < 18;

  // Validation functions per step
  const validateStep1 = (): boolean => {
    setValidationError(null);
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      setValidationError("Ingresá tu nombre y apellido completo.");
      return false;
    }
    const cleanDni = formData.dni.replace(/\D/g, '');
    if (!cleanDni || cleanDni.length < 7 || cleanDni.length > 9) {
      setValidationError("El DNI debe ser numérico y contener entre 7 y 9 dígitos.");
      return false;
    }
    if (!formData.fechaNacimiento) {
      setValidationError("Ingresá tu fecha de nacimiento.");
      return false;
    }
    if (isMinor) {
      if (!formData.nombreRepresentanteLegal.trim() || !formData.dniRepresentanteLegal.trim()) {
        setValidationError("Por ser menor de 18 años, es obligatorio ingresar Nombre y DNI del Representante Legal.");
        return false;
      }
    }
    if (!formData.domicilio.trim() || !formData.localidad.trim()) {
      setValidationError("Ingresá tu domicilio y localidad.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setValidationError("Ingresá una dirección de correo electrónico válida.");
      return false;
    }
    const cleanPhone = formData.telefono.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setValidationError("Ingresá un número de teléfono celular válido (mínimo 8 dígitos).");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    setValidationError(null);
    if (formData.indicacionMedicaStatus === 'si') {
      if (!formData.nombreMedico.trim()) {
        setValidationError("Ingresá el nombre y apellido del profesional médico.");
        return false;
      }
      if (!formData.matriculaMedico.trim()) {
        setValidationError("Ingresá la matrícula médica (MP o MN).");
        return false;
      }
    }
    if (formData.estadoReprocann === 'vigente' || formData.estadoReprocann === 'en_tramite') {
      if (!formData.numeroVinculacionReprocann.trim()) {
        setValidationError("Ingresá tu código de vinculación o número de trámite REPROCANN.");
        return false;
      }
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    setValidationError(null);
    if (!formData.declaracionUsoMedicinal) {
      setValidationError("Debes declarar bajo juramento el uso estrictamente medicinal.");
      return false;
    }
    if (!formData.aceptaTerminos) {
      setValidationError("Debes aceptar los términos y condiciones de la solicitud de ingreso.");
      return false;
    }
    if (!formData.aceptaProteccionDatos) {
      setValidationError("Debes aceptar la política de protección de datos personales de salud (Ley 25.326).");
      return false;
    }
    if (!formData.aceptaCondicionesAdmision) {
      setValidationError("Debes confirmar explícitamente haber comprendido que la solicitud no garantiza la admisión automática ni el cobro inmediato.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setValidationError(null);
    setStep(s => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setValidationError(null);
    setStep(s => Math.max(s - 1, 1));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("El archivo excede el tamaño máximo permitido de 10 MB.");
        return;
      }
      setFormData(prev => ({
        ...prev,
        [field]: file.name,
        archivoMedicoNombre: field === 'adjuntoOrdenMedica' ? file.name : prev.archivoMedicoNombre
      }));
    }
  };

  const handleSubmitFinal = () => {
    if (!validateStep3()) return;

    // Generate anonymized IP hash and security token for legal audit trail
    const ipHash = `hash_ip_${Math.random().toString(36).substring(2, 12)}`;
    const tokenSec = `tok_adm_${Math.floor(1000 + Math.random() * 9000)}_sec`;

    const newApp = submitApplication({
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      dni: formData.dni.replace(/\D/g, ''),
      fechaNacimiento: formData.fechaNacimiento,
      esMenorEdad: isMinor,
      nombreRepresentanteLegal: isMinor ? formData.nombreRepresentanteLegal : undefined,
      dniRepresentanteLegal: isMinor ? formData.dniRepresentanteLegal : undefined,
      vinculoRepresentanteLegal: isMinor ? formData.vinculoRepresentanteLegal : undefined,
      domicilio: formData.domicilio.trim(),
      localidad: formData.localidad.trim(),
      provincia: formData.provincia.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      ocupacion: formData.ocupacion.trim() || 'No especificada',

      indicacionMedicaStatus: formData.indicacionMedicaStatus,
      fechaEmisionReceta: formData.fechaEmisionReceta || undefined,
      nombreMedico: formData.nombreMedico || undefined,
      matriculaMedico: formData.matriculaMedico || undefined,
      especialidadMedico: formData.especialidadMedico || undefined,
      motivoSalud: formData.motivoSalud || undefined,

      estadoReprocann: formData.estadoReprocann,
      numeroVinculacionReprocann: formData.numeroVinculacionReprocann || undefined,

      adjuntoDNI: formData.adjuntoDNI,
      adjuntoOrdenMedica: formData.adjuntoOrdenMedica,
      adjuntoPoderLegal: isMinor ? 'Poder_Tutela_Representante.pdf' : undefined,

      aceptaTerminos: formData.aceptaTerminos,
      aceptaProteccionDatos: formData.aceptaProteccionDatos,
      declaracionUsoMedicinal: formData.declaracionUsoMedicinal,
      aceptaCondicionesAdmision: formData.aceptaCondicionesAdmision,

      versionTerminosAccepted: "v2026.1-LEY25326",
      ipHasheada: ipHash,
      tokenUnico: tokenSec,
    });

    setSubmittedApp(newApp);
    setStep(5); // Go to step 5: Receipt / Confirmation
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-800/60 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-6 text-white print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Header */}
        <div className="bg-slate-900 border-b border-emerald-900/40 p-4 sm:p-5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Solicitud Digital de Socio Adherente
              </h3>
              <p className="text-xs text-emerald-400">
                {ORGANIZATION_CONFIG.name} • Admisión Regulada
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0">
          
          {/* Progress Step Bar (Only shown on steps 1-4) */}
          {step <= 4 && (
            <div className="mb-6 print:hidden">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs font-bold">
                <div className={`py-2 rounded-xl border transition-all ${step >= 1 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-slate-900 border-gray-800 text-gray-500'}`}>
                  1. Personales
                </div>
                <div className={`py-2 rounded-xl border transition-all ${step >= 2 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-slate-900 border-gray-800 text-gray-500'}`}>
                  2. Documental
                </div>
                <div className={`py-2 rounded-xl border transition-all ${step >= 3 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-slate-900 border-gray-800 text-gray-500'}`}>
                  3. Declaraciones
                </div>
                <div className={`py-2 rounded-xl border transition-all ${step >= 4 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-slate-900 border-gray-800 text-gray-500'}`}>
                  4. Revisión
                </div>
              </div>
            </div>
          )}

          {/* Validation Alert Message */}
          {validationError && (
            <div className="mb-4 p-3.5 bg-rose-950/80 border border-rose-600 rounded-2xl text-rose-200 text-xs flex items-center gap-2.5 animate-pulse print:hidden">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: Datos Personales */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> Paso 1 de 5: Datos Personales y de Identidad
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Ingresá los datos filiatorios del titular solicitante conforme a DNI argentino.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Nombre/s Completo *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Ej: María Elena"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Apellido/s Completo *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.apellido}
                    onChange={e => setFormData({...formData, apellido: e.target.value})}
                    placeholder="Ej: González"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Número de DNI *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.dni}
                    onChange={e => setFormData({...formData, dni: e.target.value})}
                    placeholder="Ej: 34521890 (sin puntos)"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Fecha de Nacimiento *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.fechaNacimiento}
                    onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})}
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Special Flow for Minors (< 18 years old) */}
              {isMinor && (
                <div className="p-4 bg-amber-950/60 border border-amber-500/50 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    Solicitante Menor de Edad (Menor de 18 años)
                  </div>
                  <p className="text-[11px] text-amber-100 leading-relaxed">
                    Dado que la persona solicitante es menor de edad, se requiere la intervención y representación legal de su madre, padre o tutor acreditado. La documentación requerirá revisión legal por la Comisión Directiva.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-200 mb-1">Nombre Representante *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.nombreRepresentanteLegal}
                        onChange={e => setFormData({...formData, nombreRepresentanteLegal: e.target.value})}
                        placeholder="Ej: Carlos González"
                        className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-200 mb-1">DNI Representante *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.dniRepresentanteLegal}
                        onChange={e => setFormData({...formData, dniRepresentanteLegal: e.target.value})}
                        placeholder="DNI del adulto a cargo"
                        className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-200 mb-1">Vínculo Legal *</label>
                      <select 
                        value={formData.vinculoRepresentanteLegal}
                        onChange={e => setFormData({...formData, vinculoRepresentanteLegal: e.target.value})}
                        className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Padre/Madre">Padre / Madre</option>
                        <option value="Tutor Legal">Tutor Legal nombrado</option>
                        <option value="Representante Curador">Representante Curador</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Domicilio Real *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.domicilio}
                    onChange={e => setFormData({...formData, domicilio: e.target.value})}
                    placeholder="Calle, Número, Barrio, Piso/Dpto"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Localidad / Partido *</label>
                  <select
                    value={formData.localidad}
                    onChange={e => setFormData({...formData, localidad: e.target.value})}
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Comodoro Rivadavia">Comodoro Rivadavia</option>
                    <option value="Rada Tilly">Rada Tilly</option>
                    <option value="Trelew">Trelew</option>
                    <option value="Puerto Madryn">Puerto Madryn</option>
                    <option value="Esquel">Esquel</option>
                    <option value="Rawson">Rawson</option>
                    <option value="Sarmiento">Sarmiento</option>
                    <option value="Resto de Chubut">Resto de Chubut</option>
                    <option value="Resto de Argentina">Otra Provincia de Argentina</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Provincia *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.provincia}
                    onChange={e => setFormData({...formData, provincia: e.target.value})}
                    placeholder="Ej: Chubut"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Teléfono Celular *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.telefono}
                    onChange={e => setFormData({...formData, telefono: e.target.value})}
                    placeholder="Ej: 2974123456"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Situación Documental y REPROCANN */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Paso 2 de 5: Situación Documental y REPROCANN
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Declará tu situación respecto a la indicación médica y la vinculación con el registro nacional.
                </p>
              </div>

              {/* Indicación Médica Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-white">
                  ¿Cuenta con indicación o receta médica para cannabis medicinal? *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, indicacionMedicaStatus: 'si'})}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                      formData.indicacionMedicaStatus === 'si'
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-900 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span className="font-bold block mb-1">Sí, cuento con indicación</span>
                    <span className="text-[10px] text-gray-400">Poseo receta / orden de profesional matriculado.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, indicacionMedicaStatus: 'no'})}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                      formData.indicacionMedicaStatus === 'no'
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-900 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span className="font-bold block mb-1">No cuento con indicación</span>
                    <span className="text-[10px] text-gray-400">Aún no dispongo de orden médica.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, indicacionMedicaStatus: 'prefiero_orientacion'})}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                      formData.indicacionMedicaStatus === 'prefiero_orientacion'
                        ? 'bg-emerald-950 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-900 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span className="font-bold block mb-1">Prefiero orientación</span>
                    <span className="text-[10px] text-gray-400">Requiero asesoramiento sobre el circuito oficial.</span>
                  </button>
                </div>
              </div>

              {/* Conditional Medical Fields if "si" */}
              {formData.indicacionMedicaStatus === 'si' ? (
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-900/40 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 block">Detalles del Profesional e Indicación Médica</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Nombre y Apellido del Médico *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.nombreMedico}
                        onChange={e => setFormData({...formData, nombreMedico: e.target.value})}
                        placeholder="Ej: Dr. Carlos Pellegrini"
                        className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Matrícula Médica (MP / MN) *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.matriculaMedico}
                        onChange={e => setFormData({...formData, matriculaMedico: e.target.value})}
                        placeholder="Ej: MP 4512 - Chubut"
                        className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Especialidad Médica</label>
                      <input 
                        type="text" 
                        value={formData.especialidadMedico}
                        onChange={e => setFormData({...formData, especialidadMedico: e.target.value})}
                        placeholder="Ej: Clínica / Neurología / Pediatría"
                        className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">Fecha de Emisión de la Receta</label>
                      <input 
                        type="date" 
                        value={formData.fechaEmisionReceta}
                        onChange={e => setFormData({...formData, fechaEmisionReceta: e.target.value})}
                        className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-300 mb-1">Motivo / Diagnóstico Terapéutico (Opcional - Confidencial)</label>
                    <textarea 
                      rows={2}
                      value={formData.motivoSalud}
                      onChange={e => setFormData({...formData, motivoSalud: e.target.value})}
                      placeholder="Breve indicación médica recibida (será tratada con confidencialidad absoluta Ley 25.326)..."
                      className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* File Upload Box */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Adjuntar Copia de Indicación o Receta (PDF, JPG, PNG - Máx 10MB)
                    </label>
                    <div className="border border-dashed border-emerald-700/60 rounded-xl p-3 bg-slate-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-300 font-mono truncate max-w-[250px]">
                          {formData.archivoMedicoNombre || 'Seleccionar archivo digital...'}
                        </span>
                      </div>
                      <label className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer">
                        Examinar
                        <input 
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={e => handleFileUpload(e, 'adjuntoOrdenMedica')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* Information Banner when NO medical indication or PREFIERO ORIENTACION */
                <div className="p-4 bg-emerald-950/40 border border-emerald-600/40 rounded-2xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                    Aviso Institucional de Orientación Técnica:
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    La Asociación Civil Bio Extractos Medicinales no prescribe ni comercializa sustancias. La Secretaría de Admisión registrará tu solicitud y te derivará información sobre el circuito médico oficial y profesionales de la salud matriculados capacitados en el marco de la Ley 27.350 y Ley Chubut 790/24.
                  </p>
                </div>
              )}

              {/* REPROCANN Situation */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-white">
                  ¿Cuenta con vinculación o trámite en REPROCANN? *
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, estadoReprocann: 'vigente'})}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                      formData.estadoReprocann === 'vigente'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    Vigente
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, estadoReprocann: 'en_tramite'})}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                      formData.estadoReprocann === 'en_tramite'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    En Trámite
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, estadoReprocann: 'no_iniciado'})}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                      formData.estadoReprocann === 'no_iniciado'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    No Iniciado
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, estadoReprocann: 'prefiero_asesoramiento'})}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                      formData.estadoReprocann === 'prefiero_asesoramiento'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    Asesoramiento
                  </button>
                </div>

                {(formData.estadoReprocann === 'vigente' || formData.estadoReprocann === 'en_tramite') && (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Código de Vinculación o Número de Trámite REPROCANN *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.numeroVinculacionReprocann}
                      onChange={e => setFormData({...formData, numeroVinculacionReprocann: e.target.value})}
                      placeholder="Ej: REP-2025-984210 o N° de Trámite"
                      className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Declaraciones y Consentimiento */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Paso 3 de 5: Declaraciones Juradas y Consentimiento
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Confirmación de términos legales para completar la solicitud ante la Comisión Directiva.
                </p>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <label className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-2xl border border-emerald-900/40 cursor-pointer hover:border-emerald-700 transition-colors">
                  <input 
                    type="checkbox"
                    required
                    checked={formData.declaracionUsoMedicinal}
                    onChange={e => setFormData({...formData, declaracionUsoMedicinal: e.target.checked})}
                    className="w-4 h-4 mt-0.5 rounded accent-emerald-500 shrink-0"
                  />
                  <span>
                    <strong className="text-white block mb-0.5">1. Declaración Jurada de Uso Estrictamente Terapéutico:</strong>
                    Declaro bajo juramento que requiero el acompañamiento asociativo exclusivamente para fines de salud indicados por profesional médico matriculado en el marco regulatorio vigente (Ley 27.350, Dec. 883/20 y Ley Chubut 790/24).
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-2xl border border-emerald-900/40 cursor-pointer hover:border-emerald-700 transition-colors">
                  <input 
                    type="checkbox"
                    required
                    checked={formData.aceptaTerminos}
                    onChange={e => setFormData({...formData, aceptaTerminos: e.target.checked})}
                    className="w-4 h-4 mt-0.5 rounded accent-emerald-500 shrink-0"
                  />
                  <span>
                    <strong className="text-white block mb-0.5">2. Aceptación de Términos de Adhesión y Estatuto Social:</strong>
                    Solicito mi ingreso como socio adherente de la Asociación Civil Bio Extractos Medicinales, sometiéndome a las disposiciones del Estatuto Social y las resoluciones de la Comisión Directiva.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-2xl border border-emerald-900/40 cursor-pointer hover:border-emerald-700 transition-colors">
                  <input 
                    type="checkbox"
                    required
                    checked={formData.aceptaProteccionDatos}
                    onChange={e => setFormData({...formData, aceptaProteccionDatos: e.target.checked})}
                    className="w-4 h-4 mt-0.5 rounded accent-emerald-500 shrink-0"
                  />
                  <span>
                    <strong className="text-white block mb-0.5">3. Proteccion de Datos Sensibles de Salud (Ley 25.326):</strong>
                    Autorizo expresamente el tratamiento de mis datos personales y sanitarios bajo secreto asociativo y resguardo de confidencialidad médica reservada.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-2xl border border-emerald-900/40 cursor-pointer hover:border-emerald-700 transition-colors">
                  <input 
                    type="checkbox"
                    required
                    checked={formData.aceptaCondicionesAdmision}
                    onChange={e => setFormData({...formData, aceptaCondicionesAdmision: e.target.checked})}
                    className="w-4 h-4 mt-0.5 rounded accent-emerald-500 shrink-0"
                  />
                  <span>
                    <strong className="text-white block mb-0.5">4. Declaración Explícita de Alcance Regulatorio:</strong>
                    Comprendo expresamente que: <br />
                    <span className="text-gray-400 font-normal block mt-1">
                      a) Esta solicitud NO garantiza la admisión automática ni otorga alta en REPROCANN. <br />
                      b) La cuota social sólo se abonará tras la aprobación formal de la Comisión Directiva. <br />
                      c) La asociación NO comercializa productos ni sustituye los trámites del Ministerio de Salud.
                    </span>
                  </span>
                </label>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-700/40 rounded-xl text-[11px] text-emerald-200 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>La firma digital quedará registrada con fecha, hora e identificador legal sin exponer datos sensibles.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Revisión General previo al envío */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Paso 4 de 5: Revisión General de Solicitud
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Verificá que toda la información ingresada sea correcta antes de enviarla a la Comisión Directiva.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-3 text-xs">
                
                {/* Personal Section Box */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-900/40 space-y-2 relative">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-400" /> Datos Personales
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Editar
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                    <div><span className="text-gray-500">Solicitante:</span> <strong className="text-white">{formData.nombre} {formData.apellido}</strong></div>
                    <div><span className="text-gray-500">DNI:</span> <strong className="text-white font-mono">{formData.dni}</strong></div>
                    <div><span className="text-gray-500">Fecha Nac.:</span> {formData.fechaNacimiento}</div>
                    <div><span className="text-gray-500">Localidad:</span> {formData.localidad}, {formData.provincia}</div>
                    <div><span className="text-gray-500">Teléfono:</span> {formData.telefono}</div>
                    <div><span className="text-gray-500">Email:</span> {formData.email}</div>
                  </div>
                  {isMinor && (
                    <div className="bg-amber-950/40 p-2 rounded-xl text-[10px] text-amber-200 border border-amber-500/30">
                      <strong>Representante Legal:</strong> {formData.nombreRepresentanteLegal} (DNI: {formData.dniRepresentanteLegal}) - {formData.vinculoRepresentanteLegal}
                    </div>
                  )}
                </div>

                {/* Medical / REPROCANN Section Box */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-900/40 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-emerald-400" /> Situación Documental y REPROCANN
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      className="text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Editar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-300">
                    <div>
                      <span className="text-gray-500">Indicación Médica:</span>{' '}
                      <strong className="text-white capitalize">
                        {formData.indicacionMedicaStatus === 'si' ? 'Presenta Receta Médica' : formData.indicacionMedicaStatus === 'no' ? 'Sin indicación previa' : 'Solicita Orientación'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-500">Estado REPROCANN:</span>{' '}
                      <strong className="text-white uppercase font-mono">{formData.estadoReprocann}</strong>
                    </div>
                    {formData.indicacionMedicaStatus === 'si' && (
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Médico:</span> {formData.nombreMedico} ({formData.matriculaMedico})
                      </div>
                    )}
                    {formData.numeroVinculacionReprocann && (
                      <div className="sm:col-span-2 font-mono">
                        <span className="text-gray-500">Código Vinculación:</span> {formData.numeroVinculacionReprocann}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 italic">
                    🔒 Diagnósticos y motivos de salud bajo resguardo confidencial Ley 25.326.
                  </p>
                </div>

                {/* Declarations Section Box */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-900/40 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Declaraciones y Consentimiento
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setStep(3)} 
                      className="text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Editar
                    </button>
                  </div>
                  <ul className="text-[11px] text-emerald-300 space-y-1">
                    <li className="flex items-center gap-1.5">✓ Declaración Jurada de Uso Medicinal Firmada</li>
                    <li className="flex items-center gap-1.5">✓ Aceptación de Términos Asociativos</li>
                    <li className="flex items-center gap-1.5">✓ Consentimiento de Datos Sensibles (Ley 25.326)</li>
                    <li className="flex items-center gap-1.5">✓ Aceptación de Condiciones de Admisión Directiva</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* STEP 5: Confirmación y Comprobante de Admisión */}
          {step === 5 && submittedApp && (
            <div className="space-y-6 text-center py-2 print:space-y-4 print:text-left print:text-black">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl print:hidden">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800 inline-block print:border-black print:bg-gray-100 print:text-black">
                  Estado Oficial: PENDIENTE DE REVISIÓN POR LA COMISIÓN DIRECTIVA
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white print:text-black">
                  Comprobante de Solicitud de Admisión Digital
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto print:text-gray-700">
                  Tu expediente ingresó formalmente a la Secretaría de Admisión de la Asociación Civil Bio Extractos Medicinales.
                </p>
              </div>

              {/* Unique Code Box */}
              <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl p-4 max-w-md mx-auto shadow-inner print:border-black print:bg-white">
                <span className="text-[11px] text-gray-400 print:text-black font-semibold block mb-1">CÓDIGO ÚNICO DE SEGUIMIENTO:</span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400 print:text-black tracking-wider">
                  {submittedApp.trackingCode}
                </span>
                <div className="mt-2 text-[10px] font-mono text-gray-400 print:text-gray-600 flex justify-between px-2 pt-2 border-t border-gray-800 print:border-gray-300">
                  <span>Fecha: {submittedApp.fechaSolicitud}</span>
                  <span>Token: {submittedApp.tokenUnico}</span>
                </div>
              </div>

              {/* Key Rules Notice */}
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 text-xs text-amber-200 text-left space-y-1.5 max-w-lg mx-auto print:border-black print:bg-gray-50 print:text-black">
                <div className="flex items-center gap-2 font-bold text-amber-300 print:text-black">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 print:hidden" />
                  Próximos Pasos e Información de la Cuota Social:
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed print:text-gray-800">
                  1. <strong className="text-white print:text-black">Revisión Humana:</strong> La Comisión Directiva evaluará la documentación adjunta. <br />
                  2. <strong className="text-white print:text-black">Pasarela e Información de Pago:</strong> Cuando la solicitud sea aprobada, podés realizar el abono mediante transferencia bancaria o Mercado Pago. Guardá los datos bancarios para tu suscripción. <br />
                  3. <strong className="text-white print:text-black">Notificación:</strong> Recibirás un correo electrónico con la resolución del trámite sin exponer datos médicos confidenciales.
                </p>
              </div>

              {/* Official Subscription Bank Data Box */}
              <div className="bg-slate-900 border border-emerald-500/70 rounded-2xl p-4 max-w-lg mx-auto text-left space-y-3 print:border-black print:bg-white">
                <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2">
                  <span className="text-xs font-bold text-emerald-400 print:text-black flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Datos de Subscripción y Pago Directo
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono print:hidden">
                    CUENTA INSTITUCIONAL
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-xl border border-emerald-900/40">
                    <div>
                      <span className="text-[10px] text-gray-400 font-sans block">ALIAS OFICIAL:</span>
                      <strong className="text-emerald-300 text-sm tracking-wider">{bankData.alias}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAlias}
                      className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-sans font-bold rounded-lg flex items-center gap-1 print:hidden"
                    >
                      {copiedAlias ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAlias ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-950 rounded-xl border border-emerald-900/40">
                    <div>
                      <span className="text-[10px] text-gray-400 font-sans block">CVU INTERBANCARIO:</span>
                      <strong className="text-white text-xs tracking-widest">{bankData.cvu}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCvu}
                      className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-sans font-bold rounded-lg flex items-center gap-1 print:hidden"
                    >
                      {copiedCvu ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCvu ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-sans text-gray-300 pt-1 space-y-0.5">
                    <div>Titular: <strong className="text-white">{bankData.nombreTitular}</strong></div>
                    <div>CUIT: <strong className="text-white">{bankData.cuit}</strong></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
                <button
                  onClick={handlePrintReceipt}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 border border-gray-700"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  Imprimir / Guardar Comprobante PDF
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenTrackingModal();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Consultar Estado en Tiempo Real
                </button>
              </div>

            </div>
          )}

          {/* Navigation Controls for Steps 1-4 */}
          {step <= 4 && (
            <div className="pt-5 border-t border-white/10 flex items-center justify-between print:hidden">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitFinal}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-xl flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Enviar Solicitud a Comisión Directiva
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
