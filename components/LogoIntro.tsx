'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LogoIntro() {
    const [phase, setPhase] = useState<'splash' | 'fly' | 'done'>('splash');
    const [targetPos, setTargetPos] = useState({ x: -400, y: -300 });

    useEffect(() => {
        setTargetPos({
            x: 50 - window.innerWidth / 2,
            y: 40 - window.innerHeight / 2,
        });

        // After 1.8s, start flying to top left
        const t1 = setTimeout(() => setPhase('fly'), 1800);
        // Unmount entirely after fly finishes
        const t2 = setTimeout(() => setPhase('done'), 2600);
        
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    if (phase === 'done') return null;

    return (
        <>
            {/* Full-page splash overlay background */}
            <AnimatePresence>
                {(phase === 'splash' || phase === 'fly') && (
                    <motion.div
                        key="splash-bg"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === 'fly' ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9998,
                            background: 'var(--bg)',
                            pointerEvents: 'all',
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(phase === 'splash' || phase === 'fly') && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        {/* Logo mark */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, y: 30, x: 0 }}
                            animate={
                                phase === 'fly' 
                                    ? { 
                                        opacity: 0, 
                                        scale: 0.23, // 280 * 0.23 ≈ 64
                                        y: targetPos.y, 
                                        x: targetPos.x, 
                                      } 
                                    : { opacity: 1, scale: 1, y: 0, x: 0 }
                            }
                            transition={
                                phase === 'fly'
                                    ? { duration: 0.8, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.2, delay: 0.6 } }
                                    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                            }
                            style={{ position: 'relative' }}
                        >
                            <Image
                                src="/kd-logo.png"
                                alt="KapiDhwaj Dynamics"
                                width={280}
                                height={280}
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </motion.div>

                        {/* Animated underline */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: phase === 'fly' ? 0 : 1, opacity: phase === 'fly' ? 0 : 1 }}
                            transition={{ duration: 0.6, delay: phase === 'splash' ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: 200,
                                height: 2,
                                background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)',
                                borderRadius: 2,
                                transformOrigin: 'center',
                                marginTop: -8,
                            }}
                        />

                        {/* Loading dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase === 'fly' ? 0 : 1 }}
                            transition={{ delay: phase === 'splash' ? 1 : 0, duration: 0.3 }}
                            style={{ display: 'flex', gap: 8, marginTop: 32 }}
                        >
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        background: 'var(--accent-blue)',
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
