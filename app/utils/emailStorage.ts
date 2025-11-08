// Email storage utility functions
import { setCookie, getCookie, deleteCookie } from './cookies';

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

export interface EmailData {
  email: string;
  createdAt: number;
  expiresAt: number;
}

export const loadStoredEmail = (): EmailData | null => {
  try {
    // Try localStorage first
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('tempEmail');
      if (stored) {
        const emailData: EmailData = JSON.parse(stored);
        const now = Date.now();
        if (emailData.expiresAt && emailData.expiresAt > now && emailData.email) {
          return emailData;
        } else {
          // Email expired, remove it
          localStorage.removeItem('tempEmail');
          deleteCookie('tempEmail');
        }
      }
    }
    
    // Try cookie as backup
    const cookieData = getCookie('tempEmail');
    if (cookieData) {
      try {
        const emailData: EmailData = JSON.parse(decodeURIComponent(cookieData));
        const now = Date.now();
        if (emailData.expiresAt && emailData.expiresAt > now && emailData.email) {
          // Restore to localStorage
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('tempEmail', JSON.stringify(emailData));
          }
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

export const saveEmail = (email: string, createdAt: number, expiresAt: number) => {
  const emailData: EmailData = { email, createdAt, expiresAt };
  // Save to localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('tempEmail', JSON.stringify(emailData));
  }
  // Save to cookie as backup (expires in 1 day)
  setCookie('tempEmail', encodeURIComponent(JSON.stringify(emailData)), 1);
};

export const clearStoredEmail = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('tempEmail');
  }
  deleteCookie('tempEmail');
};

