'use client';

import { useState, useEffect } from 'react';
import { Mail, Shield, Zap, Clock, Users, TrendingUp, Globe, CheckCircle, ArrowRight, BarChart3, Sparkles, Rocket, Star } from 'lucide-react';
import { theme } from '../theme';
import Link from 'next/link';
import Footer from './Footer';

interface Stats {
  emailsGenerated: number;
  emailsReceived: number;
  activeUsers: number;
  domainsAvailable: number;
  uptime: string;
  responseTime: string;
}

export default function HomePage({ onGetStarted }: { onGetStarted: () => void }) {
  const [stats, setStats] = useState<Stats>({
    emailsGenerated: 0,
    emailsReceived: 0,
    activeUsers: 0,
    domainsAvailable: 0,
    uptime: '99.9%',
    responseTime: '< 100ms'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create temporary email addresses in milliseconds. No waiting, no delays.'
    },
    {
      icon: Shield,
      title: '100% Private',
      description: 'Your real email stays hidden. No tracking, no data collection, complete anonymity.'
    },
    {
      icon: Clock,
      title: 'Real-time Delivery',
      description: 'Receive emails instantly with auto-refresh. Never miss an important message.'
    },
    {
      icon: Globe,
      title: 'Multiple Domains',
      description: 'Choose from various domains. Create unlimited temporary emails for any purpose.'
    },
    {
      icon: CheckCircle,
      title: 'No Registration',
      description: 'Start using immediately. No sign-up, no verification, no personal information required.'
    },
    {
      icon: TrendingUp,
      title: 'High Performance',
      description: 'Lightning-fast service with 99.9% uptime. Reliable when you need it most.'
    }
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 24px',
          background: theme.gradients.card,
          borderRadius: theme.borderRadius.full,
          marginBottom: theme.spacing['3xl'],
          border: `1px solid ${theme.colors.primary[200]}`,
          boxShadow: theme.shadows.sm
        }}>
          <Mail size={16} color={theme.colors.primary[500]} />
          <span style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.primary[500]
          }}>Temporary Email Service</span>
        </div>

        <h1 style={{
          fontSize: theme.typography.fontSize['5xl'],
          fontWeight: theme.typography.fontWeight.extrabold,
          color: theme.colors.text.primary,
          margin: `0 auto ${theme.spacing.xl}`,
          maxWidth: '900px',
          lineHeight: theme.typography.lineHeight.tight,
          letterSpacing: theme.typography.letterSpacing.tighter
        }}>
          Protect Your Privacy with
          <span style={{
            display: 'block',
            backgroundImage: theme.gradients.primaryText,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginTop: theme.spacing.sm
          }}>Temporary Email Addresses</span>
        </h1>

        <p style={{
          fontSize: theme.typography.fontSize.xl,
          color: theme.colors.text.tertiary,
          margin: `0 auto ${theme.spacing['5xl']}`,
          maxWidth: '700px',
          lineHeight: theme.typography.lineHeight.relaxed,
          fontWeight: theme.typography.fontWeight.normal
        }}>
          Create disposable email addresses instantly. Receive emails in real-time without revealing your identity. 
          Perfect for sign-ups, verifications, and protecting your privacy online.
        </p>

        <button
          onClick={onGetStarted}
          style={{
            padding: theme.components.button.primary.padding,
            fontSize: theme.components.button.primary.fontSize,
            fontWeight: theme.components.button.primary.fontWeight,
            color: theme.components.button.primary.color,
            background: theme.components.button.primary.background,
            border: theme.components.button.primary.border,
            borderRadius: theme.components.button.primary.borderRadius,
            boxShadow: theme.components.button.primary.boxShadow,
            transition: theme.components.button.primary.transition,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: theme.typography.fontFamily.primary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = theme.shadows.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.components.button.primary.boxShadow;
          }}
        >
          Get Started Free
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Statistics Section */}
      <section style={{
        padding: `${theme.spacing['5xl']} ${theme.spacing.xl}`,
        background: theme.components.card.default.background,
        backdropFilter: theme.components.card.default.backdropFilter,
        borderRadius: theme.components.card.default.borderRadius,
        margin: `${theme.spacing['4xl']} auto`,
        maxWidth: '1200px',
        boxShadow: theme.components.card.default.boxShadow,
        border: theme.components.card.default.border,
        transition: theme.components.card.default.transition
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            background: theme.gradients.card,
            borderRadius: theme.borderRadius.full,
            marginBottom: theme.spacing.md,
            border: `1px solid ${theme.colors.primary[200]}`,
            boxShadow: theme.shadows.sm
          }}>
            <BarChart3 size={16} color={theme.colors.primary[500]} />
            <span style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.primary[500]
            }}>Platform Statistics</span>
          </div>
          <h2 style={{
            fontSize: theme.typography.fontSize['4xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            margin: `0 0 ${theme.spacing.sm} 0`,
            letterSpacing: theme.typography.letterSpacing.tight
          }}>Trusted by Thousands</h2>
          <p style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.muted,
            margin: 0
          }}>Real-time statistics of our service</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            padding: theme.components.card.stat.padding,
            background: theme.components.card.stat.background,
            borderRadius: theme.components.card.stat.borderRadius,
            boxShadow: theme.components.card.stat.boxShadow,
            border: theme.components.card.stat.border,
            textAlign: 'center',
            transition: theme.components.card.stat.transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.components.card.stat.boxShadow;
            e.currentTarget.style.borderColor = theme.components.card.stat.border.split(' ')[2];
          }}
          >
            <div style={{
              width: theme.components.icon.xlarge.width,
              height: theme.components.icon.xlarge.height,
              margin: `0 auto ${theme.spacing.lg}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.gradients.icon,
              borderRadius: theme.borderRadius.xl,
              boxShadow: theme.shadows.md
            }}>
              <Mail size={30} color={theme.colors.primary[500]} />
            </div>
            <div style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
              letterSpacing: theme.typography.letterSpacing.tight
            }}>
              {loading ? '...' : formatNumber(stats.emailsGenerated)}
            </div>
            <p style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.muted,
              margin: 0,
              fontWeight: theme.typography.fontWeight.medium
            }}>Emails Generated</p>
          </div>

          <div style={{
            padding: theme.components.card.stat.padding,
            background: theme.components.card.stat.background,
            borderRadius: theme.components.card.stat.borderRadius,
            boxShadow: theme.components.card.stat.boxShadow,
            border: theme.components.card.stat.border,
            textAlign: 'center',
            transition: theme.components.card.stat.transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.components.card.stat.boxShadow;
            e.currentTarget.style.borderColor = theme.components.card.stat.border.split(' ')[2];
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.gradients.icon,
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}>
              <TrendingUp size={30} color={theme.colors.primary[500]} />
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#1a202c',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              {loading ? '...' : formatNumber(stats.emailsReceived)}
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: '#718096',
              margin: 0,
              fontWeight: 500
            }}>Emails Received</p>
          </div>

          <div style={{
            padding: theme.components.card.stat.padding,
            background: theme.components.card.stat.background,
            borderRadius: theme.components.card.stat.borderRadius,
            boxShadow: theme.components.card.stat.boxShadow,
            border: theme.components.card.stat.border,
            textAlign: 'center',
            transition: theme.components.card.stat.transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.components.card.stat.boxShadow;
            e.currentTarget.style.borderColor = theme.components.card.stat.border.split(' ')[2];
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.gradients.icon,
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}>
              <Users size={30} color={theme.colors.primary[500]} />
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#1a202c',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              {loading ? '...' : formatNumber(stats.activeUsers)}
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: '#718096',
              margin: 0,
              fontWeight: 500
            }}>Active Users</p>
          </div>

          <div style={{
            padding: theme.components.card.stat.padding,
            background: theme.components.card.stat.background,
            borderRadius: theme.components.card.stat.borderRadius,
            boxShadow: theme.components.card.stat.boxShadow,
            border: theme.components.card.stat.border,
            textAlign: 'center',
            transition: theme.components.card.stat.transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.components.card.stat.boxShadow;
            e.currentTarget.style.borderColor = theme.components.card.stat.border.split(' ')[2];
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.gradients.icon,
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}>
              <Globe size={30} color={theme.colors.primary[500]} />
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#1a202c',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              {loading ? '...' : stats.domainsAvailable}
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: '#718096',
              margin: 0,
              fontWeight: 500
            }}>Available Domains</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1a202c',
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em'
          }}>Why Choose CursurPro TempMail?</h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#718096',
            margin: 0,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7
          }}>
            The most secure and reliable temporary email service. Built for privacy, designed for speed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                style={{
                  padding: theme.components.card.feature.padding,
                  background: theme.components.card.feature.background,
                  backdropFilter: theme.components.card.feature.backdropFilter,
                  borderRadius: theme.components.card.feature.borderRadius,
                  boxShadow: theme.components.card.feature.boxShadow,
                  border: theme.components.card.feature.border,
                  transition: theme.transitions.normal,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = theme.shadows.cardHover;
                  e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.components.card.feature.boxShadow;
                  e.currentTarget.style.borderColor = theme.components.card.feature.border;
                }}
              >
                <div style={{
                  width: theme.components.icon.xlarge.width,
                  height: theme.components.icon.xlarge.height,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme.gradients.primary,
                  borderRadius: theme.borderRadius['2xl'],
                  marginBottom: theme.spacing['2xl'],
                  boxShadow: theme.shadows.primary
                }}>
                  <Icon size={32} color="white" />
                </div>
                <h3 style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                  margin: `0 0 ${theme.spacing.sm} 0`,
                  letterSpacing: theme.typography.letterSpacing.normal
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.muted,
                  margin: 0,
                  lineHeight: theme.typography.lineHeight.relaxed
                }}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: `${theme.spacing['7xl']} ${theme.spacing['5xl']}`,
          background: theme.gradients.primary,
          borderRadius: theme.components.card.default.borderRadius,
          boxShadow: theme.shadows.gradient,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '2.75rem',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em'
            }}>Ready to Get Started?</h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 40px 0',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7
            }}>
              Create your first temporary email address in seconds. No registration, no hassle, just privacy.
            </p>
            <button
              onClick={onGetStarted}
              style={{
                padding: theme.components.button.white.padding,
                background: theme.components.button.white.background,
                color: theme.components.button.white.color,
                borderRadius: theme.components.button.white.borderRadius,
                boxShadow: theme.components.button.white.boxShadow,
                transition: theme.components.button.white.transition,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.lg
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.background = '#f7fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = 'white';
              }}
            >
              Create Email Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

