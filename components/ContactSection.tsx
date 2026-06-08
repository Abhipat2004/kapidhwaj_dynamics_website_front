'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Crosshair } from 'lucide-react';

export default function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="contact" className="section">
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background: 'linear-gradient(135deg, #1f1a0a 0%, #0a0802 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 28,
                        padding: 'clamp(48px, 8vw, 80px)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background decoration */}
                    <div style={{
                        position: 'absolute',
                        top: -80,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(139,105,20,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Badge */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <div className="section-label">
                                <Crosshair size={12} />
                                Request a Live Demo
                            </div>
                        </div>

                        <h2 style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            color: '#F0F4FF',
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}>
                            Ready to Secure<br />
                            <span className="gradient-text">Your Airspace?</span>
                        </h2>

                        <p style={{
                            color: '#8892A4',
                            fontSize: '1.05rem',
                            maxWidth: 520,
                            margin: '0 auto 48px',
                            lineHeight: 1.75,
                        }}>
                            Whether you're a military installation, a research lab, or a private enterprise —
                            our team will walk you through a live demonstration tailored to your threat environment.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <a
                                href="mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20KapiDhwaj%20Dynamics&body=Hello%20KapiDhwaj%20Dynamics%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20live%20demonstration%20of%20your%20systems.%0A%0AOrganisation%3A%20%0ACountry%3A%20%0ASystem%20of%20Interest%3A%20%0A%0AThank%20you."
                                className="btn-primary"
                                style={{ textDecoration: 'none' }}
                            >
                                <span>Request a Demo</span>
                            </a>
                            <a
                                href="mailto:kapidhwajdynamics@gmail.com?subject=Enquiry%20%E2%80%94%20KapiDhwaj%20Dynamics"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '13px 28px',
                                    borderRadius: 50,
                                    border: '1px solid rgba(200,168,75,0.3)',
                                    color: '#C8A84B',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    background: 'rgba(200,168,75,0.05)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(200,168,75,0.12)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(200,168,75,0.05)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.3)';
                                }}
                            >
                                Send us an Email
                            </a>
                        </div>

                        <p style={{ color: '#4A5568', fontSize: '0.8rem', marginTop: 20 }}>
                            All enquiries are handled under strict confidentiality. NDA available on request.
                        </p>

                        {/* Alternative CTA */}
                        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                            {[
                                { label: 'View Our Systems', href: '#products' },
                                { label: 'How It Works', href: '#technology' },
                                { label: 'About KD Dynamics', href: '#about' },
                            ].map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        color: '#8892A4',
                                        fontSize: '0.88rem',
                                        fontWeight: 500,
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#C8A84B')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
                                >
                                    {link.label}
                                    <ArrowRight size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
