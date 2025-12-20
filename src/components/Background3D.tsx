import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedStars() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = new Float32Array(3000).map(() => (Math.random() - 0.5) * 50);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00ff66"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1 - 0.5;
      gridRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5 - 5;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[50, 50, '#00ff66', '#00ff66']} />
    </group>
  );
}

function CyberLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        child.position.z = ((state.clock.getElapsedTime() * 2 + i * 5) % 50) - 25;
      });
    }
  });

  return (
    <group ref={linesRef}>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[(i - 5) * 3, -3, 0]}>
          <boxGeometry args={[0.02, 0.02, 20]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00ff66' : '#00e6ff'} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export const Background3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AnimatedStars />
        <FloatingGrid />
        <CyberLines />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
};
