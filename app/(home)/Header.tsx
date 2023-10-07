import { GytisTalockaResume } from './GytisTalockaResume';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

export function Header() {
  return (
    <div className="fixed z-50 bottom-0 p-2 w-screen flex">
      <div className="flex flex-row items-center gap-16 m-auto text-xl">
        <h1 className="font-bold">Gytis Taločka</h1>
        <a href="https://www.linkedin.com/in/gytis-talocka">LinkedIn</a>

        <PDFDownloadLink document={<GytisTalockaResume />} fileName="Gytis Taločka Resume.pdf">
          {({ loading }) => !loading && 'Resume (PDF)'}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
