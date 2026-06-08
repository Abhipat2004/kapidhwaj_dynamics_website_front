'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    life: number;
    maxLife: number;
    colorBase: string;
}

export default function CursorSparkle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let lastX = -100;
        let lastY = -100;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Generate particles based on movement distance
            if (dist > 1) {
                // Emit up to 4 particles depending on how fast the mouse moved
                const count = Math.min(Math.floor(dist / 5) + 1, 4);
                
                for (let i = 0; i < count; i++) {
                    // 50% chance for gold, 50% chance for blue
                    const isGold = Math.random() > 0.5;
                    // '251, 191, 36' is a rich gold, '64, 206, 220' is cyan/blue
                    const colorStr = isGold ? '251, 191, 36' : '64, 206, 220';

                    particles.current.push({
                        x: e.clientX,
                        y: e.clientY,
                        size: Math.random() * 2 + 1, // 1 to 3px radius
                        speedX: (Math.random() - 0.5) * 1.5,
                        speedY: (Math.random() - 0.5) * 1.5 - 0.5, // slight upward drift
                        life: 0,
                        maxLife: Math.random() * 30 + 20, // 20 to 50 frames
                        colorBase: colorStr,
                    });
                }
                lastX = e.clientX;
                lastY = e.clientY;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life++;

                const progress = p.life / p.maxLife;
                const opacity = 1 - progress;
                const currentSize = Math.max(0, p.size * (1 - progress));

                if (p.life >= p.maxLife) {
                    particles.current.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.colorBase}, ${opacity})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgb(${p.colorBase})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
            aria-hidden="true"
        />
    );
}
