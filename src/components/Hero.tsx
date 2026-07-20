import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 60;
    const currentFrame = (index: number) => 
      `https://storage.googleapis.com/ais-assets/bio-extractos/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = {
      frame: 0
    };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (airpods.frame === i) {
          render();
        }
      };
      images.push(img);
    }

    // Draw first frame when loaded
    if (images[0]) {
      images[0].onload = render;
    }

    function render() {
      if (!context || !canvas) return;
      const img = images[airpods.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%", // Scroll distance
        scrub: 0.5,    // Smooth scrubbing
        pin: true,     // Pin the container
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    // Fade in content at the end of the animation
    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

    // Handle resize
    const handleResize = () => {
      // Keep aspect ratio 16:9
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const scale = Math.min(
        containerWidth / 1920,
        containerHeight / 1080
      );
      
      canvas.style.width = `${1920 * scale}px`;
      canvas.style.height = `${1080 * scale}px`;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="inicio" ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center">
      {/* Canvas for Video Frames */}
      <canvas 
        ref={canvasRef} 
        className="absolute z-0"
        style={{ objectFit: 'contain' }}
      />

      {/* Content Overlay - Fades in at the end */}
      <div className="hero-content opacity-0 translate-y-10 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[20vh] md:mt-[25vh]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight mb-4 lowercase">
          fundación <span className="text-bio-green">bioextractos medicinales</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-700 font-medium mb-8">
          Acceso legal, seguro y estandarizado al cannabis medicinal en Comodoro Rivadavia, Chubut. Acompañamiento profesional y cultivos de grado médico.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#membresias"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bio-green hover:bg-bio-green-light text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            Ver Membresías
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#proceso-legal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-bio-green border border-bio-green/20 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg"
          >
            Conocer el Marco Legal
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-bio-green/50 animate-bounce">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-bio-green/20 flex justify-center p-2">
          <div className="w-1 h-3 bg-bio-green rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
