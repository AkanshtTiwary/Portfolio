import { useState } from 'react';
import { motion } from 'framer-motion';
import CursorTextFlow from '../animations/CursorTextFlow';
import CursorTextWarp from '../animations/CursorTextWarp';
import CursorInfoCloud from '../animations/CursorInfoCloud';
import CursorTextMatrix from '../animations/CursorTextMatrix';

/**
 * Interactive Effects Showcase
 * Demo page to showcase all cursor-interactive Pretext effects
 */
const CursorEffectsShowcase = () => {
  const [activeEffect, setActiveEffect] = useState('flow');

  const techStack = [
    { label: 'JAVASCRIPT', color: '#ffd700' },
    { label: 'REACT', color: '#61dafb' },
    { label: 'THREE.JS', color: '#ffffff' },
    { label: 'FRAMER', color: '#0055ff' },
    { label: 'CANVAS', color: '#ff6b6b' },
    { label: 'PRETEXT', color: '#FF0000' },
    { label: 'WEBGL', color: '#00ff88' },
    { label: 'ANIMATIONS', color: '#ff00ff' }
  ];

  const aboutText = `
    Interactive text that responds to your cursor position.
    Move your mouse to see words repel and reorganize in real-time.
    This is the signature effect that made Pretext famous in the web animation community.
    Text measurement without layout thrashing. Smooth 60fps animations everywhere.
    Every character responds to proximity creating a magnetic field effect.
  `;

  return (
    <div className="w-full bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-f1-red/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black flex items-center gap-2">
            <span className="text-f1-red">◆</span> CURSOR EFFECTS
          </h1>
          <p className="text-gray-400 text-sm">Move your cursor to see the effects</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed left-0 top-20 w-64 h-screen bg-gray-950/80 backdrop-blur-md border-r border-f1-red/30 overflow-y-auto z-40">
        <div className="p-6 space-y-2">
          <h2 className="text-sm font-bold text-f1-red mb-4">EFFECTS</h2>

          {[
            { id: 'flow', label: 'Text Flow', desc: 'Characters attract/repel' },
            { id: 'warp', label: 'Text Warp', desc: 'Canvas-based distortion' },
            { id: 'cloud', label: 'Info Cloud', desc: 'Orbiting elements' },
            { id: 'matrix', label: 'Text Matrix', desc: 'Paragraph reorganization' }
          ].map(effect => (
            <motion.button
              key={effect.id}
              onClick={() => setActiveEffect(effect.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeEffect === effect.id
                  ? 'bg-f1-red text-black font-bold'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-bold text-sm">{effect.label}</div>
              <div className="text-xs opacity-70">{effect.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-f1-red/30 bg-gradient-to-t from-black to-transparent">
          <div className="text-xs text-gray-400 space-y-2">
            <p>
              <span className="text-f1-red">✓</span> Physics-based animations
            </p>
            <p>
              <span className="text-f1-red">✓</span> 60fps performance
            </p>
            <p>
              <span className="text-f1-red">✓</span> No layout thrashing
            </p>
            <p>
              <span className="text-f1-red">✓</span> Cursor tracking
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-20">
        <motion.div
          key={activeEffect}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Text Flow Effect */}
          {activeEffect === 'flow' && (
            <div className="min-h-screen bg-black overflow-hidden">
              <CursorTextFlow
                text="ATTRACT • REPEL • ORBIT • ELASTIC"
                fontSize={64}
                effectRadius={150}
                animationType="attract"
                highlightColor="#FF0000"
              />
              <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm">
                <p>Try different animation types: attract, repel, orbit, elastic</p>
              </div>
            </div>
          )}

          {/* Text Warp Effect */}
          {activeEffect === 'warp' && (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center py-20">
              <h2 className="text-4xl font-bold mb-12">Canvas-Based Text Warping</h2>
              <CursorTextWarp
                text="MOVE YOUR CURSOR HERE"
                fontSize={72}
                glowColor="#FF0000"
                distortionAmount={45}
              />
              <p className="mt-16 text-gray-400 text-center max-w-md">
                High-performance canvas rendering with Pretext measurement ensures
                pixel-perfect text positioning without DOM reflows.
              </p>
            </div>
          )}

          {/* Info Cloud Effect */}
          {activeEffect === 'cloud' && (
            <CursorInfoCloud
              items={techStack}
              orbitRadius={220}
              fontSize={18}
            />
          )}

          {/* Text Matrix Effect */}
          {activeEffect === 'matrix' && (
            <div className="min-h-screen">
              <CursorTextMatrix
                text={aboutText}
                fontSize={22}
                magneticRadius={200}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Code Snippet Panel */}
      <div className="fixed bottom-0 right-0 w-96 h-40 bg-gray-950/90 backdrop-blur-md border-t border-l border-f1-red/30 overflow-hidden">
        <div className="p-4 h-full overflow-y-auto">
          <p className="text-xs text-f1-red font-bold mb-2">COMPONENT</p>
          <pre className="text-xs text-gray-300 leading-tight">
            {`import ${
              activeEffect === 'flow'
                ? 'CursorTextFlow'
                : activeEffect === 'warp'
                ? 'CursorTextWarp'
                : activeEffect === 'cloud'
                ? 'CursorInfoCloud'
                : 'CursorTextMatrix'
            } from '../animations';

<${
              activeEffect === 'flow'
                ? 'CursorTextFlow'
                : activeEffect === 'warp'
                ? 'CursorTextWarp'
                : activeEffect === 'cloud'
                ? 'CursorInfoCloud'
                : 'CursorTextMatrix'
            }
  ${activeEffect === 'flow' ? 'text="YOUR TEXT"' : ''}
  ${activeEffect === 'warp' ? 'text="YOUR TEXT"' : ''}
  ${activeEffect === 'cloud' ? 'items={techStack}' : ''}
  ${activeEffect === 'matrix' ? 'text="your text..."' : ''}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CursorEffectsShowcase;
