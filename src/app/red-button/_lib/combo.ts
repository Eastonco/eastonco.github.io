import { useCallback, useEffect, useRef, useState } from 'react';

// A press within this window of the previous one extends the combo.
export const COMBO_WINDOW_MS = 1200;
// Presses closer together than this are ignored, which blunts autoclickers and key repeat.
const MIN_PRESS_GAP_MS = 50;

export type Tier = {
  at: number;
  label: string;
  mult: number;
  colors: string[];
  glow: string;
  shake: number;
  flash: boolean;
  ring: boolean;
  rainbow: boolean;
};

export const TIERS: Tier[] = [
  {
    at: 0,
    label: '1x',
    mult: 1,
    colors: ['#ef4444', '#f87171', '#fca5a5'],
    glow: 'rgba(239, 68, 68, 0.18)',
    shake: 0,
    flash: false,
    ring: false,
    rainbow: false,
  },
  {
    at: 5,
    label: '5x',
    mult: 2,
    colors: ['#f97316', '#fb923c', '#fdba74'],
    glow: 'rgba(249, 115, 22, 0.25)',
    shake: 0,
    flash: false,
    ring: false,
    rainbow: false,
  },
  {
    at: 20,
    label: '20x',
    mult: 3,
    colors: ['#facc15', '#fde047', '#f97316'],
    glow: 'rgba(250, 204, 21, 0.3)',
    shake: 2,
    flash: false,
    ring: false,
    rainbow: false,
  },
  {
    at: 50,
    label: '50x',
    mult: 5,
    colors: ['#a855f7', '#ec4899', '#f472b6'],
    glow: 'rgba(168, 85, 247, 0.35)',
    shake: 3,
    flash: true,
    ring: false,
    rainbow: false,
  },
  {
    at: 100,
    label: '100x',
    mult: 10,
    colors: ['#ef4444', '#f97316', '#facc15'],
    glow: 'rgba(249, 115, 22, 0.45)',
    shake: 5,
    flash: true,
    ring: true,
    rainbow: false,
  },
  {
    at: 250,
    label: '250x',
    mult: 20,
    colors: ['#22d3ee', '#3b82f6', '#a855f7'],
    glow: 'rgba(59, 130, 246, 0.45)',
    shake: 6,
    flash: true,
    ring: true,
    rainbow: false,
  },
  {
    at: 500,
    label: '500x',
    mult: 50,
    colors: ['#f43f5e', '#facc15', '#22c55e', '#3b82f6', '#a855f7'],
    glow: 'rgba(244, 63, 94, 0.5)',
    shake: 7,
    flash: true,
    ring: true,
    rainbow: true,
  },
  {
    at: 1000,
    label: '1000x',
    mult: 100,
    colors: ['#f43f5e', '#facc15', '#22c55e', '#3b82f6', '#a855f7'],
    glow: 'rgba(250, 204, 21, 0.55)',
    shake: 8,
    flash: true,
    ring: true,
    rainbow: true,
  },
];

export function tierIndexFor(combo: number) {
  let index = 0;
  for (let i = 0; i < TIERS.length; i++) {
    if (combo >= TIERS[i].at) index = i;
  }
  return index;
}

export type ComboPress = { combo: number; tierIndex: number; tierUp: boolean };

export function useCombo(onBreak: (lostCombo: number) => void) {
  const [combo, setCombo] = useState(0);
  // Bumped on every counted press so the draining meter can restart its animation.
  const [pressId, setPressId] = useState(0);
  const comboRef = useRef(0);
  const lastPressRef = useRef(-Infinity);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onBreakRef = useRef(onBreak);

  useEffect(() => {
    onBreakRef.current = onBreak;
  }, [onBreak]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const register = useCallback((now: number): ComboPress | null => {
    if (now - lastPressRef.current < MIN_PRESS_GAP_MS) return null;
    lastPressRef.current = now;

    const next = comboRef.current + 1;
    comboRef.current = next;
    setCombo(next);
    setPressId(id => id + 1);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const lost = comboRef.current;
      comboRef.current = 0;
      setCombo(0);
      onBreakRef.current(lost);
    }, COMBO_WINDOW_MS);

    const tierIndex = tierIndexFor(next);
    return { combo: next, tierIndex, tierUp: tierIndex > tierIndexFor(next - 1) };
  }, []);

  return { combo, pressId, register };
}
