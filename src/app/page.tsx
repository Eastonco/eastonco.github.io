'use client';

import UnderConstruction from '../components/under-construction';
import { ThemeProvider } from '../components/theme-provider';
import LandingPage from '../components/landing-page-v1/landing-page';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import ThemeToggle from '../components/theme-toggle';

export default function Home() {
  const isFeatureEnabled = useFeatureFlagEnabled('under-construction');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {isFeatureEnabled ? <UnderConstruction /> : <LandingPage />}
    </ThemeProvider>
  );
}
