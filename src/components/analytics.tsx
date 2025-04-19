'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Cloudflare Analytics Script - Replace 'YOUR_CLOUDFLARE_TOKEN' with your actual token
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.cfasync = 'false';
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.dataset.token = 'YOUR_CLOUDFLARE_TOKEN'; // Replace with your actual Cloudflare Analytics token

      document.body.appendChild(script);
    }
  }, []);

  return null;
}
