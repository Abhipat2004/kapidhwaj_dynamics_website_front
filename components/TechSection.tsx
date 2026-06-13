'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Server, Crosshair, Network } from 'lucide-react';

const pillars = [
    {
        icon: <Activity size={32} />,
        title: 'Sensor Fusion & Detection',
        description:
            'Our systems combine RF spectrum monitoring, passive radar, LiDAR, EO/IR, and acoustic sensors — fused by AI to deliver high-confidence situational awareness in any environment.',
        color: 'var(--accent-blue)',
    },
    {
        icon: <Server size={32} />,
        title: 'Edge AI & On-Board Processing',
        description:
            'All intelligence runs on our hardened NexaCore NPU. Zero cloud dependency means your systems operate autonomously in signal-contested, air-gapped, or classified environments.',
        color: 'var(--accent-blue)',
    },
    {
        icon: <Crosshair size={32} />,
        title: 'Automated Ammunition Navigation using Laser',
        description:
            'Our smart munitions use dual laser guidance — semi-active laser homing and laser beam riding — combined with micro-canard actuators to autonomously steer mid-flight and achieve sub-metre CEP against moving aerial targets.',
        color: 'var(--accent-blue)',
    },
    {
        icon: <Network size={32} />,
        title: 'Integrated C2 & Open API',
        description:
            'Every KapiDhwaj Dynamics product is designed for seamless integration with existing military C2 and SCADA systems via open REST + WebSocket APIs — enabling full interoperability without vendor lock-in.',
        color: 'var(--accent-blue)',
    },
];

export default function TechSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="technology" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: 72 }}
                >
                    <div className="section-label">Core Technology</div>
                    <h2 className="section-title" style={{ maxWidth: 580, color: 'var(--text-primary)' }}>
                        One Platform,{' '}
                        <span style={{ color: 'var(--accent-blue)' }}>Infinite Mission Profiles</span>
                    </h2>
                    <p className="section-subtitle" style={{ color: 'var(--text-secondary)' }}>
                        Every KapiDhwaj Dynamics product is built on the same battle-tested technology stack —
                        enabling rapid deployment, seamless integration, and continuous AI model updates across
                        all product lines.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 20,
                }}>
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.06)' }}
                            style={{
                                padding: '36px 28px',
                                borderRadius: 4,
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                transition: 'all 0.3s',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                            }}
                        >

                            <div style={{
                                width: 60, height: 60, borderRadius: 4,
                                background: 'var(--surface-hover)', border: '1px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--accent-navy)', marginBottom: 24,
                            }}>
                                {pillar.icon}
                            </div>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                                fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: 12,
                            }}>
                                {pillar.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.88rem' }}>
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
