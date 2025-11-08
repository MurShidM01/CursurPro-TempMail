'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Mail, RefreshCw, Clock, User, X, Inbox, Copy, Check, ExternalLink, Key, Link2, FileText, Code } from 'lucide-react';
import { theme } from '../theme';

interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  body: string;
  isSpam?: boolean;
  deliveredTo?: string;
  originalTo?: string;
  receivedAt?: number; // Timestamp when email was received
}

interface EmailInboxProps {
  emailAddress: string;
}

export default function EmailInbox({ emailAddress }: EmailInboxProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [copiedOTP, setCopiedOTP] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [currentTime, setCurrentTime] = useState(Date.now());

  const EMAIL_EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
  const WARNING_TIME = 5 * 60 * 1000; // 5 minutes warning

  // Load email timestamps from localStorage
  const getEmailTimestamps = useCallback(() => {
    try {
      const stored = localStorage.getItem(`email_timestamps_${emailAddress}`);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }, [emailAddress]);

  // Save email timestamps to localStorage
  const saveEmailTimestamps = useCallback((timestamps: Record<string, number>) => {
    try {
      localStorage.setItem(`email_timestamps_${emailAddress}`, JSON.stringify(timestamps));
    } catch (e) {
      console.error('Error saving timestamps:', e);
    }
  }, [emailAddress]);

  // Filter out expired emails
  const filterExpiredEmails = useCallback((emailList: Email[]) => {
    const now = Date.now();
    const timestamps = getEmailTimestamps();
    
    return emailList.filter(email => {
      const receivedAt = timestamps[email.id];
      if (!receivedAt) return true; // Keep if no timestamp
      return (now - receivedAt) < EMAIL_EXPIRY_TIME;
    });
  }, [getEmailTimestamps, EMAIL_EXPIRY_TIME]);

  const fetchEmails = useCallback(async () => {
    if (!emailAddress) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/emails?email=${encodeURIComponent(emailAddress)}`);
      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error);
      }
      
      if (data.emails) {
        const timestamps = getEmailTimestamps();
        const now = Date.now();
        
        // Add receivedAt timestamp to new emails
        const emailsWithTimestamps = data.emails.map((email: Email) => {
          if (!timestamps[email.id]) {
            timestamps[email.id] = now;
          }
          return {
            ...email,
            receivedAt: timestamps[email.id]
          };
        });
        
        // Save updated timestamps
        saveEmailTimestamps(timestamps);
        
        // Filter out expired emails
        const validEmails = filterExpiredEmails(emailsWithTimestamps);
        setEmails(validEmails);
      } else {
        setEmails([]);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  }, [emailAddress, getEmailTimestamps, saveEmailTimestamps, filterExpiredEmails]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Update current time every second for countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      
      // Filter out expired emails
      setEmails(prevEmails => filterExpiredEmails(prevEmails));
    }, 1000);

    return () => clearInterval(interval);
  }, [filterExpiredEmails]);

  useEffect(() => {
    if (!autoRefresh || !emailAddress) return;
    
    const interval = setInterval(() => {
      fetchEmails();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, emailAddress, fetchEmails]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Format countdown timer
  const formatTimeRemaining = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get time remaining for an email
  const getTimeRemaining = (email: Email) => {
    if (!email.receivedAt) return EMAIL_EXPIRY_TIME;
    const elapsed = currentTime - email.receivedAt;
    const remaining = EMAIL_EXPIRY_TIME - elapsed;
    return Math.max(0, remaining);
  };

  // Get color based on time remaining
  const getTimerColor = (timeRemaining: number) => {
    if (timeRemaining <= 60000) return '#ef4444'; // Red - less than 1 minute
    if (timeRemaining <= 180000) return '#f59e0b'; // Orange - less than 3 minutes
    if (timeRemaining <= WARNING_TIME) return '#eab308'; // Yellow - less than 5 minutes
    return theme.colors.primary[500]; // Teal - plenty of time
  };

  const closeModal = () => {
    setSelectedEmail(null);
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setViewMode('formatted');
    setCopiedOTP(false);
    setCopiedContent(false);
  };

  // Extract OTP from email body
  const extractOTP = useCallback((text: string): string | null => {
    if (!text) return null;
    
    // Remove HTML tags for text extraction
    const textContent = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    
    // Common OTP patterns
    const patterns = [
      /\b(\d{4,8})\b/g, // 4-8 digit codes
      /code[:\s]+(\d{4,8})/i,
      /otp[:\s]+(\d{4,8})/i,
      /verification[:\s]+code[:\s]+(\d{4,8})/i,
      /your[:\s]+code[:\s]+is[:\s]+(\d{4,8})/i,
      /(\d{4,8})[:\s]+is[:\s]+your[:\s]+code/i,
      /<strong[^>]*>(\d{4,8})<\/strong>/i,
      /<b[^>]*>(\d{4,8})<\/b>/i,
      /<span[^>]*>(\d{4,8})<\/span>/i,
    ];

    for (const pattern of patterns) {
      const matches = textContent.match(pattern) || text.match(pattern);
      if (matches) {
        // Find the longest numeric match (likely the OTP)
        const numbers = matches
          .map(m => m.replace(/\D/g, ''))
          .filter(n => n.length >= 4 && n.length <= 8);
        if (numbers.length > 0) {
          return numbers.sort((a, b) => b.length - a.length)[0];
        }
      }
    }

    // Try to find standalone 4-8 digit numbers
    const standaloneNumbers = textContent.match(/\b(\d{4,8})\b/g);
    if (standaloneNumbers && standaloneNumbers.length > 0) {
      // Prefer 6-digit codes (most common)
      const sixDigit = standaloneNumbers.find(n => n.length === 6);
      if (sixDigit) return sixDigit;
      return standaloneNumbers[0];
    }

    return null;
  }, []);

  // Extract all links from email body
  const extractLinks = useCallback((html: string): Array<{ url: string; text: string }> => {
    if (!html) return [];
    
    const links: Array<{ url: string; text: string }> = [];
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const url = match[1];
      const text = match[2].replace(/<[^>]*>/g, '').trim() || url;
      if (url && !url.startsWith('#')) {
        links.push({ url, text });
      }
    }

    // Also extract plain URLs
    const urlRegex = /(https?:\/\/[^\s<>"']+)/gi;
    const textContent = html.replace(/<[^>]*>/g, ' ');
    while ((match = urlRegex.exec(textContent)) !== null) {
      const url = match[1];
      if (!links.some(l => l.url === url)) {
        links.push({ url, text: url });
      }
    }

    return links;
  }, []);

  // Get extracted data for selected email
  const emailData = useMemo(() => {
    if (!selectedEmail) return null;
    
    const otp = extractOTP(selectedEmail.body);
    const links = extractLinks(selectedEmail.body);
    
    return {
      otp,
      links,
      plainText: selectedEmail.body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    };
  }, [selectedEmail, extractOTP, extractLinks]);

  const copyOTP = () => {
    if (emailData?.otp) {
      navigator.clipboard.writeText(emailData.otp);
      setCopiedOTP(true);
      setTimeout(() => setCopiedOTP(false), 2000);
    }
  };

  const copyEmailContent = () => {
    if (emailData?.plainText) {
      navigator.clipboard.writeText(emailData.plainText);
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEmail) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedEmail]);

  return (
    <>
      <div style={{
        background: theme.colors.background.sky,
        backdropFilter: theme.components.card.default.backdropFilter,
        borderRadius: theme.components.card.default.borderRadius,
        boxShadow: theme.components.card.default.boxShadow,
        border: '1px solid rgba(14, 165, 233, 0.15)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box'
      }}>
          {/* Modern Header */}
          <div style={{
            background: theme.gradients.primary,
            padding: `${theme.spacing['3xl']} ${theme.spacing['4xl']}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Inbox size={24} color="white" />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'white',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>Inbox</h2>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: '4px 0 0 0',
                    fontWeight: 400
                  }}>{emails.length} {emails.length === 1 ? 'email' : 'emails'}</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    background: autoRefresh ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = autoRefresh ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: autoRefresh ? '#86efac' : '#d1d5db',
                    boxShadow: autoRefresh ? '0 0 8px rgba(134, 239, 172, 0.6)' : 'none'
                  }}></span>
                  Auto-refresh
                </button>
                <button
                  onClick={fetchEmails}
                  disabled={loading}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.6 : 1,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    }
                  }}
                >
                  <RefreshCw size={16} style={{
                    animation: loading ? 'spin 1s linear infinite' : 'none'
                  }} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div style={{
            padding: '20px',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {emails.length === 0 ? (
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#718096'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 24px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={48} color="#667eea" style={{ opacity: 0.5 }} />
                </div>
                <p style={{
                  fontWeight: 600,
                  color: '#2d3748',
                  margin: 0,
                  marginBottom: '8px',
                  fontSize: '1.125rem'
                }}>No emails yet</p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#718096',
                  margin: 0
                }}>Emails will appear here when received</p>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {emails.map((email, index) => (
                  <button
                    key={email.id}
                    onClick={() => handleEmailClick(email)}
                      style={{
                        width: '100%',
                        padding: '20px',
                        textAlign: 'left',
                        background: index % 2 === 0 ? 'rgba(20, 184, 166, 0.02)' : 'transparent',
                        border: '2px solid transparent',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        fontFamily: 'inherit'
                      }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(20, 184, 166, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 184, 166, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(20, 184, 166, 0.02)' : 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}>
                      <p style={{
                        fontWeight: 600,
                        color: '#1a202c',
                        fontSize: '1rem',
                        margin: 0,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.01em'
                      }}>
                        {email.subject || '(No Subject)'}
                      </p>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#a0aec0',
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}>
                        {formatDate(email.date)}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <User size={14} color="#718096" />
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#4a5568',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0
                      }}>
                        {email.from.split('<')[0].trim() || email.from}
                      </p>
                    </div>
                    {email.snippet && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#718096',
                        margin: 0,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {email.snippet}
                      </p>
                    )}
                    
                    {/* Countdown Timer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '8px',
                      padding: '10px 14px',
                      background: getTimeRemaining(email) <= WARNING_TIME 
                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 88, 12, 0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
                      borderRadius: '10px',
                      border: `1.5px solid ${getTimeRemaining(email) <= WARNING_TIME ? 'rgba(245, 158, 11, 0.3)' : 'rgba(20, 184, 166, 0.2)'}`,
                      boxShadow: getTimeRemaining(email) <= 60000 ? '0 2px 8px rgba(239, 68, 68, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.05)'
                    }}>
                      <Clock 
                        size={16} 
                        color={getTimerColor(getTimeRemaining(email))} 
                        style={{ 
                          flexShrink: 0,
                          animation: getTimeRemaining(email) <= 60000 ? 'pulse 1s ease-in-out infinite' : 'none'
                        }} 
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: '#64748b',
                          margin: 0,
                          marginBottom: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {getTimeRemaining(email) <= 60000 ? 'Expires Soon!' : 'Expires In'}
                        </p>
                        <p style={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: getTimerColor(getTimeRemaining(email)),
                          margin: 0,
                          fontFamily: 'monospace',
                          letterSpacing: '0.02em'
                        }}>
                          {formatTimeRemaining(getTimeRemaining(email))}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Modern Modal Dialog */}
      {selectedEmail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              animation: 'slideUp 0.3s ease-out',
              overflow: 'hidden',
              fontFamily: 'inherit'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: theme.gradients.primary,
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: 0,
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginRight: '16px',
                letterSpacing: '-0.02em'
              }}>
                {selectedEmail.subject || '(No Subject)'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '32px',
              overflowY: 'auto',
              flex: 1,
              background: '#f7fafc'
            }}>
              {/* Email Metadata */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: theme.colors.background.lavender,
                  border: '1px solid rgba(139, 92, 246, 0.12)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                        <User size={20} color={theme.colors.primary[500]} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#718096',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: 0,
                      marginBottom: '6px'
                    }}>From</p>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#1a202c',
                      margin: 0,
                      fontWeight: 500,
                      wordBreak: 'break-word'
                    }}>{selectedEmail.from}</p>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: theme.colors.background.sand,
                  border: '1px solid rgba(245, 158, 11, 0.12)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                        <Clock size={20} color={theme.colors.primary[500]} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#718096',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: 0,
                      marginBottom: '6px'
                    }}>Date</p>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#1a202c',
                      margin: 0,
                      fontWeight: 500
                    }}>{new Date(selectedEmail.date).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* OTP Section */}
              {emailData?.otp && (
                <div style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: theme.gradients.primary,
                  marginBottom: '24px',
                  boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Key size={20} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          margin: 0,
                          marginBottom: '4px'
                        }}>Verification Code</p>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          margin: 0
                        }}>Your OTP has been detected</p>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: 'white',
                          margin: 0,
                          letterSpacing: '0.1em',
                          fontFamily: 'monospace'
                        }}>{emailData.otp}</p>
                      </div>
                      <button
                        onClick={copyOTP}
                        style={{
                          padding: '12px 20px',
                          background: 'white',
                          color: theme.colors.primary[500],
                          borderRadius: '10px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f7fafc';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }}
                      >
                        {copiedOTP ? (
                          <>
                            <Check size={18} color="#10b981" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={18} />
                            <span>Copy OTP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Links Section */}
              {emailData?.links && emailData.links.length > 0 && (
                <div style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: theme.colors.background.mint,
                  marginBottom: '24px',
                  border: '1px solid rgba(16, 185, 129, 0.12)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: theme.gradients.icon,
                      borderRadius: '10px'
                    }}>
                      <Link2 size={20} color={theme.colors.primary[500]} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#1a202c',
                        margin: 0,
                        letterSpacing: '-0.01em'
                      }}>Links Found</p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#718096',
                        margin: '4px 0 0 0'
                      }}>{emailData.links.length} {emailData.links.length === 1 ? 'link' : 'links'} detected</p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {emailData.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          padding: '14px 18px',
                          background: 'rgba(20, 184, 166, 0.05)',
                          borderRadius: '12px',
                          border: '1px solid rgba(20, 184, 166, 0.1)',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(20, 184, 166, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.3)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(20, 184, 166, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.1)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: theme.colors.primary[500],
                            margin: 0,
                            marginBottom: '4px',
                            wordBreak: 'break-word'
                          }}>{link.text}</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#718096',
                            margin: 0,
                            wordBreak: 'break-all'
                          }}>{link.url}</p>
                        </div>
                        <ExternalLink size={18} color={theme.colors.primary[500]} style={{ flexShrink: 0 }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* View Mode Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                padding: '12px 16px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <button
                  onClick={() => setViewMode('formatted')}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: viewMode === 'formatted' ? theme.gradients.primary : 'transparent',
                    color: viewMode === 'formatted' ? 'white' : '#718096',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'formatted') {
                      e.currentTarget.style.background = 'rgba(20, 184, 166, 0.1)';
                      e.currentTarget.style.color = theme.colors.primary[500];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'formatted') {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#718096';
                    }
                  }}
                >
                  <FileText size={16} />
                  Formatted
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: viewMode === 'raw' ? theme.gradients.primary : 'transparent',
                    color: viewMode === 'raw' ? 'white' : '#718096',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'raw') {
                      e.currentTarget.style.background = 'rgba(20, 184, 166, 0.1)';
                      e.currentTarget.style.color = theme.colors.primary[500];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'raw') {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#718096';
                    }
                  }}
                >
                  <Code size={16} />
                  Raw Text
                </button>
                <button
                  onClick={copyEmailContent}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    color: theme.colors.primary[500],
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(20, 184, 166, 0.05)';
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {copiedContent ? (
                    <>
                      <Check size={16} color="#10b981" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Body */}
              <div style={{
                padding: '32px',
                borderRadius: '16px',
                background: theme.colors.background.ocean,
                border: '1px solid rgba(20, 184, 166, 0.12)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                minHeight: '200px'
              }}>
                {viewMode === 'formatted' ? (
                  <div
                    style={{
                      color: '#2d3748',
                      lineHeight: 1.8,
                      fontSize: '0.9375rem',
                      wordBreak: 'break-word'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: selectedEmail.body.replace(
                        /<a\s+href=["']([^"']+)["']/gi,
                        `<a href="$1" target="_blank" rel="noopener noreferrer" style="color: ${theme.colors.primary[500]}; text-decoration: underline;"`
                      )
                    }}
                  />
                ) : (
                  <pre style={{
                    color: '#2d3748',
                    lineHeight: 1.8,
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                    padding: 0
                  }}>{emailData?.plainText || selectedEmail.body}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
      `}} />
    </>
  );
}
