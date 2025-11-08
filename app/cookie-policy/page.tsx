'use client';

import { theme } from '../theme';
import { Cookie, Settings, Info, Shield } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function CookiePolicy() {
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
            <Cookie size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>Cookie Policy</h1>
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
              marginBottom: theme.spacing.md
            }}>What Are Cookies?</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p>
              Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps improve your browsing experience and allows websites to provide personalized content.
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
              <Settings size={20} color={theme.colors.primary[500]} />
              How We Use Cookies
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              CursurPro TempMail uses cookies for the following purposes:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>To remember your preferences and settings</li>
              <li>To maintain your session and temporary email address</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To improve website functionality and user experience</li>
              <li>To ensure website security</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Types of Cookies We Use</h2>

            <div style={{
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.lg,
              background: theme.gradients.card,
              borderRadius: theme.borderRadius.xl,
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
                <Info size={18} color={theme.colors.primary[500]} />
                Essential Cookies
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the service to work.
              </p>
            </div>

            <div style={{
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.lg,
              background: theme.gradients.card,
              borderRadius: theme.borderRadius.xl,
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
                <Settings size={18} color={theme.colors.primary[500]} />
                Functional Cookies
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, personalized features. They may also be used to provide services you have requested.
              </p>
            </div>

            <div style={{
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.lg,
              background: theme.gradients.card,
              borderRadius: theme.borderRadius.xl,
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
                <Shield size={18} color={theme.colors.primary[500]} />
                Analytics Cookies
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works.
              </p>
            </div>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Third-Party Cookies</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements. These third parties may set their own cookies to collect information about your online activities across different websites.
            </p>
            <p>
              We do not control these third-party cookies. Please refer to the privacy policies of these third parties for information about their cookie practices.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Managing Cookies</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience on our website. Here's how to manage cookies in popular browsers:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Microsoft Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
            </ul>
            <p>
              You can also opt-out of certain third-party cookies by visiting the Network Advertising Initiative opt-out page or the Digital Advertising Alliance opt-out page.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Cookie Duration</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Cookies can be either "session" cookies or "persistent" cookies:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They help maintain your session while you navigate our website.</li>
              <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please review this page periodically for any updates. The "Last updated" date at the top of this page indicates when this policy was last revised.
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
              marginBottom: theme.spacing.md
            }}>Contact Us</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              If you have any questions about our use of cookies, please contact us:
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

