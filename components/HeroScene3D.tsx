'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

function CoreOrb() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
        meshRef.current.rotation.z = clock.getElapsedTime() * 0.08;
    });

    return (
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.55, 64, 64]} />
                <MeshDistortMaterial
                    color="#C8A84B"
                    emissive="#8B4513"
                    emissiveIntensity={0.5}
                    distort={0.35}
                    speed={2.5}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>
        </Float>
    );
}

function CameraRig() {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    useFrame(() => {
        target.current.x += (mouse.current.x * 1.2 - target.current.x) * 0.04;
        target.current.y += (mouse.current.y * 0.8 - target.current.y) * 0.04;
        camera.position.x = target.current.x;
        camera.position.y = 1.5 + target.current.y * 0.5;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.15} />
            <pointLight position={[0, 3, 0]} intensity={3} color="#C8A84B" distance={12} decay={2} />
            <pointLight position={[-5, 2, -5]} intensity={1.5} color="#4040A0" distance={15} decay={2} />
            <pointLight position={[5, -1, 5]} intensity={1.0} color="#1a1a4a" distance={10} decay={2} />

            <CoreOrb />
            <CameraRig />
        </>
    );
}

export default function HeroScene3D() {
    return (
        <Canvas
            camera={{ position: [0, 1.5, 7], fov: 60, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            dpr={[1, 1.5]}
        >
            <Scene />
            <EffectComposer>
                <Bloom
                    intensity={1.4}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.6}
                    blendFunction={BlendFunction.ADD}
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={new THREE.Vector2(0.0005, 0.0005)}
                    radialModulation={false}
                    modulationOffset={0}
                />
            </EffectComposer>
        </Canvas>
    );
}
