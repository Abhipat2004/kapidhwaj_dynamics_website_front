'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EagleEyeModel() {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const barrelPivotRef = useRef<THREE.Group>(null);
    const gearRef = useRef<THREE.Mesh>(null);
    const ammoRef = useRef<THREE.Group>(null);
    const muzzleFlashRef = useRef<THREE.Mesh>(null);

    // Bright Titanium & Gunmetal Tactical Palette for better visibility against dark background
    const baseMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.6, roughness: 0.5 }), []); 
    const armorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.5, roughness: 0.3, flatShading: true }), []); 
    const barrelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9, roughness: 0.2 }), []); 
    const gearMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.8, roughness: 0.4 }), []); 
    const ammoMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#EF4444', emissive: '#EF4444', emissiveIntensity: 0.5 }), []);
    const flashMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fca5a5', transparent: true, opacity: 0 }), []);

    useFrame((state) => {
        if (!groupRef.current || !headRef.current || !barrelPivotRef.current || !gearRef.current || !ammoRef.current || !muzzleFlashRef.current) return;
        
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const offset = Math.min(Math.max(scrollY / (3 * vh), 0), 1);
        const time = state.clock.getElapsedTime();

        // 1. Global Positioning & Camera Trickery
        let targetRotY = 0;
        let targetRotX = 0;
        let targetPosZ = 0;
        let targetPosY = 0;
        let targetPosX = 0;

        if (offset < 0.25) {
            // PHASE 1: Looking down the barrel
            const t = offset / 0.25; // 0 to 1
            // At offset 0, we want the model pulled way forward so the camera is looking straight down the barrels
            targetPosZ = THREE.MathUtils.lerp(18, 0, Math.pow(t, 2)); // Ease out
            targetPosY = THREE.MathUtils.lerp(-4, -2, t);
            targetPosX = THREE.MathUtils.lerp(2, -5, t); 
            targetRotY = THREE.MathUtils.lerp(-0.05, Math.PI / 6, t); 
            targetRotX = THREE.MathUtils.lerp(-0.05, Math.PI / 12, t);
            
            // Turret is idle
            headRef.current.rotation.y = 0;
            barrelPivotRef.current.rotation.x = 0;
            ammoRef.current.visible = false;
            muzzleFlashRef.current.material.opacity = 0;
            gearRef.current.rotation.y = time * 0.5;
            
        } else if (offset < 0.5) {
            // PHASE 2: Pullback & Scanning
            const t = (offset - 0.25) / 0.25;
            targetPosZ = 0;
            targetPosY = -2;
            targetPosX = THREE.MathUtils.lerp(-5, 5, t); // Slide left to right
            targetRotY = THREE.MathUtils.lerp(Math.PI / 6, -Math.PI / 8, t);
            targetRotX = Math.PI / 12;

            // Turret actively scanning
            headRef.current.rotation.y = Math.sin(time * 1.5) * 0.5;
            barrelPivotRef.current.rotation.x = Math.sin(time * 2) * 0.2 + 0.1;
            gearRef.current.rotation.y = headRef.current.rotation.y;
            ammoRef.current.visible = false;
            muzzleFlashRef.current.material.opacity = 0;

        } else if (offset < 0.75) {
            // PHASE 3: Ammo Launch
            const t = (offset - 0.5) / 0.25;
            targetPosZ = 0;
            targetPosY = -2;
            targetPosX = THREE.MathUtils.lerp(5, -4, t); // Slide back to left
            targetRotY = -Math.PI / 8; // Hold angle to fire across screen
            targetRotX = Math.PI / 12;

            // Turret locks on
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.PI / 4, 0.1);
            barrelPivotRef.current.rotation.x = THREE.MathUtils.lerp(barrelPivotRef.current.rotation.x, 0.1, 0.1);
            gearRef.current.rotation.y = headRef.current.rotation.y;

            // Firing sequence (loops based on time or scroll, let's use scroll t)
            // Fire at t = 0.3
            if (t > 0.3 && t < 0.8) {
                const fireProgress = (t - 0.3) / 0.5; // 0 to 1 during the flight
                ammoRef.current.visible = true;
                // Move ammo down the barrel Z axis
                ammoRef.current.position.z = 10 + fireProgress * 150; // shoot far away
                
                // Muzzle flash
                if (fireProgress < 0.1) {
                    muzzleFlashRef.current.material.opacity = 1 - (fireProgress * 10);
                    muzzleFlashRef.current.scale.setScalar(1 + fireProgress * 5);
                } else {
                    muzzleFlashRef.current.material.opacity = 0;
                }
            } else {
                ammoRef.current.visible = false;
                muzzleFlashRef.current.material.opacity = 0;
                ammoRef.current.position.z = 10; // reset
            }

        } else {
            // PHASE 4: Specs
            const t = (offset - 0.75) / 0.25;
            targetPosZ = THREE.MathUtils.lerp(0, -15, t);
            targetPosY = THREE.MathUtils.lerp(-2, -4, t);
            targetPosX = THREE.MathUtils.lerp(-4, 0, t);
            targetRotY = THREE.MathUtils.lerp(-Math.PI / 8, -Math.PI / 4 + time * 0.2, t);
            targetRotX = Math.PI / 12;

            ammoRef.current.visible = false;
            muzzleFlashRef.current.material.opacity = 0;
            headRef.current.rotation.y = 0;
            gearRef.current.rotation.y = time * 0.2;
        }

        // Apply smooth interpolation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.1);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.1);
    });

    return (
        <group ref={groupRef}>
            
            {/* STATIC BASE */}
            <group position={[0, -3, 0]}>
                {/* Main trapezoid base */}
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    {/* args: radiusTop, radiusBottom, height, radialSegments */}
                    <cylinderGeometry args={[3.5, 5, 4, 4]} />
                    <primitive object={baseMat} />
                </mesh>
                {/* Details on base */}
                <mesh position={[0, 0, 4.8]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[2, 1, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[-2.5, 0, 3.8]} rotation={[0, -Math.PI/6, 0]}>
                    <boxGeometry args={[1.5, 0.8, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[2.5, 0, 3.8]} rotation={[0, Math.PI/6, 0]}>
                    <boxGeometry args={[1.5, 0.8, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            </group>

            {/* ROTATING GEAR ASSEMBLY */}
            <mesh ref={gearRef} position={[0, -0.5, 0]}>
                <cylinderGeometry args={[2.5, 2.5, 1, 24]} />
                <primitive object={gearMat} />
                {/* Gear teeth */}
                {Array.from({ length: 24 }).map((_, i) => (
                    <mesh key={i} position={[Math.cos(i * Math.PI / 12) * 2.5, 0, Math.sin(i * Math.PI / 12) * 2.5]} rotation={[0, -i * Math.PI / 12, 0]}>
                        <boxGeometry args={[0.2, 1, 0.4]} />
                        <primitive object={gearMat} />
                    </mesh>
                ))}
            </mesh>

            {/* TURRET HEAD (Pans) */}
            <group ref={headRef} position={[0, 1.5, 0]}>
                
                {/* Lower armored saucer */}
                <mesh position={[0, 0, 0]}>
                    {/* Octagonal bottom */}
                    <cylinderGeometry args={[6, 3, 3, 8]} />
                    <primitive object={armorMat} />
                </mesh>

                {/* Upper armored saucer */}
                <mesh position={[0, 2.5, 0]}>
                    {/* Octagonal top */}
                    <cylinderGeometry args={[4.5, 6, 2, 8]} />
                    <primitive object={armorMat} />
                </mesh>

                {/* Top hatch/radar */}
                <mesh position={[0, 3.6, 0]}>
                    <cylinderGeometry args={[2, 4, 0.5, 16]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.6} />
                </mesh>

                {/* BARREL PIVOT (Tilts) */}
                <group ref={barrelPivotRef} position={[0, 2, 4]}>
                    
                    {/* Pivot Box */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2, 1.5, 2]} />
                        <primitive object={barrelMat} />
                    </mesh>

                    {/* Dual Barrels */}
                    {/* Left Barrel */}
                    <mesh position={[-0.5, 0, 6]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.25, 0.3, 12, 16]} />
                        <primitive object={barrelMat} />
                    </mesh>
                    {/* Right Barrel */}
                    <mesh position={[0.5, 0, 6]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.25, 0.3, 12, 16]} />
                        <primitive object={barrelMat} />
                    </mesh>

                    {/* Barrel Brackets */}
                    <mesh position={[0, 0, 4]}>
                        <boxGeometry args={[1.8, 0.8, 1]} />
                        <primitive object={armorMat} />
                    </mesh>
                    <mesh position={[0, 0, 8]}>
                        <boxGeometry args={[1.6, 0.6, 0.8]} />
                        <primitive object={armorMat} />
                    </mesh>

                    {/* MUZZLE FLASH */}
                    <mesh ref={muzzleFlashRef} position={[0, 0, 12]} rotation={[Math.PI/2, 0, 0]}>
                        <coneGeometry args={[1, 2, 8]} />
                        <primitive object={flashMat} />
                    </mesh>

                    {/* AMMUNITION (Hidden until fire) */}
                    <group ref={ammoRef} position={[0, 0, 10]}>
                        <mesh rotation={[Math.PI/2, 0, 0]}>
                            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
                            <primitive object={ammoMat} />
                        </mesh>
                        {/* Ammo trail */}
                        <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]}>
                            <cylinderGeometry args={[0.05, 0.2, 2, 8]} />
                            <meshBasicMaterial color="#EF4444" transparent opacity={0.6} />
                        </mesh>
                    </group>

                </group>

            </group>

        </group>
    );
}
