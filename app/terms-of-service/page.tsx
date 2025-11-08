'use client';

import { theme } from '../theme';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function TermsOfService() {
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
            <FileText size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>Terms of Service</h1>
            <p style={{
              fontSize: '0.875rem',
              color: theme.colors.text.tertiary,
              margin: '4px 0 0 0'
            }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
              marginBottom: theme.spacing.md,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm
            }}>
              <Scale size={20} color={theme.colors.primary[500]} />
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              By accessing and using CursurPro TempMail ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your access to and use of our website and services. Please read these Terms carefully before using our Service.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>2. Description of Service</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              CursurPro TempMail provides temporary email addresses that allow users to receive emails without revealing their personal email addresses. The Service includes:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Generation of temporary email addresses</li>
              <li>Email forwarding to temporary addresses</li>
              <li>Viewing emails received at temporary addresses</li>
              <li>Automatic expiration of temporary email addresses</li>
            </ul>
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
              <CheckCircle size={20} color={theme.colors.primary[500]} />
              3. Acceptable Use
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Transmit any worms, viruses, or any code of a destructive nature</li>
              <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Use the Service to harass, abuse, or harm another person</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>4. User Accounts</h2>
            <p>
              Our Service does not require user registration or account creation. Temporary email addresses are generated on-demand and do not require any personal information. However, you are responsible for maintaining the confidentiality of any temporary email addresses you use.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>5. Service Availability</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              We strive to provide a reliable service, but we do not guarantee that:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>The Service will be available at all times</li>
              <li>The Service will be uninterrupted or error-free</li>
              <li>All emails will be delivered successfully</li>
              <li>Temporary email addresses will remain active indefinitely</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice.
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
              <AlertCircle size={20} color={theme.colors.warning[500]} />
              6. Limitation of Liability
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CURSURPRO TEMPMAIL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p>
              Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid to us, if any, in the 12 months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>7. Intellectual Property</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              The Service and its original content, features, and functionality are owned by CursurPro TempMail and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>8. Termination</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>10. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which CursurPro TempMail operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>11. Contact Information</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p style={{ margin: 0 }}>
              Email: <a href="mailto:legal@cursurpro.site" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>legal@cursurpro.site</a>
            </p>
            <p style={{ marginTop: theme.spacing.sm }}>
              Or visit our <Link href="/contact" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>Contact Us</Link> page.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

