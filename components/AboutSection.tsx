'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const values = [
    'AI-first systems designed for real-world operational conditions',
    'Built for classified, air-gapped, and contested environments',
    'Modular architecture — integrate with any existing C2 or SCADA system',
    'Committed to rapid field deployment — operational in hours',
    'Ongoing AI model updates as new threats and platforms emerge',
];

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="container">
                <div
                    ref={ref}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
                    className="about-grid"
                >
                    {/* Left */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="section-label">About KapiDhwaj Dynamics</div>
                            <h2 className="section-title">
                                We Build the Systems <br />
                                <span className="gradient-text">That Protect What Matters</span>
                            </h2>
                            <p style={{ color: '#8892A4', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
                                Founded in 2025, KapiDhwaj Dynamics is an emerging defence and robotics startup
                                developing AI-powered systems at the intersection of autonomy, sensor fusion, and
                                battlefield intelligence. Our products serve military forces, research institutions,
                                and security-conscious enterprises across the world.
                            </p>
                            <p style={{ color: '#8892A4', lineHeight: 1.8, marginBottom: 40, fontSize: '0.95rem' }}>
                                From AI-powered drone detection and semi-autonomous turret systems to proximity-fuzed
                                and laser-guided smart ammunition — every product we build is engineered to keep
                                personnel safe and give operators decisive advantage on the modern battlefield.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {values.map((v) => (
                                    <div key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                        <CheckCircle2 size={18} color="#C8A84B" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ color: '#CBD5E0', fontSize: '0.9rem', lineHeight: 1.6 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: visual card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(200,168,75,0.08), rgba(139,105,20,0.08))',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 24,
                            padding: '48px 40px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(200,168,75,0.12)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                            <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(139,105,20,0.08)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '5rem',
                                    background: 'linear-gradient(135deg, #C8A84B, #8B6914)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    lineHeight: 1, marginBottom: 12,
                                }}>
                                    2025
                                </div>
                                <p style={{ color: '#8892A4', fontSize: '0.9rem', marginBottom: 40 }}>Founded</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    {[
                                        { n: '4', label: 'Defence Products' },
                                        { n: 'Military', label: 'Primary Market' },
                                        { n: 'Labs', label: 'Research Partners' },
                                        { n: '24/7', label: 'Operational' },
                                    ].map(item => (
                                        <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px 12px' }}>
                                            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#F0F4FF' }}>{item.n}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#8892A4', marginTop: 4 }}>{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute', bottom: -20, left: -20,
                                background: 'rgba(200,168,75,0.1)', border: '1px solid rgba(200,168,75,0.25)',
                                backdropFilter: 'blur(16px)', borderRadius: 14, padding: '14px 20px',
                            }}
                        >
                            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#C8A84B' }}>🛡️ Defence Grade</div>
                            <div style={{ fontSize: '0.72rem', color: '#8892A4', marginTop: 2 }}>Field-tested & validated</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
        </section>
    );
}
