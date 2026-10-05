'use client';

import { useEffect, useRef, useState } from 'react';
import Figure, { IsoBox } from './Figure';
import { leftFace, pts, rightFace, topFace, type Box } from './iso';

// Fig. 3: the receipt printer on my desk (printer.eastonco.net).
// Clicking feeds a new receipt out of the slot a line at a time.
const MESSAGES = [
  'hello from the internet',
  'nice site. ship it.',
  'saw your MCP server, very cool',
  'go fly somewhere today',
  'is this thing real??',
  'more coffee, fewer meetings',
  'greetings from a stranger',
];

const BODY: Box = { x: -40, y: -30, z: 0, w: 80, d: 60, h: 34 };
const PAPER_W = 50;
const PAPER_X = -25;
const SLOT_Y = -14; // paper exits through a slot toward the back of the top face
const FULL = 78;

export default function ReceiptPrinter() {
  const [count, setCount] = useState(41);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [length, setLength] = useState(FULL);
  const [printing, setPrinting] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const print = () => {
    if (printing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCount(c => c + 1);
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    if (reduce) return;
    setPrinting(true);
    setLength(0);
    // Thermal printers feed in short jerks, so step rather than ease.
    let l = 0;
    timer.current = setInterval(() => {
      l = Math.min(FULL, l + 4 + Math.random() * 3);
      setLength(l);
      if (l >= FULL) {
        clearInterval(timer.current);
        setPrinting(false);
      }
    }, 70);
  };

  const top = BODY.z + BODY.h;
  const paper: Box = { x: PAPER_X, y: SLOT_Y, z: top, w: PAPER_W, d: 0, h: length };

  return (
    <Figure
      n={3}
      title="Receipt printer · desk"
      cta="Click to print"
      status={printing ? 'printing…' : `receipt #${String(count).padStart(4, '0')}`}
      onActivate={print}
    >
      <svg
        viewBox="-122 -142 244 182"
        className="block h-auto w-full"
        role="img"
        aria-label="Isometric thermal receipt printer feeding out a printed receipt"
      >
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
          <rect x={6} y={30} width={68} height={24} rx={2} />
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
            fill={printing ? 'var(--ed-accent)' : '#9be59b'}
            className={printing ? 'ed-led' : undefined}
            style={{ animationDuration: '0.4s' }}
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
            <line key={i} x1={12 + i * 6} y1={12} x2={12 + i * 6} y2={24} />
          ))}
        </g>

        {/* Paper: a vertical sheet rising from the slot, printed top-first. */}
        {length > 0 && (
          <>
            <polygon
              points={pts(
                [PAPER_X, SLOT_Y, top],
                [PAPER_X + PAPER_W, SLOT_Y, top],
                [PAPER_X + PAPER_W, SLOT_Y, top + length],
                [PAPER_X, SLOT_Y, top + length]
              )}
              fill="#dcdad3"
              stroke="var(--iso-line)"
              strokeWidth={0.6}
            />
            <g transform={leftFace(paper)} fontFamily="var(--font-ed-mono)" fill="#1a1a1a">
              <clipPath id="ed-receipt-clip">
                <rect x={0} y={0} width={PAPER_W} height={length} />
              </clipPath>
              <g clipPath="url(#ed-receipt-clip)">
                <text x={PAPER_W / 2} y={9} fontSize={4} textAnchor="middle" letterSpacing=".2em">
                  RECEIPT
                </text>
                <text x={PAPER_W / 2} y={15} fontSize={3} textAnchor="middle" fill="#555">
                  #{String(count).padStart(4, '0')} · eastonco.net
                </text>
                <line
                  x1={4}
                  y1={20}
                  x2={PAPER_W - 4}
                  y2={20}
                  stroke="#999"
                  strokeDasharray="1.5 1.5"
                />
                {wrap(message, 20).map((line, i) => (
                  <text key={i} x={4} y={29 + i * 6} fontSize={4}>
                    {line}
                  </text>
                ))}
                <line
                  x1={4}
                  y1={52}
                  x2={PAPER_W - 4}
                  y2={52}
                  stroke="#999"
                  strokeDasharray="1.5 1.5"
                />
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
          </>
        )}
      </svg>
    </Figure>
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
