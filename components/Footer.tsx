'use client';

import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = {
    Products: ['KD Sentinel', 'KD Eagle Eye', 'KD Prox-50', 'KD Viper'],
    Solutions: ['Military & Defence', 'Forward Operating Bases', 'Airfield Security', 'Naval Defence'],
    Technology: ['Sensor Fusion', 'Edge AI', 'Laser Guidance', 'Developer API'],
    Company: ['About Us', 'Careers', 'Press', 'Contact'],
};

const socials = [
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
];

export default function Footer() {
    return (
        <footer style={{ background: '#03040a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 0 32px', position: 'relative', zIndex: 1 }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }} className="footer-grid">

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <Image
                                src="/kd-logo.png"
                                alt="KapiDhwaj Dynamics"
                                width={42}
                                height={42}
                                style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(200,168,75,0.5))' }}
                            />
                            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#F0F4FF' }}>
                                KapiDhwaj<span style={{ color: '#C8A84B' }}> Dynamics</span>
                            </span>
                        </div>
                        <p style={{ color: '#8892A4', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: 260, marginBottom: 24 }}>
                            Building next-generation defence technology — AI-powered drone detection, semi-autonomous turret systems, and precision smart ammunition for military operations.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {socials.map(s => (
                                <a key={s.label} href={s.href} aria-label={s.label} style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#8892A4', transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(200,168,75,0.1)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.25)';
                                        (e.currentTarget as HTMLElement).style.color = '#C8A84B';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                        (e.currentTarget as HTMLElement).style.color = '#8892A4';
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{
                                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                                color: '#F0F4FF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16,
                            }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" style={{ color: '#8892A4', fontSize: '0.88rem', transition: 'color 0.2s' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                                            onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                }}>
                    <span style={{ color: '#4A5568', fontSize: '0.82rem' }}>© 2026 KapiDhwaj Dynamics. All rights reserved.</span>
                    <a href="mailto:kapidhwajdynamics@gmail.com" style={{ color: '#4A5568', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#C8A84B')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#4A5568')}
                    >
                        kapidhwajdynamics@gmail.com
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </footer>
    );
}
