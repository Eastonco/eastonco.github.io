import Script from 'next/script';

type Status = 'operational' | 'degraded' | 'major_outage';

const SERVICES: Array<{ name: string; status: Status; uptimePct: number; seed: number }> = [
  { name: 'Connor Easton', status: 'operational', uptimePct: 100, seed: 11 },
  { name: 'Left Brain (Logic Engine)', status: 'operational', uptimePct: 99.8, seed: 22 },
  { name: 'Right Brain (Creative Suite)', status: 'degraded', uptimePct: 87, seed: 33 },
  { name: 'Coffee Intake API', status: 'degraded', uptimePct: 85, seed: 44 },
  { name: 'Social Battery', status: 'major_outage', uptimePct: 42, seed: 55 },
  { name: 'GitHub Commit Frequency', status: 'operational', uptimePct: 99.5, seed: 66 },
  { name: 'Meeting Tolerance', status: 'operational', uptimePct: 99.7, seed: 77 },
  { name: 'Twitter Posting Impulse', status: 'operational', uptimePct: 99.9, seed: 88 },
];

// ponytail: LCG for deterministic bars — no Math.random() hydration risk
function generateBars(uptimePct: number, seed: number): number[] {
  let rng = seed * 1664525;
  return Array.from({ length: 90 }, () => {
    rng = (rng * 1664525 + 1013904223) >>> 0;
    const r = (rng / 0xffffffff) * 100;
    if (r > uptimePct + 5) return 2; // red
    if (r > uptimePct) return 1; // yellow
    return 0; // green
  });
}

const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
  operational: { label: 'Operational', color: '#2EB886' },
  degraded: { label: 'Degraded Performance', color: '#F1C40F' },
  major_outage: { label: 'Major Outage', color: '#E74C3C' },
};

const BAR_COLORS = ['#2EB886', '#F1C40F', '#E74C3C'];

const overallStatus: Status = SERVICES.some((s) => s.status === 'major_outage')
  ? 'major_outage'
  : SERVICES.some((s) => s.status === 'degraded')
    ? 'degraded'
    : 'operational';

const OVERALL_LABEL: Record<Status, string> = {
  operational: 'All Systems Operational',
  degraded: 'Partial System Outage',
  major_outage: 'Major System Outage',
};

export default function StatusPage() {
  const { color: bannerColor } = STATUS_CONFIG[overallStatus];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1868DB] text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-gray-900">Connor Easton</span>
          </div>
          <span className="text-sm font-semibold text-[#1868DB]">Statuspage</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Overall status banner */}
        <div className="mb-8 rounded-md px-6 py-5 text-white" style={{ backgroundColor: bannerColor }}>
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-xl font-semibold">{OVERALL_LABEL[overallStatus]}</span>
          </div>
        </div>

        {/* Components */}
        <section className="mb-10">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500">
            Current Status by Service
          </h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200">
            {SERVICES.map((service) => {
              const cfg = STATUS_CONFIG[service.status];
              const bars = generateBars(service.uptimePct, service.seed);

              return (
                <div key={service.name} className="bg-white px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[15px] font-medium text-gray-800">{service.name}</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="text-sm font-medium" style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  {/* 90-day uptime bars */}
                  <div className="flex gap-px">
                    {bars.map((bar, i) => (
                      <div
                        key={i}
                        className="h-7 flex-1 rounded-[2px]"
                        style={{ backgroundColor: BAR_COLORS[bar] }}
                        title={`${90 - i} days ago`}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] text-gray-400">
                    <span>90 days ago</span>
                    <span>{service.uptimePct.toFixed(2)}% uptime</span>
                    <span>Today</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Past Incidents */}
        <section>
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500">
            Past Incidents
          </h2>

          <div className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-center">
            <p className="text-[15px] text-gray-500">No incidents reported recently.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 px-6 py-8 text-center text-[13px] text-gray-400">
        Powered by{' '}
        <a
          href="https://www.atlassian.com/software/statuspage"
          className="text-[#1868DB] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Atlassian Statuspage
        </a>
      </footer>

      <Script src="https://eastonco1.statuspage.io/embed/script.js" strategy="afterInteractive" />
    </div>
  );
}
