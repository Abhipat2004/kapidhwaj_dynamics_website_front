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

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Back link */}
                    <Link href="/#products" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        marginBottom: 40,
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-navy)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                        <ArrowLeft size={16} />
                        Back to Products
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
                        {/* Removed Emoji Icon Block */}

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
                                    background: 'var(--surface-hover)',
                                    color: 'var(--accent-blue)',
                                    border: `1px solid var(--border)`,
                                    borderRadius: 4,
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
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 800,
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    color: 'var(--text-primary)',
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
                                    color: 'var(--accent-blue)',
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
                                    color: 'var(--text-secondary)',
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
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.6rem',
                                color: 'var(--text-primary)',
                                marginBottom: 32,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                                <Zap size={22} color="var(--accent-blue)" />
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
                                            background: 'var(--surface)',
                                            border: `1px solid var(--border)`,
                                            borderRadius: 4,
                                            padding: '24px 22px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <h3 style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            color: 'var(--text-primary)',
                                            marginBottom: 10,
                                        }}>
                                            {f.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.7 }}>
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
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.6rem',
                                color: 'var(--text-primary)',
                                marginBottom: 24,
                            }}>
                                Use Cases
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {product.useCases.map(uc => (
                                    <div key={uc} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <CheckCircle2 size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{uc}</span>
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
                            background: 'var(--surface)',
                            border: `1px solid var(--border)`,
                            borderRadius: 4,
                            padding: '28px 24px',
                            marginBottom: 20,
                            position: 'sticky',
                            top: 100,
                        }}>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                color: 'var(--text-primary)',
                                marginBottom: 20,
                                paddingBottom: 16,
                                borderBottom: `1px solid var(--border)`,
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
                                        borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
                                    }}>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{spec.label}</span>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right', maxWidth: 140 }}>{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div style={{
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            padding: '14px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 16,
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)', display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{product.status}</span>
                        </div>

                        {/* CTA */}
                        <a href={`mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20${encodeURIComponent(product.name)}&body=Hello%20KapiDhwaj%20Dynamics%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20live%20demonstration%20of%20${encodeURIComponent(product.name)}.%0A%0AOrganisation%3A%20%0ACountry%3A%20%0A%0AThank%20you.`} className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }}>
                            <span>Request a Demo</span>
                        </a>
                        <Link href="/#products" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 12,
                            padding: '12px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            borderRadius: 4,
                            border: '1px solid var(--border)',
                            textDecoration: 'none',
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.color = 'var(--accent-navy)';
                                (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                            }}
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
