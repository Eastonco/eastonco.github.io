import UnderConstruction from '../components/under-construction';
import LandingPage from '../components/landing-page-v1/landing-page';

export default async function Home() {
  // For now, we'll just show the landing page
  // The feature flag logic can be moved to a client component wrapper if needed
  const isSiteLive = true; // Set this to false if you want to show under construction

  return (
    <>
      {isSiteLive ? <LandingPage /> : <UnderConstruction />}
    </>
  );
}
