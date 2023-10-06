'use client';
import { Button } from '@/components/Button';
import { GytisTalockaResume } from './cv/GytisTalockaResume';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

export default function CV() {
  return (
    <main className="h-full flex flex-col">
      <PDFDownloadLink document={<GytisTalockaResume />} fileName="Gytis Taločka Resume.pdf">
        {({ loading }) => !loading && <Button>Download resume (PDF)</Button>}
      </PDFDownloadLink>
    </main>
  );
}
