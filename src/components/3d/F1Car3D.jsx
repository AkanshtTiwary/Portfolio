import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Vehicle Model - Rotating and floating with enhanced visibility
 */
function F1Car3D() {
  const carRef = useRef();
  const wheelsRef = useRef([]);
  const exhaustRef = useRef();

  useFrame((state, delta) => {
    // Rotate the entire car slowly
    if (carRef.current) {
      carRef.current.rotation.y += delta * 0.5;
      // Add subtle bounce
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Spin the wheels faster
    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x += delta * 4;
      }
    });

    // Pulsing exhaust glow
    if (exhaustRef.current) {
      exhaustRef.current.intensity = 3 + Math.sin(state.clock.elapsedTime * 2) * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={carRef} scale={1.2} position={[0, 0, 0]}>
        {/* Main Body - Enhanced */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.8, 0.7, 1.1]} />
          <meshStandardMaterial
            color="#E10600"
            metalness={0.95}
            roughness={0.1}
            emissive="#E10600"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Racing Stripe */}
        <mesh position={[0, 0.36, 0]}>
          <boxGeometry args={[2.6, 0.05, 0.3]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0}
            emissive="#FFD700"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Nose Cone - Enhanced */}
        <mesh position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <coneGeometry args={[0.55, 1.5, 6]} />
          <meshStandardMaterial
            color="#E10600"
            metalness={0.95}
            roughness={0.05}
            emissive="#E10600"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Front Wing - Wider & More Visible */}
        <mesh position={[2.3, -0.3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.08, 2.2]} />
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            emissive="#00ffff"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Front Wing End Plates */}
        <mesh position={[2.3, -0.2, 1.1]}castShadow>
          <boxGeometry args={[0.2, 0.3, 0.05]} />
          <meshStandardMaterial color="#E10600" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[2.3, -0.2, -1.1]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.05]} />
          <meshStandardMaterial color="#E10600" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Cockpit - Enhanced Glass Effect */}
        <mesh position={[-0.3, 0.45, 0]} castShadow>
          <boxGeometry args={[1.1, 0.5, 0.85]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            metalness={0.1}
            roughness={0.05}
            transparent
            opacity={0.4}
            transmission={0.9}
            thickness={0.5}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Cockpit Frame */}
        <mesh position={[-0.3, 0.45, 0]}>
          <boxGeometry args={[1.15, 0.55, 0.9]} />
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            wireframe={true}
          />
        </mesh>

        {/* Engine Cover - Enhanced */}
        <mesh position={[-0.9, 0.25, 0]} castShadow>
          <boxGeometry args={[1.3, 0.6, 0.95]} />
          <meshStandardMaterial
            color="#E10600"
            metalness={0.95}
            roughness={0.1}
            emissive="#E10600"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Air Intake */}
        <mesh position={[-0.2, 0.7, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Rear Wing - Multi-Element */}
        <mesh position={[-2, 1, 0]} castShadow>
          <boxGeometry args={[0.5, 0.1, 2]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[-2, 1.3, 0]} castShadow>
          <boxGeometry args={[0.5, 0.1, 1.8]} />
          <meshStandardMaterial color="#E10600" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Wing Supports */}
        <mesh position={[-2, 0.65, 0.9]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[-2, 0.65, -0.9]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>

        {/* Front Wheels - Enhanced */}
        <group position={[1.3, -0.4, 0]}>
          <mesh 
            position={[0, 0, 0.75]} 
            rotation={[0, 0, Math.PI / 2]}
            ref={(el) => (wheelsRef.current[0] = el)}
            castShadow
          >
            <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Brake Disc */}
          <mesh position={[0, 0, 0.78]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
            <meshStandardMaterial
              color="#ff4400"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff4400"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          <mesh 
            position={[0, 0, -0.75]} 
            rotation={[0, 0, Math.PI / 2]}
            ref={(el) => (wheelsRef.current[1] = el)}
            castShadow
          >
            <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, -0.78]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
            <meshStandardMaterial
              color="#ff4400"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff4400"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Rear Wheels - Wider */}
        <group position={[-1.3, -0.4, 0]}>
          <mesh 
            position={[0, 0, 0.85]} 
            rotation={[0, 0, Math.PI / 2]}
            ref={(el) => (wheelsRef.current[2] = el)}
            castShadow
          >
            <cylinderGeometry args={[0.5, 0.5, 0.45, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Brake Disc */}
          <mesh position={[0, 0, 0.88]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
            <meshStandardMaterial
              color="#ff4400"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff4400"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          <mesh 
            position={[0, 0, -0.85]} 
            rotation={[0, 0, Math.PI / 2]}
            ref={(el) => (wheelsRef.current[3] = el)}
            castShadow
          >
            <cylinderGeometry args={[0.5, 0.5, 0.45, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, -0.88]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
            <meshStandardMaterial
              color="#ff4400"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff4400"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Exhaust Flames */}
        <mesh position={[-2.3, 0, 0.2]}>
          <coneGeometry args={[0.15, 0.4, 8]} rotation={[0, 0, -Math.PI / 2]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff4400"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[-2.3, 0, -0.2]}>
          <coneGeometry args={[0.15, 0.4, 8]} rotation={[0, 0, -Math.PI / 2]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff4400"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Exhaust Glow - Enhanced */}
        <pointLight
          ref={exhaustRef}
          position={[-2.5, 0, 0]}
          color="#ff4400"
          intensity={3}
          distance={5}
        />
        
        {/* Headlights - Brighter */}
        <pointLight position={[2.5, 0, 0.4]} color="#ffffff" intensity={2} distance={4} />
        <pointLight position={[2.5, 0, -0.4]} color="#ffffff" intensity={2} distance={4} />
        
        {/* Underglow */}
        <pointLight position={[0, -0.6, 0]} color="#00ffff" intensity={1.5} distance={3} />
        
        {/* Speed Effect Particles */}
        <Sparkles
          count={30}
          scale={5}
          size={2}
          speed={2}
          opacity={0.4}
          color="#E10600"
        />
      </group>
    </Float>
  );
}

export default F1Car3D;
