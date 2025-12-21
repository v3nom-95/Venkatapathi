import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Trail, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central Core - Glowing energy sphere
const EnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((state) => {
    if (coreRef.current && glowRef.current) {
      pulseRef.current += 0.05;
      const pulse = Math.sin(pulseRef.current) * 0.1 + 1;
      coreRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.5);
      
      // Rotate core
      coreRef.current.rotation.y += 0.02;
      coreRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.3, 2]} />
        <MeshDistortMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          distort={0.3}
          speed={5}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

// Rotating Ring with segments
const ReactorRing = ({ 
  radius, 
  segments, 
  speed, 
  color, 
  thickness = 0.08,
  offset = 0 
}: { 
  radius: number; 
  segments: number; 
  speed: number; 
  color: string;
  thickness?: number;
  offset?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const segmentRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed;
    }
    
    // Pulse individual segments
    segmentRefs.current.forEach((seg, i) => {
      if (seg) {
        const pulse = Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.2 + 1;
        seg.scale.y = pulse;
      }
    });
  });

  const segmentAngle = (Math.PI * 2) / segments;
  const gapAngle = segmentAngle * 0.15;

  return (
    <group ref={groupRef} rotation={[0, 0, offset]}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = i * segmentAngle;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) segmentRefs.current[i] = el; }}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[thickness, segmentAngle * radius - gapAngle * radius, 0.05]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Continuous rotating torus ring
const TorusRing = ({ 
  radius, 
  tube, 
  speed, 
  color,
  tilt = 0 
}: { 
  radius: number; 
  tube: number; 
  speed: number; 
  color: string;
  tilt?: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Energy beams shooting from center
const EnergyBeams = ({ count = 8 }: { count?: number }) => {
  const beamsRef = useRef<THREE.Group>(null);
  const beamRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.z += 0.005;
    }
    
    beamRefs.current.forEach((beam, i) => {
      if (beam) {
        const pulse = Math.sin(state.clock.elapsedTime * 5 + i) * 0.5 + 0.5;
        beam.scale.x = 0.5 + pulse * 0.5;
        (beam.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.4;
      }
    });
  });

  return (
    <group ref={beamsRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) beamRefs.current[i] = el; }}
            position={[0, 0, 0]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[2, 0.02]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Orbiting energy particles with trails
const OrbitalParticle = ({ 
  radius, 
  speed, 
  offset,
  color 
}: { 
  radius: number; 
  speed: number; 
  offset: number;
  color: string;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (particleRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      particleRef.current.position.x = Math.cos(t) * radius;
      particleRef.current.position.y = Math.sin(t) * radius;
      particleRef.current.position.z = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Trail
      width={0.1}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// Floating holographic triangles
const HoloTriangles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const triangles = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      radius: 1.8 + Math.random() * 0.3,
      size: 0.1 + Math.random() * 0.1,
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2
    })), []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {triangles.map((tri, i) => (
        <Float key={i} speed={tri.speed} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos(tri.angle) * tri.radius,
              Math.sin(tri.angle) * tri.radius,
              0
            ]}
            rotation={[0, 0, tri.angle]}
          >
            <coneGeometry args={[tri.size, tri.size * 2, 3]} />
            <meshStandardMaterial
              color="#0088ff"
              emissive="#0088ff"
              emissiveIntensity={1}
              transparent
              opacity={0.6}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Pulsing outer shield
const EnergyShield = () => {
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (shieldRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      shieldRef.current.scale.setScalar(pulse);
      shieldRef.current.rotation.y += 0.01;
      shieldRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={shieldRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#004466"
        emissiveIntensity={0.5}
        transparent
        opacity={0.08}
        wireframe
      />
    </mesh>
  );
};

// Data streams flowing inward
const DataStreams = () => {
  const streamsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const { positions, speeds, angles } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      speeds[i] = 0.5 + Math.random() * 1;
      angles[i] = angle;
    }
    
    return { positions, speeds, angles };
  }, []);

  useFrame((state) => {
    if (streamsRef.current) {
      const posArray = streamsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const currentRadius = Math.sqrt(
          posArray[i * 3] ** 2 + posArray[i * 3 + 1] ** 2
        );
        
        const newRadius = currentRadius - speeds[i] * 0.02;
        
        if (newRadius < 0.3) {
          const resetRadius = 2 + Math.random();
          posArray[i * 3] = Math.cos(angles[i]) * resetRadius;
          posArray[i * 3 + 1] = Math.sin(angles[i]) * resetRadius;
        } else {
          const scale = newRadius / currentRadius;
          posArray[i * 3] *= scale;
          posArray[i * 3 + 1] *= scale;
        }
      }
      
      streamsRef.current.geometry.attributes.position.needsUpdate = true;
      streamsRef.current.rotation.z += 0.002;
    }
  });

  return (
    <points ref={streamsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Mouse reactive controller
const MouseReactive = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth follow mouse
      const targetX = (state.pointer.x * viewport.width) / 10;
      const targetY = (state.pointer.y * viewport.height) / 10;
      
      mouse.current.x += (targetX - mouse.current.x) * 0.05;
      mouse.current.y += (targetY - mouse.current.y) * 0.05;
      
      groupRef.current.rotation.y = mouse.current.x * 0.3;
      groupRef.current.rotation.x = -mouse.current.y * 0.3;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Main Arc Reactor Scene
const ArcReactorScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#00ffff" />
      <pointLight position={[3, 3, 2]} intensity={1} color="#0088ff" />
      <pointLight position={[-3, -3, 2]} intensity={1} color="#00ffff" />

      <MouseReactive>
        {/* Core */}
        <EnergyCore />
        
        {/* Inner rings */}
        <ReactorRing radius={0.6} segments={8} speed={0.02} color="#00ffff" thickness={0.06} />
        <ReactorRing radius={0.85} segments={12} speed={-0.015} color="#0088ff" thickness={0.05} offset={0.2} />
        <ReactorRing radius={1.1} segments={16} speed={0.01} color="#00ffff" thickness={0.04} offset={0.4} />
        
        {/* Torus rings */}
        <TorusRing radius={1.35} tube={0.02} speed={0.025} color="#00ffff" />
        <TorusRing radius={1.5} tube={0.015} speed={-0.02} color="#0088ff" tilt={0.3} />
        <TorusRing radius={1.65} tube={0.01} speed={0.015} color="#00ffff" tilt={-0.2} />
        
        {/* Energy beams */}
        <EnergyBeams count={12} />
        
        {/* Orbital particles */}
        <OrbitalParticle radius={1.4} speed={2} offset={0} color="#00ffff" />
        <OrbitalParticle radius={1.5} speed={1.8} offset={Math.PI * 0.5} color="#0088ff" />
        <OrbitalParticle radius={1.3} speed={2.2} offset={Math.PI} color="#00ffff" />
        <OrbitalParticle radius={1.55} speed={1.5} offset={Math.PI * 1.5} color="#0088ff" />
        
        {/* Holographic triangles */}
        <HoloTriangles />
        
        {/* Energy shield */}
        <EnergyShield />
        
        {/* Data streams */}
        <DataStreams />
      </MouseReactive>
    </>
  );
};

export const ArcReactor3D = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`} style={{ height: '400px' }}>
      {/* Glow effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 bg-secondary/40 rounded-full blur-2xl" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ArcReactorScene />
      </Canvas>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
    </div>
  );
};
