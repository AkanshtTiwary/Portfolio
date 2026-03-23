import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import Showcase3D from '../3d/Showcase3D';
import Card from '../ui/Card';

/**
 * 3D Gallery Section - Interactive 3D Models
 */
const Gallery3D = () => {
  const [activeModel, setActiveModel] = useState('car');
      {/* Background */}
      <div className="absolute inset-0 telemetry-grid opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.h2
            className="section-title mb-4"
            variants={fadeInUp}
          >
            3D SHOWCASE
          </motion.h2>
          
          <motion.p
            className="text-gray-400 mb-8 max-w-2xl"
            variants={fadeInUp}
          >
            Interactive 3D visualization - Drag to rotate, scroll to zoom
          </motion.p>

          {/* Model Selector */}
          <motion.div
            className="flex gap-4 mb-8 justify-center"
            variants={fadeInUp}
          >
            <button
              onClick={() => setActiveModel('car')}
              className={`px-6 py-3 rounded font-bold uppercase tracking-wider transition-all ${
                activeModel === 'car'
                  ? 'bg-f1-red text-white'
                  : 'bg-f1-gray text-gray-400 hover:bg-f1-gray/70'
              }`}
            >
              Vehicle Model
            </button>
            <button
              onClick={() => setActiveModel('driver')}
              className={`px-6 py-3 rounded font-bold uppercase tracking-wider transition-all ${
                activeModel === 'driver'
                  ? 'bg-f1-red text-white'
                  : 'bg-f1-gray text-gray-400 hover:bg-f1-gray/70'
              }`}
            >
              Helmet & Suit
            </button>
          </motion.div>

          {/* 3D Showcase */}
          <motion.div variants={fadeInUp}>
            <Card className="p-0 overflow-hidden">
              <Showcase3D type={activeModel} />
            </Card>
          </motion.div>

          {/* Controls Info */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={fadeInUp}
          >
            <div className="text-center p-4 bg-f1-gray/30 rounded border border-f1-red/20">
              <div className="text-2xl mb-2">🖱️</div>
              <div className="text-sm font-bold mb-1">DRAG</div>
              <div className="text-xs text-gray-400">Rotate the model</div>
            </div>
            <div className="text-center p-4 bg-f1-gray/30 rounded border border-f1-red/20">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm font-bold mb-1">SCROLL</div>
              <div className="text-xs text-gray-400">Zoom in/out</div>
            </div>
            <div className="text-center p-4 bg-f1-gray/30 rounded border border-f1-red/20">
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-sm font-bold mb-1">AUTO-ROTATE</div>
              <div className="text-xs text-gray-400">Click to stop</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery3D;
