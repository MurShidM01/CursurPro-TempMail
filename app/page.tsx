'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, Copy, RefreshCw, Check, Shield, Zap, Clock, AlertTriangle, X, Wifi, WifiOff } from 'lucide-react';
import EmailInbox from './components/EmailInbox';
import HomePage from './components/HomePage';
import { theme } from './theme';

interface Domain {
  domain: string;
  active: boolean;
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const WARNING_TIME = 2 * 60 * 60 * 1000; // 2 hours before expiration
const SHORTLINK_URL = 'https://femalesfellowship.com/cz86y5pz86?key=1ff7a4394a0c8846047087eda4447aac';
const SHORTLINK_COOKIE = 'shortlink_passed';

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export default function Home() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showExpirationWarning, setShowExpirationWarning] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  // Check if user has passed through shortlink
  const hasPassedShortlink = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check cookie
    const cookieValue = getCookie(SHORTLINK_COOKIE);
    if (cookieValue === 'true') {
      return true;
    }
    
    // Check URL parameters (when returning from shortlink)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('shortlink') === 'passed') {
      setCookie(SHORTLINK_COOKIE, 'true', 1); // Valid for 1 day
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
      return true;
    }
    
    return false;
  };

  const handleGetStarted = async () => {
    // Check if user needs to pass through shortlink
    if (!hasPassedShortlink()) {
      // Redirect through shortlink
      const returnUrl = encodeURIComponent(window.location.origin + window.location.pathname + '?shortlink=passed');
      const shortlinkWithReturn = `${SHORTLINK_URL}&return=${returnUrl}`;
      window.location.href = shortlinkWithReturn;
      return;
    }
    
    // User has passed shortlink, proceed normally
    setShowHomePage(false);
    setLoading(true);
    await initializeApp();
  };

  const handleEmailExpiration = useCallback(() => {
    // Clear email, localStorage, and cookies
    setEmailAddress('');
    setTimeRemaining(null);
    setShowExpirationWarning(false);
    localStorage.removeItem('tempEmail');
    deleteCookie('tempEmail');
    // Optionally show a message or redirect
    setError('Your temporary email has expired. Please generate a new one.');
  }, []);

  const checkExpiration = useCallback((emailData: { email: string; createdAt: number; expiresAt: number }) => {
    const now = Date.now();
    const expiresAt = emailData.expiresAt;
    const remaining = expiresAt - now;

    if (remaining <= 0) {
      // Email has expired, delete it
      handleEmailExpiration();
      return;
    }

    setTimeRemaining(remaining);
    
    // Show warning if less than 2 hours remaining
    if (remaining <= WARNING_TIME) {
      setShowExpirationWarning(true);
    }

    // Update every minute
    const interval = setInterval(() => {
      const newRemaining = expiresAt - Date.now();
      if (newRemaining <= 0) {
        clearInterval(interval);
        handleEmailExpiration();
      } else {
        setTimeRemaining(newRemaining);
        if (newRemaining <= WARNING_TIME) {
          setShowExpirationWarning(true);
        }
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [handleEmailExpiration]);

  const loadStoredEmail = (): { email: string; createdAt: number; expiresAt: number } | null => {
    try {
      // Try localStorage first
      const stored = localStorage.getItem('tempEmail');
      if (stored) {
        const emailData = JSON.parse(stored);
        const now = Date.now();
        if (emailData.expiresAt && emailData.expiresAt > now && emailData.email) {
          return emailData;
        } else {
          // Email expired, remove it
          localStorage.removeItem('tempEmail');
          deleteCookie('tempEmail');
        }
      }
      
      // Try cookie as backup
      const cookieData = getCookie('tempEmail');
      if (cookieData) {
        try {
          const emailData = JSON.parse(decodeURIComponent(cookieData));
          const now = Date.now();
          if (emailData.expiresAt && emailData.expiresAt > now && emailData.email) {
            // Restore to localStorage
            localStorage.setItem('tempEmail', JSON.stringify(emailData));
            return emailData;
          } else {
            deleteCookie('tempEmail');
          }
        } catch (e) {
          console.error('Error parsing cookie email:', e);
          deleteCookie('tempEmail');
        }
      }
    } catch (e) {
      console.error('Error loading stored email:', e);
    }
    return null;
  };

  const saveEmail = (email: string, createdAt: number, expiresAt: number) => {
    const emailData = { email, createdAt, expiresAt };
    // Save to localStorage
    localStorage.setItem('tempEmail', JSON.stringify(emailData));
    // Save to cookie as backup (expires in 1 day)
    setCookie('tempEmail', encodeURIComponent(JSON.stringify(emailData)), 1);
  };

  const initializeApp = async () => {
    setLoading(true);
    setError('');
    try {
      // Check for existing email in localStorage or cookies first
      const storedEmailData = loadStoredEmail();
      if (storedEmailData) {
        // Email is still valid, use it
        setEmailAddress(storedEmailData.email);
        const [alias, domain] = storedEmailData.email.split('@');
        if (domain) {
          setSelectedDomain(domain);
        }
        checkExpiration(storedEmailData);
        // Still fetch domains to ensure they're available (but don't generate new email)
        await fetchDomains(true); // Pass true to skip email generation
        setLoading(false);
        return;
      }
      // No valid stored email, fetch domains and generate new one
      await fetchDomains();
    } catch (error: any) {
      console.error('Error initializing app:', error);
      setError(`Failed to initialize application: ${error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  const fetchDomains = async (skipEmailGeneration: boolean = false) => {
    try {
      const response = await fetch('/api/domains');
      const data = await response.json();
      
      // Check if there's an error in the response
      if (!response.ok || data.error) {
        const errorMessage = data.error || 'Failed to fetch domains';
        // Technical error logged to console
        console.error('API Error:', {
          status: response.status,
          error: errorMessage,
          data: data
        });
        
        // User-friendly error (only show modal if we don't have an email)
        if (!emailAddress && !skipEmailGeneration) {
          if (response.status === 0 || !navigator.onLine) {
            showUserFriendlyError('Please check your internet connection and try again.');
          } else {
            showUserFriendlyError('Unable to connect to our servers. Please check your internet connection and try again.');
          }
        }
        setLoading(false);
        return;
      }
      
      // Check if domains array exists
      if (data.domains && Array.isArray(data.domains)) {
        const activeDomains = data.domains.filter((d: Domain) => d.active);
        setDomains(activeDomains);
        
        if (activeDomains.length > 0) {
          const firstDomain = activeDomains[0].domain;
          setSelectedDomain(firstDomain);
          // Only generate email if we don't have one already and not skipping
          if (!emailAddress && !skipEmailGeneration) {
            await generateRandomEmail(firstDomain);
          } else {
            setLoading(false);
          }
        } else {
          // Technical error logged to console
          console.error('No active domains available in ImprovMX account');
          
          // User-friendly error
          if (!emailAddress && !skipEmailGeneration) {
            showUserFriendlyError('Service is temporarily unavailable. Please try again later.');
          }
          setLoading(false);
        }
      } else {
        // Technical error logged to console
        console.error('Unexpected response format:', data);
        
        // User-friendly error
        if (!emailAddress && !skipEmailGeneration) {
          showUserFriendlyError('Unable to connect to our servers. Please check your internet connection and try again.');
        }
        setLoading(false);
      }
    } catch (error: any) {
      // Technical error logged to console
      console.error('Error fetching domains:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // User-friendly error
      if (!emailAddress && !skipEmailGeneration) {
        if (!navigator.onLine || error.message?.includes('fetch')) {
          showUserFriendlyError('Please check your internet connection and try again.');
        } else {
          showUserFriendlyError('Unable to connect to our servers. Please check your internet connection and try again.');
        }
      }
      setLoading(false);
    }
  };

  const showUserFriendlyError = (message: string, technicalError?: any) => {
    // Log technical error to console
    if (technicalError) {
      console.error('Technical Error:', technicalError);
    }
    
    // Show user-friendly modal
    setErrorModalMessage(message);
    setShowErrorModal(true);
  };

  const generateRandomAlias = () => {
    // Professional first names
    const firstNames = [
      'adams', 'alex', 'andrew', 'benjamin', 'carter', 'charlie', 'david', 'edward',
      'ethan', 'frank', 'gabriel', 'henry', 'isaac', 'jack', 'james', 'john',
      'joseph', 'kyle', 'lucas', 'mason', 'michael', 'nathan', 'oliver', 'owen',
      'peter', 'robert', 'samuel', 'thomas', 'william', 'zachary',
      'alexa', 'amelia', 'anna', 'ava', 'chloe', 'emily', 'emma', 'grace',
      'hannah', 'isabella', 'lily', 'mia', 'olivia', 'sophia', 'zoe'
    ];
    
    // Professional last names
    const lastNames = [
      'adams', 'anderson', 'baker', 'brown', 'carter', 'clark', 'davis', 'evans',
      'garcia', 'green', 'hall', 'harris', 'jackson', 'johnson', 'jones', 'lee',
      'lewis', 'martin', 'miller', 'moore', 'nelson', 'parker', 'roberts', 'robinson',
      'rodriguez', 'smith', 'taylor', 'thomas', 'thompson', 'walker', 'white', 'wilson',
      'wright', 'young'
    ];
    
    // Get random first and last name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate a random number (3-4 digits)
    const randomNumber = Math.floor(Math.random() * 9000) + 100; // 100-9999
    
    // Combine: firstname + lastname + number
    const alias = `${firstName}${lastName}${randomNumber}`;
    
    // Ensure it's not too long (max 30 characters for email alias)
    return alias.substring(0, 30);
  };

  const generateRandomEmail = async (domain?: string) => {
    const targetDomain = domain || selectedDomain;
    if (!targetDomain) {
      showUserFriendlyError('Unable to generate email. Please check your internet connection and try again.');
      setLoading(false);
      setGenerating(false);
      // Try to fetch domains again
      await fetchDomains();
      return;
    }

    setGenerating(true);
    setError('');

    const alias = generateRandomAlias();

    try {
      const response = await fetch('/api/alias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetDomain,
          alias: alias,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const fullEmail = `${alias}@${targetDomain}`;
        setEmailAddress(fullEmail);
        // Store creation time in localStorage and cookies
        const createdAt = Date.now();
        const expiresAt = Date.now() + EXPIRATION_TIME;
        saveEmail(fullEmail, createdAt, expiresAt);
        setLoading(false);
        setGenerating(false);
      } else {
        // Technical error logged to console
        console.error('API Error Response:', {
          status: response.status,
          data: data,
          error: data.error
        });
        
        // User-friendly error message
        if (response.status === 0 || !navigator.onLine) {
          showUserFriendlyError('Please check your internet connection and try again.');
        } else if (response.status >= 500) {
          showUserFriendlyError('Our servers are temporarily unavailable. Please try again in a few moments.');
        } else {
          showUserFriendlyError('Unable to generate email address. Please check your internet connection and try again.');
        }
        setLoading(false);
        setGenerating(false);
      }
    } catch (error: any) {
      // Technical error logged to console
      console.error('Error creating email:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // User-friendly error message
      if (!navigator.onLine || error.message?.includes('fetch')) {
        showUserFriendlyError('Please check your internet connection and try again.');
      } else {
        showUserFriendlyError('Unable to generate email address. Please check your internet connection and try again.');
      }
      setLoading(false);
      setGenerating(false);
    }
  };

  const generateNewEmail = async () => {
    await generateRandomEmail();
  };

  const copyEmail = () => {
    if (emailAddress) {
      navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle return from shortlink on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('shortlink') === 'passed' && showHomePage) {
        // User returned from shortlink, set cookie and proceed
        setCookie(SHORTLINK_COOKIE, 'true', 1);
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
        // Automatically proceed with initialization
        setShowHomePage(false);
        setLoading(true);
        // Call initializeApp after a brief delay to ensure state is updated
        setTimeout(() => {
          initializeApp();
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showHomePage && !emailAddress && !loading) {
      const storedEmailData = loadStoredEmail();
      if (storedEmailData) {
        // Email exists and is valid, use it
        setEmailAddress(storedEmailData.email);
        const [alias, domain] = storedEmailData.email.split('@');
        if (domain) {
          setSelectedDomain(domain);
        }
        checkExpiration(storedEmailData);
        // Fetch domains in background (but don't generate new email)
        fetchDomains(true); // Pass true to skip email generation
      }
    }
  }, [showHomePage, emailAddress, loading]); // Run when homepage state changes or when email/loading changes

  // Check for existing email and expiration when emailAddress changes
  useEffect(() => {
    if (emailAddress) {
      const storedEmailData = loadStoredEmail();
      if (storedEmailData && storedEmailData.email === emailAddress) {
        // Email matches, check expiration
        checkExpiration(storedEmailData);
      }
    }
  }, [emailAddress, checkExpiration]);

  const formatTimeRemaining = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Get progress bar color based on time remaining
  const getProgressBarColor = (remaining: number) => {
    const hours = remaining / (1000 * 60 * 60);
    
    // 24h - 12h: Teal/Emerald (Safe)
    if (hours > 12) {
      return {
        gradient: 'linear-gradient(90deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        glow: '0 0 10px rgba(20, 184, 166, 0.4)',
        status: 'Active',
        statusColor: '#10b981'
      };
    }
    // 12h - 8h: Cyan/Blue (Good)
    else if (hours > 8) {
      return {
        gradient: 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 50%, #0284c7 100%)',
        glow: '0 0 10px rgba(14, 165, 233, 0.4)',
        status: 'Active',
        statusColor: '#0ea5e9'
      };
    }
    // 8h - 5h: Blue (Moderate)
    else if (hours > 5) {
      return {
        gradient: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
        glow: '0 0 10px rgba(59, 130, 246, 0.4)',
        status: 'Active',
        statusColor: '#3b82f6'
      };
    }
    // 5h - 3h: Yellow (Warning)
    else if (hours > 3) {
      return {
        gradient: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #eab308 100%)',
        glow: '0 0 12px rgba(251, 191, 36, 0.5)',
        status: 'Warning',
        statusColor: '#f59e0b'
      };
    }
    // 3h - 1h: Orange (Caution)
    else if (hours > 1) {
      return {
        gradient: 'linear-gradient(90deg, #f97316 0%, #ea580c 50%, #fb923c 100%)',
        glow: '0 0 12px rgba(249, 115, 22, 0.5)',
        status: 'Expiring Soon',
        statusColor: '#f97316'
      };
    }
    // < 1h: Red (Critical)
    else {
      return {
        gradient: 'linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
        glow: '0 0 14px rgba(239, 68, 68, 0.6)',
        status: 'Critical!',
        statusColor: '#ef4444'
      };
    }
  };

  const LoadingSpinner = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '32px',
      background: theme.gradients.primary,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Circles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      {/* Modern Loading Animation */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Outer Ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite'
        }}></div>
        {/* Middle Ring */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderBottom: '4px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite reverse'
        }}></div>
        {/* Inner Circle */}
        <div style={{
          width: '50%',
          height: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <Mail size={28} color={theme.colors.primary[500]} />
        </div>
      </div>

      {/* Loading Text */}
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'white',
          margin: 0,
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>Creating Your Email</p>
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.85)',
          margin: 0,
          letterSpacing: '0.3px'
        }}>Please wait a moment...</p>

        {/* Animated Dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '20px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                background: 'white',
                borderRadius: '50%',
                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (showHomePage) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.gradients.background,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Social Bar Ad - Floating Sidebar */}
        <div 
          id="social-bar-ad-container"
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 999,
            width: '160px',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.colors.background.lavender,
            borderRadius: theme.borderRadius['2xl'],
            padding: theme.spacing.lg,
            border: '1px solid rgba(139, 92, 246, 0.15)',
            boxShadow: theme.shadows.lg,
            transition: 'all 0.3s ease'
          }}
        >
          {/* Ad will be injected here by script */}
        </div>

        {/* Modern Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: theme.patterns.background,
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 20px',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Professional Header - Top Left */}
          <div style={{
            marginBottom: '20px',
            paddingTop: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.gradients.primary,
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(20, 184, 166, 0.25)',
                flexShrink: 0
              }}>
                <Mail size={20} color="white" />
              </div>
              <div>
                <h1 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: '#1a202c',
                  margin: 0,
                  lineHeight: 1.3
                }}>
                  <span style={{
                    backgroundImage: theme.gradients.primaryText,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700
                  }}>CursurPro</span>{' '}
                  <span style={{ color: '#4a5568', fontWeight: 500 }}>TempMail</span>
                </h1>
              </div>
            </div>
          </div>

          <HomePage onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  if (loading || generating) {
    return (
      <>
        <LoadingSpinner />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.gradients.background,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Social Bar Ad - Floating Sidebar */}
      <div 
        id="social-bar-ad-container"
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          width: '160px',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.colors.background.lavender,
          borderRadius: theme.borderRadius['2xl'],
          padding: theme.spacing.lg,
          border: '1px solid rgba(139, 92, 246, 0.15)',
          boxShadow: theme.shadows.lg,
          transition: 'all 0.3s ease'
        }}
      >
        {/* Ad will be injected here by script */}
      </div>

      {/* Modern Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme.patterns.background,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Professional Header - Top Left */}
        <div style={{
          marginBottom: '48px',
          paddingTop: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: theme.components.icon.medium.width,
              height: theme.components.icon.medium.height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.gradients.primary,
              borderRadius: theme.borderRadius.md,
              boxShadow: theme.shadows.primary,
              flexShrink: 0
            }}>
              <Mail size={22} color="white" />
            </div>
            <div>
              <h1 style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                letterSpacing: theme.typography.letterSpacing.tight,
                color: theme.colors.text.primary,
                margin: 0,
                lineHeight: theme.typography.lineHeight.tight
              }}>
                <span style={{
                  backgroundImage: theme.gradients.primaryText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: theme.typography.fontWeight.extrabold
                }}>CursurPro</span>{' '}
                <span style={{ color: theme.colors.text.tertiary, fontWeight: theme.typography.fontWeight.semibold }}>TempMail</span>
          </h1>
            </div>
          </div>
        </div>

        {/* Expiration Warning Banner */}
        {showExpirationWarning && timeRemaining && timeRemaining > 0 && (
          <div style={{
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto 28px',
            padding: `${theme.spacing['2xl']} ${theme.spacing['3xl']}`,
            background: theme.gradients.secondary,
            borderRadius: theme.borderRadius['3xl'],
            boxShadow: theme.shadows.warning,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                flexShrink: 0
              }}>
                <AlertTriangle size={20} color="white" />
              </div>
              <div>
                <p style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'white',
                  margin: 0,
                  marginBottom: '4px'
                }}>Email Expiring Soon</p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: 0
                }}>
                  Your temporary email will expire in {formatTimeRemaining(timeRemaining)}. Generate a new one to continue receiving emails.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowExpirationWarning(false)}
              style={{
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <X size={18} color="white" />
            </button>
          </div>
        )}

        {/* Error Display (when no email address) */}
        {!emailAddress && error && (
          <div style={{
            maxWidth: '900px',
            width: '100%',
            margin: `0 auto ${theme.spacing['4xl']}`,
            padding: `${theme.spacing.xl} ${theme.spacing['3xl']}`,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: theme.borderRadius['2xl'],
            color: '#dc2626',
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            boxShadow: theme.shadows.md
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              marginBottom: theme.spacing.sm
            }}>
              <AlertTriangle size={24} color="#dc2626" />
              <h3 style={{
                margin: 0,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold
              }}>Configuration Error</h3>
            </div>
            <p style={{ margin: 0, lineHeight: theme.typography.lineHeight.relaxed }}>
              {error}
            </p>
            <div style={{
              marginTop: theme.spacing.lg,
              padding: theme.spacing.md,
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm
            }}>
              <p style={{ margin: 0, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing.xs }}>
                Troubleshooting Steps:
              </p>
              <ul style={{ margin: 0, paddingLeft: theme.spacing.xl, lineHeight: theme.typography.lineHeight.relaxed }}>
                <li>Ensure your <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code> file exists in the project root</li>
                <li>Verify <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '4px' }}>IMPROVMX_API_KEY</code> is set correctly</li>
                <li>Check that you have active domains in your ImprovMX account</li>
                <li>Restart your development server after updating environment variables</li>
              </ul>
            </div>
          </div>
        )}

        {/* Email Address Card */}
        {emailAddress && (
          <div style={{
            maxWidth: '900px',
            width: '100%',
            margin: `0 auto ${theme.spacing['4xl']}`,
            background: theme.components.card.default.background,
            backdropFilter: theme.components.card.default.backdropFilter,
            borderRadius: theme.components.card.default.borderRadius,
            padding: theme.components.card.default.padding,
            boxShadow: theme.components.card.default.boxShadow,
            border: theme.components.card.default.border,
            transition: theme.components.card.default.transition,
            boxSizing: 'border-box'
          }}>
            {/* Header Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: theme.components.icon.large.width,
                  height: theme.components.icon.large.height,
                  borderRadius: theme.components.icon.large.borderRadius,
                  background: theme.components.icon.large.background,
                  boxShadow: theme.components.icon.large.boxShadow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={26} color="white" />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#1a202c',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>Your Temporary Email</h2>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    margin: '6px 0 0 0',
                    fontWeight: 400
                  }}>Ready to receive emails instantly</p>
                </div>
              </div>
                  <button
                onClick={generateNewEmail}
                disabled={generating}
                style={{
                  padding: theme.components.button.secondary.padding,
                  fontSize: theme.components.button.secondary.fontSize,
                  fontWeight: theme.components.button.secondary.fontWeight,
                  color: theme.components.button.secondary.color,
                  background: theme.components.button.secondary.background,
                  border: theme.components.button.secondary.border,
                  borderRadius: theme.components.button.secondary.borderRadius,
                  boxShadow: theme.components.button.secondary.boxShadow,
                  transition: theme.components.button.secondary.transition,
                  cursor: generating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: generating ? 0.6 : 1,
                  fontFamily: theme.typography.fontFamily.primary
                }}
                  onMouseEnter={(e) => {
                  if (!generating) {
                    e.currentTarget.style.background = theme.gradients.cardHover;
                    e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = theme.shadows.cardHover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!generating) {
                    e.currentTarget.style.background = theme.components.button.secondary.background;
                    e.currentTarget.style.borderColor = theme.components.button.secondary.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = theme.components.button.secondary.boxShadow;
                  }
                }}
              >
                {generating ? (
                  <>
                    <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} />
                    <span>Generate New</span>
                  </>
                )}
              </button>
            </div>


            {/* Email Display Card */}
            <div style={{
              background: theme.components.card.gradient.background,
              borderRadius: theme.components.card.gradient.borderRadius,
              padding: theme.components.card.gradient.padding,
              boxShadow: theme.components.card.gradient.boxShadow,
              marginBottom: theme.spacing['4xl'],
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}></div>
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ flex: '1 1 auto', minWidth: '250px' }}>
                    <p style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '12px',
                      margin: 0
                    }}>Your Email Address</p>
                    <p style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'white',
                      wordBreak: 'break-all',
                      lineHeight: 1.4,
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      {emailAddress}
                    </p>

                    {/* Compact Countdown Timer with Dynamic Colors */}
                    {timeRemaining !== null && timeRemaining > 0 && (() => {
                      const colorScheme = getProgressBarColor(timeRemaining);
                      return (
                        <div style={{
                          marginTop: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <Clock 
                            size={14} 
                            color="rgba(255, 255, 255, 0.9)" 
                            style={{ flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Progress Bar */}
                            <div style={{
                              position: 'relative',
                              width: '100%',
                              height: '6px',
                              background: 'rgba(255, 255, 255, 0.15)',
                              borderRadius: '3px',
                              overflow: 'hidden',
                              marginBottom: '4px'
                            }}>
                              <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${(timeRemaining / EXPIRATION_TIME) * 100}%`,
                                background: colorScheme.gradient,
                                borderRadius: '3px',
                                transition: 'width 1s linear, background 2s ease',
                                boxShadow: colorScheme.glow
                              }}>
                                {/* Shimmer */}
                                <div style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: '-100%',
                                  width: '100%',
                                  height: '100%',
                                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                                  animation: 'shimmer 2s infinite'
                                }}></div>
                              </div>
                            </div>
                            {/* Time Text */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span style={{
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.75)',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em'
                              }}>
                                {colorScheme.status}
                              </span>
                              <span style={{
                                fontSize: '0.75rem',
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                letterSpacing: '0.02em'
                              }}>
                                {formatTimeRemaining(timeRemaining)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <button
                    onClick={copyEmail}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    style={{
                      padding: '12px 16px',
                      background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      border: copied ? '2px solid rgba(16, 185, 129, 0.5)' : '2px solid rgba(255, 255, 255, 0.4)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      fontFamily: theme.typography.fontFamily.primary,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: copied ? '0 4px 12px rgba(16, 185, 129, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  onMouseEnter={(e) => {
                    if (!copied) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                    onMouseLeave={(e) => {
                      if (!copied) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(0.95)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = copied ? 'translateY(0) scale(1)' : 'translateY(-2px) scale(1.05)';
                    }}
                  >
                    {copied ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} strokeWidth={2} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
            </div>
          </div>

          {/* Ad Container - Banner Ad */}
          <div style={{
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto 32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
            background: theme.colors.background.sky,
            borderRadius: theme.borderRadius['2xl'],
            padding: theme.spacing.lg,
            border: '1px solid rgba(14, 165, 233, 0.15)',
            boxShadow: theme.shadows.sm
          }}>
            <div id="container-b1295c45d307f3c8f0be77f72ef3e22d"></div>
          </div>

          {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`,
                boxShadow: theme.shadows.sm
              }}>
                <Shield size={22} color={theme.colors.primary[500]} />
                <div>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#1a202c',
                    margin: 0
                  }}>Secure</p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    margin: '2px 0 0 0'
                  }}>Private & Safe</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`,
                boxShadow: theme.shadows.sm
              }}>
                <Zap size={22} color={theme.colors.primary[500]} />
                <div>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#1a202c',
                    margin: 0
                  }}>Instant</p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    margin: '2px 0 0 0'
                  }}>Real-time Delivery</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`,
                boxShadow: theme.shadows.sm
              }}>
                <Clock size={22} color={theme.colors.primary[500]} />
                <div>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#1a202c',
                    margin: 0
                  }}>Temporary</p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    margin: '2px 0 0 0'
                  }}>No Registration</p>
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '16px 20px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                color: '#dc2626',
                marginTop: '24px',
                fontSize: '0.875rem',
                fontWeight: 500
              }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Email Inbox */}
        {emailAddress && (
          <div style={{ 
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto',
            marginTop: '20px',
            boxSizing: 'border-box'
          }}>
            <EmailInbox emailAddress={emailAddress} />
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: theme.spacing.xl,
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setShowErrorModal(false)}
          >
            <div
              style={{
                background: 'white',
                borderRadius: theme.borderRadius['3xl'],
                maxWidth: '500px',
                width: '100%',
                padding: theme.spacing['4xl'],
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                animation: 'slideUp 0.3s ease-out',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  position: 'absolute',
                  top: theme.spacing.xl,
                  right: theme.spacing.xl,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: theme.spacing.sm,
                  borderRadius: theme.borderRadius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: theme.transitions.fast
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.colors.neutral[100];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X size={20} color={theme.colors.text.tertiary} />
              </button>

              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                margin: `0 auto ${theme.spacing.xl}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderRadius: theme.borderRadius.full,
                border: `2px solid rgba(239, 68, 68, 0.2)`
              }}>
                <WifiOff size={32} color="#dc2626" />
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                textAlign: 'center',
                margin: `0 0 ${theme.spacing.md} 0`
              }}>
                Connection Issue
              </h2>

              {/* Message */}
              <p style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
                textAlign: 'center',
                margin: `0 0 ${theme.spacing['3xl']} 0`,
                lineHeight: theme.typography.lineHeight.relaxed
              }}>
                {errorModalMessage}
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  if (!emailAddress) {
                    // Retry generating email
                    generateRandomEmail();
                  }
                }}
                style={{
                  width: '100%',
                  padding: theme.spacing.lg,
                  background: theme.gradients.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: theme.borderRadius.xl,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  cursor: 'pointer',
                  transition: theme.transitions.normal,
                  boxShadow: theme.shadows.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing.sm
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = theme.shadows.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.primary;
                }}
              >
                <RefreshCw size={20} />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Modern Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#4a5568',
              margin: 0,
              fontWeight: 400
            }}>
              © 2024 <span style={{
                fontWeight: theme.typography.fontWeight.semibold,
                backgroundImage: theme.gradients.primaryText,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>CursurPro TempMail</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-12px);
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}} />
    </div>
  );
}
