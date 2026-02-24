'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/lib/products';

export default function ProductPageClient({ product }: { product: Product }) {
    const color = product.color;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>

            {/* Hero banner */}
            <div style={{
                position: 'relative',
                padding: '80px 0 60px',
                overflow: 'hidden',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse 70% 100% at 60% 0%, ${color}10, transparent 70%)`,
                    pointerEvents: 'none',
                }} />
                {/* Grid */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(${color}06 1px, transparent 1px),
            linear-gradient(90deg, ${color}06 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)',
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Back link */}
                    <Link href="/#products" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#8892A4',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        marginBottom: 40,
                        transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = color)}
                        onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
                    >
                        <ArrowLeft size={16} />
                        Back to Products
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
                        {/* Emoji icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: 96,
                                height: 96,
                                borderRadius: 24,
                                background: `${color}15`,
                                border: `1px solid ${color}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                flexShrink: 0,
                            }}
                        >
                            {product.emoji}
                        </motion.div>

                        <div>
                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    display: 'inline-block',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    background: `${color}18`,
                                    color,
                                    border: `1px solid ${color}30`,
                                    borderRadius: 50,
                                    padding: '5px 14px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: 16,
                                }}
                            >
                                {product.category}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.05 }}
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 900,
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    color: '#F0F4FF',
                                    lineHeight: 1.1,
                                    marginBottom: 12,
                                }}
                            >
                                {product.name}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.1 }}
                                style={{
                                    fontSize: '1.05rem',
                                    fontWeight: 600,
                                    color,
                                    marginBottom: 16,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {product.tagline}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.15 }}
                                style={{
                                    color: '#8892A4',
                                    fontSize: '1rem',
                                    lineHeight: 1.8,
                                    maxWidth: 640,
                                }}
                            >
                                {product.longDescription}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="container" style={{ padding: '72px 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 340px',
                    gap: 48,
                    alignItems: 'flex-start',
                }} className="product-detail-grid">

                    {/* LEFT: Features + Use Cases */}
                    <div>
                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.6rem',
                                color: '#F0F4FF',
                                marginBottom: 32,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                                <Zap size={22} color={color} />
                                Key Capabilities
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 56 }} className="features-grid">
                                {product.features.map((f, i) => (
                                    <motion.div
                                        key={f.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                                        style={{
                                            background: `${color}08`,
                                            border: `1px solid ${color}20`,
                                            borderRadius: 16,
                                            padding: '24px 22px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* Top accent */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0,
                                            height: 2,
                                            background: `linear-gradient(90deg, ${color}, transparent)`,
                                            borderRadius: '16px 16px 0 0',
                                        }} />
                                        <h3 style={{
                                            fontFamily: 'Outfit, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            color: '#F0F4FF',
                                            marginBottom: 10,
                                        }}>
                                            {f.title}
                                        </h3>
                                        <p style={{ color: '#8892A4', fontSize: '0.86rem', lineHeight: 1.7 }}>
                                            {f.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Use Cases */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2 style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.6rem',
                                color: '#F0F4FF',
                                marginBottom: 24,
                            }}>
                                Use Cases
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {product.useCases.map(uc => (
                                    <div key={uc} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <CheckCircle2 size={18} color={color} style={{ flexShrink: 0 }} />
                                        <span style={{ color: '#CBD5E0', fontSize: '0.95rem' }}>{uc}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Specs card + CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Specs */}
                        <div style={{
                            background: `${color}08`,
                            border: `1px solid ${color}25`,
                            borderRadius: 20,
                            padding: '28px 24px',
                            marginBottom: 20,
                            position: 'sticky',
                            top: 100,
                        }}>
                            <h3 style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                color: '#F0F4FF',
                                marginBottom: 20,
                                paddingBottom: 16,
                                borderBottom: `1px solid ${color}20`,
                            }}>
                                Technical Specifications
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {product.specs.map((spec, i) => (
                                    <div key={spec.label} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 0',
                                        borderBottom: i < product.specs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                    }}>
                                        <span style={{ color: '#8892A4', fontSize: '0.85rem' }}>{spec.label}</span>
                                        <span style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right', maxWidth: 140 }}>{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div style={{
                            background: 'rgba(200,168,75,0.06)',
                            border: '1px solid rgba(200,168,75,0.2)',
                            borderRadius: 14,
                            padding: '14px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 16,
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8A84B', boxShadow: '0 0 8px #C8A84B', display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ color: '#C8A84B', fontWeight: 600, fontSize: '0.85rem' }}>{product.status}</span>
                        </div>

                        {/* CTA */}
                        <a href={`mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20${encodeURIComponent(product.name)}&body=Hello%20KapiDhwaj%20Dynamics%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20live%20demonstration%20of%20${encodeURIComponent(product.name)}.%0A%0AOrganisation%3A%20%0ACountry%3A%20%0A%0AThank%20you.`} className="btn-primary" style={{ display: 'flex', justifyContent: 'center', borderRadius: 14 }}>
                            <span>Request a Demo</span>
                        </a>
                        <Link href="/#products" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 12,
                            padding: '12px',
                            color: '#8892A4',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            transition: 'color 0.2s',
                            borderRadius: 14,
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
                        >
                            <ArrowLeft size={14} />
                            All Products
                        </Link>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
