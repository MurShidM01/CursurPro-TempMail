'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [shouldRegister, setShouldRegister] = useState(false);

  useEffect(() => {
    // Check if Monetag is enabled before registering service worker
    fetch('/api/ad-config')
      .then((res) => res.json())
      .then((config) => {
        setShouldRegister(config.monetag);
        
        if (config.monetag && 'serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              console.log('✅ Monetag Service Worker registered:', registration.scope);
            })
            .catch((error) => {
              console.error('❌ Service Worker registration failed:', error);
            });
        } else if (!config.monetag) {
          console.log('⏸️ Monetag disabled - Service Worker not registered');
        }
      })
      .catch((error) => {
        console.error('❌ Error loading ad config:', error);
      });
  }, []);

  return null; // This component doesn't render anything
}
