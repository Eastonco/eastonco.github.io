import Link from 'next/link';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import {
  BELIEFS,
  CASE_STUDIES,
  FIGURE_INTROS,
  LAB,
  LINKS,
  NOW,
  OFF_KEYBOARD,
  THESIS,
} from '@/content/site';
import Chrome from './Chrome';
import DeployGrid from './figures/DeployGrid';
import GlassCockpit from './figures/GlassCockpit';
import ReceiptPrinter from './figures/ReceiptPrinter';
import McpTerminal from './McpTerminal';
import './editorial.css';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-ed-serif',
});
const sans = Geist({ subsets: ['latin'], variable: '--font-ed-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-ed-mono' });

// A section's isometric figure beside its intro. `flip` puts the figure on the right.
function FigureRow({
  figure,
  intro,
  flip = false,
}: {
  figure: React.ReactNode;
  intro: { title: string; body: string };
  flip?: boolean;
}) {
  return (
    <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {figure}
      <div className={flip ? 'lg:order-first' : undefined}>
        <h2 className="ed-serif m-0 text-[clamp(32px,4vw,52px)] leading-[1.05]">{intro.title}</h2>
        <p className="mt-6 mb-0 max-w-lg text-[16px] leading-relaxed text-[var(--ed-muted)]">
          {intro.body}
        </p>
      </div>
    </div>
  );
}

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="ed-mono mb-10 flex items-center gap-4 text-[var(--ed-faint)]">
      <span className="text-[var(--ed-accent)]">{n}</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-[var(--ed-line)]" />
    </div>
  );
}

export default function EditorialTheme() {
  return (
    <div className={`ed ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <Chrome />

      <main className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* 00 · Intro */}
        <section id="top" className="flex min-h-[92svh] flex-col justify-center pt-24 pb-16">
          <p className="ed-mono mb-8 text-[var(--ed-faint)]">
            Software Engineer III · Expedia Group · Seattle
          </p>
          <h1 className="ed-serif m-0 max-w-5xl text-[clamp(44px,8vw,112px)] leading-[0.98]">
            {THESIS.headline}
          </h1>
          <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-[var(--ed-muted)]">
            {THESIS.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className="ed-link">
                {l.label}
              </a>
            ))}
            <a href="#now" className="ed-link">
              Query my CV with an agent
            </a>
          </div>
        </section>

        {/* 01 · Now */}
        <section id="now" className="border-t border-[var(--ed-line)] py-24">
          <SectionHead n="01" label={NOW.kicker} />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="ed-serif m-0 text-[clamp(32px,4vw,52px)] leading-[1.05]">
                {NOW.title}
              </h2>
              {NOW.body.map(p => (
                <p key={p} className="mt-6 text-[16px] leading-relaxed text-[var(--ed-muted)]">
                  {p}
                </p>
              ))}
            </div>
            <McpTerminal />
          </div>
        </section>

        {/* 02 · Beliefs */}
        <section id="beliefs" className="border-t border-[var(--ed-line)] py-24">
          <SectionHead n="02" label="What I believe" />
          <ol className="m-0 list-none p-0">
            {BELIEFS.map((b, i) => (
              <li
                key={b.title}
                className="grid gap-4 border-b border-[var(--ed-line)] py-10 first:pt-0 md:grid-cols-[80px_1fr_1fr] md:gap-10"
              >
                <span className="ed-mono pt-3 text-[var(--ed-faint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ed-serif m-0 text-[clamp(26px,3vw,38px)] leading-[1.1]">
                  {b.title}
                </h3>
                <p className="m-0 text-[16px] leading-relaxed text-[var(--ed-muted)] md:pt-2">
                  {b.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-[var(--ed-muted)]">
            Longer versions are in progress on the{' '}
            <Link href="/blog" className="ed-link">
              blog
            </Link>
            .
          </p>
        </section>

        {/* 03 · Work */}
        <section id="work" className="border-t border-[var(--ed-line)] py-24">
          <SectionHead n="03" label="Systems at scale" />
          <FigureRow figure={<DeployGrid />} intro={FIGURE_INTROS.work} />
          <div className="grid border-t border-l border-[var(--ed-line)] md:grid-cols-2">
            {CASE_STUDIES.map(c => (
              <article
                key={c.title}
                className="flex flex-col border-r border-b border-[var(--ed-line)] p-8 sm:p-10"
              >
                <div className="ed-serif text-[clamp(48px,6vw,76px)] leading-none">{c.metric}</div>
                <div className="ed-mono mt-3 text-[var(--ed-faint)]">{c.metricLabel}</div>
                <h3 className="mt-10 mb-0 text-[17px] font-medium">{c.title}</h3>
                <div className="ed-mono mt-2 text-[var(--ed-faint)]">{c.context}</div>
                <p className="mt-4 mb-0 text-[15px] leading-relaxed text-[var(--ed-muted)]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 04 · Lab */}
        <section id="lab" className="border-t border-[var(--ed-line)] py-24">
          <SectionHead n="04" label="Lab · things I build for fun" />
          <FigureRow figure={<ReceiptPrinter />} intro={FIGURE_INTROS.lab} flip />
          <ul className="m-0 list-none border-t border-[var(--ed-line)] p-0">
            {LAB.map(item => {
              const external = item.href.startsWith('http');
              return (
                <li key={item.name} className="border-b border-[var(--ed-line)]">
                  <a
                    href={item.href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="ed-row grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 px-2 py-5 md:grid-cols-[56px_200px_1fr_240px_24px] md:items-baseline"
                  >
                    <span className="ed-mono hidden text-[var(--ed-faint)] md:block">
                      {item.year ?? ''}
                    </span>
                    <span className="text-[16px] font-medium">{item.name}</span>
                    <span className="ed-row-arrow text-[var(--ed-faint)] md:order-last">↗</span>
                    <span className="col-span-2 text-[15px] leading-relaxed text-[var(--ed-muted)] md:col-span-1">
                      {item.note}
                    </span>
                    <span className="ed-mono col-span-2 text-[var(--ed-faint)] normal-case md:col-span-1 md:text-right">
                      {item.stack}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 05 · Off the keyboard */}
        <section id="off" className="border-t border-[var(--ed-line)] py-24">
          <SectionHead n="05" label="Off the keyboard" />
          <FigureRow figure={<GlassCockpit />} intro={FIGURE_INTROS.off} />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {OFF_KEYBOARD.map(o => (
              <div key={o.kicker}>
                <div className="ed-mono text-[var(--ed-faint)]">{o.kicker}</div>
                <h3 className="ed-serif mt-3 mb-0 text-[30px] leading-[1.1]">{o.title}</h3>
                <p className="mt-4 mb-0 text-[15px] leading-relaxed text-[var(--ed-muted)]">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ed-line)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <p className="ed-serif m-0 max-w-3xl text-[clamp(32px,4.5vw,56px)] leading-[1.05]">
            Working on agents inside a big company? I&apos;d like to compare notes.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className="ed-link">
                {l.label}
              </a>
            ))}
          </div>
          <div className="ed-mono mt-20 flex flex-wrap justify-between gap-4 text-[var(--ed-faint)]">
            <span>© {new Date().getFullYear()} Connor Easton</span>
            <a href="/status" className="hover:text-[var(--ed-muted)]">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
