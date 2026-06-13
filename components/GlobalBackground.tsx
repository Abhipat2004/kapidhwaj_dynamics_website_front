'use client';

import { motion } from 'framer-motion';

export default function GlobalBackground() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background: 'var(--bg)',
            overflow: 'hidden'
        }}>
            {/* Subtle animated gradient orb 1 */}
            <motion.div
                animate={{
                    x: ['0vw', '5vw', '-2vw', '0vw'],
                    y: ['0vh', '8vh', '-5vh', '0vh'],
                    scale: [1, 1.05, 0.95, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear'
                }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(10, 66, 115, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }}
            />
            
            {/* Subtle animated gradient orb 2 */}
            <motion.div
                animate={{
                    x: ['0vw', '-8vw', '3vw', '0vw'],
                    y: ['0vh', '-5vh', '12vh', '0vh'],
                    scale: [1, 0.95, 1.05, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear'
                }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(10, 66, 115, 0.035) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }}
            />
            
            {/* Extremely faint dot grid overlay for texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%)',
            }} />
        </div>
    );
}
