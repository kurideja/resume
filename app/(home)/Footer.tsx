import { GytisTalockaResume } from './GytisTalockaResume';
import dynamic from 'next/dynamic';
import { ResumeLink } from './ResumeLink';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <ResumeLink disabled />,
  }
);

export function Footer() {
  return (
    <div className="fixed z-50 bottom-0 p-2 w-screen flex text-slate-900">
      <div className="flex flex-row items-center gap-16 m-auto text-xl">
        <h1 className="font-bold">Gytis Taločka</h1>
        <a href="https://www.linkedin.com/in/gytis-talocka">LinkedIn</a>

        <PDFDownloadLink document={<GytisTalockaResume />} fileName="Gytis Taločka Resume.pdf">
          {({ loading }) => {
            return <ResumeLink disabled={loading} />;
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
