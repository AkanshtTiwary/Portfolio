import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import Home from './pages/Home';
import './styles/globals.css';
import './styles/animations.css';
import './styles/effects-cursor.css';

/**
 * Main App Component
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Match loader animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      
      {/* Professional Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/ferrari-f1-bg.jpg)',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.8) contrast(1.3) saturate(1.2)'
          }}
        />
        
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-f1-black/40 via-f1-black/30 to-f1-black/50" />
        
        {/* Radial gradient for focus */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-f1-black" 
             style={{
               background: 'radial-gradient(ellipse at center, transparent 0%, rgba(21, 21, 30, 0.1) 50%, rgba(21, 21, 30, 0.4) 100%)'
             }}
        />
        
        {/* Red glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-f1-red/10 rounded-full blur-3xl" />
      </div>
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
