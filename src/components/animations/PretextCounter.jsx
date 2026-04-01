import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getPretextMetrics } from '../../hooks/usePretext';

/**
 * Advanced Counter with Pretext Measurement
 * Measures the final number size before animation to prevent layout reflows
 * Perfect for your Achievements section
 */
const PretextCounter = ({
  target = 100,
  label = 'Projects',
  suffix = '+',
  duration = 2000,
  decimals = 0,
  icon: Icon = null,
  colorClass = 'text-f1-red'
}) => {
  const [count, setCount] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Measure text dimensions before animation starts
  useEffect(() => {
    const setupMetrics = async () => {
      const targetString = decimals > 0 
        ? target.toFixed(decimals) + suffix 
        : String(target) + suffix;
      
      const measurement = await getPretextMetrics(targetString, 48);
      setMetrics(measurement);
    };

    setupMetrics();
  }, [target, suffix, decimals]);

  // Animate counter with requestAnimationFrame for smooth 60fps
  useEffect(() => {
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(target * easeOutQuad);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, decimals]);

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Icon if provided */}
      {Icon && (
        <Icon className="w-8 h-8 text-f1-red mb-2" />
      )}

      {/* Counter with measured width to prevent layout shift */}
      <div
        style={{
          width: metrics ? `${metrics.width + 10}px` : 'auto',
          minHeight: metrics ? `${metrics.height}px` : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          className={`text-4xl md:text-5xl font-black ${colorClass}`}
          key={count}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {count}{suffix}
        </motion.div>
      </div>

      {/* Label */}
      <motion.p
        className="text-gray-300 text-sm md:text-base text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

/**
 * Example: Usage in Achievements Section
 * 
 * import PretextCounter from '../animations/PretextCounter';
 * 
 * export const Achievements = () => {
 *   return (
 *     <section className="py-20 bg-gray-900">
 *       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 *         <PretextCounter 
 *           target={50} 
 *           suffix="+" 
 *           label="Projects Completed" 
 *         />
 *         <PretextCounter 
 *           target={100} 
 *           suffix="+" 
 *           label="Happy Clients" 
 *         />
 *         <PretextCounter 
 *           target={5} 
 *           suffix="+" 
 *           label="Years Experience" 
 *         />
 *         <PretextCounter 
 *           target={1000} 
 *           suffix="+" 
 *           label="Commits" 
 *         />
 *       </div>
 *     </section>
 *   );
 * };
 */

export default PretextCounter;
