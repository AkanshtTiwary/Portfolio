import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getPretextMetrics } from '../../hooks/usePretext';

/**
 * Interactive Text Matrix
 * Words flow and reorganize around cursor position
 * Creates a 'magnetic field' effect around the cursor
 */
const CursorTextMatrix = ({
  text = `Pretext is a pure JavaScript library for multiline text measurement and layout.
It eliminates the need for expensive DOM measurements and implements its own 
text measurement logic. Words reorganize and flow around your cursor movement 
creating an interactive experience. Every word responds to proximity, 
creating waves of motion through the text. This is the signature effect 
that made Pretext famous in the animation community.`,
  fontSize = 20,
  lineHeight = 2,
  magneticRadius = 200,
  wordSpacing = 12
}) => {
  const containerRef = useRef(null);
  const [wordPositions, setWordPositions] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocitiesRef = useRef({});

  // Parse and initialize word positions
  useEffect(() => {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    const positions = {};
    words.forEach((word, i) => {
      const row = Math.floor(i / 6); // ~6 words per row
      const col = i % 6;
      
      positions[word + i] = {
        word,
        originalX: col * 150,
        originalY: row * (fontSize + 10),
        x: col * 150,
        y: row * (fontSize + 10),
        vx: 0,
        vy: 0
      };
      
      velocitiesRef.current[word + i] = { vx: 0, vy: 0 };
    });

    setWordPositions(positions);
  }, [text, fontSize]);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Physics-based flow
  useEffect(() => {
    let animationId = null;

    const animate = () => {
      setWordPositions(prevWords => {
        const newWords = { ...prevWords };

        Object.keys(newWords).forEach(key => {
          const word = newWords[key];
          
          // Distance from cursor
          const dx = mouseRef.current.x - word.x;
          const dy = mouseRef.current.y - word.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let forceX = 0;
          let forceY = 0;

          // Magnetic repulsion
          if (distance < magneticRadius) {
            const strength = 1 - distance / magneticRadius;
            const angle = Math.atan2(dy, dx);
            
            forceX = -Math.cos(angle) * strength * 800;
            forceY = -Math.sin(angle) * strength * 800;
          }

          // Spring force back to original
          const springX = (word.originalX - word.x) * 0.08;
          const springY = (word.originalY - word.y) * 0.08;

          // Update velocity with damping
          let vx = (word.vx + (forceX + springX) * 0.016) * 0.88;
          let vy = (word.vy + (forceY + springY) * 0.016) * 0.88;

          // Limit velocity
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > 400) {
            vx = (vx / speed) * 400;
            vy = (vy / speed) * 400;
          }

          // Update position
          const newX = word.x + vx * 0.016;
          const newY = word.y + vy * 0.016;

          newWords[key] = {
            ...word,
            x: newX,
            y: newY,
            vx,
            vy
          };
        });

        return newWords;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [magneticRadius]);

  // Get word color based on distance
  const getWordColor = (x, y) => {
    const dx = mouseRef.current.x - x;
    const dy = mouseRef.current.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < magneticRadius * 0.5) {
      return '#FF3333'; // Close to cursor - red glow
    } else if (distance < magneticRadius) {
      return '#FF9999'; // Medium distance - light red
    }
    return '#ffffff'; // Far from cursor - white
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Radial gradient effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(255,0,0,0) 70%)',
          borderRadius: '50%',
          transition: 'none'
        }}
      />

      {/* Words */}
      <div className="relative w-full h-full">
        {Object.entries(wordPositions).map(([key, word]) => (
          <motion.div
            key={key}
            className="absolute font-mono font-bold whitespace-nowrap cursor-default"
            animate={{
              x: word.x,
              y: word.y
            }}
            transition={{ type: 'spring', damping: 10, mass: 1, stiffness: 100 }}
            style={{
              fontSize: `${fontSize}px`,
              color: getWordColor(word.x, word.y),
              textShadow: `0 0 10px ${getWordColor(word.x, word.y)}60`,
              transition: 'color 0.2s ease'
            }}
          >
            {word.word}
          </motion.div>
        ))}
      </div>

      {/* Cursor tracker */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          x: mousePos.x - 100,
          y: mousePos.y - 100
        }}
      >
        <div
          className="w-48 h-48 border-2 border-f1-red rounded-full opacity-30"
          style={{
            boxShadow: '0 0 40px rgba(255, 0, 0, 0.3)'
          }}
        />
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-12 left-0 right-0 text-center text-gray-400 text-sm">
        <p>Move your cursor to create a magnetic field that repels the text</p>
      </div>
    </motion.div>
  );
};

export default CursorTextMatrix;
