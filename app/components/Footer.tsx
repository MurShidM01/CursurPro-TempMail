'use client';

import { Mail, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { theme } from '../theme';

export default function Footer() {
  return (
    <footer style={{
      background: theme.components.card.default.background,
      backdropFilter: theme.components.card.default.backdropFilter,
      borderTop: `2px solid ${theme.colors.primary[200]}`,
      padding: `${theme.spacing['5xl']} ${theme.spacing.xl}`,
      marginTop: theme.spacing['6xl'],
      boxShadow: `0 -4px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.patterns.background,
        opacity: 0.3,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing['3xl'],
          marginBottom: theme.spacing['3xl']
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.lg
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: theme.borderRadius.lg,
                background: theme.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.shadows.primary,
                flexShrink: 0
              }}>
                <Mail size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.colors.text.primary,
                margin: 0,
                letterSpacing: theme.typography.letterSpacing.tight
              }}>
                <span style={{
                  backgroundImage: theme.gradients.primaryText,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>CursurPro</span>{' '}
                <span style={{ color: theme.colors.text.tertiary }}>TempMail</span>
              </h3>
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: theme.colors.text.tertiary,
              lineHeight: theme.typography.lineHeight.relaxed,
              margin: `0 0 ${theme.spacing.lg} 0`,
              maxWidth: '280px'
            }}>
              Free temporary email service to protect your privacy online. No registration required.
            </p>
            <div style={{
              display: 'flex',
              gap: theme.spacing.sm,
              flexWrap: 'wrap'
            }}>
              <div style={{
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.md,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: theme.colors.primary[600],
                border: `1px solid ${theme.colors.primary[200]}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Shield size={12} />
                Secure
              </div>
              <div style={{
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.md,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: theme.colors.primary[600],
                border: `1px solid ${theme.colors.primary[200]}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Zap size={12} />
                Fast
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs
            }}>
              <Globe size={18} color={theme.colors.primary[500]} />
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md
            }}>
              <li>
                <Link href="/about" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs
            }}>
              <Shield size={18} color={theme.colors.primary[500]} />
              Legal
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md
            }}>
              <li>
                <Link href="/privacy-policy" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" style={{
                  color: theme.colors.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: theme.transitions.smooth,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  padding: `${theme.spacing.xs} 0`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary[600];
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  <ArrowRight size={14} />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          paddingTop: theme.spacing['3xl'],
          marginTop: theme.spacing['3xl'],
          borderTop: `1px solid ${theme.colors.primary[200]}`,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.sm
        }}>
          <p style={{
            fontSize: '0.9375rem',
            color: theme.colors.text.tertiary,
            margin: 0,
            fontWeight: 500
          }}>
            © {new Date().getFullYear()} <span style={{
              backgroundImage: theme.gradients.primaryText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700
            }}>CursurPro TempMail</span>. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.8125rem',
            color: theme.colors.text.muted,
            margin: 0
          }}>
            Made with <span style={{ color: theme.colors.error[500] }}>❤️</span> for privacy protection
          </p>
        </div>
      </div>
    </footer>
  );
}

