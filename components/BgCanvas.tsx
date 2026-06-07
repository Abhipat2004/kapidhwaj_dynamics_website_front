'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCloud({ count = 2000 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const r = 4 + Math.random() * 14;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            sizes[i] = Math.random() * 0.04 + 0.008;
        }
        return { positions, sizes };
    }, [count]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025;
        pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.08;
    });

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return g;
    }, [positions, sizes]);

    return (
        <points ref={pointsRef} geometry={geo}>
            <pointsMaterial
                color="#E8C96A"
                size={0.03}
                sizeAttenuation
                transparent
                opacity={0.7}
                fog={false}
            />
        </points>
    );
}

function FloatingShape({ position, speed, size, rotAxis }: {
    position: [number, number, number];
    speed: number;
    size: number;
    rotAxis: [number, number, number];
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime() * speed;
        meshRef.current.rotation.x = t * rotAxis[0];
        meshRef.current.rotation.y = t * rotAxis[1];
        meshRef.current.rotation.z = t * rotAxis[2];
        meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <icosahedronGeometry args={[size, 1]} />
            <meshStandardMaterial
                color="#C8A84B"
                emissive="#8B6914"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.25}
            />
        </mesh>
    );
}

function GridFloor() {
    const linesRef = useRef<THREE.LineSegments>(null);

    const geo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const size = 20;
        const step = 1.2;
        for (let i = -size; i <= size; i += step) {
            vertices.push(-size, -2.5, i, size, -2.5, i);
            vertices.push(i, -2.5, -size, i, -2.5, size);
        }
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        return g;
    }, []);

    return (
        <lineSegments ref={linesRef} geometry={geo}>
            <lineBasicMaterial color="#C8A84B" transparent opacity={0.06} />
        </lineSegments>
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

export default function BgCanvas() {
    const shapes: Array<{ pos: [number, number, number]; speed: number; size: number; rot: [number, number, number] }> = [
        { pos: [-4.5, 0.8, -3], speed: 0.18, size: 0.55, rot: [1, 0.5, 0] },
        { pos: [4.2, -0.5, -4], speed: 0.14, size: 0.70, rot: [0, 1, 0.3] },
        { pos: [-3, -1.2, 2], speed: 0.22, size: 0.40, rot: [0.5, 0.5, 1] },
        { pos: [3.5, 1.5, 1.5], speed: 0.16, size: 0.45, rot: [1, 0, 0.5] },
        { pos: [0.5, 2.2, -5], speed: 0.12, size: 0.65, rot: [0.3, 1, 0.3] },
        { pos: [-5.5, 0, 0], speed: 0.20, size: 0.35, rot: [1, 1, 0] },
    ];

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 1.5, 7], fov: 60, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.15} />
                <pointLight position={[0, 3, 0]} intensity={3} color="#C8A84B" distance={12} decay={2} />
                <pointLight position={[-5, 2, -5]} intensity={1.5} color="#4040A0" distance={15} decay={2} />
                <pointLight position={[5, -1, 5]} intensity={1.0} color="#1a1a4a" distance={10} decay={2} />

                <Stars radius={60} depth={30} count={3000} factor={3} saturation={0} fade speed={0.4} />
                <GridFloor />
                
                {shapes.map((s, i) => (
                    <FloatingShape key={i} position={s.pos} speed={s.speed} size={s.size} rotAxis={s.rot} />
                ))}

                <ParticleCloud count={2000} />
                
                <CameraRig />
            </Canvas>
        </div>
    );
}
