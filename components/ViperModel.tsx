'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function N20Motor({ innerRef, position, rotation }: any) {
    return (
        <group ref={innerRef} position={position} rotation={rotation}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.6, 0.24]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
                <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    );
}

function STM32({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <boxGeometry args={[1.2, 0.1, 1.2]} />
                <meshStandardMaterial color="#10b981" metalness={0.2} roughness={0.8} /> {/* Green PCB */}
            </mesh>
            <mesh position={[0, 0.08, 0]}>
                <boxGeometry args={[0.6, 0.05, 0.6]} />
                <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} /> {/* Black Chip */}
            </mesh>
        </group>
    );
}

function ExplosivePayload({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <cylinderGeometry args={[1.1, 1.1, 1.8, 32]} />
                <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1.12, 1.12, 0.2, 32]} />
                <meshStandardMaterial color="#fcd34d" metalness={0.2} roughness={0.9} /> {/* Yellow stripe */}
            </mesh>
        </group>
    );
}

function ProximitySwitch({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
                <torusGeometry args={[0.8, 0.05, 16, 32]} />
                <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

function SpadSensor({ innerRef }: any) {
    return (
        <group ref={innerRef}>
            <mesh>
                <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.26, 0]}>
                <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} metalness={1} roughness={0} />
            </mesh>
        </group>
    );
}

export default function ViperModel() {
    const groupRef = useRef<THREE.Group>(null);
    const shellMatRef = useRef<THREE.MeshStandardMaterial>(null);
    
    // Internal component refs
    const stmRef = useRef<THREE.Group>(null);
    const payloadRef = useRef<THREE.Group>(null);
    const proxRef = useRef<THREE.Group>(null);
    const spadRef = useRef<THREE.Group>(null);
    const motorsRef = useRef<(THREE.Group | null)[]>([]);

    const brassColor = "#b48c36";

    // Engine/Motors assembly data
    const motorsData = useMemo(() => {
        return [
            { a: [0.8, 1, 0], e: [15, 5, 0] },
            { a: [-0.8, 1, 0], e: [-15, 5, 0] },
            { a: [0, 1, 0.8], e: [0, 5, 15] },
            { a: [0, 1, -0.8], e: [0, 5, -15] }
        ];
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

        // Interpolate internals
        if (payloadRef.current) {
            payloadRef.current.position.lerpVectors(new THREE.Vector3(-10, -10, -5), new THREE.Vector3(0, 2.5, 0), aT);
            payloadRef.current.rotation.set(THREE.MathUtils.lerp(Math.PI, 0, aT), THREE.MathUtils.lerp(Math.PI, 0, aT), 0);
        }
        if (stmRef.current) {
            stmRef.current.position.lerpVectors(new THREE.Vector3(12, 5, 10), new THREE.Vector3(0, 1.2, 0), aT);
            stmRef.current.rotation.set(THREE.MathUtils.lerp(-Math.PI, 0, aT), THREE.MathUtils.lerp(Math.PI*2, 0, aT), 0);
        }
        if (proxRef.current) {
            proxRef.current.position.lerpVectors(new THREE.Vector3(5, 15, -10), new THREE.Vector3(0, 4, 0), aT);
            proxRef.current.rotation.set(THREE.MathUtils.lerp(Math.PI/2, 0, aT), 0, THREE.MathUtils.lerp(Math.PI, 0, aT));
        }
        if (spadRef.current) {
            spadRef.current.position.lerpVectors(new THREE.Vector3(0, 20, 0), new THREE.Vector3(0, 6.2, 0), aT);
        }

        motorsData.forEach((data, i) => {
            const m = motorsRef.current[i];
            if (m) {
                m.position.lerpVectors(new THREE.Vector3(...data.e), new THREE.Vector3(...data.a), aT);
                m.rotation.set(THREE.MathUtils.lerp(Math.PI * i, 0, aT), THREE.MathUtils.lerp(Math.PI * 2, 0, aT), 0);
            }
        });

        // Shell Transparency
        if (shellMatRef.current) {
            shellMatRef.current.transparent = aT < 1;
            shellMatRef.current.opacity = THREE.MathUtils.lerp(0.15, 1, aT);
        }

        // 2. Global Rotation & Dodging Logic
        let targetRotY = 0;
        let targetRotX = 0;
        let targetPosZ = 0;
        let targetPosY = 0;
        let targetPosX = 0;

        if (offset < 0.33) {
            const t = offset / 0.33;
            targetRotY = THREE.MathUtils.lerp(-Math.PI / 4 + time*0.1, 0, t);
            targetRotX = THREE.MathUtils.lerp(Math.PI / 8, Math.PI / 16, t);
            targetPosZ = THREE.MathUtils.lerp(0, 0, t);
            targetPosY = THREE.MathUtils.lerp(-5.5, -5.5, t); 
            targetPosX = THREE.MathUtils.lerp(4, -4, t);
        } else if (offset < 0.66) {
            const t = (offset - 0.33) / 0.33;
            targetRotY = THREE.MathUtils.lerp(0, Math.PI / 4, t);
            targetRotX = THREE.MathUtils.lerp(Math.PI / 16, Math.PI / 6, t);
            targetPosZ = THREE.MathUtils.lerp(0, 0, t);
            targetPosY = THREE.MathUtils.lerp(-5.5, -5, t);
            targetPosX = THREE.MathUtils.lerp(-4, 4, t);
        } else {
            const t = (offset - 0.66) / 0.34;
            targetRotY = THREE.MathUtils.lerp(Math.PI / 4, Math.PI / 2 + time * 0.5, t); 
            targetRotX = THREE.MathUtils.lerp(Math.PI / 6, Math.PI / 2.5, t); 
            targetPosZ = THREE.MathUtils.lerp(0, -12, t); 
            targetPosY = THREE.MathUtils.lerp(-5, -2, t);
            targetPosX = THREE.MathUtils.lerp(4, 0, t);
        }

        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.1);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.1);
    });

    const canardGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0); 
        shape.lineTo(0.6, 0); 
        // Curve from Tip bottom up to Root top (y=4, where the cone starts)
        shape.quadraticCurveTo(0.6, 3, 0, 4); 
        shape.lineTo(0, 0); 

        const extrudeSettings = { 
            depth: 0.04, 
            bevelEnabled: true, 
            bevelThickness: 0.01, 
            bevelSize: 0.01, 
            bevelSegments: 2 
        };
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geo.center(); 
        return geo;
    }, []);

    // Curved/Arc Nose Geometry (Lathe)
    const noseGeometry = useMemo(() => {
        const points = [];
        const segments = 32;
        const noseHeight = 6; // 1.5x the cylinder height (4 * 1.5)
        const baseRadius = 1.5;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments; 
            // Creates a convex curve (arc) tapering to a point
            const r = baseRadius * Math.pow(1 - t, 0.65); 
            const y = t * noseHeight; 
            points.push(new THREE.Vector2(r, y));
        }
        
        return new THREE.LatheGeometry(points, 32);
    }, []);

    return (
        <group ref={groupRef}>
            
            {/* --- INTERNAL COMPONENTS --- */}
            <STM32 innerRef={stmRef} />
            <ExplosivePayload innerRef={payloadRef} />
            <ProximitySwitch innerRef={proxRef} />
            <SpadSensor innerRef={spadRef} />
            
            {motorsData.map((_, i) => (
                <N20Motor key={i} innerRef={(el: any) => { motorsRef.current[i] = el; }} />
            ))}

            {/* --- OUTER SHELL --- */}
            {/* Base Cylinder (Tapered: slimmer at the bottom) */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[1.5, 1.35, 4, 32]} />
                <meshStandardMaterial ref={shellMatRef} color={brassColor} metalness={0.9} roughness={0.3} />
            </mesh>

            {/* Nose Cone (Curved Ogive Profile) */}
            {/* Starts exactly at the top of the cylinder (y=4) */}
            <mesh position={[0, 4, 0]} geometry={noseGeometry}>
                <meshStandardMaterial ref={shellMatRef} color={brassColor} metalness={0.9} roughness={0.3} transparent opacity={1} />
            </mesh>

            {/* 4 Ogive Canards / Tail Fins */}
            {Array.from({ length: 4 }).map((_, i) => {
                const angle = i * Math.PI / 2;
                // At y=2 (midpoint of cylinder), the radius is ~1.425. Half fin width is ~0.3. 
                // So position distance = 1.425 + 0.3 = 1.725
                const distance = 1.725; 
                return (
                    <mesh 
                        key={i} 
                        position={[Math.cos(angle) * distance, 2, Math.sin(angle) * distance]} 
                        rotation={[0, -angle, 0]}
                        geometry={canardGeometry}
                    >
                        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
                    </mesh>
                );
            })}
            
        </group>
    );
}
