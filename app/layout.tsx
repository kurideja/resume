import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gytis Taločka CV',
  description: 'Personal CV as a website and PDF from a single source',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.className} min-h-screen h-screen`}>{children}</body>
    </html>
  );
}
