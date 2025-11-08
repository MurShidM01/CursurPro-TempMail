import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "CursurPro TempMail - Temporary Email Service",
  description: "Create temporary email addresses instantly. No registration required. Receive emails in real-time and protect your privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: `${poppins.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          margin: 0,
          padding: 0,
          fontWeight: 400
        }}
      >
        {/* Ad Scripts */}
        <Script 
          src="//pl28011183.effectivegatecpm.com/19/09/9d/19099d5fdd22416fa5fd1b4ecc46ca85.js"
          strategy="afterInteractive"
        />
        <Script 
          src="//pl28011261.effectivegatecpm.com/b1295c45d307f3c8f0be77f72ef3e22d/invoke.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        {children}
      </body>
    </html>
  );
}
