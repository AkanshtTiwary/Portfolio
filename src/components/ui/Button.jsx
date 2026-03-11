import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * F1-themed button component
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 justify-center';
  
  const variants = {
    primary: 'bg-f1-red text-white hover:bg-red-700 border-2 border-f1-red hover:border-red-700',
    secondary: 'bg-transparent text-f1-red border-2 border-f1-red hover:bg-f1-red hover:text-white',
    ghost: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-f1-black',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default Button;
