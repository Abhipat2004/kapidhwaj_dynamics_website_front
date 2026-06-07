'use client';

import { Canvas } from '@react-three/fiber';
import SentinelModel from './SentinelModel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SentinelPage3D({ product }: { product: any }) {
    return (
        <div style={{ position: 'relative', background: '#03040a' }}>
            
            {/* Scrollable Content Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
                {/* Back Button Overlay */}
                <div style={{ position: 'absolute', top: 100, left: '8vw' }}>
                    <Link href="/#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#8892A4', textDecoration: 'none', fontWeight: 600, padding: '10px 0' }}>
                        <ArrowLeft size={18} />
                        Back to Products
                    </Link>
                </div>

                {/* Page 1: Hero */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8vw', pointerEvents: 'none' }}>
                    <div style={{ color: '#C8A84B', fontSize: '0.9rem', fontWeight: 800, letterSpacing: 3, marginBottom: 16 }}>
                        {product.category.toUpperCase()}
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 900, color: '#F0F4FF', margin: 0, lineHeight: 1.05 }}>
                        {product.name}
                    </h1>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 500, marginTop: 24, lineHeight: 1.6 }}>
                        {product.tagline}
                    </p>
                </section>

                {/* Page 2: Front Face Grid / Fusion */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '8vw', alignItems: 'flex-end', textAlign: 'right', pointerEvents: 'none' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, color: '#F0F4FF', margin: 0 }}>
                        Multi-Sensor Fusion
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 450, marginTop: 24, lineHeight: 1.7 }}>
                        The honeycomb array houses passive RF, acoustic, and visual sensors. Processing millions of data points simultaneously to detect threats in just 30ms.
                    </p>
                </section>

                {/* Page 3: Top Antennas / RF Analysis */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8vw', pointerEvents: 'none' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, color: '#F0F4FF', margin: 0 }}>
                        Spectrum Dominance
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 450, marginTop: 24, lineHeight: 1.7 }}>
                        Helical scanning antennas constantly monitor control links and telemetry signals across all major frequencies without emitting a detectable signature.
                    </p>
                </section>

                {/* Page 4: Specs & CTA */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                    <div style={{ 
                        background: 'rgba(3, 4, 10, 0.7)', 
                        padding: '48px 64px', 
                        borderRadius: 24, 
                        border: '1px solid rgba(200, 168, 75, 0.2)', 
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        pointerEvents: 'auto' // re-enable clicks for the card
                    }}>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', color: '#F0F4FF', marginBottom: 40, textAlign: 'center' }}>
                            Technical Specifications
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 64px', marginBottom: 48 }}>
                            {product.specs.map((s: any) => (
                                <div key={s.label}>
                                    <div style={{ color: '#8892A4', fontSize: '0.9rem', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
                                    <div style={{ color: '#F0F4FF', fontSize: '1.2rem', fontWeight: 600 }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href={`mailto:kapidhwajdynamics@gmail.com?subject=Demo%20Request%20%E2%80%94%20${encodeURIComponent(product.name)}`} className="btn-primary" style={{ padding: '16px 32px' }}>
                                <span>Request Live Demo</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sticky 3D Canvas Container */}
            <div style={{ height: '400vh' }}>
                <div style={{ position: 'sticky', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
                    <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#e2e8f0" />
                        <directionalLight position={[-10, -5, 5]} intensity={2.5} color="#C8A84B" /> 
                        <SentinelModel />
                    </Canvas>
                </div>
            </div>

        </div>
    );
}
