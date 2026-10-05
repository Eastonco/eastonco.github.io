'use client';

import { AnimatePresence, motion } from 'framer-motion';

export type Ripple = { id: number; angle: number; distance: number; color: string };

// Rings that pop up around the button whenever someone else presses it.
export function RemoteRipples({ ripples }: { ripples: Ripple[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 h-10 w-10 rounded-full border-2"
            style={{
              borderColor: r.color,
              marginLeft: Math.cos(r.angle) * r.distance - 20,
              marginTop: Math.sin(r.angle) * r.distance - 20,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

const HEAT_MAX = 60;

export function CrowdHeat({ total, remote }: { total: number; remote: number }) {
  const fill = Math.min(total / HEAT_MAX, 1);

  return (
    <div className="flex w-64 flex-col items-center gap-1.5">
      <div className="flex w-full justify-between text-[11px] font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        <span>Crowd heat</span>
        <span className="tabular-nums">{remote > 0 ? `${remote} from others` : 'just you'}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600"
          animate={{ width: `${fill * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
