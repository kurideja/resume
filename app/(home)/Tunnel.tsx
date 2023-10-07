import { Canvas, extend } from '@react-three/fiber';
import { Color, TorusGeometry, Vector3 } from 'three';
import { Perf } from 'r3f-perf';
import { OrbitControls } from '@react-three/drei';
import { Ring } from '@/components/three/Ring';

extend({ TorusGeometry });

const background = new Color('#F5F5F5');

export function Tunnel() {
  const numberOfRings = 8;

  const rings = Array.from({ length: Math.abs(numberOfRings) }).map((v, i) => {
    const position = new Vector3(0, 0, -1 * i * 2);
    const color = i % 2 === 0 ? '#335EFF' : '#FF5733';

    return <Ring key={i} position={position} color={color} maxDepth={numberOfRings * -2} />;
  });

  return (
    <Canvas
      camera={{
        rotation: [0, 0, 0],
        position: [0.5, 0.5, 1.3],
      }}
      shadows
    >
      {process.env.NODE_ENV === 'development' && <Perf />}
      <color attach="background" args={[background]} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      {rings}
      <OrbitControls />
    </Canvas>
  );
}
