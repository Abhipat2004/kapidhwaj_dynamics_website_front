'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Cpu, Radio } from 'lucide-react';
import Image from 'next/image';

const HeroScene3D = dynamic(() => import('./HeroScene3D'), { ssr: false });

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
});

const categoryBadges = [
    { icon: <Shield size={14} />, label: 'AI Drone Detection' },
    { icon: <Cpu size={14} />, label: 'Autonomous Turret Systems' },
    { icon: <Radio size={14} />, label: 'Smart Ammunition' },
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
                background: '#03040a',
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

            {/* ── 3D Canvas Background ── */}
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: sceneOpacity }}>
                <HeroScene3D />
            </motion.div>

            {/* ── Vignette overlay to blend 3D into content ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(3,4,10,0.55) 70%, rgba(3,4,10,0.92) 100%)',
                pointerEvents: 'none',
            }} />

            {/* ── Bottom fade ── */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 220,
                zIndex: 2,
                background: 'linear-gradient(to bottom, transparent, #03040a)',
                pointerEvents: 'none',
            }} />

            {/* ── Text Content ── */}
            <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>

                {/* Top badge */}
                <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                    <div className="section-label">
                        <span style={{
                            width: 8, height: 8, borderRadius: '50%', background: '#C8A84B',
                            display: 'inline-block', boxShadow: '0 0 8px #C8A84B',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} />
                        Defence &amp; Robotics Technology
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp(0.15)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: '#F0F4FF',
                        margin: '0 auto 24px',
                        maxWidth: 920,
                        textShadow: '0 0 60px rgba(200,168,75,0.2)',
                    }}
                >
                    Serving those{' '}
                    <br />
                    <span className="gradient-text-warm">who Serve</span>.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                        color: '#8892A4',
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
                            background: 'rgba(200,168,75,0.06)',
                            border: '1px solid rgba(200,168,75,0.2)',
                            borderRadius: 50, padding: '8px 18px',
                            fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E0',
                            backdropFilter: 'blur(10px)',
                        }}>
                            <span style={{ color: '#C8A84B' }}>{b.icon}</span>
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
                        <div key={stat.value} className="glass" style={{
                            padding: '16px 28px', borderRadius: 12, textAlign: 'center', minWidth: 120,
                            backdropFilter: 'blur(20px)',
                            background: 'rgba(200,168,75,0.05)',
                            border: '1px solid rgba(200,168,75,0.15)',
                        }}>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem',
                                background: 'linear-gradient(135deg, #E8C96A, #C8A84B)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>{stat.value}</div>
                            <div style={{ fontSize: '0.78rem', color: '#8892A4', marginTop: 4 }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    color: '#4A5568', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    zIndex: 4,
                }}
            >
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
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
