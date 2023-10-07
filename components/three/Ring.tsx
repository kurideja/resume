import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3, TorusGeometry, Mesh, MeshPhysicalMaterial } from 'three';

interface Props {
  position: Vector3;
  color: string;
  maxDepth: number;
}

export function Ring(props: Props) {
  const { position, color, maxDepth } = props;
  const ringRef = useRef<TorusGeometry>(null);
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    const wasSleeping = delta > 1;
    if (!meshRef.current || !materialRef.current || wasSleeping) {
      return;
    }

    if (meshRef.current.position.z < maxDepth + 1) {
      materialRef.current.opacity += delta;
    } else if (meshRef.current.position.z >= 0) {
      materialRef.current.opacity = 0;
      meshRef.current.position.z = maxDepth;
    } else if (meshRef.current.position.z >= -1) {
      materialRef.current.opacity -= delta;
    }

    meshRef.current.position.z += delta;
  });

  return (
    <mesh visible position={position} rotation={[0, 0, 0]} castShadow ref={meshRef}>
      <torusGeometry args={[1, 0.1, 30, 200]} ref={ringRef} />
      <meshPhysicalMaterial
        roughness={0}
        attach="material"
        color={color}
        ref={materialRef}
        transparent
      />
    </mesh>
  );
}
