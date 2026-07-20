import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <img 
                src="https://res.cloudinary.com/dw4k14vmn/image/upload/v1784507584/1000075422_jp4uoc.webp" 
                alt="Logo Bioextractos Medicinales" 
                className="w-9 h-9 object-contain rounded-full border border-white/10"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-white lowercase">
                bioextractos medicinales
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Fundación Bioextractos Medicinales. Acceso legal, seguro y estandarizado al cannabis medicinal en la Patagonia.
            </p>
            <div className="bg-black border border-white/10 p-4 rounded-xl">
              <p className="text-xs text-gray-500 font-mono mb-1">PERSONERÍA JURÍDICA</p>
              <p className="text-sm text-white font-mono">CUIT: 30-71925788-3</p>
              <p className="text-sm text-white font-mono">Res. IGJ N° 452/23</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><a href="#inicio" className="text-gray-400 hover:text-bio-green transition-colors text-sm">Inicio</a></li>
              <li><a href="#nosotros" className="text-gray-400 hover:text-bio-green transition-colors text-sm">Nosotros</a></li>
              <li><a href="#proceso-legal" className="text-gray-400 hover:text-bio-green transition-colors text-sm">Marco Legal</a></li>
              <li><a href="#membresias" className="text-gray-400 hover:text-bio-green transition-colors text-sm">Membresías</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bio-green shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Comodoro Rivadavia,<br/>Chubut, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-bio-green shrink-0" />
                <span className="text-gray-400 text-sm">+54 9 297 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-bio-green shrink-0" />
                <span className="text-gray-400 text-sm">Bioextractosmed@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Warning */}
          <div>
            <h4 className="text-white font-semibold mb-6">Aviso Legal</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              El contenido de este sitio web es exclusivamente informativo. El uso de cannabis medicinal debe realizarse bajo estricta supervisión médica y en cumplimiento con la Ley Nacional 27.350 y normativas provinciales vigentes. La Fundación no promueve el uso recreativo ni la comercialización ilegal de estupefacientes.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Fundación Bioextractos Medicinales. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Términos y Condiciones</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
