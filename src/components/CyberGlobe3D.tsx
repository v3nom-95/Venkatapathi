import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CyberSphere({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.1 + mousePosition.x * 0.5;
      sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mousePosition.y * 0.3;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.15 + mousePosition.x * 0.3;
      wireframeRef.current.rotation.z = t * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.3;
      innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.8} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color="#00ff66"
          emissive="#00ff66"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe layer */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#00e6ff" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#9933ff" transparent opacity={0.6} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00e6ff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff66"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function DataStreams() {
  const groupRef = useRef<THREE.Group>(null);

  const streams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      radius: 2.5 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <DataStreamLine key={i} {...stream} index={i} />
      ))}
    </group>
  );
}

function DataStreamLine({ angle, speed, radius, index }: { angle: number; speed: number; radius: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + index;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
      ref.current.position.y = Math.sin(t * 2) * 1.5;
      ref.current.scale.y = 0.5 + Math.sin(t * 3) * 0.3;
    }
  });

  const colors = ['#00ff66', '#00e6ff', '#9933ff', '#ff4d4d'];

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.3, 0.02]} />
      <meshBasicMaterial color={colors[index % colors.length]} transparent opacity={0.8} />
    </mesh>
  );
}

interface CyberGlobe3DProps {
  className?: string;
}

export const CyberGlobe3D = ({ className = '' }: CyberGlobe3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosition.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-[300px] md:h-[500px] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff66" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9933ff" />

        <CyberSphere mousePosition={mousePosition.current} />
        <ParticleField />
        <DataStreams />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};
