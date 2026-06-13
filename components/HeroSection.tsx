'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Scan, Target, Navigation } from 'lucide-react';
import Image from 'next/image';


const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
});

const categoryBadges = [
    { icon: <Scan size={14} />, label: 'AI Drone Detection' },
    { icon: <Target size={14} />, label: 'Autonomous Turret Systems' },
    { icon: <Navigation size={14} />, label: 'Smart Ammunition' },
];

export default function HeroSection() {
    const { scrollY } = useScroll();
    
    // Watermark fades out as you scroll down
    const watermarkOpacity = useTransform(scrollY, [0, 300], [0.06, 0]);
    // 3D scene fades in as you scroll down
    const sceneOpacity = useTransform(scrollY, [0, 300], [0, 1]);

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 80,
            }}
        >
            {/* ── Watermark Logo ── */}
            <motion.div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: watermarkOpacity,
            }}>
                <Image
                    src="/kd-logo.png"
                    alt=""
                    width={700}
                    height={700}
                    style={{
                        objectFit: 'contain',
                        filter: 'grayscale(1) brightness(3)',
                        userSelect: 'none',
                    }}
                    priority
                />
            </motion.div>

            {/* ── 3D Canvas Background (Moved to GlobalBackground) ── */}
            {/* The global background is now a clean, professional static slate gradient */}

            {/* ── Text Content ── */}
            <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>

                {/* Top badge */}
                <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                    <div className="section-label">
                        Defence &amp; Robotics Technology
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp(0.15)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        margin: '0 auto 24px',
                        maxWidth: 920,
                    }}
                >
                    Serving those{' '}
                    <br />
                    <span style={{ color: 'var(--accent-navy)' }}>who Serve</span>.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: 600,
                        margin: '0 auto 40px',
                        lineHeight: 1.8,
                    }}
                >
                    KapiDhwaj Dynamics is a next-generation defence technology startup. We build
                    AI-powered drone detection systems, semi-autonomous turret platforms, and
                    precision smart ammunition — engineered for the modern battlefield.
                </motion.p>

                {/* Category Badges */}
                <motion.div
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}
                >
                    {categoryBadges.map(b => (
                        <div key={b.label} style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            borderRadius: 4, padding: '6px 14px',
                            fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)',
                        }}>
                            <span style={{ color: 'var(--accent-blue)' }}>{b.icon}</span>
                            {b.label}
                        </div>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    variants={fadeUp(0.38)}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <a href="#products" className="btn-primary">
                        <span>Explore All Products</span>
                        <ArrowRight size={16} />
                    </a>
                    <a href="#contact" className="btn-outline">
                        Request a Demo
                    </a>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    variants={fadeUp(0.52)}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 80, flexWrap: 'wrap' }}
                >
                    {[
                        { value: '4', label: 'Defence Products' },
                        { value: '5km', label: 'Detection Range' },
                        { value: '99.4%', label: 'AI Accuracy' },
                        { value: '24/7', label: 'Autonomous Ops' },
                    ].map((stat) => (
                        <motion.div key={stat.value} 
                            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}
                            style={{
                            padding: '16px 28px', borderRadius: 4, textAlign: 'center', minWidth: 120,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                        }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.5rem',
                                color: 'var(--accent-blue)'
                            }}>{stat.value}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    zIndex: 4,
                }}
            >
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
                <ChevronDown size={16} />
            </motion.div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
        </section>
    );
}
