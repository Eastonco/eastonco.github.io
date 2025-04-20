'use client';

import UnderConstruction from '../components/under-construction';
import LandingPage from '../components/landing-page-v1/landing-page';
import { useFeatureFlagEnabled } from 'posthog-js/react';

export default function Home() {
  const isSiteLive = !useFeatureFlagEnabled('under-construction');

  return (
    <>
      {isSiteLive ? <LandingPage /> : <UnderConstruction />}
    </>
  );
}
