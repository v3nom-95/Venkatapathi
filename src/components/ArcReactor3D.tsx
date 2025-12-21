import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { 
  Float, 
  Trail, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Sparkles,
  Line,
  shaderMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Custom Holographic Shader Material
const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#00ffff'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      float scanline = sin(vPosition.y * 50.0 + time * 5.0) * 0.1 + 0.9;
      float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      float flicker = sin(time * 20.0) * 0.05 + 0.95;
      
      vec3 finalColor = color * scanline * flicker;
      float alpha = edge * 0.8 + 0.2;
      
      gl_FragColor = vec4(finalColor, alpha * 0.7);
    }
  `
);

extend({ HolographicMaterial });

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      holographicMaterial: any;
    }
  }
}

// Advanced Energy Core with multiple layers
const AdvancedEnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulseRef.current += 0.05;
    
    if (coreRef.current) {
      const pulse = Math.sin(pulseRef.current) * 0.15 + 1;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y += 0.03;
      coreRef.current.rotation.z += 0.02;
    }
    
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= 0.05;
      innerCoreRef.current.rotation.x += 0.03;
      const innerPulse = Math.sin(t * 3) * 0.1 + 1;
      innerCoreRef.current.scale.setScalar(innerPulse * 0.6);
    }
    
    if (plasmaRef.current) {
      plasmaRef.current.rotation.y += 0.04;
      plasmaRef.current.rotation.z -= 0.02;
    }
    
    if (glowRef.current) {
      const glowPulse = Math.sin(t * 2) * 0.2 + 1.3;
      glowRef.current.scale.setScalar(glowPulse);
    }
    
    if (outerGlowRef.current) {
      const outerPulse = Math.sin(t * 1.5 + 1) * 0.15 + 1.8;
      outerGlowRef.current.scale.setScalar(outerPulse);
    }
  });

  return (
    <group>
      {/* Inner nucleus */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Main core with distortion */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.25, 3]} />
        <MeshDistortMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={4}
          distort={0.4}
          speed={8}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Plasma layer */}
      <mesh ref={plasmaRef}>
        <icosahedronGeometry args={[0.35, 2]} />
        <MeshWobbleMaterial
          color="#00aaff"
          emissive="#0066ff"
          emissiveIntensity={2}
          factor={0.5}
          speed={3}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      
      {/* Primary glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.12}
        />
      </mesh>
      
      {/* Outer atmospheric glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
};

// Enhanced Segmented Ring with energy flow
const EnhancedReactorRing = ({ 
  radius, 
  segments, 
  speed, 
  color, 
  thickness = 0.08,
  offset = 0,
  pulseSpeed = 3,
  height = 0.05
}: { 
  radius: number; 
  segments: number; 
  speed: number; 
  color: string;
  thickness?: number;
  offset?: number;
  pulseSpeed?: number;
  height?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const segmentRefs = useRef<THREE.Mesh[]>([]);
  const materialRefs = useRef<THREE.MeshStandardMaterial[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.z += speed;
    }
    
    segmentRefs.current.forEach((seg, i) => {
      if (seg && materialRefs.current[i]) {
        // Sequential pulse wave
        const waveOffset = (i / segments) * Math.PI * 2;
        const pulse = Math.sin(t * pulseSpeed + waveOffset) * 0.3 + 1;
        seg.scale.y = pulse;
        seg.scale.x = 1 + Math.sin(t * pulseSpeed + waveOffset + Math.PI) * 0.1;
        
        // Dynamic emissive intensity
        const intensity = 1.5 + Math.sin(t * pulseSpeed + waveOffset) * 1;
        materialRefs.current[i].emissiveIntensity = intensity;
      }
    });
  });

  const segmentAngle = (Math.PI * 2) / segments;
  const gapAngle = segmentAngle * 0.12;

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
            <boxGeometry args={[thickness, segmentAngle * radius - gapAngle * radius, height]} />
            <meshStandardMaterial
              ref={(el) => { if (el) materialRefs.current[i] = el; }}
              color={color}
              emissive={color}
              emissiveIntensity={2}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Holographic rotating ring
const HolographicRing = ({ 
  radius, 
  speed, 
  tiltX = 0, 
  tiltY = 0,
  opacity = 0.6
}: { 
  radius: number; 
  speed: number; 
  tiltX?: number;
  tiltY?: number;
  opacity?: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += speed;
    }
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[tiltX, tiltY, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 128]} />
      <holographicMaterial ref={materialRef} transparent opacity={opacity} />
    </mesh>
  );
};

// Energy pulse waves emanating from center
const EnergyPulseWaves = () => {
  const wavesRef = useRef<THREE.Mesh[]>([]);
  const waveCount = 4;
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    wavesRef.current.forEach((wave, i) => {
      if (wave) {
        const offset = (i / waveCount) * Math.PI * 2;
        const progress = ((t * 0.5 + offset) % Math.PI) / Math.PI;
        const scale = 0.3 + progress * 2;
        const opacity = 1 - progress;
        
        wave.scale.setScalar(scale);
        (wave.material as THREE.MeshBasicMaterial).opacity = opacity * 0.3;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: waveCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) wavesRef.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.95, 1, 64]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Advanced energy beams with gradient
const AdvancedEnergyBeams = ({ count = 16 }: { count?: number }) => {
  const beamsRef = useRef<THREE.Group>(null);
  const beamRefs = useRef<THREE.Mesh[]>([]);
  const innerBeamRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (beamsRef.current) {
      beamsRef.current.rotation.z += 0.003;
    }
    
    beamRefs.current.forEach((beam, i) => {
      if (beam && innerBeamRefs.current[i]) {
        const offset = (i / count) * Math.PI * 2;
        const pulse = Math.sin(t * 4 + offset) * 0.5 + 0.5;
        
        beam.scale.x = 0.6 + pulse * 0.4;
        (beam.material as THREE.MeshBasicMaterial).opacity = 0.2 + pulse * 0.3;
        
        innerBeamRefs.current[i].scale.x = 0.4 + pulse * 0.6;
        (innerBeamRefs.current[i].material as THREE.MeshBasicMaterial).opacity = 0.5 + pulse * 0.5;
      }
    });
  });

  return (
    <group ref={beamsRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Outer beam glow */}
            <mesh
              ref={(el) => { if (el) beamRefs.current[i] = el; }}
              position={[1, 0, 0]}
            >
              <planeGeometry args={[1.8, 0.04]} />
              <meshBasicMaterial
                color="#0088ff"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Inner beam core */}
            <mesh
              ref={(el) => { if (el) innerBeamRefs.current[i] = el; }}
              position={[1, 0, 0.001]}
            >
              <planeGeometry args={[1.6, 0.015]} />
              <meshBasicMaterial
                color="#00ffff"
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Orbital particles with advanced trails
const AdvancedOrbitalParticle = ({ 
  radius, 
  speed, 
  offset,
  color,
  size = 0.04,
  trailLength = 10
}: { 
  radius: number; 
  speed: number; 
  offset: number;
  color: string;
  size?: number;
  trailLength?: number;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    
    if (particleRef.current) {
      particleRef.current.position.x = Math.cos(t) * radius;
      particleRef.current.position.y = Math.sin(t) * radius;
      particleRef.current.position.z = Math.sin(t * 3) * 0.15;
      
      // Pulsing size
      const pulse = Math.sin(t * 5) * 0.2 + 1;
      particleRef.current.scale.setScalar(pulse);
    }
    
    if (glowRef.current && particleRef.current) {
      glowRef.current.position.copy(particleRef.current.position);
      glowRef.current.scale.setScalar(2 + Math.sin(t * 3) * 0.5);
    }
  });

  return (
    <group>
      <Trail
        width={size * 3}
        length={trailLength}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={particleRef}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Trail>
      
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.5, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Floating holographic data panels
const HolographicPanels = () => {
  const groupRef = useRef<THREE.Group>(null);
  const panelRefs = useRef<THREE.Mesh[]>([]);
  
  const panels = useMemo(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      angle: (i / 6) * Math.PI * 2 + Math.PI / 6,
      radius: 1.9,
      width: 0.3,
      height: 0.2,
      rotationOffset: Math.random() * 0.2
    })), []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.001;
    }
    
    panelRefs.current.forEach((panel, i) => {
      if (panel) {
        // Floating animation
        panel.position.z = Math.sin(t * 2 + i * 0.5) * 0.1;
        // Subtle rotation
        panel.rotation.x = Math.sin(t + i) * 0.1;
        panel.rotation.y = Math.cos(t * 0.5 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {panels.map((panel, i) => (
        <Float key={i} speed={2} floatIntensity={0.2}>
          <mesh
            ref={(el) => { if (el) panelRefs.current[i] = el; }}
            position={[
              Math.cos(panel.angle) * panel.radius,
              Math.sin(panel.angle) * panel.radius,
              0
            ]}
            rotation={[0, 0, panel.angle + Math.PI / 2]}
          >
            <planeGeometry args={[panel.width, panel.height]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#0066ff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Advanced energy shield with hexagonal pattern
const HexagonalShield = () => {
  const shieldRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (shieldRef.current) {
      const pulse = Math.sin(t * 1.5) * 0.03 + 1;
      shieldRef.current.scale.setScalar(pulse);
      shieldRef.current.rotation.y += 0.005;
      shieldRef.current.rotation.x += 0.003;
    }
    
    if (materialRef.current) {
      materialRef.current.time = t;
    }
  });

  return (
    <group>
      <mesh ref={shieldRef}>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#003366"
          emissiveIntensity={0.3}
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
      
      {/* Secondary shield layer */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>
    </group>
  );
};

// Advanced data streams with multiple layers
const AdvancedDataStreams = () => {
  const innerStreamsRef = useRef<THREE.Points>(null);
  const outerStreamsRef = useRef<THREE.Points>(null);
  
  const innerCount = 300;
  const outerCount = 200;

  const innerData = useMemo(() => {
    const positions = new Float32Array(innerCount * 3);
    const speeds = new Float32Array(innerCount);
    const colors = new Float32Array(innerCount * 3);
    
    for (let i = 0; i < innerCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      speeds[i] = 0.8 + Math.random() * 0.5;
      
      // Gradient colors
      const t = Math.random();
      colors[i * 3] = t * 0.5;
      colors[i * 3 + 1] = 0.8 + t * 0.2;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, speeds, colors };
  }, []);

  const outerData = useMemo(() => {
    const positions = new Float32Array(outerCount * 3);
    const speeds = new Float32Array(outerCount);
    
    for (let i = 0; i < outerCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      speeds[i] = 0.3 + Math.random() * 0.4;
    }
    
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    // Inner streams - moving inward
    if (innerStreamsRef.current) {
      const posArray = innerStreamsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < innerCount; i++) {
        const x = posArray[i * 3];
        const y = posArray[i * 3 + 1];
        const currentRadius = Math.sqrt(x * x + y * y);
        
        const newRadius = currentRadius - innerData.speeds[i] * 0.015;
        
        if (newRadius < 0.4) {
          const angle = Math.random() * Math.PI * 2;
          const resetRadius = 2 + Math.random() * 0.5;
          posArray[i * 3] = Math.cos(angle) * resetRadius;
          posArray[i * 3 + 1] = Math.sin(angle) * resetRadius;
        } else {
          const scale = newRadius / currentRadius;
          posArray[i * 3] *= scale;
          posArray[i * 3 + 1] *= scale;
        }
      }
      
      innerStreamsRef.current.geometry.attributes.position.needsUpdate = true;
      innerStreamsRef.current.rotation.z += 0.003;
    }

    // Outer streams - spiral motion
    if (outerStreamsRef.current) {
      const posArray = outerStreamsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < outerCount; i++) {
        const x = posArray[i * 3];
        const y = posArray[i * 3 + 1];
        const angle = Math.atan2(y, x) + outerData.speeds[i] * 0.01;
        const radius = Math.sqrt(x * x + y * y);
        
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = Math.sin(angle) * radius;
      }
      
      outerStreamsRef.current.geometry.attributes.position.needsUpdate = true;
      outerStreamsRef.current.rotation.z -= 0.001;
    }
  });

  return (
    <group>
      {/* Inner converging streams */}
      <points ref={innerStreamsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[innerData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      
      {/* Outer orbiting streams */}
      <points ref={outerStreamsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#0088ff"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// Electric arcs between rings
const ElectricArcs = () => {
  const arcsRef = useRef<THREE.Group>(null);
  const arcCount = 6;
  
  const arcPoints = useMemo(() => {
    return Array.from({ length: arcCount }).map((_, i) => {
      const angle = (i / arcCount) * Math.PI * 2;
      const points: [number, number, number][] = [];
      const segments = 10;
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const r = 0.7 + t * 0.8;
        const a = angle + t * 0.3;
        const jitter = (Math.random() - 0.5) * 0.1;
        points.push([
          Math.cos(a) * r + jitter,
          Math.sin(a) * r + jitter,
          jitter * 0.5
        ]);
      }
      return points;
    });
  }, []);

  useFrame(() => {
    if (arcsRef.current) {
      arcsRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={arcsRef}>
      {arcPoints.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#00ffff"
          lineWidth={1}
          transparent
          opacity={0.8}
        />
      ))}
    </group>
  );
};

// Advanced mouse reactive controller with physics
const AdvancedMouseReactive = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate target based on mouse
      const targetX = (state.pointer.x * viewport.width) / 8;
      const targetY = (state.pointer.y * viewport.height) / 8;
      
      // Apply spring physics
      const springStrength = 0.08;
      const damping = 0.85;
      
      velocity.current.x += (targetX - mouse.current.x) * springStrength;
      velocity.current.y += (targetY - mouse.current.y) * springStrength;
      
      velocity.current.x *= damping;
      velocity.current.y *= damping;
      
      mouse.current.x += velocity.current.x;
      mouse.current.y += velocity.current.y;
      
      // Apply rotation with tilt
      groupRef.current.rotation.y = mouse.current.x * 0.4;
      groupRef.current.rotation.x = -mouse.current.y * 0.4;
      
      // Subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Ambient sparkles
const AmbientSparkles = () => {
  return (
    <Sparkles
      count={100}
      size={2}
      scale={[5, 5, 3]}
      speed={0.3}
      color="#00ffff"
      opacity={0.5}
    />
  );
};

// Main Arc Reactor Scene
const ArcReactorScene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 4]} intensity={3} color="#00ffff" distance={10} />
      <pointLight position={[4, 4, 3]} intensity={1.5} color="#0088ff" distance={8} />
      <pointLight position={[-4, -4, 3]} intensity={1.5} color="#00ffff" distance={8} />
      <pointLight position={[0, 0, -2]} intensity={1} color="#0066ff" distance={6} />

      <AdvancedMouseReactive>
        {/* Core */}
        <AdvancedEnergyCore />
        
        {/* Inner segmented rings */}
        <EnhancedReactorRing radius={0.55} segments={8} speed={0.025} color="#00ffff" thickness={0.07} pulseSpeed={4} />
        <EnhancedReactorRing radius={0.75} segments={10} speed={-0.02} color="#00aaff" thickness={0.06} offset={0.15} pulseSpeed={3.5} />
        <EnhancedReactorRing radius={0.95} segments={12} speed={0.015} color="#00ffff" thickness={0.05} offset={0.3} pulseSpeed={3} />
        <EnhancedReactorRing radius={1.15} segments={16} speed={-0.012} color="#0088ff" thickness={0.04} offset={0.45} pulseSpeed={2.5} />
        
        {/* Holographic rings */}
        <HolographicRing radius={1.35} speed={0.018} />
        <HolographicRing radius={1.5} speed={-0.015} tiltX={0.25} />
        <HolographicRing radius={1.65} speed={0.012} tiltX={-0.2} tiltY={0.15} />
        <HolographicRing radius={1.8} speed={-0.01} tiltX={0.15} tiltY={-0.1} opacity={0.4} />
        
        {/* Energy pulse waves */}
        <EnergyPulseWaves />
        
        {/* Energy beams */}
        <AdvancedEnergyBeams count={20} />
        
        {/* Electric arcs */}
        <ElectricArcs />
        
        {/* Orbital particles */}
        <AdvancedOrbitalParticle radius={1.3} speed={2.2} offset={0} color="#00ffff" size={0.05} trailLength={12} />
        <AdvancedOrbitalParticle radius={1.45} speed={1.9} offset={Math.PI * 0.4} color="#00aaff" size={0.04} trailLength={10} />
        <AdvancedOrbitalParticle radius={1.35} speed={2.4} offset={Math.PI * 0.8} color="#00ffff" size={0.045} trailLength={11} />
        <AdvancedOrbitalParticle radius={1.55} speed={1.7} offset={Math.PI * 1.2} color="#0088ff" size={0.035} trailLength={9} />
        <AdvancedOrbitalParticle radius={1.4} speed={2.1} offset={Math.PI * 1.6} color="#00ffff" size={0.04} trailLength={10} />
        <AdvancedOrbitalParticle radius={1.6} speed={1.5} offset={Math.PI * 2} color="#00aaff" size={0.03} trailLength={8} />
        
        {/* Holographic panels */}
        <HolographicPanels />
        
        {/* Energy shield */}
        <HexagonalShield />
        
        {/* Data streams */}
        <AdvancedDataStreams />
      </AdvancedMouseReactive>
      
      {/* Ambient particles */}
      <AmbientSparkles />
    </>
  );
};

// JARVIS HUD Component
const JarvisHUD = () => {
  const [powerLevel, setPowerLevel] = useState(87);
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [reactorTemp, setReactorTemp] = useState(2847);
  const [dataStreams, setDataStreams] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate fluctuating power levels
    const powerInterval = setInterval(() => {
      setPowerLevel(prev => {
        const change = (Math.random() - 0.5) * 4;
        return Math.min(100, Math.max(75, prev + change));
      });
    }, 500);
    
    // Simulate temperature fluctuations
    const tempInterval = setInterval(() => {
      setReactorTemp(prev => {
        const change = (Math.random() - 0.5) * 50;
        return Math.round(Math.min(3200, Math.max(2600, prev + change)));
      });
    }, 300);
    
    // Generate data stream entries
    const dataMessages = [
      'INITIALIZING NEURAL INTERFACE...',
      'SCANNING PERIMETER...',
      'THREAT LEVEL: MINIMAL',
      'POWER CELLS: OPTIMAL',
      'SYSTEM DIAGNOSTICS: PASS',
      'ARC REACTOR: STABLE',
      'ENERGY OUTPUT: 3.2 GW',
      'SUIT INTEGRITY: 100%',
      'PALLADIUM CORE: ACTIVE',
      'J.A.R.V.I.S.: ONLINE',
      'FLIGHT SYSTEMS: READY',
      'WEAPONS: STANDBY',
    ];
    
    let messageIndex = 0;
    const dataInterval = setInterval(() => {
      setDataStreams(prev => {
        const newStreams = [...prev, dataMessages[messageIndex % dataMessages.length]];
        messageIndex++;
        return newStreams.slice(-4);
      });
    }, 2000);
    
    return () => {
      clearInterval(powerInterval);
      clearInterval(tempInterval);
      clearInterval(dataInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none font-mono text-[10px] md:text-xs overflow-hidden">
      {/* Top Left HUD Panel */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <div className="relative">
          {/* Corner brackets */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-secondary/80" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-secondary/80" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-secondary/80" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-secondary/80" />
          
          <div className="bg-background/60 backdrop-blur-sm border border-secondary/40 p-2 md:p-3 min-w-[120px] md:min-w-[160px]">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${systemStatus === 'ONLINE' ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
              <span className="text-primary tracking-widest">SYSTEM STATUS</span>
            </div>
            <div className="text-secondary font-bold tracking-wider">{systemStatus}</div>
            
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-muted-foreground">
                <span>REACTOR</span>
                <span className="text-primary">ACTIVE</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SHIELDS</span>
                <span className="text-primary">ENABLED</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>AI CORE</span>
                <span className="text-secondary">J.A.R.V.I.S.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Right Power Level */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/80" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/80" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/80" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/80" />
          
          <div className="bg-background/60 backdrop-blur-sm border border-primary/40 p-2 md:p-3 min-w-[100px] md:min-w-[140px]">
            <div className="text-primary tracking-widest mb-2">POWER LEVEL</div>
            <div className="text-2xl md:text-3xl font-bold text-secondary tabular-nums">
              {powerLevel.toFixed(1)}%
            </div>
            
            {/* Power bar */}
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${powerLevel}%` }}
              />
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-1 text-[8px] md:text-[10px]">
              <div className="text-muted-foreground">OUTPUT</div>
              <div className="text-primary text-right">3.2 GW</div>
              <div className="text-muted-foreground">EFF.</div>
              <div className="text-primary text-right">98.7%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Left - Temperature & Metrics */}
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-destructive/60" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-destructive/60" />
          
          <div className="bg-background/60 backdrop-blur-sm border border-destructive/30 p-2 md:p-3 min-w-[100px] md:min-w-[130px]">
            <div className="text-destructive tracking-widest mb-1">CORE TEMP</div>
            <div className="text-xl md:text-2xl font-bold text-foreground tabular-nums">
              {reactorTemp}°K
            </div>
            
            {/* Temperature gauge */}
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-3 w-2 ${
                    i < Math.floor(((reactorTemp - 2600) / 600) * 8) 
                      ? 'bg-gradient-to-t from-destructive to-yellow-500' 
                      : 'bg-muted/30'
                  }`}
                />
              ))}
            </div>
            
            <div className="mt-2 text-[8px] md:text-[10px] text-muted-foreground">
              <div className="flex justify-between">
                <span>NOMINAL</span>
                <span className="text-primary">2800°K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Right - Data Stream */}
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-secondary/60" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-secondary/60" />
          
          <div className="bg-background/60 backdrop-blur-sm border border-secondary/30 p-2 md:p-3 min-w-[140px] md:min-w-[180px] max-h-[80px] md:max-h-[100px] overflow-hidden">
            <div className="text-secondary tracking-widest mb-2 flex items-center gap-2">
              <span>DATA STREAM</span>
              <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-1">
              {dataStreams.map((msg, i) => (
                <div 
                  key={i}
                  className="text-muted-foreground text-[8px] md:text-[10px] animate-fade-in truncate"
                  style={{ 
                    opacity: 1 - (dataStreams.length - 1 - i) * 0.25,
                  }}
                >
                  {'>'} {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Center scanning ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          {/* Rotating scan line */}
          <div 
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.1) 30deg, transparent 60deg)',
              animation: 'spin 4s linear infinite',
            }}
          />
          
          {/* Inner measurement marks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2 bg-primary/40"
              style={{
                left: '50%',
                top: '0%',
                transformOrigin: '50% 400%',
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Top center status bar */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <div className="bg-background/40 backdrop-blur-sm border border-primary/30 px-3 md:px-4 py-1 flex items-center gap-2 md:gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary tracking-[0.3em] text-[10px] md:text-xs">STARK INDUSTRIES</span>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      {/* Side measurement bars */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 ml-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="h-0.5 bg-primary/40 animate-pulse"
            style={{ 
              width: `${8 + Math.random() * 12}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 mr-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="h-0.5 bg-secondary/40 animate-pulse"
            style={{ 
              width: `${8 + Math.random() * 12}px`,
              animationDelay: `${i * 0.2 + 0.1}s`,
            }}
          />
        ))}
      </div>
      
      {/* Hexagonal grid overlay (subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexGrid" width="28" height="49" patternUnits="userSpaceOnUse">
            <path d="M14 0L28 8.5V25.5L14 34L0 25.5V8.5L14 0Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>
    </div>
  );
};

export const ArcReactor3D = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`} style={{ height: '400px' }}>
      {/* Multi-layer glow effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 bg-secondary/40 rounded-full blur-2xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 bg-foreground/50 rounded-full blur-xl" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ArcReactorScene />
      </Canvas>
      
      {/* JARVIS HUD Overlay */}
      <JarvisHUD />
      
      {/* HUD corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-primary/60 pointer-events-none">
        <div className="absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/80 animate-pulse" />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-primary/60 pointer-events-none">
        <div className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/80 animate-pulse" style={{ animationDelay: '0.25s' }} />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-primary/60 pointer-events-none">
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/80 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-primary/60 pointer-events-none">
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/80 animate-pulse" style={{ animationDelay: '0.75s' }} />
      </div>
    </div>
  );
};
