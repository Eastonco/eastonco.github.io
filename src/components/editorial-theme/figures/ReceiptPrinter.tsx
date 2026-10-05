'use client';

import { useRef } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, project, pts, rightFace, topFace, type Box } from './iso';
import { useSim } from './useFrame';

// Fig. 3: the receipt printer on my desk (printer.eastonco.net).
// Click a finished receipt to tear it off; it flips onto a growing pile on the desk.
// Click impatiently while it prints and the printer jams, shakes and smokes.
const MESSAGES = [
  'hello from the internet',
  'nice site. ship it.',
  'saw your MCP server, very cool',
  'go fly somewhere today',
  'is this thing real??',
  'more coffee, fewer meetings',
  'greetings from a stranger',
  'your printer is my printer now',
];

const DESK: Box = { x: -60, y: -45, z: -4, w: 120, d: 105, h: 4 };
const BODY: Box = { x: -40, y: -30, z: 0, w: 80, d: 50, h: 34 };
const PAPER_W = 50;
const PAPER_X = -25;
const SLOT_Y = -18;
const TOP = BODY.z + BODY.h;
const FULL = 78;
const PILE = { x: -28, y: 42 };
const IMPATIENCE = 3; // clicks while printing before it jams

type Flying = { p: number; crumpled: boolean; dir: number; from: [number, number] };
type Scrap = { dx: number; dy: number; rot: number; crumpled: boolean; seed: number };
type Puff = { x: number; y: number; life: number; vx: number; vy: number };

const initWorld = () => ({
  phase: 'ready' as 'ready' | 'printing' | 'jam',
  length: FULL,
  count: 41,
  message: MESSAGES[0],
  impatience: 0,
  flying: [] as Flying[],
  pile: [] as Scrap[],
  puffs: [] as Puff[],
  frame: 0,
  shake: [0, 0] as [number, number],
  t: 0,
});
type World = ReturnType<typeof initWorld>;

export default function ReceiptPrinter() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, poke] = useSim(ref, initWorld, step);

  const startPrint = (w: World) => {
    w.count++;
    w.message = MESSAGES[(w.count * 7) % MESSAGES.length];
    w.length = 0;
    w.impatience = 0;
    w.phase = 'printing';
  };

  const paperTop = (w: World): [number, number] => project(0, SLOT_Y, TOP + w.length);

  function step(w: World, t: number, reduce: boolean) {
    w.t = t;
    w.frame++;
    const amp = reduce ? 0 : w.phase === 'jam' ? 1.6 : w.phase === 'printing' ? 0.5 : 0;
    w.shake = [(Math.random() - 0.5) * amp, (Math.random() - 0.5) * amp];

    // Thermal printers feed in short jerks.
    if (w.phase === 'printing') {
      if (reduce) w.length = FULL;
      else if (w.frame % 4 === 0) w.length = Math.min(FULL, w.length + 4.5);
      if (w.length >= FULL) w.phase = 'ready';
    }

    if (w.phase === 'jam' && !reduce && w.frame % 3 === 0) {
      const [sx, sy] = project(0, SLOT_Y, TOP + 4);
      w.puffs.push({ x: sx + (Math.random() - 0.5) * 20, y: sy, life: 1, vx: 0, vy: -0.5 });
    }

    for (const f of w.flying) f.p = reduce ? 1 : f.p + 0.03;
    for (const f of w.flying.filter(f => f.p >= 1)) {
      w.pile.push({
        dx: (Math.random() - 0.5) * 14,
        dy: (Math.random() - 0.5) * 10,
        rot: Math.random() * Math.PI,
        crumpled: f.crumpled,
        seed: Math.random() * 100,
      });
      if (w.pile.length > 14) w.pile.shift();
      const [px, py] = project(PILE.x, PILE.y, 0);
      for (let i = 0; i < 4; i++) {
        w.puffs.push({ x: px, y: py, life: 0.7, vx: (Math.random() - 0.5) * 2, vy: -0.3 });
      }
    }
    w.flying = w.flying.filter(f => f.p < 1);

    for (const p of w.puffs) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.92;
      p.life -= 0.02;
    }
    w.puffs = w.puffs.filter(p => p.life > 0);
  }

  const activate = () =>
    poke(w => {
      if (w.phase === 'ready') {
        w.flying.push({
          p: 0,
          crumpled: false,
          dir: Math.random() < 0.5 ? -1 : 1,
          from: paperTop(w),
        });
        startPrint(w);
      } else if (w.phase === 'printing') {
        if (++w.impatience >= IMPATIENCE) w.phase = 'jam';
      } else {
        w.flying.push({ p: 0, crumpled: true, dir: 1, from: paperTop(w) });
        startPrint(w);
      }
    });

  const jammed = w.phase === 'jam';
  const jitter = `translate(${w.shake[0]} ${w.shake[1]})`;
  const [baseX, baseY] = project(0, SLOT_Y, TOP);
  const sway = w.phase === 'ready' ? Math.sin(w.t * 1.6) * 1.4 : 0;
  const paper: Box = { x: PAPER_X, y: SLOT_Y, z: TOP, w: PAPER_W, d: 0, h: w.length };
  const [pileX, pileY] = project(PILE.x, PILE.y, 0);

  const cta = jammed
    ? 'Click to clear the jam'
    : w.phase === 'ready'
      ? 'Click to tear off'
      : 'Printing… patience';
  const status = jammed
    ? 'PAPER JAM'
    : w.phase === 'printing'
      ? 'printing…'
      : `receipt #${String(w.count).padStart(4, '0')}${w.pile.length ? ` · pile ${w.pile.length}` : ''}`;

  return (
    <div ref={ref}>
      <Figure n={3} title="Receipt printer · desk" cta={cta} status={status} onActivate={activate}>
        <svg
          viewBox="-112 -142 224 210"
          className="block h-auto w-full"
          role="img"
          aria-label="Isometric thermal receipt printer on a desk, feeding out receipts onto a pile"
        >
          <IsoBox box={DESK} fills={{ top: '#151517', left: '#101012', right: '#0c0c0d' }} />

          {/* The pile of torn-off receipts and crumpled jams. */}
          {w.pile.map((s, i) => {
            const cx = PILE.x + s.dx;
            const cy = PILE.y + s.dy;
            if (s.crumpled) {
              const [x, y] = project(cx, cy, 3 + i * 0.4);
              const blob = Array.from({ length: 8 }, (_, k) => {
                const a = (k / 8) * Math.PI * 2;
                const r = 4.5 + Math.sin(s.seed + k * 2.3) * 1.3;
                return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r * 0.8).toFixed(1)}`;
              }).join(' ');
              return (
                <polygon key={i} points={blob} fill="#cfcdc6" stroke="#8a8882" strokeWidth={0.5} />
              );
            }
            const corner = (u: number, v: number): [number, number, number] => [
              cx + u * Math.cos(s.rot) - v * Math.sin(s.rot),
              cy + u * Math.sin(s.rot) + v * Math.cos(s.rot),
              0.3 + i * 0.4,
            ];
            return (
              <polygon
                key={i}
                points={pts(corner(-6, -12), corner(6, -12), corner(6, 12), corner(-6, 12))}
                fill="#dcdad3"
                stroke="#8a8882"
                strokeWidth={0.5}
              />
            );
          })}

          <g transform={jitter}>
            <IsoBox box={BODY} />

            {/* Top: paper slot and a tear bar. */}
            <g transform={topFace(BODY)} fill="none" stroke="var(--iso-line-soft)">
              <rect
                x={PAPER_X - BODY.x - 3}
                y={SLOT_Y - BODY.y - 2}
                width={PAPER_W + 6}
                height={4}
                rx={1}
              />
              <rect x={6} y={26} width={68} height={18} rx={2} />
            </g>

            {/* Front: label, status light, feed button. */}
            <g transform={leftFace(BODY)}>
              <text
                x={6}
                y={9}
                fontSize={4.4}
                letterSpacing=".18em"
                fill="var(--ed-faint)"
                fontFamily="var(--font-ed-mono)"
              >
                RCPT-01
              </text>
              <circle
                cx={64}
                cy={7.5}
                r={1.6}
                fill={jammed ? '#ff5c5c' : w.phase === 'printing' ? 'var(--ed-accent)' : '#9be59b'}
                className={w.phase === 'ready' ? undefined : 'ed-led'}
                style={{ animationDuration: jammed ? '0.25s' : '0.4s' }}
              />
              <rect
                x={56}
                y={20}
                width={16}
                height={7}
                rx={1.5}
                fill="#0c0c0d"
                stroke="var(--iso-line-soft)"
              />
            </g>

            {/* Side: vents. */}
            <g transform={rightFace(BODY)} stroke="var(--iso-line-soft)">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line key={i} x1={10 + i * 6} y1={12} x2={10 + i * 6} y2={24} />
              ))}
            </g>

            {/* Paper: printed top-first; sways once it is done, crumples when jammed. */}
            {w.length > 0 && (
              <g transform={`rotate(${sway} ${baseX} ${baseY})`}>
                {jammed ? (
                  <polygon
                    points={pts(
                      [PAPER_X, SLOT_Y, TOP],
                      [PAPER_X + 6, SLOT_Y, TOP + w.length * 0.25],
                      [PAPER_X - 2, SLOT_Y, TOP + w.length * 0.45],
                      [PAPER_X + 8, SLOT_Y, TOP + w.length * 0.6],
                      [PAPER_X + PAPER_W - 8, SLOT_Y, TOP + w.length * 0.62],
                      [PAPER_X + PAPER_W + 2, SLOT_Y, TOP + w.length * 0.4],
                      [PAPER_X + PAPER_W - 5, SLOT_Y, TOP + w.length * 0.2],
                      [PAPER_X + PAPER_W, SLOT_Y, TOP]
                    )}
                    fill="#cfcdc6"
                    stroke="#8a8882"
                    strokeWidth={0.6}
                  />
                ) : (
                  <>
                    <polygon
                      points={pts(
                        [PAPER_X, SLOT_Y, TOP],
                        [PAPER_X + PAPER_W, SLOT_Y, TOP],
                        [PAPER_X + PAPER_W, SLOT_Y, TOP + w.length],
                        [PAPER_X, SLOT_Y, TOP + w.length]
                      )}
                      fill="#dcdad3"
                      stroke="var(--iso-line)"
                      strokeWidth={0.6}
                    />
                    <Receipt paper={paper} count={w.count} message={w.message} />
                  </>
                )}
              </g>
            )}
          </g>

          {/* Torn-off receipts in flight: an arc and a spin toward the pile. */}
          {w.flying.map((f, i) => {
            const x = f.from[0] + (pileX - f.from[0]) * f.p;
            const y = f.from[1] + (pileY - f.from[1]) * f.p - Math.sin(Math.PI * f.p) * 45;
            const s = 1 - f.p * 0.5;
            return (
              <g
                key={i}
                transform={`translate(${x} ${y}) rotate(${f.p * 540 * f.dir}) scale(${s})`}
              >
                {f.crumpled ? (
                  <circle r={6} fill="#cfcdc6" stroke="#8a8882" strokeWidth={0.6} />
                ) : (
                  <rect
                    x={-10}
                    y={-18}
                    width={20}
                    height={36}
                    fill="#dcdad3"
                    stroke="#8a8882"
                    strokeWidth={0.6}
                  />
                )}
              </g>
            );
          })}

          {w.puffs.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={2 + (1 - p.life) * 5}
              fill="rgba(237,237,234,0.4)"
              opacity={p.life}
            />
          ))}

          {jammed && (
            <text
              x={baseX}
              y={baseY - 60}
              textAnchor="middle"
              fontSize={7}
              letterSpacing=".15em"
              fill="#ff5c5c"
              fontFamily="var(--font-ed-mono)"
              opacity={Math.floor(w.t * 3) % 2 ? 1 : 0.4}
            >
              PAPER JAM
            </text>
          )}
        </svg>
      </Figure>
    </div>
  );
}

// The printed receipt, drawn flat and mapped onto the paper's face.
function Receipt({ paper, count, message }: { paper: Box; count: number; message: string }) {
  const id = String(count).padStart(4, '0');
  return (
    <g transform={leftFace(paper)} fontFamily="var(--font-ed-mono)" fill="#1a1a1a">
      <clipPath id="ed-receipt-clip">
        <rect x={0} y={0} width={PAPER_W} height={paper.h} />
      </clipPath>
      <g clipPath="url(#ed-receipt-clip)">
        <text x={PAPER_W / 2} y={9} fontSize={4} textAnchor="middle" letterSpacing=".2em">
          RECEIPT
        </text>
        <text x={PAPER_W / 2} y={15} fontSize={3} textAnchor="middle" fill="#555">
          #{id} · eastonco.net
        </text>
        <line x1={4} y1={20} x2={PAPER_W - 4} y2={20} stroke="#999" strokeDasharray="1.5 1.5" />
        {wrap(message, 20).map((line, i) => (
          <text key={i} x={4} y={29 + i * 6} fontSize={4}>
            {line}
          </text>
        ))}
        <line x1={4} y1={52} x2={PAPER_W - 4} y2={52} stroke="#999" strokeDasharray="1.5 1.5" />
        <text x={4} y={60} fontSize={3} fill="#555">
          FROM
        </text>
        <text x={PAPER_W - 4} y={60} fontSize={3} textAnchor="end" fill="#555">
          a stranger
        </text>
        <text x={PAPER_W / 2} y={71} fontSize={3} textAnchor="middle" fill="#555">
          thank you!
        </text>
      </g>
    </g>
  );
}

// Greedy word wrap for the narrow receipt.
function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}
