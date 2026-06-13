'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
    { value: 5, suffix: 'km', label: 'Detection Range', color: 'var(--accent-navy)' },
    { value: 30, suffix: 'ms', label: 'Detection Latency', color: 'var(--accent-navy)' },
    { value: 99, suffix: '.4%', label: 'Classification Accuracy', color: 'var(--accent-navy)' },
    { value: 5000, suffix: '+', label: 'UAV Models in Database', color: 'var(--accent-navy)' },
    { value: 50, suffix: 'L+', label: 'Training Images (Dataset)', color: 'var(--accent-navy)' },
];

function CountUp({ target, suffix, color, inView }: { target: number; suffix: string; color: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color,
            lineHeight: 1,
        }}>
            {count}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section id="stats" style={{
            padding: '80px 0',
            background: 'var(--bg-2)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'var(--border)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--border)' }} />

            <div className="container" ref={ref}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 48,
                    textAlign: 'center',
                }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                            <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} inView={inView} />
                            <div style={{
                                width: 40,
                                height: 2,
                                background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                                borderRadius: 1,
                            }} />
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
