import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

/**
 * 3D Professional Display - Interactive helmet and suit visualization
 */
function DriverCapsule3D() {
  const capsuleTopRef = useRef();
  const driverRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger opening after 1 second
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    // Float animation
    if (driverRef.current) {
      driverRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Capsule top opening
    if (capsuleTopRef.current && isOpen) {
      capsuleTopRef.current.rotation.x = Math.min(
        capsuleTopRef.current.rotation.x + 0.02,
        Math.PI / 2
      );
      capsuleTopRef.current.position.z = Math.min(
        capsuleTopRef.current.position.z + 0.02,
        1
      );
    }
  });

  return (
    <group scale={0.8}>
      {/* Base Capsule */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
        <meshStandardMaterial color="#15151E" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Capsule Bottom */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2, 32, 1, true]} />
        <MeshDistortMaterial
          color="#E10600"
          speed={2}
          distort={0.1}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Capsule Top (Opening) */}
      <mesh ref={capsuleTopRef} position={[0, 1, 0]}>
        <sphereGeometry args={[1.2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#001f3f"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Driver Figure */}
      <group ref={driverRef} position={[0, isOpen ? 1.5 : 0, 0]}>
        {/* Helmet */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#E10600" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Visor */}
        <mesh position={[0, 0.8, 0.3]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.05]} />
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Racing Suit - Torso */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 0.8, 32]} />
          <meshStandardMaterial color="#15151E" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Racing Stripes */}
        <mesh position={[0, 0.1, 0.36]}>
          <boxGeometry args={[0.15, 0.6, 0.05]} />
          <meshStandardMaterial color="#E10600" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#15151E" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#15151E" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Gloves */}
        <mesh position={[-0.7, -0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#E10600" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, -0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#E10600" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Smoke/Steam Effect */}
      {isOpen && (
        <>
          <mesh position={[0.5, -0.3, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.2}
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[-0.5, -0.2, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.15}
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </mesh>
        </>
      )}

      {/* Accent Lights */}
      <pointLight position={[0, 1, 0]} color="#E10600" intensity={2} distance={3} />
      <pointLight position={[0, -0.5, 0]} color="#00ffff" intensity={1} distance={2} />
    </group>
  );
}

export default DriverCapsule3D;
