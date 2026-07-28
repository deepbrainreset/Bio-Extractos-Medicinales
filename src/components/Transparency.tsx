import React from 'react';
import { FileText, Shield, Award, Users, BookOpen, Lock, Download } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../config/organization';

export default function Transparency() {
  const documents = [
    {
      title: "Estatuto Social Aprobado",
      type: "Documento Institucional Base",
      status: "Vigente",
      desc: "Norma rectora de la Asociación Civil donde se fijan el objeto social, las categorías de socios y el funcionamiento de la Comisión Directiva."
    },
    {
      title: "Reglamento Interno de Admisión",
      type: "Resolución de Comisión Directiva",
      status: "Vigente",
      desc: "Procedimiento estandarizado de recepción de solicitudes, verificación médica y resguardo de datos sensibles bajo Ley 25.326."
    },
    {
      title: "Protocolo de Bioseguridad y Calidad",
      type: "Normativa Técnica Salud",
      status: "Vigente",
      desc: "Lineamientos técnicos para el cultivo asociativo, trazabilidad y control analítico de componentes activos en Chubut."
    },
    {
      title: "Memoria y Balance General (Ejercicio Anual)",
      type: "Rendición de Cuentas Asociativa",
      status: "En Archivo Institucional",
      desc: "Aprobación asociativa de recursos, estados contables e informes presentados ante Inspección General de Justicia."
    }
  ];

  return (
    <section id="transparencia" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
            Gobierno Abierto
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">
            Transparencia Institucional y Cumplimiento
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Garantizamos una gestión asociativa responsable, con rendición de cuentas, ética médica y contralor normativo.
          </p>
        </div>

        {/* Governance Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-slate-950 border border-emerald-900/40 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Asamblea General de Socios</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Órgano soberano supremo de la Asociación Civil. Aprueba los balances anuales, el plan de trabajo institucional y la elección de autoridades.
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-900/40 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Comisión Directiva</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Órgano colegiado de administración ejecutiva. Trata y aprueba individualmente las solicitudes de admisión de los socios adherentes.
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-900/40 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Órgano de Fiscalización</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Revisores de cuentas encargados de velar por la legalidad, el cumplimiento estatutario y la transparencia de las operaciones sociales.
            </p>
          </div>

        </div>

        {/* Documents Checklist / Placeholders */}
        <div className="bg-slate-950/80 border border-emerald-800/30 rounded-3xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Documentación e Informes de Gestión
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, idx) => (
              <div key={idx} className="bg-slate-900 border border-emerald-900/30 p-5 rounded-2xl flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800">
                      {doc.type}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Consulta disponible en Sede Institucional</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
