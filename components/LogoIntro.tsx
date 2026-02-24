'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LogoIntro() {
    const [phase, setPhase] = useState<'splash' | 'fadeOut' | 'watermark' | 'done'>('splash');

    useEffect(() => {
        // After 1.8s, start fading out the splash
        const t1 = setTimeout(() => setPhase('fadeOut'), 1800);
        // After fade-out (1.8 + 900ms), show the background watermark briefly then hide
        const t2 = setTimeout(() => setPhase('watermark'), 2700);
        // After 2 more seconds, remove completely
        const t3 = setTimeout(() => setPhase('done'), 4800);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <>
            {/* Full-page splash overlay */}
            <AnimatePresence>
                {(phase === 'splash' || phase === 'fadeOut') && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === 'fadeOut' ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: '#03040a',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0,
                            pointerEvents: 'all',
                        }}
                    >
                        {/* Logo mark */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Image
                                src="/kd-logo.png"
                                alt="KapiDhwaj Dynamics"
                                width={280}
                                height={280}
                                style={{ objectFit: 'contain', filter: 'brightness(1.05)' }}
                                priority
                            />
                        </motion.div>

                        {/* Animated underline */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: 200,
                                height: 2,
                                background: 'linear-gradient(90deg, transparent, #C8A84B, transparent)',
                                borderRadius: 2,
                                transformOrigin: 'center',
                                marginTop: -8,
                            }}
                        />

                        {/* Loading dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.3 }}
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
                                        background: '#C8A84B',
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent background watermark — fades in after splash */}
            <AnimatePresence>
                {phase === 'watermark' && (
                    <motion.div
                        key="watermark"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <Image
                            src="/kd-logo.png"
                            alt=""
                            width={600}
                            height={600}
                            style={{
                                objectFit: 'contain',
                                opacity: 0.04,
                                filter: 'grayscale(1) brightness(3)',
                                userSelect: 'none',
                            }}
                            aria-hidden
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
