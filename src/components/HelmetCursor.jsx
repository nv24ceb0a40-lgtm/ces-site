import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './HelmetCursor.css';

// Global mouse tracker, independent of canvas pointer events
function useGlobalMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}

function HelmetModel({ mouseRef }) {
  const group = useRef();
  const inner = useRef();
  const { scene } = useGLTF('/helmet.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color('#FFC107');
        child.material.roughness = 0.4;
        child.material.metalness = 0.1;
      }
    });

    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    clonedScene.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 1.6 / maxDim;
    inner.current.scale.setScalar(scaleFactor);
    inner.current.rotation.y = Math.PI; // keep whatever value you already found works
  }, [clonedScene]);

  useFrame(() => {
    const { x, y } = mouseRef.current;
    const targetY = x * 0.5;
    const targetX = -y * 0.3;

    if (group.current) {
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.1;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload('/helmet.glb');

export default function HelmetCursor() {
  const mouseRef = useGlobalMouse();

  return (
    <div className="helmet-shortcut" aria-label="Construction helmet mascot">
      <Canvas camera={{ position: [0, 0.3, 4], fov: 35 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />
        <directionalLight position={[-2, 1, -2]} intensity={0.4} color="#ffffff" />
        <Suspense fallback={null}>
          <HelmetModel mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}