'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

// A figure's tiny simulation. The world lives in a ref that `step` mutates every animation
// frame while `el` is on screen; each frame then publishes a copy as state for rendering.
// Click handlers change it through `poke`. Render only ever reads the snapshot.
// `reduce` is true when the visitor prefers reduced motion, so figures can snap instead of animate.
export function useSim<T>(
  el: RefObject<Element | null>,
  init: () => T,
  step: (w: T, t: number, reduce: boolean) => void
): [T, (change: (w: T) => void) => void] {
  const [first] = useState(init);
  const world = useRef(first);
  const [snapshot, setSnapshot] = useState(() => structuredClone(first));
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let running = false;
    const start = performance.now();
    const loop = (now: number) => {
      stepRef.current(world.current, (now - start) / 1000, reduce);
      setSnapshot(structuredClone(world.current));
      frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    if (el.current) observer.observe(el.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [el]);

  // Apply a change from an event handler; the next frame publishes it.
  const poke = (change: (w: T) => void) => change(world.current);
  return [snapshot, poke];
}

// One step of a damped spring toward `target`. Low damping overshoots, which reads as bouncy.
export function spring(s: { x: number; v: number }, target: number, k = 0.16, damp = 0.8) {
  s.v = (s.v + (target - s.x) * k) * damp;
  s.x += s.v;
}
