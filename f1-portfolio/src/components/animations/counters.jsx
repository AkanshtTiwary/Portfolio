import { motion } from 'framer-motion';
import useCountUp from '../../hooks/useCountUp';

/**
 * Animated counter component for stats
 */
const Counter = ({ end, duration = 2000, suffix = '', prefix = '', className = '' }) => {
  const { count, elementRef } = useCountUp(end, duration);

  return (
    <motion.span
      ref={elementRef}
      className={`font-bold ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default Counter;
