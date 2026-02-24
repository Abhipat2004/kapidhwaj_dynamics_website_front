'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { label: 'Products', href: '/#products' },
    { label: 'Technology', href: '/#technology' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '0 24px',
                    transition: 'all 0.3s ease',
                    background: scrolled ? 'rgba(3, 4, 10, 0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                }}
            >
                <div style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 72,
                }}>
                    {/* Logo */}
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <Image
                            src="/kd-logo.png"
                            alt="KapiDhwaj Dynamics"
                            width={44}
                            height={44}
                            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(200,168,75,0.5))' }}
                            priority
                        />
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#F0F4FF', letterSpacing: '-0.01em' }}>
                            KapiDhwaj<span style={{ color: '#C8A84B' }}> Dynamics</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: '#8892A4',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a href="mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20KapiDhwaj%20Dynamics" className="btn-primary">
                            <span>Request Demo</span>
                        </a>
                    </nav>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ color: '#F0F4FF', display: 'none' }}
                        className="hamburger"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 280,
                            background: '#070b14',
                            borderLeft: '1px solid rgba(255,255,255,0.08)',
                            zIndex: 999,
                            padding: '100px 32px 40px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 32,
                        }}
                    >
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '1.2rem',
                                    color: '#F0F4FF',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a href="mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20KapiDhwaj%20Dynamics" className="btn-primary" onClick={() => setMenuOpen(false)}>
                            <span>Request Demo</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
        </>
    );
}
