import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LegalProcess from './components/LegalProcess';
import Memberships from './components/Memberships';
import MedicalTracking from './components/MedicalTracking';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-bio-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <LegalProcess />
        <Memberships />
        <MedicalTracking />
        <Blog />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
