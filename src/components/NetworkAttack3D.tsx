import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: number;
  position: THREE.Vector3;
  type: 'server' | 'client' | 'firewall' | 'attacker';
  connections: number[];
}

function NetworkNode({ node, time }: { node: Node; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const colors = {
    server: '#00e6ff',
    client: '#00ff66',
    firewall: '#9933ff',
    attacker: '#ff4d4d',
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + node.id) * 0.1);
    }
  });

  return (
    <group position={node.position}>
      <mesh ref={meshRef}>
        {node.type === 'server' && <boxGeometry args={[0.3, 0.4, 0.3]} />}
        {node.type === 'client' && <sphereGeometry args={[0.15, 16, 16]} />}
        {node.type === 'firewall' && <octahedronGeometry args={[0.2, 0]} />}
        {node.type === 'attacker' && <tetrahedronGeometry args={[0.2, 0]} />}
        <meshStandardMaterial
          color={colors[node.type]}
          emissive={colors[node.type]}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={colors[node.type]} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function DataPacket({ start, end, progress, color }: { start: THREE.Vector3; end: THREE.Vector3; progress: number; color: string }) {
  const position = useMemo(() => {
    return new THREE.Vector3().lerpVectors(start, end, progress);
  }, [start, end, progress]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function NetworkVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const nodes: Node[] = useMemo(() => [
    { id: 0, position: new THREE.Vector3(0, 0, 0), type: 'server', connections: [1, 2, 3, 4] },
    { id: 1, position: new THREE.Vector3(-2, 1, 0), type: 'client', connections: [0, 5] },
    { id: 2, position: new THREE.Vector3(2, 1, 0.5), type: 'client', connections: [0, 5] },
    { id: 3, position: new THREE.Vector3(-1.5, -1, 0.5), type: 'client', connections: [0] },
    { id: 4, position: new THREE.Vector3(1.5, -1, -0.5), type: 'client', connections: [0] },
    { id: 5, position: new THREE.Vector3(0, 2, 0), type: 'firewall', connections: [1, 2, 6] },
    { id: 6, position: new THREE.Vector3(-3, 2, 0), type: 'attacker', connections: [5] },
  ], []);

  const connections = useMemo(() => {
    const conns: { start: THREE.Vector3; end: THREE.Vector3; isAttack: boolean }[] = [];
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        if (targetId > node.id) {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            conns.push({
              start: node.position,
              end: target.position,
              isAttack: node.type === 'attacker' || target.type === 'attacker',
            });
          }
        }
      });
    });
    return conns;
  }, [nodes]);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((conn, i) => (
        <group key={i}>
          <Line
            points={[conn.start, conn.end]}
            color={conn.isAttack ? '#ff4d4d' : '#00ff66'}
            lineWidth={conn.isAttack ? 2 : 1}
            transparent
            opacity={0.4}
            dashed={conn.isAttack}
            dashSize={0.1}
            dashScale={2}
          />
          <DataPacket
            start={conn.start}
            end={conn.end}
            progress={(Math.sin(timeRef.current * 2 + i) + 1) / 2}
            color={conn.isAttack ? '#ff4d4d' : '#00e6ff'}
          />
        </group>
      ))}

      {/* Nodes */}
      {nodes.map(node => (
        <NetworkNode key={node.id} node={node} time={timeRef.current} />
      ))}

      {/* Labels */}
      <Text position={[0, -0.6, 0]} fontSize={0.15} color="#00e6ff" anchorX="center">
        SERVER
      </Text>
      <Text position={[-3, 2.4, 0]} fontSize={0.12} color="#ff4d4d" anchorX="center">
        THREAT
      </Text>
      <Text position={[0, 2.4, 0]} fontSize={0.12} color="#9933ff" anchorX="center">
        FIREWALL
      </Text>
    </group>
  );
}

function ScanningEffect() {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (ringRef.current && materialRef.current) {
      const scale = 1 + (state.clock.getElapsedTime() % 3) * 2;
      ringRef.current.scale.set(scale, scale, scale);
      materialRef.current.opacity = Math.max(0, 1 - (state.clock.getElapsedTime() % 3) / 3);
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <ringGeometry args={[0.5, 0.55, 64]} />
      <meshBasicMaterial ref={materialRef} color="#00e6ff" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

function GridFloor() {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[10, 20, '#00ff66', '#00ff66']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

interface NetworkAttack3DProps {
  className?: string;
}

export const NetworkAttack3D = ({ className = '' }: NetworkAttack3DProps) => {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#9933ff" />

        <NetworkVisualization />
        <ScanningEffect />
        <GridFloor />

        <Points
          positions={new Float32Array(300).map(() => (Math.random() - 0.5) * 10)}
          stride={3}
        >
          <PointMaterial size={0.02} color="#00ff66" transparent opacity={0.3} />
        </Points>
      </Canvas>
    </div>
  );
};
