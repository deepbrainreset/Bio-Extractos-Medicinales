export type ApplicationStatus = 
  | 'pendiente_revision' 
  | 'en_evaluacion_medica' 
  | 'aprobado_comision' 
  | 'rechazado' 
  | 'requiere_documentacion';

export type PaymentStatus = 
  | 'pendiente' 
  | 'pagado' 
  | 'vencido' 
  | 'rechazado' 
  | 'reembolsado' 
  | 'cancelado';

export type ReprocannStatus = 'vigente' | 'en_tramite' | 'no_iniciado' | 'prefiero_asesoramiento';

export type MedicalIndicationStatus = 'si' | 'no' | 'prefiero_orientacion';

export interface SocialFeePayment {
  id: string;
  operacionId: string;
  monto: number; // e.g. 10000
  moneda: string; // "ARS"
  periodo: string; // e.g. "Julio 2026"
  fechaVencimiento: string;
  fechaPago?: string;
  estado: PaymentStatus;
  metodoPago: string; // "Mercado Pago" | "Stripe" | "Transferencia CBU"
  entidadReceptora: string; // "Asociacion Civil Bio Extractos Medicinales"
  cuitReceptora: string; // "30-71894210-9"
  webhookVerificado: boolean;
  firmaCriptografica?: string;
  comprobanteUrl?: string;
  concepto: string; // "Cuota Social Mensual - Sostenimiento Institucional"
}

export interface ResignationRequest {
  id: string;
  applicationId: string;
  trackingCode: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fechaSolicitud: string;
  motivo?: string;
  aceptaTerminosBaja: boolean;
  cancelaDebitosFuturos: boolean;
  estadoBaja: 'pendiente' | 'procesado' | 'rechazado';
  fechaProcesamiento?: string;
  observaciones?: string;
}

export interface AdherentApplication {
  id: string;
  trackingCode: string;
  fechaSolicitud: string;
  
  // Datos personales
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  esMenorEdad?: boolean;
  nombreRepresentanteLegal?: string;
  dniRepresentanteLegal?: string;
  vinculoRepresentanteLegal?: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  email: string;
  telefono: string;
  ocupacion?: string;

  // Situación Médica
  indicacionMedicaStatus: MedicalIndicationStatus;
  fechaEmisionReceta?: string;
  nombreMedico?: string;
  matriculaMedico?: string;
  especialidadMedico?: string;
  motivoSalud?: string;

  // Situación REPROCANN
  estadoReprocann: ReprocannStatus;
  numeroVinculacionReprocann?: string;

  // Adjuntos (Simulados/URLs o nombres de archivos)
  adjuntoDNI?: string;
  adjuntoOrdenMedica?: string;
  adjuntoReprocann?: string;
  adjuntoPoderLegal?: string;

  // Declaración jurada
  aceptaTerminos: boolean;
  aceptaProteccionDatos: boolean;
  declaracionUsoMedicinal: boolean;
  aceptaCondicionesAdmision: boolean; // Comprende que no garantiza admisión, cuota tras aprobación, no comercializa

  // Auditoría y Privacidad
  versionTerminosAccepted: string;
  ipHasheada: string;
  tokenUnico: string;

  // Estado administrativo
  estado: ApplicationStatus;
  notasComision?: string;
  fechaRevision?: string;
  revisadoPor?: string;
  linkPagoGenerado?: string;

  // Estado de Cuota Social y Membresía
  membresiaActiva?: boolean;
  fechaVencimientoCuota?: string;
  metodoPagoHabitual?: string;
  debitoAutomaticoConsentido?: boolean;
  historialPagos?: SocialFeePayment[];
  solicitudBaja?: ResignationRequest;
}

export type ActiveView = 
  | 'home' 
  | 'asociacion' 
  | 'admision' 
  | 'solicitud' 
  | 'reprocann' 
  | 'cuota' 
  | 'baja'
  | 'transparencia' 
  | 'faq' 
  | 'contacto' 
  | 'privacidad' 
  | 'terminos' 
  | 'admin';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  user: string;
  role?: string;
  ipHash?: string;
  sensitiveFieldAccessed?: string;
}

export type StaffRole = 
  | 'admin' 
  | 'comision_directiva' 
  | 'admision' 
  | 'director_medico' 
  | 'tesoreria' 
  | 'soporte';

export interface StaffUser {
  id: string;
  nombre: string;
  email: string;
  role: StaffRole;
  mfaEnabled: boolean;
  lastLogin?: string;
}

export interface LegalDocumentVersion {
  id: string;
  title: string;
  version: string;
  effectiveDate: string;
  active: boolean;
  changelog: string;
  hashSHA256: string;
  category: 'consentimiento' | 'estatuto' | 'terminos_admision' | 'privacidad';
}

export interface ARCORequest {
  id: string;
  trackingCode: string;
  tipoDerecho: 'acceso' | 'rectificacion' | 'cancelacion' | 'oposicion' | 'portabilidad';
  titularNombre: string;
  titularDNI: string;
  email: string;
  fechaSolicitud: string;
  motivoDetalle: string;
  estado: 'recibido' | 'en_verificacion' | 'resuelto' | 'rechazado';
  resolucionNotes?: string;
  fechaResolucion?: string;
}

export interface DocExpirationAlert {
  id: string;
  applicationId: string;
  trackingCode: string;
  titularNombre: string;
  tipoDocumento: 'REPROCANN' | 'Orden Medica' | 'DNI' | 'Poder Legal';
  fechaVencimiento: string;
  diasRestantes: number;
  nivelAlerta: 'critico' | 'advertencia' | 'ok';
  retencionAnonymizeDeadline?: string;
}

export interface SecurityIncidentLog {
  id: string;
  timestamp: string;
  eventType: 'login_failure' | 'mfa_failure' | 'rate_limit_exceeded' | 'unauthorized_field_access' | 'csrf_invalid';
  ipHash: string;
  roleAttempted?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
}

