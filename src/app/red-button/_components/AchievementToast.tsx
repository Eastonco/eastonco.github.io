'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Achievement } from '../_lib/achievements';

export type Toast = { key: number; achievement: Achievement };

export function AchievementToasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 left-4 z-50 flex flex-col items-end gap-2 sm:left-auto">
      <AnimatePresence>
        {toasts.map(({ key, achievement }) => (
          <motion.div
            key={key}
            layout
            initial={{ x: 80, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-amber-300 bg-white/95 px-4 py-3 shadow-xl dark:border-amber-500/50 dark:bg-gray-800/95"
          >
            <span className="text-3xl">{achievement.icon}</span>
            <div className="min-w-0">
              <div className="text-[10px] font-bold tracking-widest text-amber-600 uppercase dark:text-amber-400">
                Achievement unlocked
              </div>
              <div className="font-bold text-gray-900 dark:text-gray-100">{achievement.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{achievement.desc}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
