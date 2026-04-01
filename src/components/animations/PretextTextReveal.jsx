import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { drawPretextCanvas, getPretextMetrics } from '../../hooks/usePretext';

/**
 * Advanced text animation using Pretext
 * Characters animate in with measured dimensions - zero layout thrashing
 */
const PretextTextReveal = ({
  text = 'AKANSH TIWARY',
  className = '',
  duration = 1.2,
  staggerDelay = 0.05,
  color = '#ffffff',
  strokeColor = '#ff0000',
  fontSize = 64
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const textMetrics = await getPretextMetrics(text, fontSize);
      setMetrics(textMetrics);
    };
    setup();
  }, [text, fontSize]);

  // Character-level animation
  const letterVariants = {
    initial: { opacity: 0, y: 20, rotateZ: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div ref={containerRef} className={className}>
      <div className="flex flex-wrap gap-1 justify-center relative">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            className="inline-block font-black"
            style={{
              textShadow: `0 0 20px ${strokeColor}40`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      {metrics && (
        <div className="text-center mt-4 text-sm text-gray-400">
          {/* Display measured dimensions - useful for debugging */}
          <p>Width: {Math.round(metrics.width)}px | Height: {Math.round(metrics.height)}px</p>
        </div>
      )}
    </div>
  );
};

export default PretextTextReveal;
