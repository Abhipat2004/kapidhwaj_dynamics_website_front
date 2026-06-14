'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
    Products: [
        { label: 'KD Sentinel', href: '/products/kd-sentinel' },
        { label: 'KD Eagle Eye', href: '/products/kd-eagle-eye' },
        { label: 'KD Prox-50', href: '/products/kd-prox50' },
        { label: 'KD Viper', href: '/products/kd-viper' },
    ],
    Solutions: [
        { label: 'Military & Defence', href: '/#products' },
        { label: 'Forward Operating Bases', href: '/#products' },
        { label: 'Airfield Security', href: '/#products' },
        { label: 'Naval Defence', href: '/#products' },
    ],
    Technology: [
        { label: 'Sensor Fusion', href: '/#technology' },
        { label: 'Edge AI', href: '/#technology' },
        { label: 'Laser Guidance', href: '/#technology' },
        { label: 'Developer API', href: '/#contact' },
    ],
    Company: [
        { label: 'About Us', href: '/#about' },
        { label: 'Careers', href: 'mailto:kapidhwajdynamics@gmail.com?subject=Careers' },
        { label: 'Press', href: 'mailto:kapidhwajdynamics@gmail.com?subject=Press%20Enquiry' },
        { label: 'Contact', href: '/#contact' },
    ],
    'Meet Our Founders': [
        { label: 'Abhineet Pathak', href: '#' },
        { label: 'Krishiv Bohra', href: '#' },
        { label: 'Paavan Parmar', href: '#' },
        { label: 'Siddhant Bhattacharjee', href: '#' },
    ],
};

const socials = [
    { icon: <Twitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/company/kapidhwaj-dynamics/', label: 'LinkedIn' },
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/kapidhwajdynamics?igsh=MWxzc3JvN2Z0bmJzNA==', label: 'Instagram' },
];

export default function Footer() {
    return (
        <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '64px 0 32px', position: 'relative', zIndex: 1 }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: 30, marginBottom: 56 }} className="footer-grid">

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <Image
                                src="/kd-logo.png"
                                alt="KapiDhwaj Dynamics"
                                width={42}
                                height={42}
                                style={{ objectFit: 'contain' }}
                            />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                KapiDhwaj Dynamics
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: 260, marginBottom: 24 }}>
                            Building next-generation defence technology — AI-powered drone detection, semi-autonomous turret systems, and precision smart ammunition for military operations.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {socials.map(s => (
                                <a key={s.label} href={s.href} aria-label={s.label} style={{
                                    width: 38, height: 38, borderRadius: 6,
                                    background: 'var(--surface)', border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--text-muted)', transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
                                        (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                        (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
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
                                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                                color: 'var(--text-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16,
                            }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', transition: 'color 0.2s', textDecoration: 'none' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-blue)')}
                                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid var(--border)', paddingTop: 28,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
                }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© 2026 KapiDhwaj Dynamics. All rights reserved.</span>
                    <a href="mailto:kapidhwajdynamics@gmail.com" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-blue)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        kapidhwajdynamics@gmail.com
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </footer>
    );
}
