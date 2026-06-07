'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

const BgCanvas = dynamic(() => import('./BgCanvas'), { ssr: false });

export default function GlobalBackground() {
    const { scrollY } = useScroll();
    // Fade in from 0 opacity at the very top, to fully visible at 400px scrolled down
    const bgOpacity = useTransform(scrollY, [0, 400], [0, 1]);

    return (
        <motion.div style={{ opacity: bgOpacity, position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <BgCanvas />
        </motion.div>
    );
}
