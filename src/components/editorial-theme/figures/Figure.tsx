'use client';

import type { ReactNode } from 'react';
import { boxFaces, type Box } from './iso';

// Card frame shared by every figure: label on top, drawing in the middle,
// the call to action and a live status line underneath. Clicking anywhere triggers it.
export default function Figure({
  n,
  title,
  cta,
  status,
  onActivate,
  children,
}: {
  n: number;
  title: string;
  cta: string;
  status: string;
  onActivate: () => void;
  children: ReactNode;
}) {
  return (
    <figure className="ed-fig m-0">
      <button
        type="button"
        onClick={onActivate}
        className="flex h-full w-full cursor-pointer flex-col rounded-xl border border-[var(--ed-line)] bg-[var(--ed-surface)] text-left transition-colors hover:border-[var(--ed-line-strong)]"
      >
        <span className="ed-mono flex w-full justify-between px-4 pt-4 text-[var(--ed-faint)]">
          <span>Fig. {n}</span>
          <span>{title}</span>
        </span>
        <span className="block w-full flex-1 px-4">{children}</span>
        <span className="ed-mono flex w-full justify-between gap-4 px-4 pb-4 text-[var(--ed-faint)]">
          <span className="text-[var(--ed-muted)]">{cta}</span>
          <span aria-live="polite">{status}</span>
        </span>
      </button>
    </figure>
  );
}

// One shaded box. Faces default to the --iso-* tokens from editorial.css; pass `fills` to paint it.
export function IsoBox({
  box,
  top,
  fills,
  opacity,
}: {
  box: Box;
  top?: string;
  fills?: { top: string; left: string; right: string };
  opacity?: number;
}) {
  const f = boxFaces(box);
  return (
    <g strokeWidth={0.8} strokeLinejoin="round" stroke="var(--iso-line)" opacity={opacity}>
      <polygon points={f.left} fill={fills?.left ?? 'var(--iso-left)'} />
      <polygon points={f.right} fill={fills?.right ?? 'var(--iso-right)'} />
      <polygon points={f.top} fill={top ?? fills?.top ?? 'var(--iso-top)'} />
    </g>
  );
}
