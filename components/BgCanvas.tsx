'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

function RadarSystem() {
    const groupRef = useRef<THREE.Group>(null);
    const gridRef = useRef<THREE.LineSegments>(null);
    const dishRef = useRef<THREE.Mesh>(null);
    const sweepRef = useRef<THREE.Group>(null);
    const blipRefs = useRef<(THREE.Group | null)[]>([]);
    
    // Scroll tracking target
    const scrollTarget = useRef({ x: 0, y: 0, rotX: -Math.PI / 2 - 0.25, rotY: 0 });

    const radarColor = '#00ff44'; // Bright green for the main crosshair
    const radarDarkColor = '#00aa33'; // Brighter secondary color so circular rings are ACTUALLY visible
    const targetColor = '#ffffff'; 
    const bracketColor = '#00ff44'; 

    // Tactical Target Data
    const targets = useMemo(() => [
        { r: 4, theta: 0.5 },
        { r: 7, theta: 2.1 },
        { r: 10, theta: 3.8 },
        { r: 5, theta: 5.2 },
        { r: 12, theta: 6.0 },
        { r: 14, theta: 1.2 }, 
        { r: 8, theta: 4.5 },
    ], []);

    const sweepSpeed = 1.5;
    const slices = 40;
    const sweepAngle = Math.PI / 3; // 60 degrees

    useEffect(() => {
        if (gridRef.current) {
            const mat = gridRef.current.material as THREE.LineBasicMaterial;
            mat.transparent = true;
            mat.opacity = 0.25; // High enough opacity to see the circular rings
        }
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current || !gridRef.current || !dishRef.current || !sweepRef.current) return;
        
        const time = clock.getElapsedTime();
        
        // --- 1. Assembly Animation ---
        const progress = Math.min(time / 2.0, 1.0);
        const ease = 1 - Math.pow(1 - progress, 3);

        gridRef.current.position.z = THREE.MathUtils.lerp(-20, 0, ease);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, ease));

        // --- 2. Cinematic Scroll Choreography ---
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        const CONSTANT_TILT = -Math.PI / 2 - 0.25;

        if (scrollProgress < 0.2) {
            // Hero
            const t = scrollProgress / 0.2;
            scrollTarget.current.x = THREE.MathUtils.lerp(0, 18, t);
            scrollTarget.current.y = THREE.MathUtils.lerp(0, -5, t);
            scrollTarget.current.rotY = THREE.MathUtils.lerp(0, -0.1, t);
            scrollTarget.current.rotX = CONSTANT_TILT;
        } else if (scrollProgress < 0.5) {
            // Products -> Tech
            const t = (scrollProgress - 0.2) / 0.3;
            scrollTarget.current.x = THREE.MathUtils.lerp(18, -18, t);
            scrollTarget.current.y = THREE.MathUtils.lerp(-5, 5, t);
            scrollTarget.current.rotY = THREE.MathUtils.lerp(-0.1, 0.1, t);
            scrollTarget.current.rotX = CONSTANT_TILT;
        } else if (scrollProgress < 0.8) {
            // Tech -> Stats
            const t = (scrollProgress - 0.5) / 0.3;
            scrollTarget.current.x = THREE.MathUtils.lerp(-18, 0, t);
            scrollTarget.current.y = THREE.MathUtils.lerp(5, -15, t);
            scrollTarget.current.rotY = THREE.MathUtils.lerp(0.1, 0, t);
            scrollTarget.current.rotX = CONSTANT_TILT;
        } else {
            // Footer (Center and swoop)
            const t = (scrollProgress - 0.8) / 0.2;
            scrollTarget.current.x = 0;
            scrollTarget.current.y = THREE.MathUtils.lerp(-15, 0, t);
            scrollTarget.current.rotX = CONSTANT_TILT;
        }

        // Apply with smooth damping
        groupRef.current.position.x += (scrollTarget.current.x - groupRef.current.position.x) * 0.04;
        groupRef.current.position.y += (scrollTarget.current.y - groupRef.current.position.y) * 0.04;
        groupRef.current.rotation.x += (scrollTarget.current.rotX - groupRef.current.rotation.x) * 0.04;
        groupRef.current.rotation.y += (scrollTarget.current.rotY - groupRef.current.rotation.y) * 0.04;

        // --- 3. Radar Operation ---
        const currentAngle = (time * sweepSpeed) % (Math.PI * 2);
        sweepRef.current.rotation.z = -currentAngle;

        blipRefs.current.forEach((blip, i) => {
            if (!blip) return;
            const target = targets[i];
            
            const normalize = (a: number) => (a % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            
            // Leading edge is exactly at -currentAngle
            const nSweep = normalize(-currentAngle);
            const nTarget = normalize(target.theta);
            
            let age = nSweep - nTarget;
            if (age < 0) age += Math.PI * 2;
            
            let intensity = 0;
            if (age < 2.0) { // Fade out over 2 radians
                intensity = Math.pow(1.0 - (age / 2.0), 3);
            }
            
            intensity *= ease;
            
            // Central dot
            const dotMat = (blip.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
            dotMat.opacity = intensity;
            
            // Outer bracket
            const bracketMat = (blip.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial;
            bracketMat.opacity = intensity * 0.8;
            
            blip.scale.setScalar(1 + intensity * 0.5); 
        });
    });

    return (
        <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
            
            {/* Holographic Green Grid (Infinite Radius) */}
            <polarGridHelper ref={gridRef as any} args={[200, 64, 100, radarColor, radarDarkColor]} />

            {/* Center Emitter */}
            <mesh ref={dishRef} position={[0, 0, 0.1]}>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color={targetColor} />
            </mesh>

            {/* Sweep Cone composed of thin slices for a perfect smooth gradient */}
            <group ref={sweepRef} position={[0, 0, 0.05]}>
                {Array.from({ length: slices }).map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / slices) * sweepAngle]}>
                        <circleGeometry args={[200, 4, 0, sweepAngle / slices]} />
                        <meshBasicMaterial 
                            color={radarColor} 
                            transparent 
                            opacity={0.3 * Math.pow(1 - (i / slices), 2)} 
                            blending={THREE.AdditiveBlending} 
                            depthWrite={false} 
                            side={THREE.DoubleSide} 
                        />
                    </mesh>
                ))}
            </group>

            {/* Targets */}
            {targets.map((t, i) => (
                <group 
                    key={i}
                    ref={(el) => { blipRefs.current[i] = el; }}
                    position={[Math.cos(t.theta) * t.r, Math.sin(t.theta) * t.r, 0.1]}
                >
                    {/* Glowing Core */}
                    <mesh>
                        <circleGeometry args={[0.15, 16]} />
                        <meshBasicMaterial color={targetColor} transparent opacity={0} blending={THREE.AdditiveBlending} />
                    </mesh>
                    
                    {/* Square Bracket (like reference image) */}
                    <mesh>
                        <ringGeometry args={[0.4, 0.45, 4, 1, Math.PI/4, Math.PI*2]} />
                        <meshBasicMaterial color={bracketColor} transparent opacity={0} blending={THREE.AdditiveBlending} />
                    </mesh>
                </group>
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
        // Deep 3D Parallax Effect
        target.current.x += (mouse.current.x * 2 - target.current.x) * 0.04;
        target.current.y += (mouse.current.y * 1 - target.current.y) * 0.04;
        
        // 3D Angled Perspective View
        camera.position.x = target.current.x;
        camera.position.y = 8 + target.current.y * 2; 
        camera.position.z = 12;
        
        camera.lookAt(0, 0, 0);
    });

    return null;
}

export default function BgCanvas() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 8, 12], fov: 50, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.2} />
                <RadarSystem />
                <CameraRig />
                <EffectComposer>
                    <Bloom
                        intensity={0.5}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        blendFunction={BlendFunction.ADD}
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new THREE.Vector2(0.0008, 0.0008)}
                        radialModulation={false}
                        modulationOffset={0}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
