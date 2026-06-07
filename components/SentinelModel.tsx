'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

function SpringAntenna({ position, radius, height, coils, thickness, color }: any) {
    const points = useMemo(() => {
        const pts = [];
        const segments = 40; // points per coil
        const totalPoints = coils * segments;
        for (let i = 0; i <= totalPoints; i++) {
            const t = i / totalPoints;
            const angle = t * Math.PI * 2 * coils;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = t * height;
            pts.push(new THREE.Vector3(x, y, z));
        }
        return new THREE.CatmullRomCurve3(pts);
    }, [radius, height, coils]);

    return (
        <group position={position}>
            <mesh position={[0, -height * 0.1, 0]}>
                <cylinderGeometry args={[thickness * 0.8, thickness * 0.8, height * 0.2, 8]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.4} />
            </mesh>
            <mesh>
                <tubeGeometry args={[points, coils * 30, thickness, 8, false]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.4} />
            </mesh>
        </group>
    );
}

function JetsonOrin({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <boxGeometry args={[3, 0.8, 2.5]} />
                <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Heatsink ridges */}
            {Array.from({ length: 6 }).map((_, i) => (
                <mesh key={i} position={[-1 + i * 0.4, 0.45, 0]}>
                    <boxGeometry args={[0.1, 0.2, 2.4]} />
                    <meshStandardMaterial color="#334155" metalness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

function SDRModule({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <boxGeometry args={[2, 0.5, 1.5]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Connectors */}
            <mesh position={[1.05, 0, 0.4]} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
                <meshStandardMaterial color="#C8A84B" metalness={1} />
            </mesh>
            <mesh position={[1.05, 0, -0.4]} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
                <meshStandardMaterial color="#C8A84B" metalness={1} />
            </mesh>
        </group>
    );
}

export default function SentinelModel() {
    const groupRef = useRef<THREE.Group>(null);
    const jetsonRef = useRef<THREE.Group>(null);
    const sdrRef = useRef<THREE.Group>(null);
    const chassisMatRef = useRef<THREE.MeshStandardMaterial>(null);
    const antennasRef = useRef<(THREE.Group | null)[]>([]);

    const gridTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#1e293b'; 
        ctx.fillRect(0, 0, 1024, 256);
        
        ctx.fillStyle = '#020617'; 
        const cols = 60;
        const rows = 15;
        const spacingX = 1024 / cols;
        const spacingY = 256 / rows;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                ctx.beginPath();
                const x = c * spacingX + (r % 2 === 0 ? spacingX / 2 : 0);
                const y = r * spacingY + spacingY / 2;
                ctx.arc(x, y, spacingX * 0.35, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }, []);

    const blockWidth = 12;
    const blockHeight = 3;
    const blockDepth = 4;

    const antennasData = useMemo(() => {
        const arr = [];
        const count = 13;
        const spacing = (blockWidth - 1) / count;
        for (let i = 0; i < count; i++) {
            arr.push({
                x: -blockWidth/2 + 0.5 + i * spacing,
                z: (i % 2 === 0 ? 0.6 : -0.6) + (Math.random() * 0.4 - 0.2),
                h: 2.5 + Math.random() * 3.5,
                c: 12 + Math.floor(Math.random() * 15),
                explodedPos: new THREE.Vector3((Math.random() - 0.5) * 30, 10 + Math.random() * 15, (Math.random() - 0.5) * 30),
                explodedRot: new THREE.Euler(Math.random() * Math.PI * 4, Math.random() * Math.PI * 4, Math.random() * Math.PI * 4)
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const offset = Math.min(Math.max(scrollY / (3 * vh), 0), 1);
        const time = state.clock.getElapsedTime();

        // 1. Assembly Logic (0 to 0.25 offset)
        const assemblyProgress = Math.min(offset / 0.25, 1);
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const aT = easeInOut(assemblyProgress);

        if (jetsonRef.current) {
            jetsonRef.current.position.lerpVectors(new THREE.Vector3(-15, 8, 8), new THREE.Vector3(-1.5, 0, 0), aT);
            jetsonRef.current.rotation.set(THREE.MathUtils.lerp(Math.PI, 0, aT), THREE.MathUtils.lerp(-Math.PI/2, 0, aT), 0);
        }
        if (sdrRef.current) {
            sdrRef.current.position.lerpVectors(new THREE.Vector3(15, -8, -8), new THREE.Vector3(2.5, -0.5, 0), aT);
            sdrRef.current.rotation.set(THREE.MathUtils.lerp(-Math.PI, 0, aT), THREE.MathUtils.lerp(Math.PI/2, 0, aT), 0);
        }

        antennasData.forEach((data, i) => {
            const ant = antennasRef.current[i];
            if (ant) {
                ant.position.lerpVectors(data.explodedPos, new THREE.Vector3(data.x, blockHeight / 2, data.z), aT);
                ant.rotation.set(
                    THREE.MathUtils.lerp(data.explodedRot.x, 0, aT),
                    THREE.MathUtils.lerp(data.explodedRot.y, 0, aT),
                    THREE.MathUtils.lerp(data.explodedRot.z, 0, aT)
                );
            }
        });

        if (chassisMatRef.current) {
            chassisMatRef.current.transparent = aT < 1;
            chassisMatRef.current.opacity = THREE.MathUtils.lerp(0.15, 1, aT);
        }

        // 2. Global Rotation & Dodging Logic
        let targetRotY = 0;
        let targetRotX = 0;
        let targetPosZ = 0;
        let targetPosY = 0;
        let targetPosX = 0;

        if (offset < 0.33) {
            const t = offset / 0.33;
            targetRotY = THREE.MathUtils.lerp(-Math.PI / 6 + Math.sin(time*0.5)*0.1, 0, t);
            targetRotX = THREE.MathUtils.lerp(Math.PI / 12, 0, t);
            targetPosZ = THREE.MathUtils.lerp(-2, 2, t);
            targetPosY = THREE.MathUtils.lerp(0, 0, t);
            targetPosX = THREE.MathUtils.lerp(4, -4, t); // Move Right to Left
        } else if (offset < 0.66) {
            const t = (offset - 0.33) / 0.33;
            targetRotY = THREE.MathUtils.lerp(0, Math.PI / 8, t);
            targetRotX = THREE.MathUtils.lerp(0, Math.PI / 5, t);
            targetPosZ = THREE.MathUtils.lerp(2, 0, t);
            targetPosY = THREE.MathUtils.lerp(0, -1.5, t);
            targetPosX = THREE.MathUtils.lerp(-4, 4, t); // Move Left to Right
        } else {
            const t = (offset - 0.66) / 0.34;
            targetRotY = THREE.MathUtils.lerp(Math.PI / 8, Math.PI / 8 + time * 0.2, t);
            targetRotX = THREE.MathUtils.lerp(Math.PI / 5, Math.PI / 8, t);
            targetPosZ = THREE.MathUtils.lerp(0, -8, t);
            targetPosY = THREE.MathUtils.lerp(-1.5, 0, t);
            targetPosX = THREE.MathUtils.lerp(4, 0, t); // Move Right to Center
        }

        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.1);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.1);
    });

    return (
        <group ref={groupRef}>
            {/* Internal Components */}
            <JetsonOrin innerRef={jetsonRef} />
            <SDRModule innerRef={sdrRef} />

            {/* Chassis */}
            <mesh>
                <boxGeometry args={[blockWidth, blockHeight, blockDepth]} />
                <meshStandardMaterial ref={chassisMatRef} color="#475569" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Front Face Grid */}
            <mesh position={[0, 0, blockDepth / 2 + 0.01]}>
                <planeGeometry args={[blockWidth, blockHeight]} />
                <meshStandardMaterial map={gridTexture} metalness={0.5} roughness={0.5} transparent opacity={0.9} />
            </mesh>

            {/* Antennas */}
            {antennasData.map((ant, i) => (
                <group key={i} ref={el => { antennasRef.current[i] = el; }}>
                    <SpringAntenna 
                        position={[0, 0, 0]} // Position handled by useFrame lerp
                        radius={0.15}
                        height={ant.h}
                        coils={ant.c}
                        thickness={0.03}
                        color={i % 3 === 0 ? '#C8A84B' : '#94A3B8'} 
                    />
                </group>
            ))}
        </group>
    );
}
