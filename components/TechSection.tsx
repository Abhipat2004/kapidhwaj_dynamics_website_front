'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Radio, Cpu, Brain, GitMerge } from 'lucide-react';

const pillars = [
    {
        icon: <Radio size={32} />,
        title: 'Sensor Fusion & Detection',
        description:
            'Our systems combine RF spectrum monitoring, passive radar, LiDAR, EO/IR, and acoustic sensors — fused by AI to deliver high-confidence situational awareness in any environment.',
        color: '#C8A84B',
    },
    {
        icon: <Cpu size={32} />,
        title: 'Edge AI & On-Board Processing',
        description:
            'All intelligence runs on our hardened NexaCore NPU. Zero cloud dependency means your systems operate autonomously in signal-contested, air-gapped, or classified environments.',
        color: '#E8C96A',
    },
    {
        icon: <Brain size={32} />,
        title: 'Automated Ammunition Navigation using Laser',
        description:
            'Our smart munitions use dual laser guidance — semi-active laser homing and laser beam riding — combined with micro-canard actuators to autonomously steer mid-flight and achieve sub-metre CEP against moving aerial targets.',
        color: '#C8A84B',
    },
    {
        icon: <GitMerge size={32} />,
        title: 'Integrated C2 & Open API',
        description:
            'Every KapiDhwaj Dynamics product is designed for seamless integration with existing military C2 and SCADA systems via open REST + WebSocket APIs — enabling full interoperability without vendor lock-in.',
        color: '#8B6914',
    },
];

export default function TechSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="technology" className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: 72 }}
                >
                    <div className="section-label">Core Technology</div>
                    <h2 className="section-title" style={{ maxWidth: 580 }}>
                        One Platform,{' '}
                        <span className="gradient-text">Infinite Mission Profiles</span>
                    </h2>
                    <p className="section-subtitle">
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
                            whileHover={{ y: -6 }}
                            style={{
                                padding: '36px 28px',
                                borderRadius: 20,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                transition: 'border-color 0.3s',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = pillar.color + '50';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, height: 3,
                                background: `linear-gradient(90deg, ${pillar.color}, transparent)`,
                                borderRadius: '20px 20px 0 0',
                            }} />
                            <div style={{
                                width: 60, height: 60, borderRadius: 16,
                                background: `${pillar.color}15`, border: `1px solid ${pillar.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: pillar.color, marginBottom: 24,
                            }}>
                                {pillar.icon}
                            </div>
                            <h3 style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                                fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 12,
                            }}>
                                {pillar.title}
                            </h3>
                            <p style={{ color: '#8892A4', lineHeight: 1.75, fontSize: '0.88rem' }}>
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
