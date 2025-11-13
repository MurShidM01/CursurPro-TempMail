'use client';

import { theme } from '../theme';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
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
            <Shield size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>Privacy Policy</h1>
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
              <Lock size={20} color={theme.colors.primary[500]} />
              1. Introduction
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Welcome to CursurPro TempMail ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our temporary email service.
            </p>
            <p>
              By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
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
              <Eye size={20} color={theme.colors.primary[500]} />
              2. Information We Collect
            </h2>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.sm
            }}>2.1 Information You Provide</h3>
            <p style={{ marginBottom: theme.spacing.md }}>
              Our service is designed to be anonymous. We do not require you to provide any personal information such as your name, email address, or phone number to use our temporary email service.
            </p>

            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.sm
            }}>2.2 Automatically Collected Information</h3>
            <p style={{ marginBottom: theme.spacing.md }}>
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit on our site</li>
              <li>Time and date of your visit</li>
              <li>Time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>

            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.sm
            }}>2.3 Temporary Email Addresses</h3>
            <p>
              We generate temporary email addresses for your use. These addresses are stored temporarily and may be deleted after a period of inactivity. We do not permanently store the content of emails received at these temporary addresses.
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
              <FileText size={20} color={theme.colors.primary[500]} />
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              We use the information we collect for the following purposes:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>To provide, maintain, and improve our temporary email service</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To ensure the security and integrity of our service</li>
              <li>To comply with legal obligations</li>
              <li>To personalize your experience</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>4. Cookies and Tracking Technologies</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p>
              For more detailed information about our use of cookies, please see our <Link href="/cookie-policy" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>Cookie Policy</Link>.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>5. Third-Party Services</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              We may use third-party services to help us operate our service and administer activities on our behalf, such as:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Analytics services to understand how our service is used</li>
              <li>Email forwarding services to deliver emails to temporary addresses</li>
              <li>Hosting and infrastructure providers</li>
              <li>Advertising services like Google AdSense</li>
            </ul>
            <p>
              These third parties have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.sm
            }}>5.1 Google AdSense</h3>
            <p style={{ marginBottom: theme.spacing.md }}>
              We use Google AdSense, a service provided by Google Inc., to serve advertisements on our website. Google AdSense may use cookies and other tracking technologies to collect information about your visits to our website and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <p style={{ marginBottom: theme.spacing.md }}>
              Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>Google Ads Settings</a>.
            </p>
            <p>
              For more information on how Google uses information from sites or apps that use their services, please visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>How Google uses information from sites or apps that use our services</a>.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>7. Your Rights</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>8. Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section style={{
            marginBottom: theme.spacing['3xl'],
            padding: theme.spacing.xl,
            background: theme.gradients.card,
            borderRadius: theme.borderRadius.xl,
            border: `1px solid ${theme.colors.primary[200]}`
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm
            }}>
              <Mail size={20} color={theme.colors.primary[500]} />
              10. Contact Us
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p style={{ margin: 0 }}>
              Email: <a href="mailto:privacy@cursurpro.site" style={{ color: theme.colors.primary[600], textDecoration: 'underline' }}>privacy@cursurpro.site</a>
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

