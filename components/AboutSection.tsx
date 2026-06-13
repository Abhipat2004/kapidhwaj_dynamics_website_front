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
                            <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
                                We Build the Systems <br />
                                <span style={{ color: 'var(--accent-blue)' }}>That Protect What Matters</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
                                Founded in 2025, KapiDhwaj Dynamics is an emerging defence and robotics startup
                                developing AI-powered systems at the intersection of autonomy, sensor fusion, and
                                battlefield intelligence. Our products serve military forces, research institutions,
                                and security-conscious enterprises across the world.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40, fontSize: '0.95rem' }}>
                                From AI-powered drone detection and semi-autonomous turret systems to proximity-fuzed
                                and laser-guided smart ammunition — every product we build is engineered to keep
                                personnel safe and give operators decisive advantage on the modern battlefield.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {values.map((v) => (
                                    <div key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                        <CheckCircle2 size={18} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>{v}</span>
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
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            padding: '48px 40px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid var(--border)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                            <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid var(--border)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '5rem',
                                    color: 'var(--accent-navy)',
                                    lineHeight: 1, marginBottom: 12,
                                }}>
                                    2025
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 40, fontWeight: 600 }}>Founded</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    {[
                                        { n: '4', label: 'Defence Products' },
                                        { n: 'Military', label: 'Primary Market' },
                                        { n: 'Labs', label: 'Research Partners' },
                                        { n: '24/7', label: 'Operational' },
                                    ].map(item => (
                                        <div key={item.label} style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: 4, padding: '16px 12px' }}>
                                            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-primary)' }}>{item.n}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, fontWeight: 500 }}>{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute', bottom: -20, left: -20,
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                borderRadius: 4, padding: '14px 20px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--accent-blue)', display: 'flex', gap: 6 }}>
                                <span>🛡️</span> Defence Grade
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2, fontWeight: 500 }}>Field-tested & validated</div>
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
