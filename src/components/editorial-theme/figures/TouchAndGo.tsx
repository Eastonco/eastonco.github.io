'use client';

import { useRef } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, project, pts, rightFace, topFace, type Box } from './iso';
import { useSim } from './useFrame';

// Fig. 4: touch-and-goes at Boeing Field. A Cessna flies down final; click to flare.
// Flare just above the runway for a greaser, too high and it floats or balloons into a
// go-around, not at all and it bounces. Greasers in a row build a streak.
const GROUND: Box = { x: -115, y: -40, z: -5, w: 230, d: 80, h: 5 };
const RUNWAY: Box = { x: -100, y: -12, z: 0, w: 200, d: 24, h: 0.8 };
const TOWER: Box = { x: 32, y: -38, z: 0, w: 9, d: 9, h: 28 };
const CAB: Box = { x: 29, y: -41, z: 28, w: 15, d: 15, h: 8 };
const SOCK = { x: -62, y: -30, h: 18 };

const START_X = -180;
const TD_X = -50; // where an unflared approach meets the runway
const SPEED = 1.15;
const GLIDE = -0.5;
const START_Z = ((TD_X - START_X) / SPEED) * -GLIDE;

const PLANE = { top: '#e6e4dd', left: '#b6b4ad', right: '#8a8882' };
const TOWER_CALLS = [
  'N172, extend downwind',
  'N172, follow the 737',
  'N172, cleared for the option',
  'N172, make right traffic',
  'N172, say again?',
];

type Grade = 'greaser' | 'floated' | 'goaround' | 'bounced';
const POPUP: Record<Grade, string> = {
  greaser: 'GREASER ✦',
  floated: 'FLOATED · LANDED LONG',
  goaround: 'BALLOONED · GO AROUND',
  bounced: 'BOING',
};

type Puff = { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number };

// Plane parts in local coordinates (nose toward +x, wheels at z = 0), back to front.
const part = (x: number, y: number, z: number, w: number, d: number, h: number): Box => ({
  x,
  y,
  z,
  w,
  d,
  h,
});
const PARTS = {
  wheelFar: part(1, -6, 0, 3, 2, 3),
  wingFar: part(-1, -22, 10, 9, 19, 1.4),
  stabFar: part(-19, -8, 6, 5, 5, 1.2),
  tail: part(-19, -1.5, 5, 13, 3, 4),
  body: part(-6, -3, 3, 18, 6, 7),
  cowl: part(12, -2.5, 4, 4, 5, 5),
  fin: part(-19, -0.6, 9, 5, 1.2, 8),
  roof: part(-1, -3, 10, 9, 6, 1.4),
  stabNear: part(-19, 3, 6, 5, 5, 1.2),
  wingNear: part(-1, 3, 10, 9, 19, 1.4),
  wheelNear: part(1, 4, 0, 3, 2, 3),
  noseWheel: part(12.5, -1, 0, 2, 2, 4),
};

const initWorld = () => ({
  phase: 'approach' as 'approach' | 'ground' | 'climb' | 'gap',
  x: START_X,
  z: START_Z,
  vz: GLIDE,
  grade: null as Grade | null,
  floatFrames: 0,
  bounces: 0,
  gap: 0,
  streak: 0,
  best: 0,
  last: '',
  popup: { text: '', life: 0, x: 0 },
  tower: { text: '', life: 0 },
  puffs: [] as Puff[],
  t: 0,
});
type World = ReturnType<typeof initWorld>;

export default function TouchAndGo() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, poke] = useSim(ref, initWorld, step);

  const smoke = (w: World, n: number) => {
    for (const y of [-5, 5]) {
      for (let i = 0; i < n; i++) {
        w.puffs.push({
          x: w.x + 2,
          y,
          z: 0.5,
          vx: -Math.random() * 0.8,
          vy: (Math.random() - 0.5) * 0.6,
          vz: Math.random() * 0.25 + 0.05,
          life: 1,
        });
      }
    }
  };

  const grade = (w: World, g: Grade) => {
    w.grade = g;
    w.popup = { text: POPUP[g], life: 1, x: w.x };
    if (g === 'greaser') {
      w.streak++;
      w.best = Math.max(w.best, w.streak);
    } else {
      w.streak = 0;
    }
    w.last = g === 'bounced' ? 'bounced' : POPUP[g].toLowerCase();
  };

  function step(w: World, t: number, reduce: boolean) {
    w.t = t;

    if (w.phase === 'approach') {
      w.x += SPEED;
      if (w.grade === 'greaser') {
        w.vz += (-0.09 - w.vz) * 0.12;
      } else if (w.grade === 'floated') {
        if (w.floatFrames > 0) {
          w.floatFrames--;
          w.vz += (0.05 - w.vz) * 0.2;
        } else {
          w.vz += (-0.3 - w.vz) * 0.1;
        }
      }
      w.z += w.vz;
      if (w.z <= 0) {
        w.z = 0;
        if (!w.grade) {
          grade(w, 'bounced');
          w.vz = 1.5;
          w.bounces = 1;
          smoke(w, 5);
        } else {
          w.vz = 0;
          smoke(w, w.grade === 'greaser' ? 2 : 4);
        }
        w.phase = 'ground';
      }
    } else if (w.phase === 'ground') {
      w.x += SPEED;
      if (w.z > 0 || w.vz > 0) {
        w.vz -= 0.12;
        w.z += w.vz;
        if (w.z <= 0) {
          w.z = 0;
          smoke(w, 3);
          if (w.vz < -0.6) {
            w.vz = -w.vz * 0.55;
            w.bounces++;
            w.last = `bounced ×${w.bounces}`;
          } else {
            w.vz = 0;
          }
        }
      }
      if (w.x > 35 && w.z === 0) {
        w.phase = 'climb';
        w.vz = 0.55;
      }
    } else if (w.phase === 'climb') {
      w.x += SPEED * 1.1;
      w.z += w.vz;
      if (w.x > 190) {
        w.phase = 'gap';
        w.gap = 50;
      }
    } else if (--w.gap <= 0) {
      Object.assign(w, {
        phase: 'approach',
        x: START_X,
        z: START_Z,
        vz: GLIDE,
        grade: null,
        bounces: 0,
      });
    }

    for (const p of w.puffs) {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.vx *= 0.94;
      p.life -= 0.02;
    }
    w.puffs = w.puffs.filter(p => p.life > 0);
    w.popup.life = Math.max(0, w.popup.life - (reduce ? 0.004 : 0.008));
    w.tower.life = Math.max(0, w.tower.life - 0.008);
  }

  const flare = () =>
    poke(w => {
      if (w.phase !== 'approach' || w.grade) {
        w.tower = { text: TOWER_CALLS[Math.floor(Math.random() * TOWER_CALLS.length)], life: 1 };
        return;
      }
      if (w.z <= 9) {
        grade(w, 'greaser');
      } else if (w.z <= 20) {
        grade(w, 'floated');
        w.floatFrames = 28;
      } else {
        grade(w, 'goaround');
        w.phase = 'climb';
        w.vz = 0.7;
      }
    });

  const shift = (b: Box): Box => ({ ...b, x: b.x + w.x, z: b.z + w.z });
  const P = Object.fromEntries(
    Object.entries(PARTS).map(([k, b]) => [k, shift(b)])
  ) as typeof PARTS;
  const shadow = Math.max(0, 0.45 * (1 - w.z / 60));
  const beaconGreen = Math.floor(w.t * 2) % 2 === 0;
  const flap = Math.sin(w.t * 6) * 1.5;
  const [bx, by] = project(TOWER.x + 4.5, TOWER.y + 4.5, CAB.z + CAB.h + 3);
  const popupPos = project(w.popup.x, 0, 28 + (1 - w.popup.life) * 14);
  const towerPos = project(CAB.x, CAB.y, CAB.z + CAB.h + 12);

  return (
    <div ref={ref}>
      <Figure
        n={4}
        title="KBFI · Runway 14R"
        cta={w.phase === 'approach' && !w.grade ? 'Click to flare' : 'Next approach…'}
        status={w.best ? `streak ${w.streak} · best ${w.best}` : w.last || 'on final'}
        onActivate={flare}
      >
        <svg
          viewBox="-138 -104 276 192"
          className="block h-auto w-full"
          role="img"
          aria-label="Isometric runway at Boeing Field with a Cessna practicing touch-and-go landings"
        >
          <IsoBox box={GROUND} />

          {/* Windsock, behind the runway. */}
          <line
            {...lineAt([SOCK.x, SOCK.y, 0], [SOCK.x, SOCK.y, SOCK.h])}
            stroke="var(--iso-line)"
          />
          <polygon
            points={pts(
              [SOCK.x, SOCK.y, SOCK.h],
              [SOCK.x + 14, SOCK.y + flap, SOCK.h - 1.5 + flap * 0.3],
              [SOCK.x + 14, SOCK.y + flap, SOCK.h - 3 + flap * 0.3],
              [SOCK.x, SOCK.y, SOCK.h - 5]
            )}
            fill="#f2a65a"
            opacity={0.85}
          />

          {/* Tower with the airport beacon (green and white). */}
          <IsoBox box={TOWER} />
          <IsoBox box={CAB} />
          <rect
            transform={leftFace(CAB)}
            x={2}
            y={2}
            width={11}
            height={4}
            fill="#0c1218"
            stroke="var(--iso-line-soft)"
          />
          <circle cx={bx} cy={by} r={1.8} fill={beaconGreen ? '#9be59b' : '#f4f4f0'} />

          {/* Runway: centerline, threshold bars, numbers. */}
          <IsoBox box={RUNWAY} fills={{ top: '#232326', left: '#18181a', right: '#121214' }} />
          <g transform={topFace(RUNWAY)} stroke="rgba(237,237,234,0.55)" strokeWidth={0.7}>
            {Array.from({ length: 11 }, (_, i) => (
              <line key={i} x1={28 + i * 14} y1={12} x2={36 + i * 14} y2={12} />
            ))}
            {[3, 6, 9, 15, 18, 21].map(v => (
              <g key={v}>
                <line x1={3} y1={v} x2={11} y2={v} />
                <line x1={189} y1={v} x2={197} y2={v} />
              </g>
            ))}
          </g>
          <g
            transform={topFace(RUNWAY)}
            fill="rgba(237,237,234,0.55)"
            fontSize={5}
            fontFamily="var(--font-ed-mono)"
          >
            <text x={14} y={14} textAnchor="start">
              14R
            </text>
            <text x={186} y={14} textAnchor="end">
              32L
            </text>
          </g>

          {/* Shadow tells you how high the plane is. */}
          <g fill="#000" opacity={shadow}>
            <polygon
              points={pts(
                [w.x - 19, -3, 0.9],
                [w.x + 16, -3, 0.9],
                [w.x + 16, 3, 0.9],
                [w.x - 19, 3, 0.9]
              )}
            />
            <polygon
              points={pts(
                [w.x - 1, -22, 0.9],
                [w.x + 8, -22, 0.9],
                [w.x + 8, 22, 0.9],
                [w.x - 1, 22, 0.9]
              )}
            />
          </g>

          {w.puffs.map((p, i) => {
            const [x, y] = project(p.x, p.y, p.z);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={1.2 + (1 - p.life) * 3.5}
                fill="rgba(237,237,234,0.55)"
                opacity={p.life}
              />
            );
          })}

          {/* The Cessna. */}
          <g>
            <IsoBox box={P.wheelFar} fills={PLANE} />
            <IsoBox box={P.wingFar} fills={PLANE} />
            <IsoBox box={P.stabFar} fills={PLANE} />
            <IsoBox box={P.tail} fills={PLANE} />
            <IsoBox box={P.body} fills={PLANE} />
            <g transform={leftFace(P.body)}>
              <rect x={6} y={1} width={9} height={2.6} fill="#2b3440" />
              <line x1={0} y1={5} x2={18} y2={5} stroke="var(--ed-accent)" strokeWidth={0.9} />
            </g>
            <text
              transform={leftFace(P.tail)}
              x={1.5}
              y={3}
              fontSize={2.4}
              fill="#555"
              fontFamily="var(--font-ed-mono)"
            >
              N172
            </text>
            <IsoBox box={P.cowl} fills={PLANE} />
            <g transform={rightFace(P.cowl)}>
              <line
                x1={2.5 - Math.cos(w.t * 40) * 5}
                y1={2.5 - Math.sin(w.t * 40) * 5}
                x2={2.5 + Math.cos(w.t * 40) * 5}
                y2={2.5 + Math.sin(w.t * 40) * 5}
                stroke="#444"
                strokeWidth={0.8}
              />
            </g>
            <IsoBox box={P.fin} fills={PLANE} />
            <IsoBox box={P.roof} fills={PLANE} />
            <IsoBox box={P.stabNear} fills={PLANE} />
            <IsoBox box={P.wingNear} fills={PLANE} />
            <IsoBox box={P.wheelNear} fills={PLANE} />
            <IsoBox box={P.noseWheel} fills={PLANE} />
          </g>

          {w.popup.life > 0 && (
            <text
              x={popupPos[0]}
              y={popupPos[1]}
              textAnchor="middle"
              fontSize={7}
              letterSpacing=".12em"
              fontFamily="var(--font-ed-mono)"
              fill={w.grade === 'greaser' ? 'var(--ed-accent)' : 'var(--ed-text)'}
              opacity={Math.min(1, w.popup.life * 2)}
            >
              {w.popup.text}
            </text>
          )}
          {w.tower.life > 0 && (
            <text
              x={towerPos[0]}
              y={towerPos[1]}
              textAnchor="middle"
              fontSize={5}
              fontFamily="var(--font-ed-mono)"
              fill="#9be59b"
              opacity={Math.min(1, w.tower.life * 2)}
            >
              “{w.tower.text}”
            </text>
          )}
        </svg>
      </Figure>
    </div>
  );
}

function lineAt(a: [number, number, number], b: [number, number, number]) {
  const [x1, y1] = project(...a);
  const [x2, y2] = project(...b);
  return { x1, y1, x2, y2 };
}
