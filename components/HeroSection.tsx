'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Cpu, Radio } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
});

const categoryBadges = [
    { icon: <Shield size={14} />, label: 'AI Drone Detection' },
    { icon: <Cpu size={14} />, label: 'Autonomous Turret Systems' },
    { icon: <Radio size={14} />, label: 'Smart Ammunition' },
];

export default function HeroSection() {
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
            {/* Animated mesh background */}
            <div className="mesh-bg" />

            {/* Grid lines */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(200,168,75,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,168,75,0.04) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            }} />

            {/* Pulsing radar rings */}
            {[500, 700, 900].map((size, i) => (
                <motion.div
                    key={size}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
                    style={{
                        position: 'absolute',
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        border: `1px solid rgba(200, 168, 75, ${0.18 - i * 0.04})`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                {/* Top badge */}
                <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                    <div className="section-label">
                        <span style={{
                            width: 8, height: 8, borderRadius: '50%', background: '#C8A84B',
                            display: 'inline-block', boxShadow: '0 0 8px #C8A84B',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} />
                        Defence & Robotics Technology
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: '#F0F4FF',
                        marginBottom: 24,
                        maxWidth: 920,
                        margin: '0 auto 24px',
                    }}
                >
                    Serving those{' '}
                    <br />
                    <span className="gradient-text-warm">who Serve</span>.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        color: '#8892A4',
                        maxWidth: 640,
                        margin: '0 auto 40px',
                        lineHeight: 1.8,
                    }}
                >
                    KapiDhwaj Dynamics is a next-generation defence technology startup. We build AI-powered drone detection systems, semi-autonomous turret platforms, and precision smart ammunition — engineered for the modern battlefield.
                </motion.p>

                {/* Category Badges */}
                <motion.div
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}
                >
                    {categoryBadges.map(b => (
                        <div key={b.label} style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 50, padding: '7px 16px',
                            fontSize: '0.8rem', fontWeight: 500, color: '#CBD5E0',
                        }}>
                            <span style={{ color: '#C8A84B' }}>{b.icon}</span>
                            {b.label}
                        </div>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    variants={fadeUp(0.3)}
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

                {/* Floating stats row */}
                <motion.div
                    variants={fadeUp(0.5)}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 80, flexWrap: 'wrap' }}
                >
                    {[
                        { value: '4', label: 'Defence Products' },
                        { value: '5km', label: 'Detection Range' },
                        { value: '99.4%', label: 'AI Accuracy' },
                        { value: '24/7', label: 'Autonomous Ops' },
                    ].map((stat) => (
                        <div key={stat.value} className="glass" style={{ padding: '16px 28px', borderRadius: 12, textAlign: 'center', minWidth: 120 }}>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem',
                                background: 'linear-gradient(135deg, #C8A84B, #8B6914)',
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
                style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: '#4A5568', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
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
