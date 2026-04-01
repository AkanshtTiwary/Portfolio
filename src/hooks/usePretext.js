import { useEffect, useRef, useState } from 'react';
import { measure, drawText, Alignment, VerticalAlignment } from 'pretext';

/**
 * Custom hook for measuring and rendering text with Pretext
 * Eliminates DOM measurement overhead and enables precise text animations
 */
export const usePretext = (text, options = {}) => {
  const canvasRef = useRef(null);
  const [measurements, setMeasurements] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const measureText = async () => {
      try {
        // Create temporary canvas for measurement
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Apply font styles
        const {
          fontFamily = 'Space Grotesk, sans-serif',
          fontSize = 24,
          fontWeight = 'bold',
          lineHeight = 1.4
        } = options;

        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        
        // Measure text dimensions
        const measurement = await measure({
          text,
          fontSize,
          fontFamily,
          lineHeight,
          align: options.align || 'left',
          verticalAlign: options.verticalAlign || 'top'
        });

        setMeasurements(measurement);
        setIsLoaded(true);
      } catch (error) {
        console.error('Pretext measurement error:', error);
      }
    };

    measureText();
  }, [text, options]);

  return { measurements, isLoaded, canvasRef };
};

/**
 * Draw text to canvas with Pretext
 * Useful for Canvas-based animations avoiding DOM reflows
 */
export const drawPretextCanvas = (canvas, text, options = {}) => {
  if (!canvas) return;

  const {
    fontFamily = 'Space Grotesk, sans-serif',
    fontSize = 24,
    fontWeight = 'bold',
    color = '#ffffff',
    align = 'left',
    verticalAlign = 'top',
    width = canvas.width,
    height = canvas.height,
    lineHeight = 1.4
  } = options;

  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply styles
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = align === 'center' ? 'center' : align;

  // Draw with Pretext measurement
  drawText({
    canvas,
    ctx,
    text,
    fontSize,
    fontFamily,
    align: align === 'center' ? Alignment.CENTER : Alignment.LEFT,
    verticalAlign: verticalAlign === 'center' ? VerticalAlignment.MIDDLE : VerticalAlignment.TOP,
    y: height / 2
  });
};

/**
 * Get precise text dimensions for animation preparation
 * Prevents layout thrashing from getBoundingClientRect calls
 */
export const getPretextMetrics = async (text, fontSize = 24, fontFamily = 'Space Grotesk') => {
  try {
    const measurement = await measure({
      text,
      fontSize,
      fontFamily,
      lineHeight: 1.4
    });

    return {
      width: measurement.width,
      height: measurement.height,
      ascent: measurement.ascent,
      descent: measurement.descent,
      baseline: measurement.baseline,
      // Calculate safe animation boundaries
      animationBounds: {
        x: 0,
        y: -measurement.ascent,
        width: measurement.width,
        height: measurement.height + Math.abs(measurement.descent)
      }
    };
  } catch (error) {
    console.error('Failed to get Pretext metrics:', error);
    return null;
  }
};

/**
 * Create character-bycharacter animation data
 * Useful for staggered text reveal animations
 */
export const getCharacterMetrics = async (text, fontSize = 24) => {
  const metrics = await getPretextMetrics(text, fontSize);
  if (!metrics) return [];

  const chars = text.split('');
  let currentX = 0;
  
  return chars.map((char, i) => {
    const charMetric = {
      char,
      index: i,
      x: currentX,
      width: char === ' ' ? 8 : 12 // Approximate widths
    };
    currentX += charMetric.width;
    return charMetric;
  });
};
