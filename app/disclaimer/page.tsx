'use client';

import { theme } from '../theme';
import { AlertTriangle, Shield, FileWarning, Info } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Disclaimer() {
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
          borderBottom: `2px solid ${theme.colors.warning[500]}`
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: theme.borderRadius.xl,
            background: `linear-gradient(135deg, ${theme.colors.warning[500]} 0%, ${theme.colors.warning[600]} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows.warning
          }}>
            <AlertTriangle size={30} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>Disclaimer</h1>
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
          <section style={{
            marginBottom: theme.spacing['3xl'],
            padding: theme.spacing.xl,
            background: `linear-gradient(135deg, ${theme.colors.warning[50]} 0%, rgba(255, 255, 255, 0.8) 100%)`,
            borderRadius: theme.borderRadius.xl,
            border: `2px solid ${theme.colors.warning[200]}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'start',
              gap: theme.spacing.md
            }}>
              <Info size={24} color={theme.colors.warning[600]} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: theme.colors.warning[700],
                  marginBottom: theme.spacing.sm
                }}>Important Notice</h3>
                <p style={{ margin: 0, color: theme.colors.text.secondary }}>
                  Please read this disclaimer carefully before using our temporary email service. By using our service, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
                </p>
              </div>
            </div>
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
              <FileWarning size={20} color={theme.colors.warning[500]} />
              1. Service Nature
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              CursurPro TempMail provides temporary email addresses for legitimate purposes such as:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Protecting your privacy when signing up for online services</li>
              <li>Testing email functionality during development</li>
              <li>Receiving one-time verification codes</li>
              <li>Avoiding spam in your primary email inbox</li>
            </ul>
            <p>
              Our service is intended for legitimate use only. Any misuse of our service is strictly prohibited.
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
              <Shield size={20} color={theme.colors.warning[500]} />
              2. No Warranty
            </h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy, reliability, or completeness of information</li>
            </ul>
            <p>
              We do not guarantee that the service will be available at all times, that it will be error-free, or that defects will be corrected.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>3. Limitation of Liability</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Loss of profits, data, or other intangible losses</li>
              <li>Damages resulting from your use or inability to use the service</li>
              <li>Damages resulting from unauthorized access to or alteration of your data</li>
              <li>Damages resulting from third-party conduct or content</li>
            </ul>
            <p>
              Our total liability for any claims arising from or related to the service shall not exceed the amount you paid to us, if any, in the 12 months preceding the claim.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>4. Email Content and Security</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              <strong>Important Security Notice:</strong>
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Emails received at temporary addresses are stored temporarily and may be accessible to others who know the email address</li>
              <li>Do not use temporary email addresses for sensitive or confidential information</li>
              <li>Do not use temporary email addresses for financial transactions or important communications</li>
              <li>Temporary email addresses may expire and be deleted without notice</li>
              <li>We are not responsible for any loss of data or information</li>
            </ul>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>5. Prohibited Uses</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              You agree NOT to use our service for:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>Any illegal activities or to facilitate illegal activities</li>
              <li>Sending spam, phishing emails, or malicious content</li>
              <li>Harassing, threatening, or abusing others</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating others or misrepresenting your identity</li>
              <li>Interfering with or disrupting the service</li>
              <li>Attempting to gain unauthorized access to our systems</li>
            </ul>
            <p>
              Violation of these terms may result in immediate termination of your access to the service and may subject you to legal action.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>6. Third-Party Services</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              Our service may integrate with or link to third-party services. We are not responsible for:
            </p>
            <ul style={{
              marginLeft: theme.spacing.xl,
              marginBottom: theme.spacing.md,
              listStyle: 'disc'
            }}>
              <li>The availability, accuracy, or content of third-party services</li>
              <li>Any transactions between you and third parties</li>
              <li>Any damages or losses resulting from your use of third-party services</li>
            </ul>
            <p>
              Your use of third-party services is subject to their respective terms and conditions.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>7. Changes to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless CursurPro TempMail, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your use of the service or violation of this disclaimer.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>9. Governing Law</h2>
            <p>
              This disclaimer shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions. Any disputes arising from this disclaimer or your use of the service shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
            </p>
          </section>

          <section style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>10. Contact Information</h2>
            <p style={{ marginBottom: theme.spacing.md }}>
              If you have any questions about this disclaimer, please contact us:
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

