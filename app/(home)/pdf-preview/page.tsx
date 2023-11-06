'use client';
import dynamic from 'next/dynamic';
import { GytisTalockaResume } from '../GytisTalockaResume';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false,
});

export default function PdfPreviewPage() {
  return (
    <PDFViewer className="w-screen h-screen">
      <GytisTalockaResume />
    </PDFViewer>
  );
}
