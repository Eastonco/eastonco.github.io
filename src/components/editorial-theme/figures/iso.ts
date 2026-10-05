// Isometric projection helpers for the editorial theme's SVG figures.
// World axes: +x runs right-down, +y runs left-down, +z is up. The viewer looks from +x/+y,
// so a box shows its top, its x-max face ("right") and its y-max face ("left").

const C = Math.cos(Math.PI / 6);
const S = 0.5;

export function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * C, (x + y) * S - z];
}

export function pts(...corners: [number, number, number][]): string {
  return corners
    .map(([x, y, z]) => project(x, y, z))
    .map(([sx, sy]) => `${sx.toFixed(2)},${sy.toFixed(2)}`)
    .join(' ');
}

export interface Box {
  x: number;
  y: number;
  z: number;
  w: number; // along x
  d: number; // along y
  h: number; // along z
}

// Polygon point strings for the three visible faces.
export function boxFaces({ x, y, z, w, d, h }: Box) {
  const t = z + h;
  return {
    top: pts([x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]),
    left: pts([x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]),
    right: pts([x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]),
  };
}

// SVG transforms that map flat 2D drawing (u right, v down) onto a box face,
// with (0,0) at the face's top-left corner as seen by the viewer.
export function leftFace({ x, y, z, d, h }: Box): string {
  const [ox, oy] = project(x, y + d, z + h);
  return `matrix(${C},${S},0,1,${ox},${oy})`;
}

export function rightFace({ x, y, z, w, d, h }: Box): string {
  const [ox, oy] = project(x + w, y + d, z + h);
  return `matrix(${C},${-S},0,1,${ox},${oy})`;
}

export function topFace({ x, y, z, h }: Box): string {
  const [ox, oy] = project(x, y, z + h);
  return `matrix(${C},${S},${-C},${S},${ox},${oy})`;
}
