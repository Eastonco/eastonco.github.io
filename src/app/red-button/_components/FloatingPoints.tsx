'use client';

import { AnimatePresence, motion } from 'framer-motion';

export type FloatingPoint = { id: number; x: number; y: number; text: string; color: string };

export function FloatingPoints({ points }: { points: FloatingPoint[] }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      <AnimatePresence>
        {points.map(p => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -80, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-xl font-black drop-shadow"
            style={{ left: p.x, top: p.y, color: p.color }}
          >
            {p.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
