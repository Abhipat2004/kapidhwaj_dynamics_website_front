'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { products, categoryColors } from '@/lib/products';

const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
    }),
};

export default function ProductsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="products" className="section">
            <div className="container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: 64 }}
                >
                    <div className="section-label">Our Product Portfolio</div>
                    <h2 className="section-title" style={{ color: 'var(--text-primary)' }}>
                        Defence & Robotics Solutions{' '}
                        <span style={{ color: 'var(--accent-blue)' }}>Built for Impact</span>
                    </h2>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            padding: '24px 32px',
                            maxWidth: 750,
                            margin: '24px auto 0',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <p className="section-subtitle" style={{ margin: 0, maxWidth: '100%', position: 'relative', zIndex: 1, color: 'var(--text-secondary)', fontWeight: 500 }}>
                            From AI-powered drone detection and semi-autonomous turret systems to proximity-fuzed
                            and laser-guided smart ammunition — each product purpose-built for real-world battlefield demands.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Flexbox product grid */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20,
                    justifyContent: 'flex-start',
                }}>
                    {products.map((product, i) => {
                        const accentColor = product.color;
                        return (
                            <motion.div
                                key={product.slug}
                                custom={i}
                                variants={cardVariant}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                style={{
                                    flex: '1 1 320px',
                                    maxWidth: 'calc(33.33% - 14px)',
                                    minWidth: 280,
                                }}
                            >
                                <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                    <motion.div
                                        whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            background: 'var(--surface)',
                                            border: `1px solid var(--border)`,
                                            borderRadius: 4,
                                            padding: '32px 28px',
                                            height: '100%',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                        }}
                                    >
                                        {/* Category badge */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                background: `${accentColor}18`,
                                                color: accentColor,
                                                border: `1px solid ${accentColor}30`,
                                                borderRadius: 50,
                                                padding: '4px 12px',
                                                letterSpacing: '0.07em',
                                                textTransform: 'uppercase',
                                            }}>
                                                {product.category}
                                            </span>
                                            {product.status !== 'Available' && (
                                                <span style={{
                                                    fontSize: '0.68rem',
                                                    fontWeight: 600,
                                                    background: 'rgba(245,158,11,0.15)',
                                                    color: '#F59E0B',
                                                    border: '1px solid rgba(245,158,11,0.3)',
                                                    borderRadius: 50,
                                                    padding: '4px 10px',
                                                }}>
                                                    {product.status}
                                                </span>
                                            )}
                                        </div>

                                        {/* Removed Emoji Icon Block */}

                                        {/* Name & Tagline */}
                                        <h3 style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 800,
                                            fontSize: '1.4rem',
                                            color: 'var(--text-primary)',
                                            marginBottom: 8,
                                        }}>
                                            {product.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            color: 'var(--accent-blue)',
                                            letterSpacing: '0.04em',
                                            marginBottom: 14,
                                            textTransform: 'uppercase',
                                        }}>
                                            {product.tagline}
                                        </p>
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.7,
                                            fontSize: '0.88rem',
                                            marginBottom: 24,
                                            flex: 1,
                                        }}>
                                            {product.description}
                                        </p>

                                        {/* First 2 specs as quick-look pills */}
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                                            {product.specs.slice(0, 2).map(spec => (
                                                <div key={spec.label} style={{
                                                    background: 'var(--surface-hover)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 4,
                                                    padding: '6px 12px',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>{spec.label}: </span>
                                                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingTop: 16,
                                            borderTop: '1px solid var(--border)',
                                        }}>
                                            <span style={{
                                                color: 'var(--accent-blue)',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                fontFamily: 'Inter, sans-serif',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                            }}>
                                                View Details
                                                <ArrowUpRight size={15} />
                                            </span>
                                            <span style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: 'var(--accent-blue)',
                                                display: 'inline-block',
                                            }} />
                                        </div>

                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{ 
                        textAlign: 'center', 
                        marginTop: 56,
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 4,
                        padding: '48px',
                        maxWidth: 650,
                        margin: '56px auto 0',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <p style={{ color: 'var(--text-primary)', marginBottom: 24, fontSize: '1.15rem', fontWeight: 600, position: 'relative', zIndex: 1, letterSpacing: '0.02em' }}>
                        Need a custom or integrated solution?
                    </p>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <a href="mailto:kapidhwajdynamics@gmail.com?subject=Custom%20Solution%20Enquiry%20%E2%80%94%20KapiDhwaj%20Dynamics" className="btn-primary">
                            <span>Talk to Our Team</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .product-card { max-width: calc(50% - 10px) !important; }
        }
        @media (max-width: 640px) {
          .product-card { max-width: 100% !important; }
        }
      `}</style>
        </section>
    );
}
