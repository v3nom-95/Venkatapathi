import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, Line } from '@react-three/drei';
import * as THREE from 'three';

function FloatingIcosahedron({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.4, 0]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <MeshWobbleMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.7}
        factor={0.4}
        speed={2}
      />
    </mesh>
  );
}

function DataCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      const scale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#00e6ff"
          emissive="#00e6ff"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function HexGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const hexPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 4;
    const hexSize = 0.6;
    
    for (let q = -3; q <= 3; q++) {
      for (let r = -3; r <= 3; r++) {
        const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const z = hexSize * (3 / 2 * r);
        if (Math.sqrt(x * x + z * z) < radius) {
          positions.push([x, 0, z]);
        }
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i * 0.2) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]} rotation={[-0.2, 0, 0]}>
      {hexPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#00ff66' : i % 3 === 1 ? '#00e6ff' : '#9933ff'}
            transparent
            opacity={0.2 + Math.random() * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const lineData = [];
    const nodePositions = [
      [-2, 1, 0], [2, 1.5, 0], [0, -1, 1], [-1.5, 0, -1], [1.5, -0.5, 1],
      [0, 2, -1], [-2, -1, 0.5], [2, 0, -0.5],
    ] as [number, number, number][];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (Math.random() > 0.5) {
          lineData.push({
            start: nodePositions[i],
            end: nodePositions[j],
          });
        }
      }
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#00ff66"
          transparent
          opacity={0.3}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      targetPos.current.x = (state.pointer.x * viewport.width) / 2;
      targetPos.current.y = (state.pointer.y * viewport.height) / 2;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPos.current.x, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPos.current.y, 0.05);
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <dodecahedronGeometry args={[0.15, 0]} />
      <meshBasicMaterial color="#00ff66" wireframe />
    </mesh>
  );
}

interface FloatingShapes3DProps {
  className?: string;
}

export const FloatingShapes3D = ({ className = '' }: FloatingShapes3DProps) => {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ff66" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#9933ff" />

        <FloatingIcosahedron position={[-2, 1, 0]} color="#00ff66" speed={1.2} />
        <FloatingIcosahedron position={[2, -0.5, 1]} color="#9933ff" speed={0.8} />
        <FloatingOctahedron position={[0, 1.5, -1]} color="#00e6ff" />
        <FloatingOctahedron position={[-1.5, -1, 0.5]} color="#ff4d4d" />
        <DataCube position={[1.5, 0.5, 0]} />
        <DataCube position={[-1, 0, 1]} />

        <HexGrid />
        <ConnectionLines />
        <MouseFollower />

        <Sparkles
          count={100}
          size={2}
          speed={0.3}
          opacity={0.5}
          scale={10}
          color="#00ff66"
        />
      </Canvas>
    </div>
  );
};
