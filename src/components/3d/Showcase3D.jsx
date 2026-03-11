import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import F1Car3D from './F1Car3D';
import DriverCapsule3D from './DriverCapsule3D';
import Loader3D from './Loader3D';

/**
 * Standalone 3D showcase component
 */
function Showcase3D({ type = 'car', ...props }) {
  return (
    <div className="w-full h-full min-h-[400px]" {...props}>
      <Canvas shadows camera={{ position: [6, 3, 6], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#0a0a0f']} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={3}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 8, 0]} intensity={1} color="#E10600" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Ground Shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.6}
          scale={15}
          blur={2.5}
          far={4}
        />
        
        {/* Enhanced Grid Floor */}
        <gridHelper args={[30, 40, '#E10600', '#222']} position={[0, -2, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.8} />
        </mesh>
        
        {/* 3D Model */}
        <Suspense fallback={<Loader3D />}>
          {type === 'car' ? <F1Car3D /> : <DriverCapsule3D />}
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}

export default Showcase3D;
