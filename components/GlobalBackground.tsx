'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

const BgCanvas = dynamic(() => import('./BgCanvas'), { ssr: false });

export default function GlobalBackground() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <BgCanvas />
        </div>
    );
}
