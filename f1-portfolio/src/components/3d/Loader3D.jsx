import { Html, useProgress } from '@react-three/drei';

/**
 * 3D Loading fallback
 */
function Loader3D() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="text-white font-bold text-sm">
          Loading 3D Model...
        </div>
        <div className="text-f1-red font-mono text-xs mt-2">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

export default Loader3D;
