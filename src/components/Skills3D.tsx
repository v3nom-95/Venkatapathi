import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SkillOrb({ position, skill, color, delay = 0 }: { position: [number, number, number]; skill: string; color: string; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + delay;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.2;
      meshRef.current.rotation.y = t * 0.5;
      
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 16, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.3} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {skill}
        </Text>
      </group>
    </Float>
  );
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      coreRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#00ff66"
          emissive="#00ff66"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00e6ff" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.4, 0.02, 16, 64]} />
          <meshBasicMaterial color="#9933ff" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 6, -Math.PI / 3, 0]}>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshBasicMaterial color="#ff4d4d" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      angle: (i / 20) * Math.PI * 2,
      radius: 2 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.3,
      size: 0.03 + Math.random() * 0.03,
      yOffset: (Math.random() - 0.5) * 0.5,
    })),
  []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        const t = state.clock.getElapsedTime() * p.speed + p.angle;
        child.position.x = Math.cos(t) * p.radius;
        child.position.z = Math.sin(t) * p.radius;
        child.position.y = p.yOffset + Math.sin(t * 2) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#00ff66' : i % 3 === 1 ? '#00e6ff' : '#9933ff'} />
        </mesh>
      ))}
    </group>
  );
}

interface Skills3DProps {
  className?: string;
}

export const Skills3D = ({ className = '' }: Skills3DProps) => {
  const skills = [
    { name: 'Python', color: '#00ff66', position: [-2, 1, 0] as [number, number, number] },
    { name: 'Solidity', color: '#9933ff', position: [2, 1, 0] as [number, number, number] },
    { name: 'React', color: '#00e6ff', position: [0, 1.5, -1.5] as [number, number, number] },
    { name: 'Security', color: '#ff4d4d', position: [-1.5, -1, 1] as [number, number, number] },
    { name: 'Web3', color: '#9933ff', position: [1.5, -1, 1] as [number, number, number] },
    { name: 'Node.js', color: '#00ff66', position: [0, -1.5, -1] as [number, number, number] },
  ];

  return (
    <div className={`w-full h-[450px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ff66" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#9933ff" />

        <CentralCore />
        <OrbitingParticles />

        {skills.map((skill, i) => (
          <SkillOrb
            key={skill.name}
            position={skill.position}
            skill={skill.name}
            color={skill.color}
            delay={i * 0.5}
          />
        ))}
      </Canvas>
    </div>
  );
};
