import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import AdManager from "./components/AdManager";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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
        <ServiceWorkerRegistration />
        <AdManager />
        {children}
      </body>
    </html>
  );
}
