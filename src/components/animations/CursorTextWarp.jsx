import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Advanced Cursor Text Warping
 * Text morphs and warps around cursor - true Pretext signature effect
 */
const CursorTextWarp = ({
  text = 'MOVE YOUR CURSOR HERE',
  fontSize = 56,
  color = '#ffffff',
  glowColor = '#FF0000',
  distortionAmount = 40
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const animate = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Setup text
      ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;

      const centerX = width / 2;
      const centerY = height / 2;

      // Save context for clipping
      ctx.save();
      ctx.translate(centerX, centerY);

      // Apply mesh distortion
      const chars = text.split('');
      const charWidth = fontSize * 0.5;
      const startX = -(chars.length * charWidth) / 2;

      // Draw with distortion
      chars.forEach((char, i) => {
        const baseX = startX + i * charWidth;
        
        // Calculate distance from cursor
        const dx = mouseRef.current.x - centerX - baseX;
        const dy = mouseRef.current.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate distortion
        const maxDist = 200;
        const distortion = Math.max(0, 1 - distance / maxDist);
        const angle = Math.atan2(dy, dx);
        
        // Offset from cursor
        const offsetX = Math.cos(angle) * distortion * distortionAmount;
        const offsetY = Math.sin(angle) * distortion * distortionAmount;
        
        // Scale effect
        const scale = 1 + distortion * 0.3;
        
        ctx.save();
        ctx.translate(baseX + offsetX, offsetY);
        ctx.scale(scale, scale);
        
        // Glow effect
        ctx.shadowBlur = distance < 150 ? 10 : 0;
        ctx.shadowColor = glowColor;
        
        ctx.fillStyle = distance < 150 ? glowColor : color;
        ctx.fillText(char, 0, 0);
        
        ctx.restore();
      });

      // Draw cursor zone circle
      ctx.strokeStyle = `${glowColor}40`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x - centerX, mouseRef.current.y - centerY, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [text, fontSize, color, glowColor, distortionAmount]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth > 768 ? 900 : 400}
        height={380}
        className="w-full h-full"
      />
      <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500 text-center">
        Move your cursor over the text to see the distortion effect
      </div>
    </motion.div>
  );
};

export default CursorTextWarp;
