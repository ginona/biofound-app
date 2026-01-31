import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "biofound. | SEO Link in Bio for Creators",
  description: "Create a Google-indexed creator profile. Your link in bio page that actually ranks in search. Free forever, built for discovery.",
  keywords: "link in bio, creator profile, SEO link in bio, Google indexed bio, creator landing page, OnlyFans link in bio",
  openGraph: {
    title: "biofound. | SEO Link in Bio for Creators",
    description: "The only link in bio tool built for organic discovery. Create your creator profile and get indexed by Google—free forever.",
    type: "website",
    url: "https://biofound.app",
    siteName: "biofound.",
  },
  twitter: {
    card: "summary_large_image",
    title: "biofound. | SEO Link in Bio for Creators",
    description: "The only link in bio tool built for organic discovery. Get indexed by Google—free forever.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
