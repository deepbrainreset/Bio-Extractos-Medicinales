import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdherentApplication, 
  ActiveView, 
  AuditLog, 
  SocialFeePayment, 
  ResignationRequest,
  StaffUser,
  StaffRole,
  LegalDocumentVersion,
  ARCORequest,
  DocExpirationAlert,
  SecurityIncidentLog
} from '../types';

interface ApplicationContextType {
  applications: AdherentApplication[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  submitApplication: (appData: Omit<AdherentApplication, 'id' | 'trackingCode' | 'fechaSolicitud' | 'estado'>) => AdherentApplication;
  updateApplicationStatus: (id: string, newStatus: AdherentApplication['estado'], notes?: string, reviewer?: string) => void;
  getApplicationByTracking: (trackingCode: string) => AdherentApplication | undefined;
  processPaymentWithWebhook: (appId: string, metodoPago: string, autoDebitConsent?: boolean) => { success: boolean; payment: SocialFeePayment };
  submitResignationRequest: (trackingCodeOrDni: string, motivo: string, cancelaDebitosFuturos: boolean) => { success: boolean; message: string };
  processResignationByAdmin: (appId: string, action: 'procesado' | 'rechazado', observaciones?: string) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, user: string, role?: string, sensitiveFieldAccessed?: string) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  activeTrackingSearch: string;
  setActiveTrackingSearch: (code: string) => void;

  // Internal Panel Extensions
  legalDocVersions: LegalDocumentVersion[];
  toggleLegalDocActive: (id: string) => void;
  addLegalDocVersion: (doc: Omit<LegalDocumentVersion, 'id' | 'hashSHA256'>) => void;
  
  arcoRequests: ARCORequest[];
  submitArcoRequest: (req: Omit<ARCORequest, 'id' | 'fechaSolicitud' | 'estado'>) => ARCORequest;
  processArcoRequest: (id: string, estado: ARCORequest['estado'], notes?: string) => void;

  docExpirationAlerts: DocExpirationAlert[];
  securityIncidentLogs: SecurityIncidentLog[];
  addSecurityIncident: (eventType: SecurityIncidentLog['eventType'], severity: SecurityIncidentLog['severity'], details: string, roleAttempted?: string) => void;
  anonymizeCandidateData: (appId: string, reason: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const INITIAL_APPLICATIONS: AdherentApplication[] = [
  {
    id: "app-1001",
    trackingCode: "BIO-2026-8921",
    fechaSolicitud: "2026-07-25 10:14:22",
    nombre: "María Elena",
    apellido: "González",
    dni: "34521890",
    fechaNacimiento: "1989-04-12",
    domicilio: "Av. Rivadavia 1240",
    localidad: "Comodoro Rivadavia",
    provincia: "Chubut",
    email: "mgonzalez@ejemplo.com",
    telefono: "2974581290",
    ocupacion: "Docente",
    indicacionMedicaStatus: "si",
    fechaEmisionReceta: "2026-05-10",
    nombreMedico: "Dr. Carlos Pellegrini",
    matriculaMedico: "MP 4512 - Chubut",
    especialidadMedico: "Neurología",
    motivoSalud: "Acompañamiento en dolor neuropático crónico con recomendación de cannabis medicinal.",
    estadoReprocann: "vigente",
    numeroVinculacionReprocann: "REP-2025-984210",
    adjuntoDNI: "DNI_Gonzalez_Maria.pdf",
    adjuntoOrdenMedica: "Indicacion_Medica_Pellegrini.pdf",
    adjuntoReprocann: "Credencial_REPROCANN_Vigente.pdf",
    aceptaTerminos: true,
    aceptaProteccionDatos: true,
    declaracionUsoMedicinal: true,
    aceptaCondicionesAdmision: true,
    versionTerminosAccepted: "v2026.1-LEY25326",
    ipHasheada: "hash_ip_e4d92a8b91",
    tokenUnico: "tok_adm_8921_sec",
    estado: "aprobado_comision",
    notasComision: "Documentación médica y DNI verificados. REPROCANN vigente validado. Solicitud aprobada en Acta de Comisión Directiva N° 42.",
    fechaRevision: "2026-07-26 14:30:00",
    revisadoPor: "Comisión Directiva - Vocal Médico",
    linkPagoGenerado: "https://fundacionbioextractosmedicinales.com/pago?id=app-1001&token=sec_982410",
    membresiaActiva: true,
    fechaVencimientoCuota: "2026-08-26",
    metodoPagoHabitual: "Mercado Pago",
    debitoAutomaticoConsentido: true,
    historialPagos: [
      {
        id: "pay-8901",
        operacionId: "MP-2026-8901239",
        monto: 10000,
        moneda: "ARS",
        periodo: "Julio 2026",
        fechaVencimiento: "2026-08-26",
        fechaPago: "2026-07-26 15:00:12",
        estado: "pagado",
        metodoPago: "Mercado Pago",
        entidadReceptora: "Asociación Civil Bio Extractos Medicinales",
        cuitReceptora: "30-71894210-9",
        webhookVerificado: true,
        firmaCriptografica: "sha256_v2_9a8f2e4c11b023dd49",
        concepto: "Cuota Social Mensual - Sostenimiento Institucional"
      }
    ]
  },
  {
    id: "app-1002",
    trackingCode: "BIO-2026-9043",
    fechaSolicitud: "2026-07-27 16:45:10",
    nombre: "Roberto Omar",
    apellido: "Vargas",
    dni: "28109332",
    fechaNacimiento: "1980-09-21",
    domicilio: "Calle España 540",
    localidad: "Comodoro Rivadavia",
    provincia: "Chubut",
    email: "roberto.vargas@ejemplo.com",
    telefono: "2974128900",
    ocupacion: "Comerciante",
    indicacionMedicaStatus: "si",
    fechaEmisionReceta: "2026-06-01",
    nombreMedico: "Dra. Sofía Albarracín",
    matriculaMedico: "MP 3890 - Chubut",
    especialidadMedico: "Clínica Médica",
    motivoSalud: "Tratamiento coadyuvante para fibromialgia e insomnio secundario.",
    estadoReprocann: "en_tramite",
    numeroVinculacionReprocann: "TR-2026-112049",
    adjuntoDNI: "DNI_Vargas_Roberto.pdf",
    adjuntoOrdenMedica: "Prescripcion_Albarracin.pdf",
    aceptaTerminos: true,
    aceptaProteccionDatos: true,
    declaracionUsoMedicinal: true,
    aceptaCondicionesAdmision: true,
    versionTerminosAccepted: "v2026.1-LEY25326",
    ipHasheada: "hash_ip_f8120c91a0",
    tokenUnico: "tok_adm_9043_sec",
    estado: "en_evaluacion_medica",
    notasComision: "En revisión de vincular trámite REPROCANN en estado en evaluación por Ministerio de Salud.",
    fechaRevision: "2026-07-28 09:15:00",
    revisadoPor: "Área Legal y Médica",
    membresiaActiva: false
  },
  {
    id: "app-1003",
    trackingCode: "BIO-2026-9120",
    fechaSolicitud: "2026-07-28 11:20:00",
    nombre: "Florencia",
    apellido: "Pérez Bunge",
    dni: "39400112",
    fechaNacimiento: "1996-01-30",
    domicilio: "Barrio Pueyrredón, Mza 12",
    localidad: "Rada Tilly",
    provincia: "Chubut",
    email: "flor.perezbunge@ejemplo.com",
    telefono: "2974903322",
    indicacionMedicaStatus: "prefiero_orientacion",
    estadoReprocann: "no_iniciado",
    adjuntoDNI: "DNI_Perez_Florencia.jpg",
    aceptaTerminos: true,
    aceptaProteccionDatos: true,
    declaracionUsoMedicinal: true,
    aceptaCondicionesAdmision: true,
    versionTerminosAccepted: "v2026.1-LEY25326",
    ipHasheada: "hash_ip_c3104e12d4",
    tokenUnico: "tok_adm_9120_sec",
    estado: "requiere_documentacion",
    notasComision: "Se requiere presentar orden e indicación médica emitida por profesional matriculado para iniciar el proceso de orientación e inscripción.",
    fechaRevision: "2026-07-28 12:00:00",
    revisadoPor: "Secretaría de Admisión",
    membresiaActiva: false
  }
];

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<AdherentApplication[]>(() => {
    const saved = localStorage.getItem('bio_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_APPLICATIONS;
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bio_admin_auth') === 'true';
  });
  const [activeTrackingSearch, setActiveTrackingSearch] = useState<string>('');

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('bio_audit_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'log-1',
        timestamp: '2026-07-26 14:30:00',
        action: 'Aprobación de Admisión',
        details: 'Solicitud BIO-2026-8921 aprobada por Comisión Directiva. Se generó token de pago cuota social.',
        user: 'Comisión Directiva'
      },
      {
        id: 'log-2',
        timestamp: '2026-07-26 15:00:12',
        action: 'Pago de Cuota Social Verificado',
        details: 'Webhook Mercado Pago validado (Firma Criptográfica OK). Operación MP-2026-8901239 abonada por ARS 10.000 (Julio 2026). Membresía activada.',
        user: 'Webhook Gateway MercadoPago'
      }
    ];
  });

  const [legalDocVersions, setLegalDocVersions] = useState<LegalDocumentVersion[]>(() => {
    const saved = localStorage.getItem('bio_legal_docs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'doc-1',
        title: 'Consentimiento Informado Terapéutico y Asoc.',
        version: 'v2.4',
        effectiveDate: '2026-01-15',
        active: true,
        changelog: 'Actualización con Ley Chubut 790/24 y normativas REPROCANN 2026.',
        hashSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        category: 'consentimiento'
      },
      {
        id: 'doc-2',
        title: 'Estatuto Asociativo - Condición Socio Adherente',
        version: 'v1.8',
        effectiveDate: '2025-11-01',
        active: true,
        changelog: 'Aclaración de cuota social de sostenimiento no comercial y procedimiento de baja.',
        hashSHA256: 'ca978112ca1bbdcafac231b39a23dc4da786ee90a398d2e31d45bc81f12629b1',
        category: 'estatuto'
      },
      {
        id: 'doc-3',
        title: 'Términos y Condiciones de Admisión Digital',
        version: 'v3.1',
        effectiveDate: '2026-03-20',
        active: true,
        changelog: 'Inclusión de pasarelas de pago con webhook y firma criptográfica HMAC-SHA256.',
        hashSHA256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
        category: 'terminos_admision'
      },
      {
        id: 'doc-4',
        title: 'Política de Privacidad y Protección de Datos (Ley 25.326)',
        version: 'v2.0',
        effectiveDate: '2026-02-10',
        active: true,
        changelog: 'Alineamiento con derechos ARCO (Acceso, Rectificación, Cancelación y Oposición).',
        hashSHA256: '3829104018f23019aa102931d8e120d91280918c23812d09123891d0e1290a12',
        category: 'privacidad'
      }
    ];
  });

  const [arcoRequests, setArcoRequests] = useState<ARCORequest[]>(() => {
    const saved = localStorage.getItem('bio_arco_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'arco-801',
        trackingCode: 'BIO-2026-9120',
        tipoDerecho: 'rectificacion',
        titularNombre: 'Florencia Pérez Bunge',
        titularDNI: '39400112',
        email: 'flor.perezbunge@ejemplo.com',
        fechaSolicitud: '2026-07-28 12:30:00',
        motivoDetalle: 'Solicita rectificar el número de teléfono celular por cambio de línea y adjunta nueva constancia.',
        estado: 'en_verificacion'
      }
    ];
  });

  const [docExpirationAlerts, setDocExpirationAlerts] = useState<DocExpirationAlert[]>([
    {
      id: 'alert-1',
      applicationId: 'app-1002',
      trackingCode: 'BIO-2026-9043',
      titularNombre: 'Roberto Omar Vargas',
      tipoDocumento: 'REPROCANN',
      fechaVencimiento: '2026-08-15',
      diasRestantes: 18,
      nivelAlerta: 'advertencia',
      retencionAnonymizeDeadline: '2026-10-15'
    },
    {
      id: 'alert-2',
      applicationId: 'app-1003',
      trackingCode: 'BIO-2026-9120',
      titularNombre: 'Florencia Pérez Bunge',
      tipoDocumento: 'Orden Medica',
      fechaVencimiento: '2026-08-01',
      diasRestantes: 4,
      nivelAlerta: 'critico',
      retencionAnonymizeDeadline: '2026-09-01'
    }
  ]);

  const [securityIncidentLogs, setSecurityIncidentLogs] = useState<SecurityIncidentLog[]>([
    {
      id: 'sec-1',
      timestamp: '2026-07-28 08:12:00',
      eventType: 'login_failure',
      ipHash: 'ip_hash_8912a01',
      roleAttempted: 'tesoreria',
      severity: 'low',
      details: 'Intento de inicio de sesión con clave incorrecta desde IP autorizada. Rate limiter activo.'
    },
    {
      id: 'sec-2',
      timestamp: '2026-07-28 10:05:44',
      eventType: 'unauthorized_field_access',
      ipHash: 'ip_hash_f3290b2',
      roleAttempted: 'soporte',
      severity: 'medium',
      details: 'Bloqueo automático de acceso: El rol Soporte intentó abrir adjunto de Historia Clínica. Acceso denegado por RBAC.'
    }
  ]);

  useEffect(() => {
    localStorage.setItem('bio_legal_docs', JSON.stringify(legalDocVersions));
  }, [legalDocVersions]);

  useEffect(() => {
    localStorage.setItem('bio_arco_requests', JSON.stringify(arcoRequests));
  }, [arcoRequests]);

  const addAuditLog = (
    action: string, 
    details: string, 
    user: string, 
    role: string = 'Administrador',
    sensitiveFieldAccessed?: string
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      action: action,
      details: details,
      user: user,
      role: role,
      ipHash: `hash_ip_${Math.random().toString(36).substring(2, 8)}`,
      sensitiveFieldAccessed: sensitiveFieldAccessed
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addSecurityIncident = (
    eventType: SecurityIncidentLog['eventType'], 
    severity: SecurityIncidentLog['severity'], 
    details: string, 
    roleAttempted?: string
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const incident: SecurityIncidentLog = {
      id: `sec-${Date.now()}`,
      timestamp: now,
      eventType,
      ipHash: `ip_hash_${Math.random().toString(36).substring(2, 8)}`,
      roleAttempted,
      severity,
      details
    };
    setSecurityIncidentLogs(prev => [incident, ...prev]);
  };

  const toggleLegalDocActive = (id: string) => {
    setLegalDocVersions(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
    addAuditLog('Actualización Documento Legal', `Cambio de estado activo para documento ID ${id}`, 'Administrador Legal', 'admin');
  };

  const addLegalDocVersion = (doc: Omit<LegalDocumentVersion, 'id' | 'hashSHA256'>) => {
    const newDoc: LegalDocumentVersion = {
      ...doc,
      id: `doc-${Date.now()}`,
      hashSHA256: `sha256_${Math.random().toString(36).substring(2, 18)}`
    };
    setLegalDocVersions(prev => [newDoc, ...prev]);
    addAuditLog('Nueva Versión Legal Creada', `Documento ${doc.title} ${doc.version} publicado.`, 'Administrador Legal', 'admin');
  };

  const submitArcoRequest = (req: Omit<ARCORequest, 'id' | 'fechaSolicitud' | 'estado'>): ARCORequest => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newReq: ARCORequest = {
      ...req,
      id: `arco-${Date.now()}`,
      fechaSolicitud: now,
      estado: 'recibido'
    };
    setArcoRequests(prev => [newReq, ...prev]);
    addAuditLog('Nueva Solicitud ARCO (Ley 25.326)', `Derecho de ${req.tipoDerecho.toUpperCase()} solicitado por ${req.titularNombre} (DNI ${req.titularDNI}).`, 'Titular de Datos', 'titular');
    return newReq;
  };

  const processArcoRequest = (id: string, estado: ARCORequest['estado'], notes?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setArcoRequests(prev => prev.map(r => r.id === id ? {
      ...r,
      estado,
      resolucionNotes: notes,
      fechaResolucion: now
    } : r));
    addAuditLog('Resolución Solicitud ARCO', `Trámite ARCO ID ${id} resuelto como ${estado.toUpperCase()}. Notes: ${notes || 'Sin notas'}`, 'Oficial de Datos', 'admin');
  };

  const anonymizeCandidateData = (appId: string, reason: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          nombre: "ANÓNIMO",
          apellido: "PURGADO",
          dni: "XX.XXX.XXX",
          email: "anonimo@purgado.local",
          telefono: "0000000000",
          domicilio: "DIRECCIÓN ANÓNIMIZADA",
          motivoSalud: "DATOS CLÍNICOS PURGADOS POR RETENCIÓN LEGAL",
          adjuntoDNI: undefined,
          adjuntoOrdenMedica: undefined,
          adjuntoReprocann: undefined,
          notasComision: `EXPEDIENTE PURGADO Y ANONIMIZADO CONFORME POLÍTICA DE RETENCIÓN LEGAL. Razón: ${reason}`
        };
      }
      return app;
    }));
    addAuditLog('Anonimización y Purga Legal', `Expediente ${appId} anonimizado según plazo legal de retención. Motivo: ${reason}`, 'Oficial de Protección de Datos', 'admin');
  };

  const submitApplication = (appData: Omit<AdherentApplication, 'id' | 'trackingCode' | 'fechaSolicitud' | 'estado'>): AdherentApplication => {
    const randomCode = `BIO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newId = `app-${Date.now()}`;
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    const newApp: AdherentApplication = {
      ...appData,
      id: newId,
      trackingCode: randomCode,
      fechaSolicitud: formattedDate,
      estado: 'pendiente_revision',
      membresiaActiva: false
    };

    setApplications(prev => [newApp, ...prev]);

    // Add log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: formattedDate,
      action: 'Nueva Solicitud Digital',
      details: `Solicitud ${randomCode} registrada para DNI ${appData.dni} (${appData.apellido}, ${appData.nombre}).`,
      user: 'Sistema Web'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return newApp;
  };

  const updateApplicationStatus = (
    id: string, 
    newStatus: AdherentApplication['estado'], 
    notes?: string,
    reviewer: string = 'Comisión Directiva'
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        let paymentLink = app.linkPagoGenerado;
        if (newStatus === 'aprobado_comision' && !paymentLink) {
          paymentLink = `https://${ORGANIZATION_CONFIG_DOMAIN}/pago?id=${app.id}&token=sec_${Math.random().toString(36).substring(2, 9)}`;
        }
        return {
          ...app,
          estado: newStatus,
          notasComision: notes !== undefined ? notes : app.notasComision,
          fechaRevision: now,
          revisadoPor: reviewer,
          linkPagoGenerado: paymentLink
        };
      }
      return app;
    }));

    const target = applications.find(a => a.id === id);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      action: `Cambio de Estado: ${newStatus}`,
      details: `Solicitud ${target?.trackingCode || id} actualizada a ${newStatus}. Notas: ${notes || 'Sin notas'}`,
      user: reviewer
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const getApplicationByTracking = (trackingCode: string) => {
    const cleanSearch = trackingCode.trim().toUpperCase();
    const cleanNum = trackingCode.replace(/\D/g, '');
    return applications.find(a => 
      a.trackingCode.trim().toUpperCase() === cleanSearch || 
      (cleanNum && a.dni.replace(/\D/g, '') === cleanNum)
    );
  };

  // Process payment with simulated webhook validation (Mercado Pago / Stripe signature check)
  const processPaymentWithWebhook = (
    appId: string, 
    metodoPago: string = 'Mercado Pago', 
    autoDebitConsent: boolean = false
  ): { success: boolean; payment: SocialFeePayment } => {
    const now = new Date();
    const formattedNow = now.toISOString().replace('T', ' ').substring(0, 19);
    
    // Calculate 30 days ahead for next due date
    const nextDueDate = new Date(now.valueOf() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const currentPeriod = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    const operacionId = `${metodoPago.toUpperCase().substring(0, 2)}-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const sigHash = `sha256_v2_${Math.random().toString(36).substring(2, 18)}`;

    const newPayment: SocialFeePayment = {
      id: `pay-${Date.now()}`,
      operacionId: operacionId,
      monto: 10000,
      moneda: 'ARS',
      periodo: currentPeriod,
      fechaVencimiento: nextDueDate,
      fechaPago: formattedNow,
      estado: 'pagado',
      metodoPago: metodoPago,
      entidadReceptora: 'Asociación Civil Bio Extractos Medicinales',
      cuitReceptora: '30-71894210-9',
      webhookVerificado: true,
      firmaCriptografica: sigHash,
      concepto: 'Cuota Social Mensual - Sostenimiento Institucional'
    };

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedHist = [newPayment, ...(app.historialPagos || [])];
        return {
          ...app,
          membresiaActiva: true,
          fechaVencimientoCuota: nextDueDate,
          metodoPagoHabitual: metodoPago,
          debitoAutomaticoConsentido: autoDebitConsent,
          historialPagos: updatedHist
        };
      }
      return app;
    }));

    // Add webhook audit log
    const targetApp = applications.find(a => a.id === appId);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: formattedNow,
      action: 'Pago Cuota Social Webhook Verificado',
      details: `Webhook de pasarela ${metodoPago} validado criptográficamente (Signature ${sigHash.substring(0, 12)}...). Operación ${operacionId} aprobada por ARS 10.000 (${currentPeriod}) para ${targetApp?.nombre} ${targetApp?.apellido} (DNI ${targetApp?.dni}).`,
      user: `Webhook Service (${metodoPago})`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return { success: true, payment: newPayment };
  };

  // Submit Resignation Request ("Solicitar baja")
  const submitResignationRequest = (
    trackingCodeOrDni: string, 
    motivo: string, 
    cancelaDebitosFuturos: boolean
  ): { success: boolean; message: string } => {
    const app = getApplicationByTracking(trackingCodeOrDni);
    if (!app) {
      return { success: false, message: "No se encontró ninguna solicitud ni socio registrado con ese Código de Seguimiento o DNI." };
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const resignation: ResignationRequest = {
      id: `baja-${Date.now()}`,
      applicationId: app.id,
      trackingCode: app.trackingCode,
      nombre: app.nombre,
      apellido: app.apellido,
      dni: app.dni,
      email: app.email,
      fechaSolicitud: now,
      motivo: motivo.trim() || 'Desvinculación voluntaria de la Asociación Civil',
      aceptaTerminosBaja: true,
      cancelaDebitosFuturos: cancelaDebitosFuturos,
      estadoBaja: 'pendiente'
    };

    setApplications(prev => prev.map(item => {
      if (item.id === app.id) {
        return {
          ...item,
          solicitudBaja: resignation,
          debitoAutomaticoConsentido: cancelaDebitosFuturos ? false : item.debitoAutomaticoConsentido
        };
      }
      return item;
    }));

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      action: 'Solicitud de Baja Registrada',
      details: `Socio ${app.nombre} ${app.apellido} (DNI ${app.dni}, Código ${app.trackingCode}) solicitó la desvinculación societaria. Débitos automáticos cancelados: ${cancelaDebitosFuturos ? 'SÍ' : 'NO'}.`,
      user: 'Socio Adherente (Portal Digital)'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return { 
      success: true, 
      message: `Solicitud de baja societaria registrada exitosamente para ${app.nombre} ${app.apellido}. La renovación automática fue cancelada.` 
    };
  };

  // Admin processes resignation
  const processResignationByAdmin = (appId: string, action: 'procesado' | 'rechazado', observaciones?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setApplications(prev => prev.map(app => {
      if (app.id === appId && app.solicitudBaja) {
        const updatedBaja: ResignationRequest = {
          ...app.solicitudBaja,
          estadoBaja: action,
          fechaProcesamiento: now,
          observaciones: observaciones
        };
        return {
          ...app,
          solicitudBaja: updatedBaja,
          membresiaActiva: action === 'procesado' ? false : app.membresiaActiva,
          debitoAutomaticoConsentido: action === 'procesado' ? false : app.debitoAutomaticoConsentido
        };
      }
      return app;
    }));

    const app = applications.find(a => a.id === appId);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      action: `Procesamiento de Baja: ${action.toUpperCase()}`,
      details: `La Comisión Directiva ${action === 'procesado' ? 'aprobó y procesó' : 'desestimó'} la baja societaria de ${app?.nombre} ${app?.apellido} (DNI ${app?.dni}).`,
      user: 'Comisión Directiva / Administración'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'bio2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('bio_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('bio_admin_auth');
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      activeView,
      setActiveView,
      submitApplication,
      updateApplicationStatus,
      getApplicationByTracking,
      processPaymentWithWebhook,
      submitResignationRequest,
      processResignationByAdmin,
      auditLogs,
      addAuditLog,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      activeTrackingSearch,
      setActiveTrackingSearch,
      legalDocVersions,
      toggleLegalDocActive,
      addLegalDocVersion,
      arcoRequests,
      submitArcoRequest,
      processArcoRequest,
      docExpirationAlerts,
      securityIncidentLogs,
      addSecurityIncident,
      anonymizeCandidateData
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

const ORGANIZATION_CONFIG_DOMAIN = "fundacionbioextractosmedicinales.com";

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error('useApplication must be used within an ApplicationProvider');
  return context;
};

