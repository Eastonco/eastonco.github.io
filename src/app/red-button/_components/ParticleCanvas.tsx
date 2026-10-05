'use client';

import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';

const MAX_PARTICLES = 400;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

export type BurstOptions = {
  count: number;
  colors: string[];
  speed?: number;
  size?: number;
  rainbow?: boolean;
};

export type ParticleHandle = {
  burst: (x: number, y: number, options: BurstOptions) => void;
};

export function ParticleCanvas({ ref }: { ref: Ref<ParticleHandle> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  useImperativeHandle(ref, () => {
    const tick = (time: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      const dt = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => {
        p.life -= dt;
        if (p.life <= 0) return false;
        p.vy += 900 * dt;
        p.vx *= 0.985;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx.globalAlpha = Math.max(p.life / p.maxLife, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1;

      frame.current = particles.current.length ? requestAnimationFrame(tick) : null;
    };

    return {
      burst(x, y, { count, colors, speed = 420, size = 4, rainbow = false }) {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = speed * (0.4 + Math.random() * 0.8);
          const maxLife = 0.6 + Math.random() * 0.7;
          particles.current.push({
            x,
            y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - speed * 0.5,
            life: maxLife,
            maxLife,
            size: size * (0.5 + Math.random()),
            color: rainbow
              ? `hsl(${Math.floor(Math.random() * 360)} 90% 60%)`
              : colors[Math.floor(Math.random() * colors.length)],
          });
        }
        if (particles.current.length > MAX_PARTICLES) {
          particles.current.splice(0, particles.current.length - MAX_PARTICLES);
        }
        if (frame.current === null) {
          lastTime.current = performance.now();
          frame.current = requestAnimationFrame(tick);
        }
      },
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}
