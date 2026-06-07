'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SmartComponents({ memsRef, powerRef, payloadRef }: any) {
    return (
        <group>
            {/* MEMS Sensor */}
            <group ref={memsRef}>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.1, 0]}>
                    <sphereGeometry args={[0.2, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} />
                    <meshStandardMaterial color="#10B981" transparent opacity={0.8} metalness={0.9} emissive="#10B981" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* Power Cell */}
            <group ref={powerRef}>
                <mesh>
                    <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
                    <meshStandardMaterial color="#F59E0B" />
                </mesh>
            </group>

            {/* Airburst Payload */}
            <group ref={payloadRef}>
                <mesh>
                    <cylinderGeometry args={[0.45, 0.45, 2, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.5} />
                </mesh>
                {/* stylized fragmentation lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <mesh key={i} position={[0, 0, 0]} rotation={[0, i * Math.PI / 3, 0]}>
                        <boxGeometry args={[0.95, 1.9, 0.02]} />
                        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

export default function Prox50Model() {
    const groupRef = useRef<THREE.Group>(null);
    const casingRef = useRef<THREE.Mesh>(null);
    const projectileGroupRef = useRef<THREE.Group>(null);
    const projectileShellRef = useRef<THREE.Mesh>(null);
    
    // Internal refs
    const memsRef = useRef<THREE.Group>(null);
    const powerRef = useRef<THREE.Group>(null);
    const payloadRef = useRef<THREE.Group>(null);
    const flashRef = useRef<THREE.Mesh>(null);

    // Geometries
    const casingGeometry = useMemo(() => {
        const pts = [];
        pts.push(new THREE.Vector2(0, 0));
        pts.push(new THREE.Vector2(1.0, 0));
        pts.push(new THREE.Vector2(1.0, 0.2));
        pts.push(new THREE.Vector2(0.8, 0.2)); // rim groove
        pts.push(new THREE.Vector2(0.8, 0.4));
        pts.push(new THREE.Vector2(0.95, 0.4)); // base of body
        pts.push(new THREE.Vector2(0.85, 6.0)); // taper to shoulder
        pts.push(new THREE.Vector2(0.65, 6.8)); // shoulder
        pts.push(new THREE.Vector2(0.65, 8.0)); // neck
        pts.push(new THREE.Vector2(0.55, 8.0)); // inner wall thickness
        pts.push(new THREE.Vector2(0.55, 6.8));
        pts.push(new THREE.Vector2(0.75, 6.0));
        pts.push(new THREE.Vector2(0.85, 0.4));
        pts.push(new THREE.Vector2(0, 0.4));
        return new THREE.LatheGeometry(pts, 32);
    }, []);

    const projectileGeometry = useMemo(() => {
        const pts = [];
        pts.push(new THREE.Vector2(0.58, 0)); // base
        pts.push(new THREE.Vector2(0.58, 2.5)); // cylindrical part
        
        // Ogive curve for the bullet tip
        const tipHeight = 3.5;
        const segments = 20;
        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const r = 0.58 * Math.pow(1 - t, 0.6); // ogive arc
            const y = 2.5 + t * tipHeight;
            pts.push(new THREE.Vector2(r, y));
        }
        
        // hollow inside
        pts.push(new THREE.Vector2(0, 6.0));
        pts.push(new THREE.Vector2(0, 0));
        return new THREE.LatheGeometry(pts, 32);
    }, []);

    const brassColor = "#c29b4e";
    const copperColor = "#b87333";

    useFrame((state) => {
        if (!groupRef.current || !casingRef.current || !projectileGroupRef.current) return;
        
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const offset = Math.min(Math.max(scrollY / (3 * vh), 0), 1);
        const time = state.clock.getElapsedTime();

        // Target interpolations
        let tPosX = 0, tPosY = -4, tPosZ = 0;
        let tRotX = 0, tRotY = 0, tRotZ = 0;
        
        // Local part targets
        let tProjY = 7.0; // assembled height inside casing
        let tCasingY = 0;
        let tMemsY = 4.0;
        let tPowerY = 1.0;
        let tPayloadY = 2.5;
        let casingOpacity = 1;
        let shellOpacity = 1;

        if (offset < 0.33) {
            // PHASE 1: DISASSEMBLED
            const t = offset / 0.33; // 0 to 1
            const invT = 1 - Math.pow(t, 2); // ease out
            
            // Explode upwards
            tCasingY = -2 - (invT * 10);
            tProjY = 7.0 + (invT * 8);
            tMemsY = 4.0 + (invT * 18);
            tPowerY = 1.0 + (invT * 14);
            tPayloadY = 2.5 + (invT * 16);
            
            // Shell is highly transparent so we see parts flying in
            shellOpacity = THREE.MathUtils.lerp(0.1, 1, t);

            // Global layout
            tPosX = THREE.MathUtils.lerp(3, -4, t);
            tRotX = Math.PI / 8;
            tRotY = time * 0.5; // spin to show it off

            flashRef.current!.visible = false;

        } else if (offset < 0.66) {
            // PHASE 2: ASSEMBLED
            const t = (offset - 0.33) / 0.33;
            
            tCasingY = 0;
            tProjY = 7.0;
            tMemsY = 4.0;
            tPowerY = 1.0;
            tPayloadY = 2.5;

            shellOpacity = 1;

            tPosX = THREE.MathUtils.lerp(-4, 4, t);
            tRotX = THREE.MathUtils.lerp(Math.PI / 8, Math.PI / 3, t); // tilt forward like a missile
            tRotY = THREE.MathUtils.lerp(0, Math.PI / 4, t);

            flashRef.current!.visible = false;

        } else {
            // PHASE 3: LAUNCH
            const t = (offset - 0.66) / 0.34; // 0 to 1
            
            tProjY = 7.0;
            // Casing ejects backwards/downwards
            tCasingY = -t * 30;
            casingOpacity = 1 - t*2; // fade out quickly

            // The projectile is now the hero. We want it centered and pointing across the screen.
            // Move group so projectile tip is centered.
            tPosX = THREE.MathUtils.lerp(4, 0, t);
            tPosY = -4 + t * 4; // lift up so projectile centers
            tPosZ = t * 10; // fly forward slightly towards camera
            
            tRotX = Math.PI / 2.2; // pointed almost horizontally
            tRotY = time * 8; // spinning extremely fast like a rifled bullet!

            // Muzzle Flash
            if (t > 0.05 && t < 0.2) {
                flashRef.current!.visible = true;
                const f = (t - 0.05) / 0.15;
                flashRef.current!.scale.setScalar(1 + f * 3);
                (flashRef.current!.material as any).opacity = 1 - f;
            } else {
                flashRef.current!.visible = false;
            }
        }

        // Apply Global
        groupRef.current.position.lerp(new THREE.Vector3(tPosX, tPosY, tPosZ), 0.1);
        // Only lerp X and Y rotations if not spinning wildly
        if (offset >= 0.66) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tRotX, 0.1);
            groupRef.current.rotation.y = tRotY; // pure spin
        } else {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tRotX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, tRotY, 0.1);
        }

        // Apply Locals
        casingRef.current.position.y = THREE.MathUtils.lerp(casingRef.current.position.y, tCasingY, 0.1);
        (casingRef.current.material as any).opacity = THREE.MathUtils.lerp((casingRef.current.material as any).opacity, Math.max(0, casingOpacity), 0.2);
        (casingRef.current.material as any).transparent = casingOpacity < 1;

        projectileGroupRef.current.position.y = THREE.MathUtils.lerp(projectileGroupRef.current.position.y, tProjY, 0.2);
        (projectileShellRef.current!.material as any).opacity = shellOpacity;
        (projectileShellRef.current!.material as any).transparent = shellOpacity < 1;

        memsRef.current!.position.y = THREE.MathUtils.lerp(memsRef.current!.position.y, tMemsY, 0.1);
        powerRef.current!.position.y = THREE.MathUtils.lerp(powerRef.current!.position.y, tPowerY, 0.1);
        payloadRef.current!.position.y = THREE.MathUtils.lerp(payloadRef.current!.position.y, tPayloadY, 0.1);
    });

    return (
        <group ref={groupRef}>
            
            {/* BRASS CASING */}
            <mesh ref={casingRef} geometry={casingGeometry}>
                <meshStandardMaterial color={brassColor} metalness={0.8} roughness={0.3} />
            </mesh>

            {/* MUZZLE FLASH (At the mouth of the casing) */}
            <mesh ref={flashRef} position={[0, 8, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[3, 6, 16]} />
                <meshBasicMaterial color="#F59E0B" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            {/* PROJECTILE & INTERNALS */}
            <group ref={projectileGroupRef}>
                {/* The Copper Jacket */}
                <mesh ref={projectileShellRef} geometry={projectileGeometry}>
                    <meshStandardMaterial color={copperColor} metalness={0.7} roughness={0.4} />
                </mesh>

                {/* The Smart Innards */}
                <SmartComponents memsRef={memsRef} powerRef={powerRef} payloadRef={payloadRef} />
            </group>

        </group>
    );
}
