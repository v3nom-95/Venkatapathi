import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ProgrammerAvatar({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const [isTyping, setIsTyping] = useState(true);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Head follows mouse
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mousePos.x * 0.5,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        mousePos.y * 0.3,
        0.1
      );
    }

    // Typing animation for arms
    if (leftArmRef.current && rightArmRef.current) {
      const typingOffset = Math.sin(t * 8) * 0.02;
      leftArmRef.current.position.y = -0.3 + (isTyping ? typingOffset : 0);
      rightArmRef.current.position.y = -0.3 + (isTyping ? -typingOffset : 0);
    }

    // Subtle body movement
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.02;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.02;
    }

    // Toggle typing
    if (Math.floor(t) % 2 === 0 && !isTyping) setIsTyping(true);
    if (Math.floor(t) % 2 === 1 && isTyping) setIsTyping(false);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body - Hoodie */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>

      {/* Hoodie details */}
      <mesh position={[0, 0.3, 0.35]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>

      {/* Head group */}
      <group ref={headRef} position={[0, 0.8, 0]}>
        {/* Head */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ffd5b8" roughness={0.6} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2d2d44" roughness={0.9} />
        </mesh>

        {/* Eyes */}
        <group position={[0, 0, 0.3]}>
          {/* Left eye */}
          <mesh position={[-0.1, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
          <mesh position={[-0.1 + mousePos.x * 0.02, mousePos.y * 0.02, 0.05]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>

          {/* Right eye */}
          <mesh position={[0.1, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
          <mesh position={[0.1 + mousePos.x * 0.02, mousePos.y * 0.02, 0.05]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
        </group>

        {/* Glasses */}
        <group position={[0, 0, 0.32]}>
          <mesh position={[-0.1, 0, 0]}>
            <torusGeometry args={[0.08, 0.01, 8, 32]} />
            <meshBasicMaterial color="#00e6ff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <torusGeometry args={[0.08, 0.01, 8, 32]} />
            <meshBasicMaterial color="#00e6ff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.05, 8]} />
            <meshBasicMaterial color="#00e6ff" />
          </mesh>
        </group>

        {/* Headphones */}
        <group>
          <mesh position={[-0.35, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
          </mesh>
          <mesh position={[0.35, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
          </mesh>
          {/* LED lights */}
          <mesh position={[-0.35, 0.05, 0.08]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#00ff66" />
          </mesh>
          <mesh position={[0.35, 0.05, 0.08]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#00ff66" />
          </mesh>
          {/* Headband */}
          <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.02, 8, 32, Math.PI]} />
            <meshStandardMaterial color="#2d2d44" roughness={0.7} />
          </mesh>
        </group>

        {/* Mouth */}
        <mesh position={[0, -0.15, 0.3]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshBasicMaterial color="#c89080" />
        </mesh>
      </group>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.5, -0.3, 0.3]} rotation={[0.5, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.5, -0.3, 0.3]} rotation={[0.5, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.55, -0.6, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffd5b8" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, -0.6, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffd5b8" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Laptop() {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.8 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group position={[0, -1.2, 0.5]}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1, 0.05, 0.7]} />
        <meshStandardMaterial color="#2d2d44" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Laptop screen */}
      <group position={[0, 0.35, -0.3]} rotation={[0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 0.7, 0.03]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
        </mesh>
        {/* Screen glow */}
        <mesh ref={screenRef} position={[0, 0, 0.02]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.3} />
        </mesh>
        {/* Code lines on screen */}
        <group position={[0, 0, 0.025]}>
          <mesh position={[-0.25, 0.2, 0]}>
            <planeGeometry args={[0.3, 0.03]} />
            <meshBasicMaterial color="#00ff66" transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.1, 0.1, 0]}>
            <planeGeometry args={[0.5, 0.03]} />
            <meshBasicMaterial color="#00e6ff" transparent opacity={0.6} />
          </mesh>
          <mesh position={[-0.2, 0, 0]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshBasicMaterial color="#9933ff" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]}>
            <planeGeometry args={[0.25, 0.03]} />
            <meshBasicMaterial color="#ff4d4d" transparent opacity={0.6} />
          </mesh>
          <mesh position={[-0.15, -0.2, 0]}>
            <planeGeometry args={[0.45, 0.03]} />
            <meshBasicMaterial color="#00ff66" transparent opacity={0.7} />
          </mesh>
        </group>
      </group>

      {/* Keyboard glow */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const icons = [
    { symbol: '{ }', pos: [-1.5, 0.5, 0] as [number, number, number], color: '#00ff66' },
    { symbol: '< />', pos: [1.5, 0.3, 0.5] as [number, number, number], color: '#00e6ff' },
    { symbol: 'Ξ', pos: [-1.2, -0.5, 0.5] as [number, number, number], color: '#9933ff' },
    { symbol: '☠', pos: [1.3, 0.8, -0.3] as [number, number, number], color: '#ff4d4d' },
    { symbol: '🛡', pos: [0, 1.5, 0] as [number, number, number], color: '#00e6ff' },
  ];

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={icon.pos}
            fontSize={0.2}
            color={icon.color}
            anchorX="center"
            anchorY="middle"
          >
            {icon.symbol}
          </Text>
        </Float>
      ))}
    </group>
  );
}

function ParticleRing() {
  const ringRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    const angle = (i / 200) * Math.PI * 2;
    const radius = 2 + Math.random() * 0.2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ff66" transparent opacity={0.6} />
    </points>
  );
}

interface Character3DProps {
  className?: string;
}

export const Character3D = ({ className = '' }: Character3DProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setMousePos({ x, y });
  };

  return (
    <div 
      className={`w-full h-[500px] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00ff66" />
          <pointLight position={[3, -2, 2]} intensity={0.3} color="#9933ff" />

          <ProgrammerAvatar mousePos={mousePos} />
          <Laptop />
          <FloatingIcons />
          <ParticleRing />
        </Suspense>
      </Canvas>
    </div>
  );
};
