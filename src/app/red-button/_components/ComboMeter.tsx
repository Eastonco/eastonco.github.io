'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { COMBO_WINDOW_MS, TIERS, tierIndexFor } from '../_lib/combo';

export function ComboMeter({ combo, pressId }: { combo: number; pressId: number }) {
  const tierIndex = tierIndexFor(combo);
  const tier = TIERS[tierIndex];
  const nextTier = TIERS[tierIndex + 1];

  return (
    <div className="flex h-20 w-64 flex-col items-center justify-end gap-2">
      <AnimatePresence>
        {combo > 1 && (
          <motion.div
            key="combo"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex w-full flex-col items-center gap-2"
          >
            <div className="flex items-baseline gap-2">
              <motion.span
                key={combo}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="text-3xl font-black tabular-nums"
                style={{ color: tier.colors[0] }}
              >
                {combo}x
              </motion.span>
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                combo · {tier.mult}x points
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                key={pressId}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: COMBO_WINDOW_MS / 1000, ease: 'linear' }}
                className="h-full origin-left rounded-full"
                style={{ backgroundColor: tier.colors[0] }}
              />
            </div>
            {nextTier && (
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                {nextTier.at - combo} to {nextTier.label}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
