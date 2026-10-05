'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ACHIEVEMENTS, type Achievement, type Stats } from '../_lib/achievements';

const GROUPS: Achievement['group'][] = ['Solo', 'Together', 'Milestones'];

export function AchievementPanel({ stats }: { stats: Stats }) {
  const [open, setOpen] = useState(false);
  const unlockedCount = ACHIEVEMENTS.filter(a => stats.unlocked[a.id]).length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-40 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur transition hover:border-amber-400 dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-200"
      >
        🏅 {unlockedCount}/{ACHIEVEMENTS.length}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal
              aria-label="Achievements"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Achievements</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close achievements"
                  className="rounded-full px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>

              <dl className="mb-6 grid grid-cols-3 gap-3 text-center">
                {[
                  ['Presses', stats.totalPresses],
                  ['Points', stats.points],
                  ['Best combo', `${stats.bestCombo}x`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                    <dt className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                      {label}
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 tabular-nums dark:text-gray-100">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </dd>
                  </div>
                ))}
              </dl>

              {GROUPS.map(group => (
                <section key={group} className="mb-5">
                  <h3 className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                    {group}
                  </h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ACHIEVEMENTS.filter(a => a.group === group).map(a => {
                      const unlocked = Boolean(stats.unlocked[a.id]);
                      return (
                        <li
                          key={a.id}
                          className={`flex items-center gap-3 rounded-xl border p-3 ${
                            unlocked
                              ? 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10'
                              : 'border-gray-200 opacity-60 dark:border-gray-700'
                          }`}
                        >
                          <span className={`text-2xl ${unlocked ? '' : 'grayscale'}`}>
                            {unlocked ? a.icon : '🔒'}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              {a.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
