import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gytis Taločka CV',
  description: 'Personal CV as a website and PDF from a single source',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.className} min-h-screen h-screen`}>{children}</body>
    </html>
  );
}
