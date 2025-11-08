'use client';

import { theme } from '../theme';
import { Mail, MessageSquare, Send, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <MessageSquare size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>Contact Us</h1>
            <p style={{
              fontSize: '0.875rem',
              color: theme.colors.text.tertiary,
              margin: '4px 0 0 0'
            }}>We'd love to hear from you</p>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing['3xl']
        }}>
          <div style={{
            padding: theme.spacing.xl,
            background: theme.gradients.card,
            borderRadius: theme.borderRadius.xl,
            border: `1px solid ${theme.colors.primary[300]}`,
            textAlign: 'center'
          }}>
            <Mail size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs
            }}>Email</h3>
            <a href="mailto:support@cursurpro.site" style={{
              color: theme.colors.primary[600],
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              support@cursurpro.site
            </a>
          </div>

          <div style={{
            padding: theme.spacing.xl,
            background: theme.gradients.card,
            borderRadius: theme.borderRadius.xl,
            border: `1px solid ${theme.colors.primary[300]}`,
            textAlign: 'center'
          }}>
            <Clock size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs
            }}>Response Time</h3>
            <p style={{
              color: theme.colors.text.secondary,
              fontSize: '0.875rem',
              margin: 0
            }}>Within 24-48 hours</p>
          </div>

          <div style={{
            padding: theme.spacing.xl,
            background: theme.gradients.card,
            borderRadius: theme.borderRadius.xl,
            border: `1px solid ${theme.colors.primary[300]}`,
            textAlign: 'center'
          }}>
            <MapPin size={24} color={theme.colors.primary[500]} style={{ marginBottom: theme.spacing.sm }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs
            }}>Location</h3>
            <p style={{
              color: theme.colors.text.secondary,
              fontSize: '0.875rem',
              margin: 0
            }}>Worldwide Service</p>
          </div>
        </div>

        {/* Contact Form */}
        <section>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.lg
          }}>Send Us a Message</h2>

          {submitted ? (
            <div style={{
              padding: theme.spacing.xl,
              background: theme.colors.success[50],
              border: `2px solid ${theme.colors.success[500]}`,
              borderRadius: theme.borderRadius.xl,
              color: theme.colors.success[600],
              textAlign: 'center',
              marginBottom: theme.spacing.lg
            }}>
              <Send size={24} style={{ marginBottom: theme.spacing.sm }} />
              <p style={{ margin: 0, fontWeight: 600 }}>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.lg
            }}>
              <div>
                <label htmlFor="name" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.neutral[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                    e.currentTarget.style.outline = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.neutral[300];
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.neutral[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                    e.currentTarget.style.outline = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.neutral[300];
                  }}
                />
              </div>

              <div>
                <label htmlFor="subject" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs
                }}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.neutral[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                    e.currentTarget.style.outline = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.neutral[300];
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="privacy">Privacy Concern</option>
                  <option value="abuse">Report Abuse</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs
                }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.neutral[300]}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                    e.currentTarget.style.outline = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.neutral[300];
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                  background: theme.gradients.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: theme.borderRadius.lg,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing.sm,
                  transition: 'all 0.3s ease',
                  boxShadow: theme.shadows.primary
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
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}

          <div style={{
            marginTop: theme.spacing.xl,
            padding: theme.spacing.lg,
            background: theme.colors.warning[50],
            border: `1px solid ${theme.colors.warning[500]}`,
            borderRadius: theme.borderRadius.md,
            fontSize: '0.875rem',
            color: theme.colors.text.secondary
          }}>
            <strong>Note:</strong> For urgent matters or security issues, please email us directly at{' '}
            <a href="mailto:support@cursurpro.site" style={{ color: theme.colors.primary[600] }}>
              support@cursurpro.site
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

