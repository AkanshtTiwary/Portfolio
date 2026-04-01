import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getPretextMetrics, getCharacterMetrics } from '../../hooks/usePretext';

/**
 * Cursor-Interactive Text Animation
 * Text characters follow and react to cursor movement
 * The signature Pretext effect - smooth, performant, no layout thrashing
 */
const CursorTextFlow = ({
  text = 'FOLLOW YOUR CURSOR',
  fontSize = 48,
  fontFamily = 'Space Grotesk, sans-serif',
  color = '#ffffff',
  highlightColor = '#FF0000',
  effectRadius = 150,
  animationType = 'attract' // 'attract', 'repel', 'orbit', 'elastic'
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [charPositions, setCharPositions] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize character metrics and positions
  useEffect(() => {
    const initializeCharacters = async () => {
      const metrics = await getCharacterMetrics(text, fontSize);
      
      // Convert to DOM-measurable positions
      const chars = text.split('').map((char, i) => ({
        char,
        index: i,
        originalX: (i - text.length / 2) * (fontSize * 0.45),
        originalY: 0,
        x: (i - text.length / 2) * (fontSize * 0.45),
        y: 0,
        vx: 0, // velocity
        vy: 0,
        mass: 1
      }));
      
      setCharPositions(chars);
    };

    initializeCharacters();
  }, [text, fontSize]);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Physics-based animation loop
  useEffect(() => {
    if (charPositions.length === 0) return;

    let animationId = null;
    let prevTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = Math.min((now - prevTime) / 1000, 0.016); // Cap at 60fps
      prevTime = now;

      setCharPositions(prevChars => {
        return prevChars.map(char => {
          const dx = mouseRef.current.x - (containerRef.current?.getBoundingClientRect().left || 0) - char.x;
          const dy = mouseRef.current.y - (containerRef.current?.getBoundingClientRect().top || 0) - char.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let force = { x: 0, y: 0 };
          let targetX = char.originalX;
          let targetY = char.originalY;

          // Apply different effects based on type
          if (distance < effectRadius) {
            const angle = Math.atan2(dy, dx);
            const strength = 1 - distance / effectRadius;

            switch (animationType) {
              case 'attract':
                // Pull towards cursor
                force.x = Math.cos(angle) * strength * 300;
                force.y = Math.sin(angle) * strength * 300;
                break;

              case 'repel':
                // Push away from cursor
                force.x = -Math.cos(angle) * strength * 300;
                force.y = -Math.sin(angle) * strength * 300;
                break;

              case 'orbit':
                // Orbit around cursor
                const perpAngle = angle + Math.PI / 2;
                force.x = Math.cos(perpAngle) * strength * 200;
                force.y = Math.sin(perpAngle) * strength * 200;
                break;

              case 'elastic':
                // Elastic bounce effect
                const pushX = -Math.cos(angle) * strength * 150;
                const pushY = -Math.sin(angle) * strength * 150;
                force.x = pushX;
                force.y = pushY;
                break;

              default:
                break;
            }
          }

          // Spring physics back to original position
          const springForceX = (char.originalX - char.x) * 0.15;
          const springForceY = (char.originalY - char.y) * 0.15;

          // Update velocity with damping
          let newVx = (char.vx + (force.x + springForceX) * deltaTime) * 0.92;
          let newVy = (char.vy + (force.y + springForceY) * deltaTime) * 0.92;

          // Limit velocity
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > 500) {
            newVx = (newVx / speed) * 500;
            newVy = (newVy / speed) * 500;
          }

          const newX = char.x + newVx * deltaTime;
          const newY = char.y + newVy * deltaTime;

          return {
            ...char,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [charPositions, effectRadius, animationType]);

  // Calculate distance to mouse for color effect
  const getCharColor = (charX, charY) => {
    const dx = mouseRef.current.x - (containerRef.current?.getBoundingClientRect().left || 0) - charX;
    const dy = mouseRef.current.y - (containerRef.current?.getBoundingClientRect().top || 0) - charY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < effectRadius) {
      const intensity = 1 - distance / effectRadius;
      return intensity > 0.5 ? highlightColor : color;
    }
    return color;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-96 relative flex items-center justify-center overflow-hidden bg-transparent"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {charPositions.map((char, i) => (
          <motion.g
            key={i}
            transform={`translate(${char.x},${char.y})`}
          >
            <text
              x={0}
              y={0}
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight="bold"
              textAnchor="middle"
              fill={getCharColor(char.x, char.y)}
              filter="url(#glow)"
              style={{
                transition: 'fill 0.3s ease',
                textShadow: `0 0 10px ${getCharColor(char.x, char.y)}80`
              }}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Cursor indicator */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10
        }}
      >
        <div className="w-5 h-5 border-2 border-f1-red rounded-full opacity-50" />
      </motion.div>
    </div>
  );
};

export default CursorTextFlow;
