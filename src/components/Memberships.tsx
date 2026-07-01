import { motion } from 'motion/react';
import { Check, QrCode } from 'lucide-react';

export default function Memberships() {
  const plans = [
    {
      name: "Mensual",
      price: "$45.000",
      period: "/mes",
      description: "Ideal para iniciar tratamiento y conocer nuestros productos.",
      features: [
        "Dispensación mensual (hasta 40g o 6 frascos)",
        "Carnet digital QR básico",
        "Consulta médica de seguimiento (con cargo)",
        "Acceso a cepas estándar",
        "Asesoría legal básica"
      ],
      highlighted: false,
      buttonText: "Elegir Mensual"
    },
    {
      name: "Anual Premium",
      price: "$38.000",
      period: "/mes",
      description: "La opción más segura y económica. Cobertura total por 12 meses.",
      features: [
        "Dispensación mensual prioritaria",
        "Carnet digital QR Premium (Máxima seguridad legal)",
        "Consultas médicas de seguimiento bonificadas",
        "Acceso a cepas exclusivas y altas concentraciones",
        "Gestión y renovación de REPROCANN incluida",
        "Asesoría legal 24/7 ante eventualidades"
      ],
      highlighted: true,
      buttonText: "Elegir Anual (Recomendado)",
      badge: "Mayor Seguridad Legal"
    }
  ];

  return (
    <section id="membresias" className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Membresías y <span className="text-bio-green">Carnet QR</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Asociate a la Fundación y obtené tu credencial digital con código QR, validando tu estatus legal ante cualquier autoridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-zinc-900/50 rounded-3xl p-8 border ${
                plan.highlighted ? 'border-bio-green shadow-[0_0_30px_rgba(45,90,39,0.2)]' : 'border-white/10'
              } flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bio-green text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                {plan.highlighted && (
                  <p className="text-bio-green-light text-sm mt-2 font-medium">Facturación anual: $456.000</p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-bio-green' : 'text-gray-500'}`} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-bio-green hover:bg-bio-green-light text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 px-6 py-3 rounded-full">
            <QrCode className="w-6 h-6 text-bio-green" />
            <span className="text-gray-300 font-medium">Todas las membresías incluyen Carnet Digital QR encriptado.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
