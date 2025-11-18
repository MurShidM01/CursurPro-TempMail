import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

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
        <script src="https://fpyf8.com/88/tag.min.js" data-zone="186400" async data-cfasync="false"></script>
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
        {children}
      </body>
    </html>
  );
}
