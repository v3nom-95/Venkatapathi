import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Sphere, MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={globeRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#0a0a1a"
          emissive="#00ff66"
          emissiveIntensity={0.05}
          roughness={0.8}
          metalness={0.2}
          distort={0.1}
          speed={2}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere ref={wireframeRef} args={[1.52, 32, 32]}>
        <meshBasicMaterial color="#00ff66" wireframe transparent opacity={0.15} />
      </Sphere>
    </group>
  );
}

function ConnectionArcs() {
  const arcsRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const arcData: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const cities = [
      { lat: 40.7, lng: -74 },     // New York
      { lat: 51.5, lng: -0.1 },    // London
      { lat: 35.7, lng: 139.7 },   // Tokyo
      { lat: -33.9, lng: 18.4 },   // Cape Town
      { lat: 28.6, lng: 77.2 },    // Delhi
      { lat: -23.5, lng: -46.6 },  // São Paulo
      { lat: 55.75, lng: 37.6 },   // Moscow
      { lat: 1.35, lng: 103.8 },   // Singapore
    ];

    const latLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const colors = ['#00ff66', '#00e6ff', '#9933ff', '#ff4d4d'];

    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.6) {
          arcData.push({
            start: latLngToVector3(cities[i].lat, cities[i].lng, 1.5),
            end: latLngToVector3(cities[j].lat, cities[j].lng, 1.5),
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    }

    return arcData;
  }, []);

  useFrame((state) => {
    if (arcsRef.current) {
      arcsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={arcsRef}>
      {arcs.map((arc, i) => (
        <ArcLine key={i} start={arc.start} end={arc.end} color={arc.color} index={i} />
      ))}
    </group>
  );
}

function ArcLine({ start, end, color, index }: { start: THREE.Vector3; end: THREE.Vector3; color: string; index: number }) {
  const particleRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(Math.random());

  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    mid.normalize().multiplyScalar(1.5 + distance * 0.3);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  useFrame(() => {
    progressRef.current = (progressRef.current + 0.005) % 1;
    
    if (particleRef.current) {
      const point = curve.getPoint(progressRef.current);
      particleRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <Line points={points} color={color} transparent opacity={0.4} lineWidth={1} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function CityNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const cities = useMemo(() => {
    const cityData = [
      { lat: 40.7, lng: -74, name: 'NYC' },
      { lat: 51.5, lng: -0.1, name: 'LON' },
      { lat: 35.7, lng: 139.7, name: 'TYO' },
      { lat: 28.6, lng: 77.2, name: 'DEL' },
      { lat: 1.35, lng: 103.8, name: 'SIN' },
    ];

    return cityData.map(city => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);
      return {
        ...city,
        position: new THREE.Vector3(
          -1.52 * Math.sin(phi) * Math.cos(theta),
          1.52 * Math.cos(phi),
          1.52 * Math.sin(phi) * Math.sin(theta)
        ),
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {cities.map((city, i) => (
        <group key={i} position={city.position}>
          <mesh>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#ff4d4d" />
          </mesh>
          {/* Pulse effect */}
          <mesh scale={[1 + Math.sin(i) * 0.5, 1 + Math.sin(i) * 0.5, 1 + Math.sin(i) * 0.5]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ff4d4d" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StarField() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </Points>
  );
}

interface WorldGlobe3DProps {
  className?: string;
}

export const WorldGlobe3D = ({ className = '' }: WorldGlobe3DProps) => {
  return (
    <div className={`w-full h-[500px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff66" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9933ff" />

          <Globe />
          <ConnectionArcs />
          <CityNodes />
          <StarField />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3 / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
