'use client';

export default function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-ink bg-paper py-6">
      <div className="framer-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - site info */}
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <span>EASTONCO.NET v2.0</span>
            <span className="hidden md:inline">|</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="hidden md:inline">|</span>
            <span>Seattle, WA</span>
          </div>

          {/* Right side - links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink transition-colors"
            >
              [GH]
            </a>
            <a
              href="https://linkedin.com/in/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink transition-colors"
            >
              [LI]
            </a>
            <a
              href="https://instagram.com/eastonco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink transition-colors"
            >
              [IG]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
