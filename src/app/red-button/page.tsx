'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence, useAnimationControls, useReducedMotion } from 'framer-motion';
import posthog from 'posthog-js';
import { TIERS, tierIndexFor, useCombo } from './_lib/combo';
import { useAchievements, type Achievement } from './_lib/achievements';
import { useRedButtonRealtime, type RemotePress } from './_lib/useRedButtonRealtime';
import { ParticleCanvas, type ParticleHandle } from './_components/ParticleCanvas';
import { ComboMeter } from './_components/ComboMeter';
import { TierBanner, type Banner } from './_components/TierBanner';
import { FloatingPoints, type FloatingPoint } from './_components/FloatingPoints';
import { CrowdHeat, RemoteRipples, type Ripple } from './_components/RemotePresses';
import { AchievementToasts, type Toast } from './_components/AchievementToast';
import { AchievementPanel } from './_components/AchievementPanel';

const MAX_FLOATING = 30;
const MAX_RIPPLES = 24;
const BANNER_MS = 1400;
const TOAST_MS = 4500;

export default function RedButtonPage() {
  const reduceMotion = useReducedMotion();
  const particles = useRef<ParticleHandle>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shake = useAnimationControls();
  const nextId = useRef(0);
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [banner, setBanner] = useState<Banner | null>(null);
  const [floating, setFloating] = useState<FloatingPoint[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [flashId, setFlashId] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  const { stats, evaluate } = useAchievements();

  const id = () => ++nextId.current;

  const buttonCenter = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const showBanner = useCallback((next: Omit<Banner, 'id'>) => {
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    setBanner({ ...next, id: ++nextId.current });
    setAnnouncement(next.sub ? `${next.text} ${next.sub}` : next.text);
    bannerTimer.current = setTimeout(() => setBanner(null), BANNER_MS);
  }, []);

  const celebrate = useCallback(
    (unlocked: Achievement[]) => {
      if (!unlocked.length) return;
      const added = unlocked.map(achievement => ({ key: ++nextId.current, achievement }));
      setToasts(prev => [...prev, ...added]);
      setAnnouncement(`Achievement unlocked: ${unlocked.map(a => a.name).join(', ')}`);
      for (const { key, achievement } of added) {
        posthog.capture('red_button_achievement', { id: achievement.id });
        setTimeout(() => setToasts(prev => prev.filter(t => t.key !== key)), TOAST_MS);
      }
      const { x, y } = buttonCenter();
      particles.current?.burst(x, y, {
        count: reduceMotion ? 20 : 80,
        colors: ['#facc15', '#f59e0b', '#fde68a'],
        speed: 600,
        rainbow: true,
      });
    },
    [buttonCenter, reduceMotion]
  );

  const onRemotePress = useCallback(
    ({ tier }: RemotePress) => {
      const colors = TIERS[Math.min(tier, TIERS.length - 1)].colors;
      const angle = Math.random() * Math.PI * 2;
      const distance = 130 + Math.random() * 70;
      setRipples(prev => [
        ...prev.slice(-(MAX_RIPPLES - 1)),
        { id: ++nextId.current, angle, distance, color: colors[0] },
      ]);
      const { x, y } = buttonCenter();
      particles.current?.burst(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, {
        count: reduceMotion ? 2 : 6,
        colors,
        speed: 200,
        size: 3,
      });
      celebrate(evaluate({ sawRemotePress: true }));
    },
    [buttonCenter, celebrate, evaluate, reduceMotion]
  );

  const onMilestone = useCallback(
    (milestone: number) => {
      showBanner({
        text: `${milestone.toLocaleString()}!`,
        sub: 'global presses',
        color: '#facc15',
        rainbow: true,
      });
      particles.current?.burst(window.innerWidth / 2, window.innerHeight / 3, {
        count: reduceMotion ? 40 : 200,
        colors: [],
        speed: 800,
        rainbow: true,
      });
      celebrate(evaluate({ witnessedMilestone: true }));
    },
    [celebrate, evaluate, reduceMotion, showBanner]
  );

  const { count, onlineUsers, isLoading, heat, press } = useRedButtonRealtime({
    onRemotePress,
    onMilestone,
  });

  const onComboBreak = useCallback(
    (lost: number) => {
      if (lost >= 20) showBanner({ text: 'Combo lost', sub: `${lost}x`, color: '#9ca3af' });
    },
    [showBanner]
  );

  const { combo, pressId, register } = useCombo(onComboBreak);
  const tier = TIERS[tierIndexFor(combo)];

  useEffect(
    () => () => {
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
    },
    []
  );

  const handlePress = (e: MouseEvent<HTMLButtonElement>) => {
    const result = register(performance.now());
    if (!result) return;
    const { combo: nextCombo, tierIndex, tierUp } = result;
    const current = TIERS[tierIndex];
    // Keyboard activation has no pointer position, so effects come from the button's center.
    const origin = e.detail === 0 ? buttonCenter() : { x: e.clientX, y: e.clientY };

    particles.current?.burst(origin.x, origin.y, {
      count: Math.round((6 + tierIndex * 5) / (reduceMotion ? 3 : 1)),
      colors: current.colors,
      speed: 300 + tierIndex * 60,
      rainbow: current.rainbow,
    });
    setFloating(prev => [
      ...prev.slice(-(MAX_FLOATING - 1)),
      { id: id(), x: origin.x, y: origin.y, text: `+${current.mult}`, color: current.colors[0] },
    ]);

    if (tierUp) {
      showBanner({
        text: `${current.label} COMBO!`,
        sub: `${current.mult}x points`,
        color: current.colors[0],
        rainbow: current.rainbow,
      });
      const center = buttonCenter();
      particles.current?.burst(center.x, center.y, {
        count: reduceMotion ? 30 : 120,
        colors: current.colors,
        speed: 700,
        size: 5,
        rainbow: current.rainbow,
      });
      if (current.flash && !reduceMotion) setFlashId(id());
    }

    if (current.shake && !reduceMotion) {
      const s = current.shake * (tierUp ? 2 : 1);
      void shake.start({
        x: [0, -s, s, -s / 2, s / 2, 0],
        y: [0, s / 2, -s / 2, s / 3, 0],
        transition: { duration: 0.18 },
      });
    }

    celebrate(
      evaluate(
        {
          pressed: true,
          combo: nextCombo,
          othersOnline: Math.max(onlineUsers - 1, 0),
          remoteHeat: heat.remote,
        },
        { points: current.mult, combo: nextCombo }
      )
    );

    void press({ combo: nextCombo, tier: tierIndex }).then(landedOn => {
      if (landedOn === null || landedOn % 1000 !== 0) return;
      showBanner({
        text: 'You hit it!',
        sub: `press #${landedOn.toLocaleString()}`,
        color: '#facc15',
        rainbow: true,
      });
      celebrate(evaluate({ hitCount: landedOn }));
    });
  };

  const glowSize = 35 + Math.min(combo, 200) / 4;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${tier.glow} 0%, transparent ${glowSize}%)`,
        }}
        animate={
          tier.rainbow && !reduceMotion
            ? { filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }
            : { filter: 'hue-rotate(0deg)' }
        }
        transition={tier.rainbow ? { duration: 2, repeat: Infinity, ease: 'linear' } : undefined}
      />

      <ParticleCanvas ref={particles} />

      <AnimatePresence>
        {flashId > 0 && (
          <motion.div
            key={flashId}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-20 bg-white"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>

      <motion.main
        animate={shake}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <div className="flex h-36 items-center justify-center">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent"
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4,
                }}
                className="text-7xl font-bold text-gray-800 tabular-nums sm:text-8xl dark:text-gray-200"
              >
                {count.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your points:{' '}
          <span className="font-semibold tabular-nums">{stats.points.toLocaleString()}</span>
          {' · '}
          Best combo: <span className="font-semibold tabular-nums">{stats.bestCombo}x</span>
        </p>

        <div className="mt-4 mb-6">
          <ComboMeter combo={combo} pressId={pressId} />
        </div>

        <div className="relative flex h-72 w-72 items-center justify-center">
          <RemoteRipples ripples={ripples} />
          {tier.ring && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-64 w-64 rounded-full opacity-80 blur-md"
              style={{
                background: `conic-gradient(${[...tier.colors, tier.colors[0]].join(', ')})`,
              }}
              animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.06, 1] }}
              transition={{
                rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.6, repeat: Infinity },
              }}
            />
          )}
          <motion.button
            ref={buttonRef}
            type="button"
            aria-label="Press the big red button"
            onClick={handlePress}
            disabled={isLoading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ y: 10, boxShadow: '0 4px 0 #7f1d1d, 0 8px 20px rgba(0,0,0,0.25)' }}
            transition={{ type: 'spring', stiffness: 800, damping: 25 }}
            className={`relative h-56 w-56 touch-manipulation rounded-full bg-[radial-gradient(circle_at_35%_30%,#f87171,#dc2626_45%,#991b1b)] text-2xl font-black tracking-widest text-white select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            style={{ boxShadow: '0 14px 0 #7f1d1d, 0 20px 40px rgba(0,0,0,0.3)' }}
          >
            PRESS
          </motion.button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <CrowdHeat total={heat.total} remote={heat.remote} />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {onlineUsers} {onlineUsers === 1 ? 'person' : 'people'} here right now · synced live
          </p>
        </div>
      </motion.main>

      <TierBanner banner={banner} />
      <FloatingPoints points={floating} />
      <AchievementToasts toasts={toasts} />
      <AchievementPanel stats={stats} />

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
