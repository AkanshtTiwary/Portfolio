import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Loader3D from './Loader3D';

/**
 * 3D Scene Wrapper with lighting and controls
 */
function Scene3D({ children, enableControls = true, camera = { position: [0, 0, 5], fov: 50 } }) {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
      
      {/* Enhanced Lighting for Better Visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, 5, -5]} intensity={1} />
      <spotLight 
        position={[5, 10, 5]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffffff"
      />
      <spotLight 
        position={[-5, 5, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        color="#00aaff"
      />
      
      {/* Rim Light */}
      <directionalLight position={[0, 0, -10]} intensity={1} color="#E10600" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#15151E', 10, 30]} />
      
      {/* Controls */}
      {enableControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate={false}
        />
      )}
      
      {/* Content */}
      <Suspense fallback={<Loader3D />}>
        {children}
      </Suspense>
    </Canvas>
  );
}

export default Scene3D;
