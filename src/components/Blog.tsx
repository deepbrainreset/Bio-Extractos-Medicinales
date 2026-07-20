import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: "¿Cómo tramitar el REPROCANN en Comodoro Rivadavia? Guía Completa",
      excerpt: "Paso a paso para obtener tu credencial habilitante del Ministerio de Salud de la Nación. Requisitos, médicos autorizados en Chubut y vinculación con la Fundación.",
      category: "Trámites Legales",
      date: "24 Jun, 2026",
      author: "Dra. Sofía Albarracín",
      readTime: "5 min de lectura",
      image: "https://res.cloudinary.com/dw4k14vmn/image/upload/v1784515306/Imagen_generada_1_4_cjvkhw.png"
    },
    {
      title: "Cannabis Medicinal en Chubut: Qué establece la Ley Provincial 790/24",
      excerpt: "Analizamos el nuevo marco legal de la provincia de Chubut para clubes de cultivo y fundaciones. Qué derechos y protecciones otorga a los pacientes asociados.",
      category: "Legislación",
      date: "10 Jun, 2026",
      author: "Abog. Marcos Juárez",
      readTime: "7 min de lectura",
      image: "https://res.cloudinary.com/dw4k14vmn/image/upload/v1784513939/Imagen_generada_1_1_bvv3gq.png"
    },
    {
      title: "Beneficios del Cultivo Indoor Tecnificado y Extractos Full Spectrum",
      excerpt: "Por qué el control ambiental estricto y la extracción de espectro completo marcan la diferencia en tratamientos médicos para el dolor crónico, insomnio y epilepsia.",
      category: "Ciencia y Salud",
      date: "28 May, 2026",
      author: "Ing. Agr. Lucas Varela",
      readTime: "6 min de lectura",
      image: "https://res.cloudinary.com/dw4k14vmn/image/upload/v1784508483/Gemini_Generated_Image_1gp3d61gp3d61gp3_hedmhb.png"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Novedades y <span className="text-bio-green">Blog Educativo</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Información científica, jurídica y de actualidad sobre el cannabis medicinal en la Patagonia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-black border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-bio-green/40 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-bio-green text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-bio-green" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-bio-green" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bio-green-light transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-bio-green/20 flex items-center justify-center text-xs font-bold text-bio-green uppercase">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-gray-300">{post.author}</span>
                  </div>
                  
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-bio-green hover:text-bio-green-light group/btn transition-colors">
                    Leer más
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
