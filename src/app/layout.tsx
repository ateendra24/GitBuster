import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { Outfit } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import siteConfig from "@/config/siteConfig";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from '@clerk/nextjs';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.siteName} beta - ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.className} ${outfit.variable} antialiased`} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body className="bg-background font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
