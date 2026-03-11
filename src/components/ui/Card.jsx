import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * F1-themed card component with hover effects
 */
const Card = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      className={clsx(
        'bg-f1-gray border-2 border-f1-silver/20 rounded-lg p-6 relative overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { 
        y: -8,
        boxShadow: '0 20px 40px rgba(225, 6, 0, 0.3)',
        borderColor: 'rgba(225, 6, 0, 0.5)'
      } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Carbon fiber texture overlay */}
      <div className="absolute inset-0 opacity-5 carbon-texture pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Racing stripe accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-f1-red to-transparent" />
    </motion.div>
  );
};

export default Card;
