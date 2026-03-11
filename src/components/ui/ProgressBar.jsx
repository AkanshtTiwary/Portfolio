import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Progress bar component for skills/experience
 */
const ProgressBar = ({ 
  value, 
  max = 100, 
  color = '#E10600',
  label = '',
  showValue = true,
  className = ''
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">{label}</span>
          {showValue && (
            <span className="text-sm font-bold" style={{ color }}>
              {value}%
            </span>
          )}
        </div>
      )}
      
      <div className="w-full h-2 bg-f1-gray rounded-full overflow-hidden border border-f1-silver/20">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Speed shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
