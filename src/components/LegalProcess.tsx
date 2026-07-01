import { motion } from 'motion/react';
import { Scale, FileText, CheckCircle2 } from 'lucide-react';

export default function LegalProcess() {
  return (
    <section id="proceso-legal" className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Marco <span className="text-bio-green">Legal y Normativo</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Operamos bajo el estricto cumplimiento de las leyes nacionales y provinciales, garantizando total seguridad jurídica para nuestros socios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* REPROCANN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-white/10 rounded-3xl p-8 hover:border-bio-green/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-bio-green/20 flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-bio-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">REPROCANN (Nacional)</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Registro del Programa de Cannabis. Autoriza el cultivo controlado y la dispensación para fines medicinales, terapéuticos y/o paliativos del dolor.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Hasta 40g de flores secas por mes por paciente.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Hasta 6 frascos de 30ml de extractos/aceites.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Transporte legal en todo el territorio nacional.</span>
              </li>
            </ul>
          </motion.div>

          {/* Ley Provincial */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black border border-white/10 rounded-3xl p-8 hover:border-bio-green/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-bio-green/20 flex items-center justify-center mb-6">
              <Scale className="w-7 h-7 text-bio-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ley Prov. Chubut 790/24</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Adhesión y regulación provincial que establece el marco para el funcionamiento de fundaciones y clubes de cultivo en la provincia de Chubut.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Reconocimiento oficial de la Fundación como dispensario.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Trazabilidad obligatoria de los lotes dispensados.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span>Protección legal frente a fuerzas de seguridad locales.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="bg-bio-green/10 border border-bio-green/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">¿No tenés REPROCANN?</h4>
            <p className="text-gray-400">Nuestro equipo legal y médico gestiona tu vinculación y trámite de manera integral.</p>
          </div>
          <a href="#contacto" className="shrink-0 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-semibold transition-colors">
            Iniciar Trámite
          </a>
        </div>
      </div>
    </section>
  );
}
