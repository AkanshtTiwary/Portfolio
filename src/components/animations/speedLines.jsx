import { motion } from 'framer-motion';

/**
 * Speed lines animation for racing effect
 */
const SpeedLines = ({ count = 5, className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-f1-red to-transparent"
          style={{
            top: `${20 + i * 15}%`,
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: '200%', 
            opacity: [0, 1, 1, 0] 
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

export default SpeedLines;
