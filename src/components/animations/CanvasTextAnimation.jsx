import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getPretextMetrics } from '../../hooks/usePretext';

/**
 * Canvas-based text animation
 * Uses Pretext for perfect text measurement without DOM reflows
 * Ideal for high-performance animations and 3D integration
 */
const CanvasTextAnimation = ({
  text = 'PORTFOLIO',
  width = 800,
  height = 200,
  fontSize = 60,
  fontFamily = 'Space Grotesk, sans-serif',
  color = '#ffffff',
  strokeColor = '#FF0000',
  strokeWidth = 3,
  animationType = 'wave' // 'wave', 'pulse', 'shimmer', 'glitch'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const metricsRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const initializeMetrics = async () => {
      const metrics = await getPretextMetrics(text, fontSize, fontFamily);
      metricsRef.current = metrics;
    };
    initializeMetrics();
  }, [text, fontSize, fontFamily]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Setup text style
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Get text metrics from Pretext
      const metrics = metricsRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Save context state
      ctx.save();
      ctx.translate(centerX, centerY);

      // Apply animation based on type
      switch (animationType) {
        case 'wave':
          drawWaveAnimation(ctx, text, fontSize, timeRef.current, color, strokeColor, strokeWidth);
          break;
        case 'pulse':
          drawPulseAnimation(ctx, text, fontSize, timeRef.current, color, strokeColor, strokeWidth);
          break;
        case 'shimmer':
          drawShimmerAnimation(ctx, text, fontSize, timeRef.current, color, strokeColor, strokeWidth);
          break;
        case 'glitch':
          drawGlitchAnimation(ctx, text, fontSize, timeRef.current, color, strokeColor, strokeWidth);
          break;
        default:
          ctx.fillStyle = color;
          ctx.fillText(text, 0, 0);
      }

      // Restore context state
      ctx.restore();

      timeRef.current += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, fontSize, fontFamily, width, height, color, strokeColor, strokeWidth, animationType]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="block mx-auto"
      style={{
        filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.3))'
      }}
    />
  );
};

// Animation helpers
const drawWaveAnimation = (ctx, text, fontSize, time, color, strokeColor, strokeWidth) => {
  const chars = text.split('');
  const charWidth = fontSize * 0.6;
  const startX = -(chars.length * charWidth) / 2;

  chars.forEach((char, i) => {
    const x = startX + i * charWidth;
    const y = Math.sin((time * 3 + i * 0.3) * 0.05) * 15;
    const scale = 1 + Math.sin((time * 2 + i * 0.2) * 0.05) * 0.1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Stroke
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(char, 0, 0);

    // Fill
    ctx.fillStyle = color;
    ctx.fillText(char, 0, 0);

    ctx.restore();
  });
};

const drawPulseAnimation = (ctx, text, fontSize, time, color, strokeColor, strokeWidth) => {
  const scale = 1 + Math.sin(time * 0.05) * 0.2;

  ctx.save();
  ctx.scale(scale, scale);

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.strokeText(text, 0, 0);

  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);

  ctx.restore();
};

const drawShimmerAnimation = (ctx, text, fontSize, time, color, strokeColor, strokeWidth) => {
  const chars = text.split('');
  const charWidth = fontSize * 0.6;
  const startX = -(chars.length * charWidth) / 2;

  chars.forEach((char, i) => {
    const shimmer = Math.sin((time * 3 + i * 0.5) * 0.05) * 0.5 + 0.5;
    const opacity = shimmer;

    ctx.save();
    ctx.globalAlpha = opacity;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(char, startX + i * charWidth, 0);

    ctx.fillStyle = color;
    ctx.fillText(char, startX + i * charWidth, 0);

    ctx.restore();
  });
};

const drawGlitchAnimation = (ctx, text, fontSize, time, color, strokeColor, strokeWidth) => {
  const glitchAmount = Math.sin(time * 0.1) > 0.7 ? Math.random() * 10 : 0;
  
  // Red channel offset
  ctx.fillStyle = '#FF0000';
  ctx.globalAlpha = 0.3;
  ctx.fillText(text, glitchAmount, -2);

  // Blue channel offset
  ctx.fillStyle = '#00FFFF';
  ctx.globalAlpha = 0.3;
  ctx.fillText(text, -glitchAmount, 2);

  // Main text
  ctx.globalAlpha = 1;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.strokeText(text, 0, 0);

  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);
};

export default CanvasTextAnimation;
