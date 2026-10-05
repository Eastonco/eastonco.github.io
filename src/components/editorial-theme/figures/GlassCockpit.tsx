'use client';

import { useEffect, useRef, useState } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, type Box } from './iso';

// Fig. 4: a G1000-style primary flight display. The attitude drifts in light chop;
// clicking cycles level → right turn → level → left turn. The magenta course line is the site accent.
const BASE: Box = { x: -52, y: -16, z: -6, w: 104, d: 32, h: 6 };
const PANEL: Box = { x: -60, y: -6, z: 0, w: 120, d: 12, h: 82 };
const SCREEN = { x: 8, y: 8, w: 104, h: 60 };
const CX = SCREEN.x + SCREEN.w / 2;
const CY = SCREEN.y + SCREEN.h / 2 - 6;
const PX_PER_DEG = 2.2;
const COURSE = 270;
const PHASES = [0, 20, 0, -20]; // target bank per click
const PHASE_LABEL = [
  'Click to turn right',
  'Click to roll level',
  'Click to turn left',
  'Click to roll level',
];

export default function GlassCockpit() {
  const [phase, setPhase] = useState(0);
  const [att, setAtt] = useState({ bank: 0, pitch: 0, hdg: COURSE });
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(0);

  useEffect(() => {
    target.current = PHASES[phase];
  }, [phase]);

  // Animate only while on screen.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let running = false;
    let bank = 0;
    let hdg = COURSE;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (reduce) {
        bank = target.current;
      } else {
        bank += (target.current - bank) * 0.03;
        // ~3°/s at 20° of bank, i.e. a standard-rate turn at 60fps.
        hdg = (hdg + bank * 0.0025 + 360) % 360;
      }
      const chop = reduce ? 0 : Math.sin(t * 0.8) * 1.4 + Math.sin(t * 2.3) * 0.5;
      const pitch = reduce ? 0 : Math.sin(t * 0.55) * 1.2 + Math.sin(t * 1.7) * 0.3;
      setAtt({ bank: bank + chop, pitch, hdg });
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const { bank, pitch, hdg } = att;
  const hdgLabel = String(Math.round(hdg) % 360 || 360).padStart(3, '0');

  return (
    <div ref={ref}>
      <Figure
        n={4}
        title="G1000 PFD · N-172"
        cta={PHASE_LABEL[phase]}
        status={`HDG ${hdgLabel}° · bank ${Math.abs(Math.round(bank))}°`}
        onActivate={() => setPhase(p => (p + 1) % PHASES.length)}
      >
        <svg
          viewBox="-112 -124 224 166"
          className="block h-auto w-full"
          role="img"
          aria-label="Isometric glass cockpit display showing an attitude indicator and a magenta course line"
        >
          <IsoBox box={BASE} />
          <IsoBox box={PANEL} />

          <g transform={leftFace(PANEL)}>
            <clipPath id="ed-pfd-clip">
              <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx={1.5} />
            </clipPath>
            <g clipPath="url(#ed-pfd-clip)">
              {/* Attitude: horizon rotates opposite the bank and drops as the nose rises. */}
              <g transform={`rotate(${-bank} ${CX} ${CY}) translate(0 ${pitch * PX_PER_DEG})`}>
                <rect x={CX - 120} y={CY - 120} width={240} height={120} fill="#141c26" />
                <rect x={CX - 120} y={CY} width={240} height={120} fill="#1a1611" />
                <line
                  x1={CX - 120}
                  y1={CY}
                  x2={CX + 120}
                  y2={CY}
                  stroke="#ededea"
                  strokeWidth={0.6}
                />
                {[-10, -5, 5, 10].map(p => (
                  <line
                    key={p}
                    x1={CX - (Math.abs(p) === 10 ? 9 : 5)}
                    x2={CX + (Math.abs(p) === 10 ? 9 : 5)}
                    y1={CY - p * PX_PER_DEG}
                    y2={CY - p * PX_PER_DEG}
                    stroke="rgba(237,237,234,0.6)"
                    strokeWidth={0.4}
                  />
                ))}
              </g>

              {/* Bank scale and pointer. */}
              <path
                d={`M ${CX - 17} ${CY - 13} A 21 21 0 0 1 ${CX + 17} ${CY - 13}`}
                fill="none"
                stroke="rgba(237,237,234,0.5)"
                strokeWidth={0.4}
              />
              <polygon
                points={`${CX},${CY - 21} ${CX - 1.6},${CY - 18} ${CX + 1.6},${CY - 18}`}
                fill="#ededea"
                transform={`rotate(${-bank} ${CX} ${CY})`}
              />

              {/* Fixed aircraft symbol. */}
              <path
                d={`M ${CX - 14} ${CY} H ${CX - 5} L ${CX} ${CY + 3} L ${CX + 5} ${CY} H ${CX + 14}`}
                fill="none"
                stroke="#f2c94c"
                strokeWidth={1}
              />

              {/* HSI: compass card turns with heading; the course line stays on 270. */}
              <g transform={`translate(${CX} ${SCREEN.y + SCREEN.h + 8})`}>
                <circle r={22} fill="#0b0b0c" stroke="rgba(237,237,234,0.5)" strokeWidth={0.4} />
                <g transform={`rotate(${-hdg})`}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <line
                      key={i}
                      y1={-22}
                      y2={-19}
                      transform={`rotate(${i * 30})`}
                      stroke="rgba(237,237,234,0.6)"
                      strokeWidth={0.4}
                    />
                  ))}
                </g>
                <line
                  y1={18}
                  y2={-18}
                  transform={`rotate(${COURSE - hdg})`}
                  stroke="var(--ed-accent)"
                  strokeWidth={1.2}
                />
              </g>

              <rect x={CX - 8} y={SCREEN.y + 1.5} width={16} height={6} fill="#0b0b0c" />
              <text
                x={CX}
                y={SCREEN.y + 6}
                fontSize={4}
                textAnchor="middle"
                fill="#ededea"
                fontFamily="var(--font-ed-mono)"
              >
                {hdgLabel}°
              </text>
            </g>
            <rect
              x={SCREEN.x}
              y={SCREEN.y}
              width={SCREEN.w}
              height={SCREEN.h}
              rx={1.5}
              fill="none"
              stroke="var(--iso-line)"
            />

            {/* Softkeys along the bezel. */}
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                x={SCREEN.x + 1 + i * 8.6}
                y={SCREEN.y + SCREEN.h + 5}
                width={6.4}
                height={3}
                rx={0.8}
                fill="#0c0c0d"
                stroke="var(--iso-line-soft)"
                strokeWidth={0.5}
              />
            ))}
          </g>
        </svg>
      </Figure>
    </div>
  );
}
