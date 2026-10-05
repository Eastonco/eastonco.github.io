'use client';

import { useEffect, useRef, useState } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, type Box } from './iso';

// Fig. 2: the EG Console micro-frontend platform. 25 tiles, one per team;
// clicking deploys the next team's frontend, which rises out of the shared slab.
const N = 5;
const TILE = 22;
const GAP = 6;
const OFFSET = -(N * TILE + (N - 1) * GAP) / 2;
const IDLE = 2.5;
const START_SHIPPED = [0, 3, 7, 12, 16, 21];

// Stable pseudo-random tile height (10–28) so the skyline is the same on every render.
const heightOf = (i: number) => 10 + ((i * 37 + 11) % 19);

// Back-to-front draw order for the painter's algorithm.
const ORDER = Array.from({ length: N * N }, (_, i) => i).sort(
  (a, b) => (a % N) + Math.floor(a / N) - ((b % N) + Math.floor(b / N))
);

export default function DeployGrid() {
  const [shipped, setShipped] = useState<number[]>(START_SHIPPED);
  const [heights, setHeights] = useState(() =>
    Array.from({ length: N * N }, (_, i) => (START_SHIPPED.includes(i) ? heightOf(i) : IDLE))
  );
  const [flash, setFlash] = useState<number | null>(null);
  const current = useRef(heights);

  // Ease every tile toward its target height; stops once all have settled.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const tick = () => {
      let moving = false;
      current.current = current.current.map((h, i) => {
        const t = shipped.includes(i) ? heightOf(i) : IDLE;
        if (reduce || Math.abs(t - h) < 0.1) return t;
        moving = true;
        return h + (t - h) * 0.14;
      });
      setHeights(current.current);
      if (moving) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shipped]);

  useEffect(() => {
    if (flash === null) return;
    const t = setTimeout(() => setFlash(null), 700);
    return () => clearTimeout(t);
  }, [flash]);

  const deploy = () => {
    if (shipped.length === N * N) {
      setShipped([]);
      return;
    }
    const waiting = ORDER.filter(i => !shipped.includes(i));
    const next = waiting[Math.floor(Math.random() * waiting.length)];
    setShipped([...shipped, next]);
    setFlash(next);
  };

  const done = shipped.length === N * N;
  const base: Box = { x: OFFSET - 8, y: OFFSET - 8, z: -7, w: 150, d: 150, h: 7 };

  return (
    <Figure
      n={2}
      title="EG Console · 25 teams"
      cta={done ? 'Click to reset' : 'Click to deploy'}
      status={`${shipped.length} / ${N * N} shipped`}
      onActivate={deploy}
    >
      <svg
        viewBox="-140 -112 280 205"
        className="block h-auto w-full"
        role="img"
        aria-label="Isometric grid of 25 micro-frontend tiles on a shared platform; deployed tiles rise as towers"
      >
        <IsoBox box={base} />
        {ORDER.map(i => {
          const box: Box = {
            x: OFFSET + (i % N) * (TILE + GAP),
            y: OFFSET + Math.floor(i / N) * (TILE + GAP),
            z: 0,
            w: TILE,
            d: TILE,
            h: heights[i],
          };
          const live = shipped.includes(i);
          return (
            <g key={i}>
              <IsoBox box={box} top={flash === i ? 'var(--ed-accent)' : undefined} />
              {live && heights[i] > 8 && (
                <circle
                  transform={leftFace(box)}
                  cx={4}
                  cy={4}
                  r={1.4}
                  className="ed-led"
                  fill={i % 4 === 0 ? 'var(--ed-accent)' : '#9be59b'}
                  style={{ animationDuration: `${1.2 + (i % 5) * 0.35}s` }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
