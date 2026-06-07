'use client';

import { Canvas } from '@react-three/fiber';
import Prox50Model from './Prox50Model';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Prox50Page3D({ product }: { product: any }) {
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
                    <div style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 800, letterSpacing: 3, marginBottom: 16 }}>
                        {product.category.toUpperCase()}
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 900, color: '#F0F4FF', margin: 0, lineHeight: 1.05 }}>
                        {product.name}
                    </h1>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 500, marginTop: 24, lineHeight: 1.6 }}>
                        {product.tagline}
                    </p>
                </section>

                {/* Page 2: Feature 1 */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '8vw', alignItems: 'flex-end', textAlign: 'right', pointerEvents: 'none' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, color: '#F0F4FF', margin: 0 }}>
                        {product.features[0].title}
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 450, marginTop: 24, lineHeight: 1.7 }}>
                        {product.features[0].description}
                    </p>
                </section>

                {/* Page 3: Feature 2 (Launch Section) */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8vw', pointerEvents: 'none' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, color: '#F0F4FF', margin: 0 }}>
                        {product.features[1].title}
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: '1.2rem', maxWidth: 450, marginTop: 24, lineHeight: 1.7 }}>
                        {product.features[1].description}
                    </p>
                </section>

                {/* Page 4: Specs & CTA */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                    <div style={{ 
                        background: 'rgba(3, 4, 10, 0.7)', 
                        padding: '48px 64px', 
                        borderRadius: 24, 
                        border: '1px solid rgba(245, 158, 11, 0.2)', 
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        pointerEvents: 'auto'
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
                    <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e2e8f0" />
                        <directionalLight position={[-10, -5, 5]} intensity={1.5} color="#F59E0B" /> 
                        <Prox50Model />
                    </Canvas>
                </div>
            </div>

        </div>
    );
}
