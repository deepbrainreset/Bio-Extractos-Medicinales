import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  UserCheck, 
  Key, 
  LogOut, 
  ArrowRight, 
  ExternalLink, 
  MessageSquare, 
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  Download,
  AlertTriangle,
  FileSpreadsheet,
  History,
  Gavel,
  Scale,
  AlertCircle,
  Database,
  Trash2,
  Check,
  Shield,
  Layers,
  FileCheck,
  LockKeyhole,
  UserX,
  Clock3,
  CreditCard,
  FileCode,
  Smartphone
} from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { AdherentApplication, ApplicationStatus, StaffRole, ARCORequest, LegalDocumentVersion } from '../types';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function AdminPanel() {
  const { 
    applications, 
    updateApplicationStatus, 
    auditLogs, 
    addAuditLog,
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    processResignationByAdmin,
    processPaymentWithWebhook,
    legalDocVersions,
    toggleLegalDocActive,
    addLegalDocVersion,
    arcoRequests,
    processArcoRequest,
    docExpirationAlerts,
    securityIncidentLogs,
    addSecurityIncident,
    anonymizeCandidateData
  } = useApplication();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [totpInput, setTotpInput] = useState('');
  const [mfaStep, setMfaStep] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rateLimitCounter, setRateLimitCounter] = useState(0);

  // Active Role State (Principio de Mínimo Privilegio)
  const [activeRole, setActiveRole] = useState<StaffRole>('comision_directiva');
  
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'solicitudes' | 
    'expediente' | 
    'boveda' | 
    'dictamenes' | 
    'tesoreria' | 
    'exportaciones' | 
    'auditoria' | 
    'legales' | 
    'arco' | 
    'retencion' | 
    'seguridad'
  >('solicitudes');

  // Filters & Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedApp, setSelectedApp] = useState<AdherentApplication | null>(null);

  // Signed URL Vault Modal State
  const [signedUrlData, setSignedUrlData] = useState<{ url: string; expiresAt: string; fileName: string; appTracking: string } | null>(null);
  const [signedUrlTimer, setSignedUrlTimer] = useState<number>(300); // 5 minutes

  // Dictamen Form State
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('aprobado_comision');
  const [boardNotes, setBoardNotes] = useState('');
  const [actaNumber, setActaNumber] = useState('Acta CD N° 43/2026');
  const [reviewerName, setReviewerName] = useState('Comisión Directiva - Presidencia');

  // New Legal Version Form State
  const [newLegalDoc, setNewLegalDoc] = useState({
    title: '',
    version: 'v1.0',
    effectiveDate: new Date().toISOString().substring(0, 10),
    category: 'consentimiento' as LegalDocumentVersion['category'],
    changelog: ''
  });
  const [showNewLegalModal, setShowNewLegalModal] = useState(false);

  // ARCO Resolution State
  const [selectedArco, setSelectedArco] = useState<ARCORequest | null>(null);
  const [arcoResolutionNotes, setArcoResolutionNotes] = useState('');

  // Handle Login & MFA Simulation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rateLimitCounter >= 4) {
      setLoginError('Demasiados intentos fallidos. Bloqueo temporal por seguridad (Rate Limiting). Pruebe en unos minutos.');
      addSecurityIncident('rate_limit_exceeded', 'high', 'Límite de intentos superado en pantalla de ingreso al panel.');
      return;
    }

    if (!mfaStep) {
      if (passwordInput === 'admin123' || passwordInput === 'bio2026') {
        setMfaStep(true);
        setLoginError('');
      } else {
        setRateLimitCounter(prev => prev + 1);
        setLoginError('Clave incorrecta. Use "admin123" o "bio2026" para la demostración.');
        addSecurityIncident('login_failure', 'low', 'Intento de inicio de sesión con contraseña inválida.', activeRole);
      }
    } else {
      if (totpInput.length === 6) {
        const success = loginAdmin(passwordInput);
        if (success) {
          setLoginError('');
          addAuditLog('Ingreso al Panel Institucional', `Inicio de sesión exitoso con MFA (Rol: ${activeRole.toUpperCase()})`, `Usuario ${activeRole}`, activeRole);
        }
      } else {
        setLoginError('Ingrese un código TOTP de 6 dígitos válido (Ej: 123456).');
        addSecurityIncident('mfa_failure', 'medium', 'Código MFA TOTP inválido ingresado.', activeRole);
      }
    }
  };

  // Helper for masking sensitive DNI & Data according to Role
  const maskDni = (dni: string) => {
    if (activeRole === 'soporte') {
      if (dni.length < 7) return '**.***.***';
      return `${dni.substring(0, 2)}.***.${dni.substring(dni.length - 3)}`;
    }
    return dni;
  };

  // Generate ephemeral signed URL (5-minute expiration)
  const handleGenerateSignedUrl = (app: AdherentApplication, docType: string, fileName?: string) => {
    if (activeRole === 'soporte') {
      addSecurityIncident('unauthorized_field_access', 'medium', `Rol Soporte intentó acceder a documento adjunto ${docType} de ${app.trackingCode}. Denegado por RBAC.`, activeRole);
      alert('🔒 ACCESO DENEGADO POR MÍNIMO PRIVILEGIO: El rol Soporte no tiene autorización para acceder a archivos ni documentación confidencial.');
      return;
    }

    if (activeRole === 'tesoreria' && (docType === 'Orden Médica' || docType === 'REPROCANN' || docType === 'Poder Legal')) {
      addSecurityIncident('unauthorized_field_access', 'medium', `Rol Tesorería intentó acceder a documento clínico ${docType} de ${app.trackingCode}. Denegado por RBAC.`, activeRole);
      alert('🔒 ACCESO DENEGADO: El área de Tesorería no posee acceso a documentación médica ni clínica de los postulantes.');
      return;
    }

    const expires = new Date(Date.now() + 5 * 60 * 1000).toISOString().substring(11, 19);
    const token = Math.random().toString(36).substring(2, 15);
    const signed = `https://vault-private.bioextractos.org/docs/${app.trackingCode}/${docType.toLowerCase().replace(' ', '_')}?exp=${Date.now() + 300000}&sig=hmac_sha256_${token}`;
    
    setSignedUrlData({
      url: signed,
      expiresAt: expires,
      fileName: fileName || `${docType}_${app.apellido}_${app.trackingCode}.pdf`,
      appTracking: app.trackingCode
    });
    setSignedUrlTimer(300);

    addAuditLog('Generación de URL Firmada', `Acceso temporal (5 min) concedido para archivo '${docType}' del expediente ${app.trackingCode}`, `Usuario (${activeRole})`, activeRole, docType);
  };

  // Handle open status/evaluation modal
  const handleOpenEdit = (app: AdherentApplication) => {
    if (activeRole === 'soporte') {
      alert('🔒 ACCESO RESTRINGIDO: El equipo de Soporte solo tiene permisos de lectura para orientar sobre el estado de la solicitud.');
      return;
    }
    setSelectedApp(app);
    setNewStatus(app.estado);
    setBoardNotes(app.notasComision || '');
    addAuditLog('Apertura de Expediente', `Consulta detallada de expediente ${app.trackingCode} por ${activeRole.toUpperCase()}`, `Usuario (${activeRole})`, activeRole);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    updateApplicationStatus(selectedApp.id, newStatus, boardNotes, reviewerName);
    setSelectedApp(null);
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.dni.includes(searchQuery) ||
      app.trackingCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'todos' || app.estado === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle Controlled Data Export
  const handleExportData = () => {
    const watermark = `CONFIDENCIAL - USO EXCLUSIVO Y AUDITADO POR INSTITUCIÓN - ROL: ${activeRole.toUpperCase()} - FECHA: ${new Date().toISOString()}`;
    addAuditLog('Exportación de Datos Institucionales', `Exportación ejecutada con marca de agua: "${watermark}"`, `Usuario (${activeRole})`, activeRole);
    
    const jsonStr = JSON.stringify({
      watermark: watermark,
      exportDate: new Date().toISOString(),
      exportedByRole: activeRole,
      recordsCount: filteredApps.length,
      data: filteredApps.map(a => ({
        trackingCode: a.trackingCode,
        fechaSolicitud: a.fechaSolicitud,
        apellidoNombre: `${a.apellido}, ${a.nombre}`,
        dni: maskDni(a.dni),
        localidad: a.localidad,
        provincia: a.provincia,
        estado: a.estado,
        estadoReprocann: a.estadoReprocann,
        membresiaActiva: a.membresiaActiva ? 'SÍ' : 'NO',
        // Omit clinical details if non-medical
        motivoSalud: (activeRole === 'director_medico' || activeRole === 'admin' || activeRole === 'comision_directiva') ? a.motivoSalud : '[OCULTO POR PRINCIPIO DE MÍNIMO PRIVILEGIO]'
      }))
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EXPEDIENTES_BIO_EXTRACTOS_${activeRole.toUpperCase()}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login view if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <section id="admin-login" className="py-20 bg-slate-950 text-white min-h-[85vh] flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-4">
          <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 mx-auto shadow-lg">
                <LockKeyhole className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Portal Privado Institucional
              </h3>
              <p className="text-xs text-emerald-400 font-semibold">
                {ORGANIZATION_CONFIG.name}
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                Acceso restringido para personal autorizado con autenticación multifactor y control de roles por Mínimo Privilegio.
              </p>
            </div>

            {/* Role selector before login */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Seleccione Rol Institucional
              </label>
              <select
                value={activeRole}
                onChange={e => setActiveRole(e.target.value as StaffRole)}
                className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="comision_directiva">🏛️ Comisión Directiva (Dictámenes y resoluciones)</option>
                <option value="admision">📋 Equipo de Admisión (Triage e ingesta documental)</option>
                <option value="director_medico">⚕️ Director/a Médico/a (Acceso a indicación clínica)</option>
                <option value="tesoreria">💳 Tesorería (Gestión de cuotas y webhooks)</option>
                <option value="soporte">🎧 Soporte (Atención restringida al socio)</option>
                <option value="admin">🔒 Administrador Institucional (Seguridad y Auditoría)</option>
              </select>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {!mfaStep ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Contraseña Institucional
                  </label>
                  <div className="relative">
                    <input 
                      type="password"
                      required
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      placeholder="Ingrese su contraseña (Demo: admin123)"
                      className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 pr-10"
                    />
                    <Key className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Paso 2: Validación de Token Multifactor (MFA TOTP)
                  </div>
                  <p className="text-[11px] text-gray-300">
                    Ingrese el código dinámico de 6 dígitos de su aplicación autenticadora (Google Authenticator / Authy).
                  </p>
                  <div>
                    <input 
                      type="text"
                      maxLength={6}
                      required
                      value={totpInput}
                      onChange={e => setTotpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Ej: 849201"
                      className="w-full text-center tracking-[0.4em] font-mono font-bold text-lg bg-slate-950 border border-emerald-600 rounded-xl py-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">
                    Demo: Ingrese cualquier código de 6 dígitos (ej: 123456).
                  </p>
                </div>
              )}

              {loginError && (
                <div className="p-3 bg-rose-950/60 rounded-xl border border-rose-800 text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {!mfaStep ? 'Validar Contraseña' : 'Confirmar Ingreso MFA Seguro'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-[11px] text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Sesión Cifrada HMAC-SHA256
              </div>
              <p className="text-[10px]">
                Todos los ingresos y accesos a datos sensibles quedan registrados inmutablemente en el Audit Trail institucional.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin-panel" className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP STATUS HEADER & ROLE SWITCHER */}
        <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 bg-emerald-950 border border-emerald-800 rounded-full text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> MFA VERIFICADO
                </span>
                <span className="px-3 py-0.5 bg-slate-950 border border-white/10 rounded-full text-[11px] text-gray-300 font-mono">
                  ROL: {activeRole.toUpperCase()}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  IP: Hash_9a8f2e4c • Token CSRF: Valid
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Panel Privado de Control y Admisión Societaria
              </h2>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              {/* Role switcher for authorized staff */}
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-semibold mb-0.5">Cambiar Rol Activo:</span>
                <select
                  value={activeRole}
                  onChange={e => {
                    setActiveRole(e.target.value as StaffRole);
                    addAuditLog('Cambio de Rol Interno', `El usuario cambió vista a rol ${e.target.value.toUpperCase()}`, `Staff`, e.target.value);
                  }}
                  className="bg-slate-950 border border-emerald-900/60 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-bold focus:outline-none"
                >
                  <option value="comision_directiva">Comisión Directiva</option>
                  <option value="admision">Equipo de Admisión</option>
                  <option value="director_medico">Director/a Médico/a</option>
                  <option value="tesoreria">Tesorería</option>
                  <option value="soporte">Soporte</option>
                  <option value="admin">Administrador General</option>
                </select>
              </div>

              <button
                onClick={logoutAdmin}
                className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-800 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </button>
            </div>
          </div>

          {/* Principle of Least Privilege Banner */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-900/40 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-gray-300 text-[11px]">
                <strong className="text-white">Principio de Mínimo Privilegio:</strong> {
                  activeRole === 'tesoreria' ? 'Acceso a estados de pago y recaudación. Sin acceso a datos ni documentos clínicos.' :
                  activeRole === 'soporte' ? 'Vista orientativa. DNI enmascarado. Sin acceso a datos médicos ni descargas.' :
                  activeRole === 'director_medico' ? 'Acceso a indicación médica, matrículas y evaluación de salud.' :
                  activeRole === 'comision_directiva' ? 'Dictamen formal de admisión en Actas. Visor minimizado.' :
                  activeRole === 'admision' ? 'Triage inicial y verificación de archivos requeridos.' :
                  'Acceso integral administrativo y auditoría de seguridad.'
                }
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-mono shrink-0">
              RBAC ACTIVO
            </span>
          </div>
        </div>

        {/* MODULE TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'solicitudes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4" /> 1. Bandeja Solicitudes ({filteredApps.length})
          </button>

          <button
            onClick={() => setActiveTab('boveda')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'boveda'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Lock className="w-4 h-4" /> 2. Bóveda Documental (URLs Firmadas)
          </button>

          <button
            onClick={() => setActiveTab('dictamenes')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'dictamenes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Gavel className="w-4 h-4" /> 3. Dictámenes CD
          </button>

          <button
            onClick={() => setActiveTab('tesoreria')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'tesoreria'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <CreditCard className="w-4 h-4" /> 4. Tesorería & Cuotas
          </button>

          <button
            onClick={() => setActiveTab('exportaciones')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'exportaciones'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> 5. Exportación
          </button>

          <button
            onClick={() => setActiveTab('auditoria')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'auditoria'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <History className="w-4 h-4" /> 6. Audit Trail ({auditLogs.length})
          </button>

          <button
            onClick={() => setActiveTab('legales')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'legales'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Scale className="w-4 h-4" /> 7. Documentos Legales ({legalDocVersions.length})
          </button>

          <button
            onClick={() => setActiveTab('arco')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'arco'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Shield className="w-4 h-4" /> 8. Derechos ARCO ({arcoRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('retencion')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'retencion'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Clock3 className="w-4 h-4" /> 9. Alertas Vencimiento & Purga
          </button>

          <button
            onClick={() => setActiveTab('seguridad')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'seguridad'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" /> 10. Seguridad & Incidentes
          </button>
        </div>


        {/* TAB 1: BANDEJA DE SOLICITUDES */}
        {activeTab === 'solicitudes' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-900/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, DNI o código..."
                  className="w-full bg-slate-950 border border-emerald-900/50 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-emerald-400" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="bg-slate-950 border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
                >
                  <option value="todos">Todos los Estados</option>
                  <option value="pendiente_revision">Pendiente de Revisión</option>
                  <option value="en_evaluacion_medica">En Evaluación Médica</option>
                  <option value="aprobado_comision">Aprobado por Comisión</option>
                  <option value="requiere_documentacion">Requiere Documentación</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>
            </div>

            {/* Applications List Table */}
            <div className="bg-slate-900 border border-emerald-900/40 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-emerald-900/30">
                    <tr>
                      <th className="p-4">Código / Fecha</th>
                      <th className="p-4">Solicitante / DNI (RBAC)</th>
                      <th className="p-4">Indicación Médica</th>
                      <th className="p-4">REPROCANN</th>
                      <th className="p-4">Estado Actual</th>
                      <th className="p-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 font-mono">
                          <span className="font-bold text-emerald-400 block">{app.trackingCode}</span>
                          <span className="text-[10px] text-gray-400">{app.fechaSolicitud}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{app.apellido}, {app.nombre}</span>
                          <span className="text-[10px] text-gray-400">DNI: <strong className="font-mono text-gray-200">{maskDni(app.dni)}</strong> • {app.localidad}</span>
                        </td>
                        <td className="p-4">
                          {activeRole === 'tesoreria' || activeRole === 'soporte' ? (
                            <span className="text-gray-500 text-[10px] italic">[Restringido por Rol]</span>
                          ) : (
                            app.indicacionMedicaStatus === 'si' ? (
                              <span className="text-emerald-400 font-semibold">✓ Con Orden Médica</span>
                            ) : (
                              <span className="text-amber-400">Orientación Solicitada</span>
                            )
                          )}
                        </td>
                        <td className="p-4 capitalize">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.estadoReprocann === 'vigente' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-950 text-gray-400'
                          }`}>
                            {app.estadoReprocann.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            app.estado === 'aprobado_comision' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' :
                            app.estado === 'en_evaluacion_medica' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                            app.estado === 'requiere_documentacion' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            app.estado === 'rechazado' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            'bg-slate-950 text-gray-300 border border-gray-700'
                          }`}>
                            {app.estado.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleOpenEdit(app)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all"
                          >
                            Ver Expediente
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {/* TAB 2: BÓVEDA DOCUMENTAL Y URLS FIRMADAS */}
        {activeTab === 'boveda' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Bóveda Privada de Almacenamiento Cifrado y URLs Firmadas
                </h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-3xl mb-6">
                Los archivos adjuntos (DNI, Receta Médica, REPROCANN, Poderes) se almacenan en buckets privados y nunca son de acceso público. Para visualizarlos, el sistema genera URLs firmadas temporales con expiración automática de 5 minutos, auditando cada descarga.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-slate-950 border border-emerald-900/40 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold block">{app.trackingCode}</span>
                        <h4 className="font-bold text-white text-sm">{app.apellido}, {app.nombre}</h4>
                        <span className="text-[10px] text-gray-400">DNI: {maskDni(app.dni)}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-900 text-[10px] font-bold text-emerald-400 rounded border border-emerald-800">
                        ClamAV OK
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs pt-2 border-t border-white/5">
                      {/* Document Button DNI */}
                      <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-white/5">
                        <span className="text-gray-300 text-[11px]">📄 DNI Adjunto</span>
                        <button
                          onClick={() => handleGenerateSignedUrl(app, 'DNI', app.adjuntoDNI)}
                          className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" /> Firmar URL
                        </button>
                      </div>

                      {/* Document Button Orden Medica */}
                      <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-white/5">
                        <span className="text-gray-300 text-[11px]">⚕️ Indicación Médica</span>
                        <button
                          onClick={() => handleGenerateSignedUrl(app, 'Orden Médica', app.adjuntoOrdenMedica)}
                          disabled={activeRole === 'tesoreria' || activeRole === 'soporte'}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                            activeRole === 'tesoreria' || activeRole === 'soporte'
                              ? 'bg-slate-900 text-gray-600 border border-gray-800 cursor-not-allowed'
                              : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          <Lock className="w-3 h-3" /> {activeRole === 'tesoreria' || activeRole === 'soporte' ? 'Bloqueado' : 'Firmar URL'}
                        </button>
                      </div>

                      {/* Document Button REPROCANN */}
                      <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-white/5">
                        <span className="text-gray-300 text-[11px]">🌿 Credencial REPROCANN</span>
                        <button
                          onClick={() => handleGenerateSignedUrl(app, 'REPROCANN', app.adjuntoReprocann)}
                          disabled={activeRole === 'tesoreria' || activeRole === 'soporte'}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                            activeRole === 'tesoreria' || activeRole === 'soporte'
                              ? 'bg-slate-900 text-gray-600 border border-gray-800 cursor-not-allowed'
                              : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          <Lock className="w-3 h-3" /> {activeRole === 'tesoreria' || activeRole === 'soporte' ? 'Bloqueado' : 'Firmar URL'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 3: DICTÁMENES COMISIÓN DIRECTIVA */}
        {activeTab === 'dictamenes' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Gavel className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Resoluciones y Dictámenes de la Comisión Directiva</h3>
                  <p className="text-xs text-gray-400">
                    Aprobación formal de adhesiones societarias sin promesas comerciales de producción ni entrega de sustancias.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-slate-950 border border-emerald-900/40 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-bold text-xs">{app.trackingCode}</span>
                        <h4 className="font-bold text-white text-sm">{app.apellido}, {app.nombre} (DNI {maskDni(app.dni)})</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.estado === 'aprobado_comision' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {app.estado.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">
                        Dictamen registrado: <span className="text-gray-400">{app.notasComision || 'Pendiente de tratamiento en reunión de comisión.'}</span>
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono block">
                        Revisado por: {app.revisadoPor || 'Pendiente'} • Última actualización: {app.fechaRevision || app.fechaSolicitud}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenEdit(app)}
                      disabled={activeRole === 'soporte'}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow shrink-0 disabled:opacity-50"
                    >
                      Asentar Dictamen en Acta
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 4: TESORERÍA Y CUOTAS SOCIALES */}
        {activeTab === 'tesoreria' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Gestión de Cuotas Sociales y Recaudación Institucional</h3>
                    <p className="text-xs text-gray-400">
                      Sostenimiento exclusivo de la estructura asociativa (ARS 10.000 / mes). Desvinculado totalmente de productos.
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full font-mono text-xs font-bold">
                  WEBHOOK PASARELA: ACTIVE
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Socio Adherente</th>
                      <th className="p-3">Membresía</th>
                      <th className="p-3">Vencimiento Cuota</th>
                      <th className="p-3">Débito Automático</th>
                      <th className="p-3">Firma Criptográfica Webhook</th>
                      <th className="p-3 text-right">Acción Tesorería</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/50">
                        <td className="p-3">
                          <span className="font-bold text-white block">{app.apellido}, {app.nombre}</span>
                          <span className="text-[10px] text-gray-400">Código: {app.trackingCode}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.membresiaActiva ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}>
                            {app.membresiaActiva ? 'AL DÍA (ARS 10.000)' : 'INACTIVA / PENDIENTE'}
                          </span>
                        </td>
                        <td className="p-3 font-mono">
                          {app.fechaVencimientoCuota || 'Sin emisión'}
                        </td>
                        <td className="p-3">
                          {app.debitoAutomaticoConsentido ? (
                            <span className="text-emerald-400 font-bold">✓ Adherido</span>
                          ) : (
                            <span className="text-gray-500">Manual</span>
                          )}
                        </td>
                        <td className="p-3 font-mono text-[10px]">
                          {app.historialPagos && app.historialPagos.length > 0 ? (
                            <span className="text-emerald-400 truncate block max-w-[150px]">
                              {app.historialPagos[0].firmaCriptografica}
                            </span>
                          ) : (
                            <span className="text-gray-600">Sin pagos registrados</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              processPaymentWithWebhook(app.id, 'Mercado Pago', true);
                              alert(`Pago registrado e inyectado con firma HMAC para ${app.nombre} ${app.apellido}.`);
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px]"
                          >
                            Simular Cobro Webhook
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {/* TAB 5: EXPORTACIONES LIMITADAS Y CON PERMISOS */}
        {activeTab === 'exportaciones' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Exportación Controlada de Expedientes</h3>
                  <p className="text-xs text-gray-400">
                    Las descargas de listados incorporan marcas de agua con trazabilidad inmutable del usuario ejecutante.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-4 max-w-xl">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-300">Formato de Exportación Sanitizado</span>
                  <p className="text-[11px] text-gray-300">
                    Exporta únicamente los campos autorizados para el rol activo (<strong className="text-white">{activeRole.toUpperCase()}</strong>).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 text-xs font-mono space-y-1">
                  <span className="text-gray-400 block text-[10px]">PREVIEW DE MARCA DE AGUA:</span>
                  <p className="text-emerald-400 text-[11px] break-all">
                    CONFIDENCIAL - USO EXCLUSIVO Y AUDITADO POR INSTITUCIÓN - ROL: {activeRole.toUpperCase()} - TIMESTAMP: {new Date().toISOString()}
                  </p>
                </div>

                <button
                  onClick={handleExportData}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar Expedientes Sanitizados (JSON / Auditado)
                </button>
              </div>
            </div>
          </div>
        )}


        {/* TAB 6: REGISTRO DE AUDITORÍA (AUDIT TRAIL) */}
        {activeTab === 'auditoria' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Registro de Auditoría Institucional (Audit Trail Inmutable)</h3>
                </div>
                <span className="text-xs text-gray-400 font-mono">Total Registros: {auditLogs.length}</span>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="bg-slate-950 p-3.5 rounded-xl border border-white/5 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="font-mono text-emerald-400 font-bold mr-2">[{log.timestamp}]</span>
                      <span className="text-white font-bold mr-2">{log.action}:</span>
                      <span className="text-gray-300">{log.details}</span>
                      {log.sensitiveFieldAccessed && (
                        <span className="ml-2 px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[10px] font-mono">
                          ACCESO SENSIBLE: {log.sensitiveFieldAccessed}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono shrink-0">
                      Usuario: <span className="text-gray-200">{log.user}</span> ({log.role || 'System'})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 7: GESTIÓN DE CONSENTIMIENTOS Y VERSIONES LEGALES */}
        {activeTab === 'legales' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Control de Versiones de Documentación Legal</h3>
                    <p className="text-xs text-gray-400">
                      Gestión de vigencia de estatutos, consentimientos informados y términos de admisión.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowNewLegalModal(true)}
                  disabled={activeRole !== 'admin' && activeRole !== 'comision_directiva'}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow shrink-0 disabled:opacity-50"
                >
                  + Nueva Versión Legal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {legalDocVersions.map((doc) => (
                  <div key={doc.id} className="bg-slate-950 border border-emerald-900/40 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-mono text-[10px] font-bold">
                          {doc.version}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1">{doc.title}</h4>
                      </div>

                      <button
                        onClick={() => toggleLegalDocActive(doc.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          doc.active ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-gray-500 border border-gray-700'
                        }`}
                      >
                        {doc.active ? 'VIGENTE' : 'INACTIVO'}
                      </button>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      Changelog: "{doc.changelog}"
                    </p>

                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                      <span>Vigencia: {doc.effectiveDate}</span>
                      <span className="truncate max-w-[140px]">SHA256: {doc.hashSHA256}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 8: DERECHOS ARCO (LEY 25.326) */}
        {activeTab === 'arco' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Solicitudes de Protección de Datos Personales (Derechos ARCO)</h3>
                  <p className="text-xs text-gray-400">
                    Tránsito de solicitudes de Acceso, Rectificación, Cancelación y Oposición según la Ley N° 25.326.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {arcoRequests.map((req) => (
                  <div key={req.id} className="bg-slate-950 border border-emerald-900/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold rounded border border-emerald-800 uppercase">
                          DERECHO DE {req.tipoDerecho}
                        </span>
                        <h4 className="font-bold text-white text-sm">{req.titularNombre} (DNI {req.titularDNI})</h4>
                        <span className="text-[10px] text-gray-400 font-mono">Código: {req.trackingCode}</span>
                      </div>
                      <p className="text-xs text-gray-300">
                        Detalle: "{req.motivoDetalle}"
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono block">
                        Fecha solicitud: {req.fechaSolicitud} • Estado: <strong className="text-amber-400 uppercase">{req.estado}</strong>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedArco(req);
                        setArcoResolutionNotes(req.resolucionNotes || '');
                      }}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow shrink-0"
                    >
                      Gestionar Reclamo ARCO
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 9: ALERTAS VENCIMIENTO & RETENCION PURGE */}
        {activeTab === 'retencion' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Clock3 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Alertas de Vencimiento y Purga de Retención Legal</h3>
                  <p className="text-xs text-gray-400">
                    Monitoreo de vencimiento de credenciales y purga/anonimización de solicitudes no aprobadas tras vencimiento de plazos legales.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {docExpirationAlerts.map((alert) => (
                  <div key={alert.id} className="bg-slate-950 border border-amber-900/40 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs">{alert.titularNombre}</span>
                      <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-700 text-[10px] font-bold rounded">
                        {alert.diasRestantes} DÍAS RESTANTES
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-0.5">
                      <p>Documento: <strong className="text-emerald-400">{alert.tipoDocumento}</strong></p>
                      <p className="text-gray-400 text-[11px]">Vencimiento oficial: {alert.fechaVencimiento}</p>
                      <p className="text-rose-400 text-[10px]">Límite para anonimización legal: {alert.retencionAnonymizeDeadline}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Purge / Anonymization Trigger */}
              <div className="p-5 bg-rose-950/30 border border-rose-900/60 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  Herramienta de Anonimización y Purga Legal (Ley 25.326)
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Permite anonimizar irreversiblemente datos de contacto e indicación médica de carpetas rechazadas o archivadas tras expirar el plazo de conservación fijado por la Asesoría Legal.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      const unapproved = applications.filter(a => a.estado === 'rechazado' || a.estado === 'requiere_documentacion');
                      if (unapproved.length === 0) {
                        alert('No hay solicitudes rechazadas o requeridas pendientes de purga legal.');
                        return;
                      }
                      const confirmPurge = confirm(`¿Desea anonimizar legalmente ${unapproved.length} solicitud(es)? Los datos personales serán irreversiblemente removidos.`);
                      if (confirmPurge) {
                        unapproved.forEach(app => anonymizeCandidateData(app.id, 'Purga automática por plazo de retención cumplido'));
                        alert('Proceso de anonimización y purga ejecutado correctamente. Registro asentado en el Audit Trail.');
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Ejecutar Purga Legal de No Aprobados
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* TAB 10: SEGURIDAD E INCIDENTES */}
        {activeTab === 'seguridad' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Registro de Incidentes y Eventos de Seguridad</h3>
                  <p className="text-xs text-gray-400">
                    Monitoreo de rate limiting, intentos fallidos de contraseña/MFA e intentos de violación de mínimos privilegios RBAC.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {securityIncidentLogs.map((incident) => (
                  <div key={incident.id} className="bg-slate-950 p-4 rounded-2xl border border-rose-900/30 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-emerald-400 font-bold">[{incident.timestamp}]</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        incident.severity === 'high' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
                        incident.severity === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                        'bg-slate-900 text-gray-300 border border-gray-700'
                      }`}>
                        SEVERIDAD: {incident.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white font-semibold">{incident.eventType.replace(/_/g, ' ').toUpperCase()}</p>
                    <p className="text-gray-300">{incident.details}</p>
                    <span className="text-[10px] text-gray-500 font-mono block">IP Hash: {incident.ipHash} • Rol evaluado: {incident.roleAttempted || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>


      {/* SIGNED URL MODAL */}
      {signedUrlData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-emerald-800 rounded-3xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Lock className="w-4 h-4" /> Enlace de Descarga Firmado Criptográficamente
              </div>
              <button onClick={() => setSignedUrlData(null)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-900/50 space-y-2 text-xs">
              <p><strong className="text-gray-300">Expediente:</strong> <span className="font-mono text-emerald-400">{signedUrlData.appTracking}</span></p>
              <p><strong className="text-gray-300">Archivo:</strong> {signedUrlData.fileName}</p>
              <p><strong className="text-gray-300">Vencimiento Token:</strong> <span className="font-mono text-amber-400">{signedUrlData.expiresAt} (5 minutos)</span></p>
              
              <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-emerald-300 break-all bg-slate-950 p-2.5 rounded-xl border border-white/5">
                {signedUrlData.url}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={signedUrlData.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs text-center transition-all shadow"
              >
                Simular Abrir Documento Privado
              </a>
              <button
                onClick={() => setSignedUrlData(null)}
                className="px-4 py-2.5 bg-slate-900 text-gray-300 rounded-xl text-xs font-semibold border border-white/10"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}


      {/* EVALUATION & STATUS CHANGE MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-emerald-800/60 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8 text-white p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">EXPEDIENTE N° {selectedApp.trackingCode}</span>
                <h3 className="text-lg font-bold text-white">
                  Expediente de {selectedApp.nombre} {selectedApp.apellido}
                </h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl text-xs space-y-2 border border-white/5">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-gray-400">DNI:</span> <strong className="text-white font-mono">{maskDni(selectedApp.dni)}</strong></div>
                <div><span className="text-gray-400">Localidad:</span> <strong className="text-white">{selectedApp.localidad}</strong></div>
                <div><span className="text-gray-400">Email:</span> <span className="text-emerald-400">{selectedApp.email}</span></div>
                <div><span className="text-gray-400">Teléfono:</span> <span className="text-white">{selectedApp.telefono}</span></div>
              </div>

              {/* Clinical details masked for non-medical roles */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-gray-400 block font-semibold">Situación e Indicación Médica:</span>
                {activeRole === 'tesoreria' || activeRole === 'soporte' ? (
                  <span className="text-rose-400 text-[11px] italic">[DATOS CLÍNICOS OCULTOS POR MÍNIMO PRIVILEGIO PARA {activeRole.toUpperCase()}]</span>
                ) : (
                  <div className="text-white space-y-1 mt-1">
                    <p>Médico: <strong>{selectedApp.nombreMedico || 'No especificado'}</strong> ({selectedApp.matriculaMedico || 'Sin matrícula'})</p>
                    <p className="text-gray-300 text-[11px]">Acompañamiento: "{selectedApp.motivoSalud || 'No detallado'}"</p>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Dictamen de la Comisión Directiva *</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="aprobado_comision">Aprobar Adhesión (Habilita Pago Cuota Social ARS 10.000)</option>
                  <option value="en_evaluacion_medica">En Evaluación Médica / Asesoría</option>
                  <option value="requiere_documentacion">Requiere Documentación / Faltantes</option>
                  <option value="pendiente_revision">Mantener Pendiente de Revisión</option>
                  <option value="rechazado">Rechazar Solicitud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Observaciones que figurarán en la Consulta Digital del Solicitante</label>
                <textarea
                  rows={3}
                  value={boardNotes}
                  onChange={e => setBoardNotes(e.target.value)}
                  placeholder="Escriba las instrucciones o aclaraciones administrativas para el postulante..."
                  className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Firma / Revisor Habilitado</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  className="w-full bg-slate-900 border border-emerald-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-lg"
                >
                  Guardar Dictamen en Acta
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-3 bg-slate-900 text-gray-400 hover:text-white rounded-xl text-xs font-semibold border border-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* NEW LEGAL DOCUMENT MODAL */}
      {showNewLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-emerald-800 rounded-3xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white">Publicar Nueva Versión Legal</h3>
              <button onClick={() => setShowNewLegalModal(false)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                addLegalDocVersion({
                  title: newLegalDoc.title,
                  version: newLegalDoc.version,
                  effectiveDate: newLegalDoc.effectiveDate,
                  category: newLegalDoc.category,
                  changelog: newLegalDoc.changelog,
                  active: true
                });
                setShowNewLegalModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Título del Documento Legal</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Consentimiento Informado v3.0"
                  value={newLegalDoc.title}
                  onChange={e => setNewLegalDoc({ ...newLegalDoc, title: e.target.value })}
                  className="w-full bg-slate-900 border border-emerald-900 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Versión</label>
                  <input
                    type="text"
                    required
                    placeholder="v2.5"
                    value={newLegalDoc.version}
                    onChange={e => setNewLegalDoc({ ...newLegalDoc, version: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-900 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Categoría</label>
                  <select
                    value={newLegalDoc.category}
                    onChange={e => setNewLegalDoc({ ...newLegalDoc, category: e.target.value as LegalDocumentVersion['category'] })}
                    className="w-full bg-slate-900 border border-emerald-900 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="consentimiento">Consentimiento</option>
                    <option value="estatuto">Estatuto</option>
                    <option value="terminos_admision">Términos Admisión</option>
                    <option value="privacidad">Privacidad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Resumen de Cambios (Changelog)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describa las modificaciones normativas aplicadas..."
                  value={newLegalDoc.changelog}
                  onChange={e => setNewLegalDoc({ ...newLegalDoc, changelog: e.target.value })}
                  className="w-full bg-slate-900 border border-emerald-900 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow"
                >
                  Guardar y Firmar SHA-256
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ARCO RESOLUTION MODAL */}
      {selectedArco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-emerald-800 rounded-3xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white">Resolución Reclamo ARCO N° {selectedArco.id}</h3>
              <button onClick={() => setSelectedArco(null)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl text-xs space-y-1.5 border border-white/5">
              <p><strong className="text-gray-300">Titular:</strong> {selectedArco.titularNombre} (DNI {selectedArco.titularDNI})</p>
              <p><strong className="text-gray-300">Derecho:</strong> <span className="text-emerald-400 font-bold uppercase">{selectedArco.tipoDerecho}</span></p>
              <p><strong className="text-gray-300">Detalle:</strong> "{selectedArco.motivoDetalle}"</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Notas de Resolución Oficial (Ley 25.326)</label>
                <textarea
                  rows={3}
                  value={arcoResolutionNotes}
                  onChange={e => setArcoResolutionNotes(e.target.value)}
                  placeholder="Detalle de las acciones tomadas en las bases de datos asociativas..."
                  className="w-full bg-slate-900 border border-emerald-900 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    processArcoRequest(selectedArco.id, 'resuelto', arcoResolutionNotes);
                    setSelectedArco(null);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow"
                >
                  Resolver como APROBADO
                </button>
                <button
                  onClick={() => {
                    processArcoRequest(selectedArco.id, 'rechazado', arcoResolutionNotes);
                    setSelectedArco(null);
                  }}
                  className="px-4 py-2.5 bg-rose-900 hover:bg-rose-800 text-rose-200 font-bold rounded-xl"
                >
                  Desestimar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
