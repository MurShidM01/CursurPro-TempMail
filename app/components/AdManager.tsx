'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface AdConfig {
  monetag: boolean;
  popads: boolean;
}

export default function AdManager() {
  const [adConfig, setAdConfig] = useState<AdConfig>({
    monetag: false,
    popads: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ad configuration
    fetch('/api/ad-config')
      .then((res) => res.json())
      .then((config: AdConfig) => {
        setAdConfig(config);
        setLoading(false);
        console.log('📊 Ad Configuration Loaded:', {
          Monetag: config.monetag ? '✅ Enabled' : '❌ Disabled',
          PopAds: config.popads ? '✅ Enabled' : '❌ Disabled',
        });
      })
      .catch((error) => {
        console.error('❌ Error loading ad configuration:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <>
      {/* Monetag Ads - Only if enabled */}
      {adConfig.monetag && (
        <>
          <Script
            src="https://fpyf8.com/88/tag.min.js"
            data-zone="186400"
            strategy="afterInteractive"
            data-cfasync="false"
          />
          {console.log('✅ Monetag ads loaded')}
        </>
      )}

      {/* PopAds.net - Only if enabled */}
      {adConfig.popads && (
        <>
          <Script
            id="popads-script"
            strategy="afterInteractive"
            onLoad={() => {
              console.log('✅ PopAds.net script loaded successfully');
            }}
            onError={(e) => {
              console.error('❌ PopAds.net script failed to load:', e);
            }}
            dangerouslySetInnerHTML={{
              __html: `
console.log('🔄 PopAds.net: Initializing...');
console.log('📍 PopAds.net: Site ID = 5490607');
console.log('🌐 PopAds.net: Current domain = ' + window.location.hostname);

(function(){
  var p=window,
      k="fabed0f648673002050559e5f7c64e89",
      g=[["siteId",5490607],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
      o=["d3d3LmRpc3BsYXl2ZXJ0aXNpbmcuY29tL1BCZXQvcWVtb2ppb25lLm1pbi5qcw==","ZDNtem9rdHk5NTFjNXcuY2xvdWRmcm9udC5uZXQvZnMvRkUva2Nvb2tpZWphci5taW4uY3Nz"],
      v=-1,e,f,
      l=function(){
        clearTimeout(f);
        v++;
        if(o[v]&&!(1789647291000<(new Date).getTime()&&1<v)){
          e=p.document.createElement("script");
          e.type="text/javascript";
          e.async=!0;
          var c=p.document.getElementsByTagName("script")[0];
          e.src="https://"+atob(o[v]);
          console.log('🔗 PopAds.net: Loading from = ' + e.src);
          e.crossOrigin="anonymous";
          e.onerror=function(err){
            console.error('❌ PopAds.net: Failed to load external script from ' + e.src);
            console.error('   This is normal on localhost. PopAds requires a live domain.');
            l();
          };
          e.onload=function(){
            console.log('✅ PopAds.net: External script loaded from ' + e.src);
            clearTimeout(f);
            if(!p[k.slice(0,16)+k.slice(0,16)]){
              console.warn('⚠️ PopAds.net: Config not found, trying fallback...');
              l();
            } else {
              console.log('✅ PopAds.net: Successfully connected and initialized!');
              console.log('💡 PopAds.net: Click anywhere on the page to trigger popunder.');
            }
          };
          f=setTimeout(function(){
            console.warn('⏱️ PopAds.net: Timeout waiting for script, trying fallback...');
            l();
          },5E3);
          c.parentNode.insertBefore(e,c);
        } else {
          if(v >= o.length) {
            console.error('❌ PopAds.net: All connection attempts failed.');
            console.log('ℹ️ PopAds.net: This is expected on localhost.');
            console.log('ℹ️ PopAds.net: Deploy to a live domain (cursurpro.site) to see popunder ads.');
          }
        }
      };
  
  if(!p[k]){
    try{
      Object.freeze(p[k]=g);
      console.log('✅ PopAds.net: Configuration frozen successfully');
    }catch(e){
      console.error('❌ PopAds.net: Failed to freeze configuration:', e);
    }
    l();
  } else {
    console.log('ℹ️ PopAds.net: Already initialized');
  }
})();
              `,
            }}
          />
        </>
      )}
    </>
  );
}
