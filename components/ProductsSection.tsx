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
                    <h2 className="section-title">
                        Defence & Robotics Solutions{' '}
                        <span className="gradient-text">Built for Impact</span>
                    </h2>
                    <p className="section-subtitle">
                        From AI-powered drone detection and semi-autonomous turret systems to proximity-fuzed
                        and laser-guided smart ammunition — each product purpose-built for real-world battlefield demands.
                    </p>
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
                                        whileHover={{ y: -8, scale: 1.015 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            background: product.gradient,
                                            border: `1px solid rgba(255,255,255,0.08)`,
                                            borderRadius: 20,
                                            padding: '32px 28px',
                                            height: '100%',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${product.glowColor}`;
                                            (e.currentTarget as HTMLElement).style.borderColor = accentColor + '50';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
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

                                        {/* Emoji icon */}
                                        <div style={{
                                            fontSize: '2.4rem',
                                            marginBottom: 16,
                                            lineHeight: 1,
                                        }}>
                                            {product.emoji}
                                        </div>

                                        {/* Name & Tagline */}
                                        <h3 style={{
                                            fontFamily: 'Outfit, sans-serif',
                                            fontWeight: 800,
                                            fontSize: '1.4rem',
                                            color: '#F0F4FF',
                                            marginBottom: 8,
                                        }}>
                                            {product.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            color: accentColor,
                                            letterSpacing: '0.04em',
                                            marginBottom: 14,
                                            textTransform: 'uppercase',
                                        }}>
                                            {product.tagline}
                                        </p>
                                        <p style={{
                                            color: '#8892A4',
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
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: 8,
                                                    padding: '6px 12px',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    <span style={{ color: '#4A5568' }}>{spec.label}: </span>
                                                    <span style={{ color: '#CBD5E0', fontWeight: 600 }}>{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA row */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingTop: 16,
                                            borderTop: '1px solid rgba(255,255,255,0.06)',
                                        }}>
                                            <span style={{
                                                color: accentColor,
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                fontFamily: 'Outfit, sans-serif',
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
                                                background: '#C8A84B',
                                                display: 'inline-block',
                                                boxShadow: '0 0 6px #C8A84B',
                                            }} />
                                        </div>

                                        {/* Corner glow dec */}
                                        <div style={{
                                            position: 'absolute',
                                            top: -30,
                                            right: -30,
                                            width: 100,
                                            height: 100,
                                            borderRadius: '50%',
                                            background: `radial-gradient(circle, ${accentColor}12, transparent 70%)`,
                                            pointerEvents: 'none',
                                        }} />
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
                    style={{ textAlign: 'center', marginTop: 56 }}
                >
                    <p style={{ color: '#8892A4', marginBottom: 20, fontSize: '0.95rem' }}>
                        Need a custom or integrated solution?
                    </p>
                    <a href="mailto:kapidhwajdynamics@gmail.com?subject=Custom%20Solution%20Enquiry%20%E2%80%94%20KapiDhwaj%20Dynamics" className="btn-primary">
                        <span>Talk to Our Team</span>
                    </a>
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
