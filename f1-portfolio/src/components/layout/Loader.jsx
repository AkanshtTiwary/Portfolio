import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * F1 Race Start Loader Animation 🚦
 */
const Loader = () => {
  const [lightsOn, setLightsOn] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate F1 start lights sequence
    const intervals = [
      setTimeout(() => setLightsOn(1), 500),
      setTimeout(() => setLightsOn(2), 1000),
      setTimeout(() => setLightsOn(3), 1500),
      setTimeout(() => setLightsOn(4), 2000),
      setTimeout(() => setLightsOn(5), 2500),
      setTimeout(() => {
        setLightsOn(0); // Lights out!
        setIsComplete(true);
      }, 3000),
    ];

    return () => intervals.forEach(clearTimeout);
  }, []);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-f1-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          {/* Start Lights */}
          <div className="flex gap-4 mb-8 justify-center">
            {[1, 2, 3, 4, 5].map((light) => (
              <motion.div
                key={light}
                className={`w-16 h-16 rounded-full border-4 border-gray-600 ${
                  lightsOn >= light && lightsOn !== 0 ? 'bg-f1-red shadow-[0_0_30px_rgba(225,6,0,0.8)]' : 'bg-gray-800'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: light * 0.1 }}
              />
            ))}
          </div>

          {/* Text */}
          <motion.div
            className="text-2xl font-bold uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {lightsOn === 0 && isComplete ? (
              <span className="text-green-500">LIGHTS OUT AND AWAY WE GO! 🏁</span>
            ) : (
              <span>GET READY...</span>
            )}
          </motion.div>

          {/* Racing Line Animation */}
          <motion.div
            className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-f1-red via-yellow-500 to-green-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
