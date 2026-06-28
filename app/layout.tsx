import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Agent-B | Brent Crude Procurement Intelligence',
  description: 'Zero-cost Reliance procurement forecasting system for Brent crude futures using iTransformer quantile predictions and AI-powered sentiment analysis.',
  keywords: ['Brent crude', 'procurement', 'forecasting', 'AI', 'iTransformer', 'Reliance', 'commodities'],
  authors: [{ name: 'Agent-B Team' }],
  openGraph: {
    title: 'Agent-B | Brent Crude Procurement Intelligence',
    description: 'AI-powered Brent crude quantile forecasting for strategic procurement decisions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent-B | Brent Crude Procurement Intelligence',
    description: 'AI-powered Brent crude quantile forecasting for strategic procurement decisions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
