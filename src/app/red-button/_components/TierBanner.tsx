'use client';

import { AnimatePresence, motion } from 'framer-motion';

export type Banner = { id: number; text: string; sub?: string; color: string; rainbow?: boolean };

export function TierBanner({ banner }: { banner: Banner | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[18%] z-40 flex justify-center px-4">
      <AnimatePresence mode="popLayout">
        {banner && (
          <motion.div
            key={banner.id}
            initial={{ scale: 3, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            className="text-center"
          >
            <motion.div
              className={`text-5xl font-black tracking-tight drop-shadow-lg sm:text-7xl ${
                banner.rainbow
                  ? 'bg-gradient-to-r from-rose-500 via-yellow-400 to-violet-500 bg-clip-text text-transparent'
                  : ''
              }`}
              style={banner.rainbow ? undefined : { color: banner.color }}
              animate={
                banner.rainbow ? { filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] } : undefined
              }
              transition={
                banner.rainbow ? { duration: 1, repeat: Infinity, ease: 'linear' } : undefined
              }
            >
              {banner.text}
            </motion.div>
            {banner.sub && (
              <div className="mt-1 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                {banner.sub}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
