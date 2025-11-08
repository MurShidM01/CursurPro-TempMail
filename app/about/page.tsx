'use client';

import { theme } from '../theme';
import { Users, Shield, Zap, Globe, Heart, Target } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div style={{
      minHeight: '100vh',
      background: theme.gradients.background,
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: theme.components.card.default.background,
        borderRadius: theme.borderRadius['2xl'],
        padding: theme.spacing['4xl'],
        boxShadow: theme.shadows.lg,
        border: theme.components.card.default.border
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          marginBottom: theme.spacing['3xl'],
          paddingBottom: theme.spacing.xl,
          borderBottom: `2px solid ${theme.colors.primary[200]}`
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: theme.borderRadius.xl,
            background: theme.gradients.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows.primary
          }}>
            <Users size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>About Us</h1>
            <p style={{
              fontSize: '0.875rem',
              color: theme.colors.text.tertiary,
              margin: '4px 0 0 0'
            }}>Learn more about CursurPro TempMail</p>
          </div>
        </div>

        {/* Content */}
        <div style={{
          lineHeight: theme.typography.lineHeight.relaxed,
          color: theme.colors.text.secondary
        }}>
          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Our Mission</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              At CursurPro TempMail, we believe that privacy is a fundamental right in the digital age. Our mission is to provide a free, secure, and easy-to-use temporary email service that helps users protect their privacy online.
            </p>
            <p>
              We understand that in today's interconnected world, your email address is often required for various online services, but you shouldn't have to compromise your privacy or expose your primary email to spam and unwanted communications.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm
            }}>
              <Target size={20} color={theme.colors.primary[500]} />
              What We Offer
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: theme.spacing.lg,
              marginTop: theme.spacing.lg
            }}>
              <div style={{
                padding: theme.spacing.xl,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <Zap size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm
                }}>Instant Email Generation</h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Create temporary email addresses instantly with just one click. No registration required.
                </p>
              </div>

              <div style={{
                padding: theme.spacing.xl,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <Shield size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm
                }}>Privacy Protection</h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Keep your primary email address private and protected from spam, phishing, and unwanted marketing.
                </p>
              </div>

              <div style={{
                padding: theme.spacing.xl,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.xl,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <Globe size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm
                }}>Free & Accessible</h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Our service is completely free to use, with no hidden fees or premium tiers. Accessible to everyone, everywhere.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Our Values</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md
            }}>
              <div style={{
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm
                }}>
                  <Shield size={20} color={theme.colors.primary[500]} />
                  Privacy First
                </h3>
                <p style={{ margin: 0 }}>
                  We are committed to protecting your privacy. We don't track you, we don't sell your data, and we don't require any personal information to use our service.
                </p>
              </div>

              <div style={{
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm
                }}>
                  <Heart size={20} color={theme.colors.primary[500]} />
                  User-Centric
                </h3>
                <p style={{ margin: 0 }}>
                  Our users are at the heart of everything we do. We continuously work to improve our service based on user feedback and needs.
                </p>
              </div>

              <div style={{
                padding: theme.spacing.lg,
                background: theme.gradients.card,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.primary[200]}`
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm
                }}>
                  <Zap size={20} color={theme.colors.primary[500]} />
                  Simplicity
                </h3>
                <p style={{ margin: 0 }}>
                  We believe in keeping things simple. Our service is designed to be intuitive and easy to use, without unnecessary complexity.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>How It Works</h2>
            <ol style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'decimal'
            }}>
              <li style={{ marginBottom: theme.spacing.sm }}>
                <strong>Generate:</strong> Click "Get Started" to instantly generate a temporary email address
              </li>
              <li style={{ marginBottom: theme.spacing.sm }}>
                <strong>Use:</strong> Use this temporary email address to sign up for services, receive verification codes, or any other purpose
              </li>
              <li style={{ marginBottom: theme.spacing.sm }}>
                <strong>Receive:</strong> View all emails sent to your temporary address in real-time
              </li>
              <li style={{ marginBottom: theme.spacing.sm }}>
                <strong>Protect:</strong> Your temporary email automatically expires after 24 hours, keeping your primary email safe
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Technology</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              CursurPro TempMail is built using modern web technologies to ensure fast, secure, and reliable service:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Next.js 16 for fast, server-rendered pages</li>
              <li>React 19 for a smooth user interface</li>
              <li>TypeScript for type safety and reliability</li>
              <li>Secure email forwarding through trusted providers</li>
              <li>Modern encryption and security practices</li>
            </ul>
          </section>

          <section style={{
            marginBottom: theme.spacing['3xl'],
            padding: theme.spacing.xl,
            background: theme.gradients.primary,
            borderRadius: theme.borderRadius.xl,
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: theme.spacing.md
            }}>Get Started Today</h2>
            <p style={{ marginBottom: theme.spacing.lg, opacity: 0.95 }}>
              Ready to protect your privacy? Start using CursurPro TempMail today - it's free, fast, and requires no registration.
            </p>
            <Link href="/" style={{
              display: 'inline-block',
              padding: `${theme.spacing.md} ${theme.spacing.xl}`,
              background: 'white',
              color: theme.colors.primary[600],
              borderRadius: theme.borderRadius.lg,
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              Create Temporary Email →
            </Link>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

