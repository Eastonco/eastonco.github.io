# Style Guide — eastonco.github.io

Active theme: **Framer** (`src/components/themes/framer.tsx` → `src/app/page.tsx`)

Other themes kept for reference: `cozy`, `web2`, `retro` (all in `src/components/themes/`).

---

## Framer Theme

A modern dark product-site aesthetic. Glassmorphic cards, animated gradient mesh background, scroll-triggered reveals, and green operational status lights.

---

## Color Palette

Every color in the theme is derived from these base values. Use them consistently — avoid one-off hex codes.

### Background & Surface

| Name | Value | Where used |
|------|-------|------------|
| Root background | `#0A0A0E` | `<body>` / root div |
| Surface (default) | `rgba(255,255,255,0.04)` | All glass cards at rest |
| Surface (hover) | `rgba(255,255,255,0.07)` | Card hover state |
| Surface (subtle row) | `rgba(255,255,255,0.03)` | System status row hover |

### Borders

| Name | Value | Where used |
|------|-------|------------|
| Border default | `rgba(255,255,255,0.08)` | Card edges, nav |
| Border hover | `rgba(255,255,255,0.14)` | Card edge on hover |
| Border faint | `rgba(255,255,255,0.06)` | Footer divider, section lines |
| Border strong | `rgba(255,255,255,0.1)` | Ghost button border |
| Border strong hover | `rgba(255,255,255,0.18)` | Ghost button border on hover |

### Text

| Name | Value | Where used |
|------|-------|------------|
| Text primary | `#F2F2F5` | Headings, active nav, labels |
| Text body | `rgba(242,242,245,0.55)` | Hero bio paragraph |
| Text secondary | `rgba(242,242,245,0.5)` | Card body copy |
| Text muted | `rgba(242,242,245,0.4)` | Stat card labels |
| Text faint | `rgba(242,242,245,0.35)` | Uptime values |
| Text dim | `rgba(242,242,245,0.3)` | Section labels (`.fr-label`) |
| Text subdued | `rgba(242,242,245,0.45)` | Nav links at rest |
| Text link rest | `rgba(242,242,245,0.5)` | Project "View →" link |

> **Rule:** Never use pure `rgba(242,242,245,1)` / `#F2F2F5` for body text. It is reserved for headings and high-emphasis elements only. Body always uses an opacity step.

### Accent Colors

| Name | Constant | Value | Where used |
|------|----------|-------|------------|
| Violet | `VIOLET` | `#7B5FEA` | Gradient start, skill dot, label dot |
| Blue | `BLUE` | `#4F9EE8` | Gradient mid, skill dot |
| Green | `GREEN` | `#4ADE80` | Status lights, system dots |
| Green bg tint | — | `rgba(74,222,128,0.08)` | Status pill background in nav |
| Green border | — | `rgba(74,222,128,0.18)` | Status pill border in nav |
| Green text dim | — | `rgba(74,222,128,0.7)` | Footer status text |

### Gradient

The signature gradient runs `VIOLET → BLUE → text-faint`. Applied to the last name in the hero and the contact card gradient border:

```
linear-gradient(135deg, #7B5FEA 0%, #4F9EE8 50%, rgba(242,242,245,0.8) 100%)
```

Stat card numbers use a simpler white fade:
```
linear-gradient(135deg, #F2F2F5, rgba(242,242,245,0.45))
```

### Shadow

| Usage | Value |
|-------|-------|
| Card hover depth | `0 24px 60px rgba(0,0,0,0.5)` |
| Nav pill | `0 8px 32px rgba(0,0,0,0.4)` |
| White button | `0 0 0 1px rgba(255,255,255,0.15), 0 4px 20px rgba(255,255,255,0.08)` |
| White button hover | `0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(255,255,255,0.14)` |
| Project card (per-card) | `0 24px 64px {project.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)` |

---

## Typography

### Fonts

```tsx
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
```

Both are variable fonts — no `weight` declaration needed. Apply both variables to the root element:

```tsx
<div className={`${bricolage.variable} ${dm.variable}`}>
```

| Role | CSS Variable | Font | Usage |
|------|-------------|------|-------|
| Display / headings | `var(--font-display)` | Bricolage Grotesque | Hero name, card headlines, nav logo, stat numbers |
| Body / UI | `var(--font-body)` | DM Sans | Bio copy, buttons, labels, tags, chips |
| Monospace | `monospace` (system) | System mono | Year metadata, uptime values |

### Type Scale

| Element | Size | Weight | Tracking | Line-height | Notes |
|---------|------|--------|----------|-------------|-------|
| Hero name | `clamp(64px, 11vw, 148px)` | 800 | `-0.04em` | `0.9` | Two separate `<h1>` elements |
| Contact heading | `clamp(40px, 6vw, 76px)` | 800 | `-0.04em` | `0.95` | — |
| Bento quote | `clamp(22px, 2.8vw, 30px)` | 700 | — | `1.45` | `var(--font-display)` |
| Project card title | `22px` | 700 | `-0.02em` | — | — |
| Stat number | `44px` | 800 | `-0.03em` | `1` | Gradient clipped |
| Hero bio | `17px` | 400 | — | `1.75` | `rgba(242,242,245,0.55)` |
| Card body | `15px` | 400 | — | `1.8` | `rgba(242,242,245,0.5)` |
| Project desc | `14px` | 400 | — | `1.7` | — |
| Button | `14px` | 600 | — | — | `var(--font-body)` |
| Chip | `13px` | 500 | — | — | — |
| Section label | `11px` | 600 | `0.12em` | — | Uppercase, `rgba(242,242,245,0.3)` |
| Tag | `11px` | 500 | — | — | — |
| Nav link | `14px` | 400 | — | — | — |
| Hero eyebrow | `12px` | 600 | `0.08em` | — | Uppercase pill |
| Uptime / year | `11px` | 600 | — | — | Monospace |

### Gradient Text

Used on the hero surname and stat numbers. Pattern:

```css
background: linear-gradient(135deg, #7B5FEA 0%, #4F9EE8 50%, rgba(242,242,245,0.8) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

In React inline styles:
```tsx
style={{
  background: `linear-gradient(135deg, ${VIOLET} 0%, ${BLUE} 50%, rgba(242,242,245,0.8) 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}
```

---

## Layout

### Page Structure

```
[fixed: gradient mesh background]
[fixed: nav pill — centered]

<section> Hero         — minHeight 100vh, flex center, padding 100px 32px 80px
<section> Bento grid   — maxWidth 1100, padding 0 32px 80px
<section> Skills       — maxWidth 1100, padding 0 32px 80px
<section> Work         — maxWidth 1100, padding 0 32px 80px
<section> Contact      — maxWidth 1100, padding 0 32px 100px
<footer>               — maxWidth 1100, padding 28px 32px
```

All content sections share `maxWidth: 1100` and `margin: '0 auto'`. The hero is full-width with internal centering.

### Bento Grid

A `3-column` CSS grid with `gap: 12px`:

```
[Bio card — gridColumn 1/3]  [Status card — col 3]
[Stat card — col 1]  [Stat card — col 2]  [Stat card — col 3]
```

```css
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 12px;
```

### Project Grid

Two equal columns:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
```

---

## Components

### Glass Card — `.fr-card`

The core surface component. Everything interactive is a glass card.

```css
.fr-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s !important;
}
.fr-card:hover {
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-3px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}
```

> `!important` is required because `globals.css` applies `transition-duration: 200ms` to `*`, which overrides custom durations without it.

### Mouse Spotlight — `.fr-spot`

Layered on top of `.fr-card` to add a radial gradient that follows the cursor. Uses CSS custom properties set from a React `onMouseMove` handler.

```css
.fr-spot { position: relative; overflow: hidden; }
.fr-spot::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(480px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.055), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s !important;
}
.fr-spot:hover::after { opacity: 1; }
```

```tsx
function trackMouse(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
}

// Usage:
<div className="fr-card fr-spot" onMouseMove={trackMouse}>
```

### Gradient Border — `.fr-grad-wrap` / `.fr-grad-inner`

Used on the contact CTA. A `::before` pseudo-element sits at `inset: -1px` and fades in on hover, creating the appearance of a gradient border.

```css
.fr-grad-wrap { position: relative; border-radius: 20px; }
.fr-grad-wrap::before {
  content: ''; position: absolute; inset: -1px; border-radius: 21px; z-index: 0;
  background: linear-gradient(135deg, #7B5FEA, #4F9EE8, #4ADE80);
  opacity: 0;
  transition: opacity 0.4s !important;
}
.fr-grad-wrap:hover::before { opacity: 1; }
.fr-grad-inner { position: relative; z-index: 1; border-radius: 20px; }
```

```tsx
<div className="fr-grad-wrap">
  <div className="fr-card fr-spot fr-grad-inner">
    {/* content */}
  </div>
</div>
```

> The `border-radius` on `::before` must be `border-radius + 1px` to exactly cover the card corners. The inner element needs `position: relative; z-index: 1` to sit above the pseudo-element.

### Buttons

Two variants: **primary** (white) and **ghost** (transparent).

```css
.fr-btn {
  display: inline-block; padding: 11px 26px; border-radius: 10px;
  font-family: var(--font-body); font-size: 14px; font-weight: 600;
  text-decoration: none; cursor: pointer;
  transition: all 0.18s !important;
}

/* Primary — white fill */
.fr-btn-white {
  background: white; color: #0A0A0E;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 4px 20px rgba(255,255,255,0.08);
}
.fr-btn-white:hover {
  background: rgba(255,255,255,0.92);
  transform: translateY(-1px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(255,255,255,0.14);
}

/* Ghost — translucent */
.fr-btn-ghost {
  background: rgba(255,255,255,0.06); color: #F2F2F5;
  border: 1px solid rgba(255,255,255,0.1);
}
.fr-btn-ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.18);
  transform: translateY(-1px);
}
```

> The white button's `box-shadow` uses two layers: a `0 0 0 1px` ring (acts as a border) and a diffuse glow. This avoids using `border` which would shift the layout.

### Skill Chip — `.fr-chip`

Pill-shaped tag with a colored dot indicator.

```css
.fr-chip {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 15px; border-radius: 99px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  font-size: 13px; font-weight: 500;
  transition: background 0.18s, border-color 0.18s, transform 0.18s !important;
  cursor: default;
}
.fr-chip:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.16);
  transform: translateY(-1px);
}
```

```tsx
<span className="fr-chip">
  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7B5FEA', flexShrink: 0 }} />
  TypeScript
</span>
```

### Tag — `.fr-tag`

Smaller, non-interactive label used inside project cards.

```css
.fr-tag {
  font-size: 11px; padding: 3px 10px; border-radius: 99px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(242,242,245,0.6);
  font-weight: 500;
}
```

### Section Label — `.fr-label`

The `01 ·`, `02 ·` section numbering used above each content block.

```css
.fr-label {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(242,242,245,0.3);
}
```

### Nav Link — `.fr-nav`

```css
.fr-nav {
  font-size: 14px; text-decoration: none;
  color: rgba(242,242,245,0.45);
  padding: 6px 14px; border-radius: 8px;
  transition: color 0.15s, background 0.15s !important;
}
.fr-nav:hover { color: #F2F2F5; background: rgba(255,255,255,0.07); }
```

### System Status Row — `.fr-sys`

```css
.fr-sys {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 4px; border-bottom: 1px solid rgba(255,255,255,0.05);
  border-radius: 6px;
  transition: background 0.15s !important;
}
.fr-sys:last-child { border-bottom: none; }
.fr-sys:hover { background: rgba(255,255,255,0.03); }
```

Each row contains a `6px` green dot + skill name on the left, and a monospace uptime value on the right.

---

## Animation System

### 1. Hero Load Stagger

Five elements animate in on page load using a single `@keyframes fr-load` with staggered `animation-delay`. The `both` fill-mode means elements start invisible before the delay fires.

```css
@keyframes fr-load {
  from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}

.h0 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s both; }  /* eyebrow label */
.h1 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both; }  /* "Connor" */
.h2 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s both; }  /* "Easton" gradient */
.h3 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.38s both; }  /* bio paragraph */
.h4 { animation: fr-load 0.75s cubic-bezier(0.16,1,0.3,1) 0.52s both; }  /* CTA buttons */
```

The easing `cubic-bezier(0.16, 1, 0.3, 1)` is a snappy spring: fast start, overshoots slightly, settles. This is the standard Framer motion easing.

### 2. Scroll Reveal

All below-the-fold content uses `IntersectionObserver`. Elements start hidden via CSS and gain `.fr-on` when they enter the viewport.

**CSS:**
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(22px);
  filter: blur(3px);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    filter 0.7s cubic-bezier(0.16,1,0.3,1) !important;
}
.fr-on {
  opacity: 1 !important;
  transform: none !important;
  filter: blur(0) !important;
}
```

**React (runs once on mount):**
```tsx
useEffect(() => {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = parseInt((e.target as HTMLElement).dataset.delay ?? '0');
          setTimeout(() => e.target.classList.add('fr-on'), d);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((el) => obs.observe(el));
  return () => obs.disconnect();
}, []);
```

**Usage on elements:**
```tsx
<div data-reveal data-delay="0">First item</div>
<div data-reveal data-delay="100">Second item (100ms later)</div>
<div data-reveal data-delay="200">Third item (200ms later)</div>
```

`data-delay` is in milliseconds. The `setTimeout` inside the observer creates the stagger without needing separate CSS classes. Set `threshold: 0.08` so elements trigger as soon as 8% is visible — earlier than the default 0, giving a more responsive feel.

### 3. Green Status Pulse

The `box-shadow` keyframe expands from `0` radius to `8px` with full transparency — creating an outward ripple ring effect.

```css
@keyframes fr-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); }
  60%      { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
}
.fr-pulse { animation: fr-pulse 2.4s ease-in-out infinite; }
```

```tsx
<div
  className="fr-pulse"
  style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80' }}
/>
```

Used in three places: nav status pill, system status card header, footer.

### 4. Background Mesh Animation

The gradient mesh container is oversized (`inset: '-20%'`) so the slow scale/translate animation never reveals the edge of the background. The three `radial-gradient` ellipses create a living ambient light effect.

```css
@keyframes fr-mesh {
  0%,100% { transform: scale(1) translate(0, 0); }
  40%     { transform: scale(1.06) translate(-1%, 2%); }
  70%     { transform: scale(0.96) translate(2%, -1%); }
}
.fr-mesh { animation: fr-mesh 22s ease-in-out infinite; }
```

```tsx
<div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
  <div
    className="fr-mesh"
    style={{
      position: 'absolute', inset: '-20%',
      background: `
        radial-gradient(ellipse at 18% 32%, rgba(123,95,234,0.22) 0%, transparent 52%),
        radial-gradient(ellipse at 82% 14%, rgba(79,158,232,0.14) 0%, transparent 44%),
        radial-gradient(ellipse at 55% 82%, rgba(74,222,128,0.09) 0%, transparent 40%)
      `,
    }}
  />
  {/* Grid overlay */}
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
    `,
    backgroundSize: '80px 80px',
  }} />
</div>
```

### 5. Project Card Colored Glow

Each project has a `glowColor` value. The `box-shadow` is set directly via `onMouseEnter`/`onMouseLeave` rather than CSS classes because the color is dynamic.

```tsx
onMouseEnter={e => {
  (e.currentTarget as HTMLDivElement).style.boxShadow =
    `0 24px 64px ${p.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`;
}}
onMouseLeave={e => {
  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
}}
```

The `.fr-proj-glow` class provides the transition:
```css
.fr-proj-glow { transition: box-shadow 0.3s, transform 0.3s !important; }
```

---

## Background

### Gradient Mesh

Three overlapping `radial-gradient` ellipses create ambient colored zones. Opacity is kept low to avoid overwhelming the dark background:

| Zone | Position | Color | Opacity |
|------|----------|-------|---------|
| Violet | `18% 32%` | `#7B5FEA` (123,95,234) | `0.22` |
| Blue | `82% 14%` | `#4F9EE8` (79,158,232) | `0.14` |
| Green | `55% 82%` | `#4ADE80` (74,222,128) | `0.09` |

### Grid Overlay

A `1px` line grid at `80px` spacing creates a subtle depth reference without looking like a design tool artifact. Opacity `0.025` — barely visible, but present.

---

## Adding New Components

When building new UI for this theme:

1. **Cards** → use `.fr-card` + `.fr-spot` + `onMouseMove={trackMouse}` + `data-reveal`
2. **Interactive text links** → use inline `onMouseEnter`/`onMouseLeave` to toggle between `rgba(242,242,245,0.5)` and `#F2F2F5`
3. **Status indicators** → green `#4ADE80` dot with `.fr-pulse`, wrapped in `rgba(74,222,128,0.08)` pill with `rgba(74,222,128,0.18)` border
4. **Section headers** → `.fr-label` above the content, `data-reveal` on both the label and the first content block
5. **CTAs** → primary actions use `.fr-btn.fr-btn-white`, secondary use `.fr-btn.fr-btn-ghost`
6. **Headlines inside cards** → `var(--font-display)`, `fontWeight: 700`, `letterSpacing: '-0.02em'`

### Transition `!important` rule

`globals.css` has:
```css
* { transition-duration: 200ms; }
```

Every `transition` property in this theme must end with `!important` or the custom duration will be silently ignored.

```css
/* ✅ Correct */
.fr-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s !important; }

/* ❌ Will be overridden — appears to work but snaps at 200ms */
.fr-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
```

---

## Applying to Production

In `src/app/page.tsx`:

```tsx
import FramerTheme from '@/components/themes/framer';

const isSiteLive = true;

export default function Home() {
  return isSiteLive ? <FramerTheme /> : <UnderConstruction />;
}
```

The theme is fully self-contained — fonts, colors, animations, and layout are all internal to `framer.tsx`.
