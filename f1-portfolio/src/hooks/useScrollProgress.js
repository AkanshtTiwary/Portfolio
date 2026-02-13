import { useState, useEffect } from 'react';
import { throttle } from '../utils/helpers';

/**
 * Track scroll progress for race position indicator
 */
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      
      setScrollProgress(Math.min(progress, 100));
    };

    const throttledScroll = throttle(calculateScrollProgress, 100);
    
    window.addEventListener('scroll', throttledScroll);
    calculateScrollProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return scrollProgress;
};

export default useScrollProgress;
