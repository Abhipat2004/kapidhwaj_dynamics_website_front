'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// The new 3D Tactical Radar System
function RadarSystem() {
    const sweepRef = useRef<THREE.Mesh>(null);
    const blipRefs = useRef<(THREE.Mesh | null)[]>([]);

    // Tactical Target Data (Drones/Threats)
    const targets = useMemo(() => [
        { r: 3, theta: 0.5 },
        { r: 6, theta: 2.1 },
        { r: 8, theta: 3.8 },
        { r: 4, theta: 5.2 },
        { r: 9, theta: 6.0 },
    ], []);

    const sweepSpeed = 2.0;

    useFrame(({ clock }) => {
        if (!sweepRef.current) return;
        
        const time = clock.getElapsedTime();
        const currentAngle = (time * sweepSpeed) % (Math.PI * 2);
        
        // Rotate the radar sweep clockwise
        sweepRef.current.rotation.z = -currentAngle;

        // Animate the targets fading in as the sweep hits them
        blipRefs.current.forEach((blip, i) => {
            if (!blip) return;
            const target = targets[i];
            
            // Normalize angles to 0-2PI
            const normalize = (a: number) => (a % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            
            // The leading edge of the pie slice (which spans from 0 to -PI/4 locally)
            const nSweep = normalize(-currentAngle);
            const nTarget = normalize(target.theta);
            
            // Calculate how far the sweep has moved past the target (0 to 2PI)
            let age = nSweep - nTarget;
            if (age < 0) age += Math.PI * 2;
            
            // Phosphor decay logic: highest brightness right after pass, fading quickly
            let intensity = 0;
            if (age < 1.5) { // 1.5 radians of fade trail
                intensity = Math.pow(1.0 - (age / 1.5), 2); // Non-linear decay for realism
            }
            
            const mat = blip.material as THREE.MeshBasicMaterial;
            mat.opacity = intensity * 0.8; // Max 80% opacity
            blip.scale.setScalar(1 + intensity * 2);
        });
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            
            {/* The Holographic Polar Grid (Cyan) */}
            <polarGridHelper args={[15, 24, 12, '#40cedc', '#103542']} />

            {/* Central Emitter / Dish */}
            <mesh position={[0, 0, 0.1]}>
                <circleGeometry args={[0.5, 32]} />
                <meshBasicMaterial color="#C8A84B" transparent opacity={0.6} />
            </mesh>

            {/* The Radar Sweep Cone (Gold) */}
            <mesh ref={sweepRef} position={[0, 0, 0.05]}>
                {/* args: radius, segments, thetaStart, thetaLength */}
                <circleGeometry args={[15, 64, 0, Math.PI / 4]} />
                <meshBasicMaterial 
                    color="#C8A84B" 
                    transparent 
                    opacity={0.15} 
                    blending={THREE.AdditiveBlending} 
                    depthWrite={false} 
                    side={THREE.DoubleSide} 
                />
            </mesh>

            {/* The Detected Targets (Red Blips) */}
            {targets.map((t, i) => (
                <mesh 
                    key={i}
                    ref={(el) => { blipRefs.current[i] = el; }}
                    position={[Math.cos(t.theta) * t.r, Math.sin(t.theta) * t.r, 0.1]}
                >
                    <circleGeometry args={[0.2, 16]} />
                    <meshBasicMaterial 
                        color="#EF4444" 
                        transparent 
                        opacity={0} 
                        blending={THREE.AdditiveBlending} 
                    />
                </mesh>
            ))}

        </group>
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
        target.current.x += (mouse.current.x * 2 - target.current.x) * 0.04;
        target.current.y += (mouse.current.y * 1 - target.current.y) * 0.04;
        
        // Tactical Top-Down Angle
        camera.position.x = target.current.x;
        camera.position.y = 8 + target.current.y * 2;
        camera.position.z = 12;
        
        // Look at the center of the radar
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <RadarSystem />
            <CameraRig />
        </>
    );
}

export default function HeroScene3D() {
    return (
        <Canvas
            camera={{ position: [0, 8, 12], fov: 50, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            dpr={[1, 1.5]}
        >
            <Scene />
            <EffectComposer>
                <Bloom
                    intensity={1.8}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.8}
                    blendFunction={BlendFunction.ADD}
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={new THREE.Vector2(0.001, 0.001)}
                    radialModulation={false}
                    modulationOffset={0}
                />
            </EffectComposer>
        </Canvas>
    );
}
