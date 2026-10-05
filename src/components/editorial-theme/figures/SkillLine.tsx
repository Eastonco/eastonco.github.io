'use client';

import { useRef } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, project, topFace, type Box } from './iso';
import { spring, useSim } from './useFrame';

// Fig. 2: skill governance as a factory line. AI-written skills ride a conveyor and wait under
// a stamp for review. Click to stamp: good skills get approved and roll into the tray;
// vibe-coded ones (wobbling, smoking) get rejected and flung into the bin.
const BELT: Box = { x: -85, y: -13, z: 0, w: 140, d: 26, h: 10 };
const TOP = BELT.z + BELT.h;
const S = 16; // cube size
const PX = -10; // press position along the belt
const HEAD_REST = 52;
const TRAY: Box = { x: 62, y: -16, z: 0, w: 38, d: 32, h: 4 };
const BIN: Box = { x: 6, y: -54, z: 0, w: 24, d: 22, h: 22 };
const BIN_MOUTH: [number, number, number] = [BIN.x + BIN.w / 2, BIN.y + BIN.d / 2, BIN.h];

const GOOD = ['pdf', 'sql', 'triage', 'deploy', 'docs', 'jira', 'brand', 'k8s', 'review', 'slack'];
const VIBES = ['vibes', 'yolo', 'todo', 'idk'];

type Cube = {
  id: number;
  label: string;
  vibe: boolean;
  state: 'belt' | 'tray' | 'flying' | 'gone';
  x: number;
  y: number;
  z: number;
  h: { x: number; v: number }; // height spring, squashes on impact
  mark: 'ok' | 'no' | null;
  timer: number; // frames since stamped (rejects wait a beat before the throw)
  vel: [number, number, number];
  slot: number;
};

type Puff = { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number };

const initWorld = () => ({
  cubes: [] as Cube[],
  puffs: [] as Puff[],
  head: { x: HEAD_REST, v: 0 },
  press: 'idle' as 'idle' | 'down' | 'up',
  beltOffset: 0,
  nextId: 0,
  approved: 0,
  rejected: 0,
  trayed: 0,
  t: 0,
});
type World = ReturnType<typeof initWorld>;

export default function SkillLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, poke] = useSim(ref, initWorld, step);

  const spawn = (w: World) => {
    const vibe = Math.random() < 0.28;
    const pool = vibe ? VIBES : GOOD;
    w.cubes.push({
      id: w.nextId++,
      label: pool[Math.floor(Math.random() * pool.length)],
      vibe,
      state: 'belt',
      x: BELT.x + S / 2 + 2,
      y: 0,
      z: TOP,
      h: { x: S, v: 0 },
      mark: null,
      timer: 0,
      vel: [0, 0, 0],
      slot: 0,
    });
  };

  const puff = (w: World, x: number, y: number, z: number, n: number, spread = 0.8) => {
    for (let i = 0; i < n; i++) {
      w.puffs.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * spread * 2,
        vy: (Math.random() - 0.5) * spread * 2,
        vz: Math.random() * 0.6 + 0.2,
        life: 1,
      });
    }
  };

  const underPress = (cubes: Cube[]) =>
    cubes.find(c => c.state === 'belt' && Math.abs(c.x - PX) < 1 && !c.mark);

  function step(w: World, t: number, reduce: boolean) {
    w.t = t;
    const belt = w.cubes.filter(c => c.state === 'belt');

    // Feed new skills onto the belt, spaced out.
    const last = Math.min(...belt.map(c => c.x), Infinity);
    if (belt.length < 4 && last > BELT.x + S + 22) spawn(w);

    // The belt waits while an unreviewed skill sits under the press.
    const waiting = underPress(w.cubes);
    if (!waiting) {
      w.beltOffset = (w.beltOffset + 0.7) % 12;
      for (const c of belt) {
        // Snap onto the press position instead of sliding past it.
        if (!c.mark && c.x < PX && c.x + 0.7 > PX) c.x = PX;
        else c.x += 0.7;
      }
    }

    // Press: slam down, bounce off whatever it hits, return.
    const contact = waiting ? TOP + waiting.h.x : TOP;
    if (w.press === 'down') {
      w.head.v -= 3.2;
      w.head.x += w.head.v;
      if (w.head.x <= contact) {
        w.head.x = contact;
        w.head.v = 0;
        w.press = 'up';
        puff(w, PX, 0, contact, 6, 1.2);
        if (waiting) {
          waiting.h.v = -4.5;
          waiting.mark = waiting.vibe ? 'no' : 'ok';
          if (waiting.vibe) w.rejected++;
          else w.approved++;
        }
      }
    } else {
      spring(w.head, HEAD_REST + (w.press === 'idle' ? Math.sin(t * 2) * 1.2 : 0), 0.08, 0.82);
      if (w.press === 'up' && w.head.x > HEAD_REST - 4) w.press = 'idle';
    }

    for (const c of w.cubes) {
      spring(c.h, S, 0.22, 0.72);
      if (c.mark) c.timer++;

      // Rejects: a beat of shame, then thrown in a ballistic arc into the bin.
      if (c.state === 'belt' && c.mark === 'no' && c.timer > 20) {
        const T = 42;
        const g = 0.25;
        c.state = 'flying';
        c.vel = [
          (BIN_MOUTH[0] - c.x) / T,
          (BIN_MOUTH[1] - c.y) / T,
          (BIN_MOUTH[2] - c.z + 0.5 * g * T * T) / T,
        ];
        c.timer = 0;
      }
      if (c.state === 'flying') {
        c.x += c.vel[0];
        c.y += c.vel[1];
        c.z += c.vel[2];
        c.vel[2] -= 0.25;
        if (c.vel[2] < 0 && c.z <= BIN_MOUTH[2]) {
          c.state = 'gone';
          puff(w, ...BIN_MOUTH, 10, 1.4);
        }
      }

      // Approved skills fall off the end of the belt into the tray.
      if (c.state === 'belt' && c.x > BELT.x + BELT.w - S / 2) {
        c.state = 'tray';
        c.slot = w.trayed++ % 8;
      }
      if (c.state === 'tray') {
        const col = c.slot % 2;
        const row = Math.floor(c.slot / 2) % 2;
        const layer = Math.floor(c.slot / 4);
        const tx = TRAY.x + 2 + S / 2 + col * (S + 2);
        const ty = TRAY.y + 0 + S / 2 + row * (S - 1) - 1;
        const tz = TRAY.z + TRAY.h + layer * S;
        const k = reduce ? 1 : 0.2;
        c.x += (tx - c.x) * k;
        c.y += (ty - c.y) * k;
        c.z += (tz - c.z) * k;
      }

      // Vibe-coded skills smoke a little while they wait.
      if (c.vibe && c.state === 'belt' && !reduce && Math.random() < 0.06) {
        puff(w, c.x, c.y, c.z + c.h.x, 1, 0.15);
      }
    }

    // Keep only the newest 8 approved skills in the tray; drop finished ones.
    const tray = w.cubes.filter(c => c.state === 'tray');
    w.cubes = w.cubes.filter(
      c => c.state !== 'gone' && (c.state !== 'tray' || tray.indexOf(c) >= tray.length - 8)
    );

    for (const p of w.puffs) {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.life -= 0.025;
    }
    w.puffs = w.puffs.filter(p => p.life > 0);
  }

  const stamp = () =>
    poke(w => {
      if (w.press === 'idle') {
        w.press = 'down';
        w.head.v = -2;
      }
    });

  const waiting = underPress(w.cubes);
  const beltCubes = w.cubes.filter(c => c.state === 'belt').sort((a, b) => a.x - b.x);
  const behind = beltCubes.filter(c => c.x <= PX + 1);
  const ahead = beltCubes.filter(c => c.x > PX + 1);
  const tray = w.cubes
    .filter(c => c.state === 'tray')
    .sort((a, b) => a.z - b.z || a.x + a.y - (b.x + b.y));
  const flying = w.cubes.filter(c => c.state === 'flying');

  const head: Box = { x: PX - 11, y: -11, z: w.head.x, w: 22, d: 22, h: 9 };
  const [rodX, rodTop] = project(PX, 0, 74);
  const [, rodBottom] = project(PX, 0, w.head.x + 9);

  const renderCube = (c: Cube) => {
    const wobble = c.vibe && !c.mark ? Math.sin(w.t * 22 + c.id) * 0.7 : 0;
    const box: Box = { x: c.x - S / 2 + wobble, y: c.y - S / 2, z: c.z, w: S, d: S, h: c.h.x };
    return (
      <g key={c.id}>
        <IsoBox box={box} />
        <text
          transform={leftFace(box)}
          x={S / 2}
          y={c.h.x / 2 + 1.4}
          fontSize={3.8}
          textAnchor="middle"
          fill={c.vibe ? '#f2a65a' : 'var(--ed-muted)'}
          fontFamily="var(--font-ed-mono)"
        >
          {c.label}
        </text>
        {c.mark && (
          <path
            transform={topFace(box)}
            d={
              c.mark === 'ok' ? 'M4 8.5 L7 11.5 L12.5 5' : 'M4.5 4.5 L11.5 11.5 M11.5 4.5 L4.5 11.5'
            }
            fill="none"
            stroke={c.mark === 'ok' ? 'var(--ed-accent)' : '#ff5c5c'}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        )}
      </g>
    );
  };

  return (
    <div ref={ref}>
      <Figure
        n={2}
        title="Skill review · line 1"
        cta={waiting ? 'Click to stamp' : 'Next skill incoming'}
        status={`${w.approved} approved · ${w.rejected} rejected`}
        onActivate={stamp}
      >
        <svg
          viewBox="-94 -112 200 178"
          className="block h-auto w-full"
          role="img"
          aria-label="Isometric conveyor of AI skills passing under a review stamp; approved skills go to a tray, rejected ones into a bin"
        >
          {/* Gantry behind the belt. */}
          <IsoBox box={{ x: PX - 3, y: -26, z: 0, w: 6, d: 6, h: 84 }} />
          <IsoBox box={{ x: PX - 3, y: -20, z: 76, w: 6, d: 6, h: 6 }} />

          {/* Reject bin: dark top reads as an open mouth. */}
          <IsoBox box={BIN} top="#050506" />
          <text
            transform={leftFace(BIN)}
            x={BIN.w / 2}
            y={13}
            fontSize={4}
            textAnchor="middle"
            letterSpacing=".15em"
            fill="#ff5c5c"
            fontFamily="var(--font-ed-mono)"
            opacity={0.8}
          >
            REJECT
          </text>

          {/* Belt with moving slats. */}
          <IsoBox box={BELT} />
          <g transform={topFace(BELT)} stroke="var(--iso-line-soft)">
            {Array.from({ length: 12 }, (_, i) => {
              const u = i * 12 + w.beltOffset;
              return u < BELT.w - 1 ? <line key={i} x1={u} y1={2} x2={u} y2={BELT.d - 2} /> : null;
            })}
          </g>

          {behind.map(renderCube)}

          {/* Press: housing, rod, stamp head. */}
          <IsoBox box={{ x: PX - 14, y: -14, z: 74, w: 28, d: 28, h: 12 }} />
          <line
            x1={rodX}
            y1={rodTop}
            x2={rodX}
            y2={rodBottom}
            stroke="var(--iso-line)"
            strokeWidth={2.2}
          />
          <IsoBox box={head} />
          <text
            transform={leftFace(head)}
            x={11}
            y={6.2}
            fontSize={3.6}
            textAnchor="middle"
            letterSpacing=".2em"
            fill="var(--ed-accent)"
            fontFamily="var(--font-ed-mono)"
          >
            REVIEW
          </text>

          {ahead.map(renderCube)}

          {/* Approved tray. */}
          <IsoBox box={TRAY} />
          <text
            transform={leftFace(TRAY)}
            x={TRAY.w / 2}
            y={3.2}
            fontSize={2.8}
            textAnchor="middle"
            letterSpacing=".15em"
            fill="var(--ed-accent)"
            fontFamily="var(--font-ed-mono)"
          >
            APPROVED
          </text>
          {tray.map(renderCube)}

          {flying.map(renderCube)}

          {w.puffs.map((p, i) => {
            const [x, y] = project(p.x, p.y, p.z);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={1 + (1 - p.life) * 3}
                fill="rgba(237,237,234,0.5)"
                opacity={p.life}
              />
            );
          })}
        </svg>
      </Figure>
    </div>
  );
}
