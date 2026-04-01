import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive Information Cloud
 * Multiple text/info elements orbit and reposition around cursor movement
 * Ultimate Pretext-style interactive effect
 */
const CursorInfoCloud = ({
  items = [
    { label: 'REACT', color: '#61dafb' },
    { label: 'THREE.JS', color: '#ffffff' },
    { label: 'FRAMER', color: '#0055ff' },
    { label: 'PRETEXT', color: '#ff0000' },
    { label: 'MOTION', color: '#ff6b6b' },
    { label: 'CANVAS', color: '#ffd700' },
    { label: 'ANIMATIONS', color: '#00ff88' },
    { label: 'INTERACTIVE', color: '#ff00ff' }
  ],
  orbitRadius = 200,
  fontSize = 18
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [itemPositions, setItemPositions] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Initialize orbiting items
  useEffect(() => {
    const positions = items.map((item, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      return {
        ...item,
        angle,
        distance: orbitRadius,
        targetDistance: orbitRadius,
        targetAngle: angle
      };
    });
    setItemPositions(positions);
  }, [items, orbitRadius]);

  // Track cursor
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

  // Animation loop
  useEffect(() => {
    let animationId = null;

    const animate = () => {
      timeRef.current += 0.016;

      setItemPositions(prevItems =>
        prevItems.map((item, i) => {
          // Get relative position from mouse
          const rect = containerRef.current?.getBoundingClientRect();
          const centerX = rect?.width / 2 || 0;
          const centerY = rect?.height / 2 || 0;

          const mouseRelX = mouseRef.current.x - centerX;
          const mouseRelY = mouseRef.current.y - centerY;
          const mouseDistance = Math.sqrt(mouseRelX * mouseRelX + mouseRelY * mouseRelY);

          // Repel from cursor (if cursor is within effect zone)
          const repelRadius = 300;
          let angle = item.angle;
          let distance = item.distance;

          if (mouseDistance < repelRadius) {
            const repelStrength = 1 - mouseDistance / repelRadius;
            const cursorAngle = Math.atan2(mouseRelY, mouseRelX);

            // Push items away from cursor based on their position
            const itemCenterX = centerX + Math.cos(angle) * distance;
            const itemCenterY = centerY + Math.sin(angle) * distance;
            const itemAngle = Math.atan2(
              itemCenterY - mouseRef.current.y,
              itemCenterX - mouseRef.current.x
            );

            // Repel
            angle += (itemAngle - angle) * 0.1 * repelStrength;
            distance = Math.min(orbitRadius + 150, distance + repelStrength * 50);
          } else {
            // Spring back to original position
            distance += (orbitRadius - distance) * 0.05;
          }

          // Gentle rotation for visual interest
          const rotationSpeed = 0.3 + Math.sin(timeRef.current * 0.5 + i) * 0.1;
          const newAngle = angle + rotationSpeed * 0.01;

          return {
            ...item,
            angle: newAngle,
            distance,
            x: centerX + Math.cos(newAngle) * distance,
            y: centerY + Math.sin(newAngle) * distance
          };
        })
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [orbitRadius]);

  const rect = containerRef.current?.getBoundingClientRect();
  const centerX = rect?.width ? rect.width / 2 : 0;
  const centerY = rect?.height ? rect.height / 2 : 0;

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, 0.1) 25%, rgba(255, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, 0.1) 75%, rgba(255, 0, 0, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 0, 0.1) 25%, rgba(255, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, 0.1) 75%, rgba(255, 0, 0, 0.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Center point */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-4 h-4 bg-f1-red rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Orbiting items */}
      {itemPositions.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          animate={{
            x: item.x - 50,
            y: item.y - 20
          }}
          transition={{ type: 'spring', damping: 8, mass: 0.5 }}
        >
          <div
            className="px-4 py-2 rounded-lg border-2 backdrop-blur-sm text-center font-bold text-sm whitespace-nowrap"
            style={{
              borderColor: item.color,
              color: item.color,
              boxShadow: `0 0 20px ${item.color}40, inset 0 0 10px ${item.color}20`,
              background: `${item.color}10`
            }}
          >
            {item.label}
          </div>
        </motion.div>
      ))}

      {/* Cursor indicator */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8
        }}
      >
        <div className="w-4 h-4 border-2 border-f1-red rounded-full opacity-60" />
        <div className="w-4 h-4 border border-f1-red rounded-full absolute animate-pulse opacity-40" />
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-8 right-8 text-center text-gray-400 text-sm">
        <p>Move your cursor to repel the orbiting elements</p>
      </div>
    </motion.div>
  );
};

export default CursorInfoCloud;
