'use-client';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { HomeContextLayout } from '@/components/Home/components/HomeContextLayout/HomeContextLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Real Estate App',
  description: 'A real estate application built with Next.js and TypeScript',
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: 'oklch(55.6% 0 0);',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-700`}>
        <HomeContextLayout>{children}</HomeContextLayout>
      </body>
    </html>
  );
}
