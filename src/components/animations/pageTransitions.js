/**
 * Page transition configurations for smooth navigation
 */

export const pageTransition = {
  initial: { 
    opacity: 0,
    x: -100
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export const slideTransition = {
  initial: { 
    scaleX: 0,
    transformOrigin: 'left'
  },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  },
  exit: { 
    scaleX: 0,
    transformOrigin: 'right',
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  }
};

export const raceStartTransition = {
  initial: { 
    opacity: 0,
    scale: 2
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5
    }
  }
};
