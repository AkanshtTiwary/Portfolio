import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import SpeedLines from '../animations/speedLines';
import Button from '../ui/Button';

/**
 * Hero Section - Driver Introduction
 */
const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Speed Lines Background */}
      <SpeedLines count={8} />

      {/* Background Grid */}
      <div className="absolute inset-0 telemetry-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Pre-title */}
          <motion.div
            className="text-f1-red font-bold text-sm md:text-base mb-4 tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            POLE POSITION DEVELOPER
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            AKANSH <span className="text-f1-red">TIWARY</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Full-Stack Developer • Racing at <span className="text-f1-red font-bold">350+ commits/hour</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red">5+</div>
              <div className="text-sm text-gray-400">Years Racing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red">50+</div>
              <div className="text-sm text-gray-400">Projects Finished</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red">100%</div>
              <div className="text-sm text-gray-400">Commitment</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-f1-red text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all"
            >
              View Projects
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent text-f1-red border-2 border-f1-red font-bold uppercase tracking-wider hover:bg-f1-red hover:text-white transition-all"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FiArrowDown className="text-3xl text-f1-red" />
      </motion.div>
    </section>
  );
};

export default Hero;
