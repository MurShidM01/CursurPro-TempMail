'use client';

import { Mail, Copy, RefreshCw, Check, Clock } from 'lucide-react';
import { theme } from '../theme';

interface EmailDisplayProps {
  emailAddress: string;
  timeRemaining: number | null;
  copied: boolean;
  generating: boolean;
  onCopy: () => void;
  onGenerateNew: () => void;
  getProgressBarColor: (remaining: number) => {
    gradient: string;
    glow: string;
    status: string;
    statusColor: string;
  };
  formatTimeRemaining: (ms: number) => string;
  EXPIRATION_TIME: number;
}

export default function EmailDisplay({
  emailAddress,
  timeRemaining,
  copied,
  generating,
  onCopy,
  onGenerateNew,
  getProgressBarColor,
  formatTimeRemaining,
  EXPIRATION_TIME
}: EmailDisplayProps) {
  return (
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
          onClick={onGenerateNew}
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
              onClick={onCopy}
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
    </div>
  );
}

