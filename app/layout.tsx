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
  title: {
    default: "Mustafa.ai",
    template: "%s | Mustafa.ai",
  },
  description: "Mustafa.ai | Product Builder with a passion for shipping in public and creating something from nothing. Exploring the intersection of reactive systems and AI.",
  metadataBase: new URL("https://mustafa-forge.vercel.app"),
  icons: {
    shortcut: "/favicon.ico?v=1",
    apple: "/apple-touch-icon.png?v=1",
    icon: [
      { url: "/favicon-32x32.png?v=1", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=1", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mustafa.ai",
    description: "Product Builder with a passion for shipping in public and creating something from nothing.",
    url: "https://mustafa-forge.vercel.app",
    siteName: "Mustafa.ai",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Mustafa.ai - Next.js and Supabase Product Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa.ai",
    description: "Product Builder shipping in public.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
