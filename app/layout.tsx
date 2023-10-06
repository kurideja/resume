import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gytis Taločka CV',
  description: 'Personal CV as a website and PDF from a single source',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-violet-900 via-purple-800 to-blue-600 h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
