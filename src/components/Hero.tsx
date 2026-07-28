import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShieldAlert, FileCheck, Info, UserCheck, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORGANIZATION_CONFIG } from '../config/organization';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenApplicationModal: () => void;
  onOpenProcess: () => void;
  onOpenReprocannGuide: () => void;
}

export default function Hero({ onOpenApplicationModal, onOpenProcess, onOpenReprocannGuide }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay check:", err);
      });
    }

    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: 0.5,
        pin: true,
      }
    });

    tl.to(".hero-content", {
      opacity: 0.85,
      y: -15,
      duration: 1,
      ease: "power1.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="inicio" ref={containerRef} className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-between pt-24 pb-8">
      {/* Background Video Animation */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dw4k14vmn/video/upload/v1785269449/VID-20260728-WA0082_sqfygz.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
      />

      {/* Dark Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90 z-1 pointer-events-none" />

      {/* Content Overlay */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center my-auto">
        
        {/* Badge Institucional */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-6 mx-auto backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{ORGANIZATION_CONFIG.legalType} • Comodoro Rivadavia, Chubut</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Información, acompañamiento y comunidad para un <span className="text-emerald-400 font-extrabold">acceso responsable</span> al cannabis medicinal.
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-200 font-normal mb-8 leading-relaxed">
          Facilitamos orientación legal e institucional, promovamos la investigación científica y brindamos contención asociativa a pacientes con indicación médica en el marco de la <strong className="text-white font-semibold">Ley Nacional 27.350</strong> y la <strong className="text-white font-semibold">Ley Provincial de Chubut 790/24</strong>.
        </p>

        {/* CTAs Requeridos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto w-full mb-8">
          {/* Botón 1: Solicitar adhesión */}
          <button
            onClick={onOpenApplicationModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all hover:scale-105 shadow-xl shadow-emerald-900/40 border border-emerald-400/30"
          >
            <UserCheck className="w-5 h-5" />
            Solicitar adhesión
          </button>

          {/* Botón 2: Conocer el proceso */}
          <button
            onClick={onOpenProcess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800/90 text-white border border-white/20 px-6 py-3.5 rounded-full text-base font-semibold transition-all backdrop-blur-md shadow-lg"
          >
            <FileCheck className="w-5 h-5 text-emerald-400" />
            Conocer el proceso
          </button>

          {/* Botón 3: Orientación sobre REPROCANN */}
          <button
            onClick={onOpenReprocannGuide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-700/50 px-6 py-3.5 rounded-full text-base font-semibold transition-all backdrop-blur-md"
          >
            <Info className="w-5 h-5 text-emerald-400" />
            Orientación sobre REPROCANN
          </button>
        </div>

        {/* Disclaimer Visible Requerido */}
        <div className="max-w-3xl mx-auto bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-gray-300 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-500" />
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300 block mb-1">Aviso Institucional Importante:</span>
              <p className="leading-relaxed text-gray-300">
                {ORGANIZATION_CONFIG.disclaimers.hero}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 text-emerald-400/80 animate-bounce mt-4">
        <div className="w-[28px] h-[46px] rounded-full border-2 border-emerald-500/30 flex justify-center p-2 backdrop-blur-sm bg-black/30">
          <div className="w-1 h-3 bg-emerald-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
