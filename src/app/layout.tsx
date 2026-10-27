import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title:
    'SmartMacroCalc.com | Body Recomposition, GLP-1 Protein & Macro Cycling Calculator',
  description:
    'Clinical-grade Body Recomposition, Calorie Cycling (+5%/-20%), GLP-1 & Ozempic Muscle Preservation, Reverse Dieting (+80 kcal/wk), FFMI & Sweat Electrolyte Calculator powered by Mifflin-St Jeor, Katch-McArdle & Cunningham equations.',
  keywords: [
    'body recomposition calculator',
    'calorie cycling calculator',
    'GLP-1 protein calculator',
    'Ozempic macro calculator',
    'reverse diet calculator',
    'Katch-McArdle TDEE calculator',
    'Cunningham equation BMR',
    'leucine protein synthesis calculator',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isLiveAdsense =
    Boolean(adsenseClientId) &&
    adsenseClientId?.startsWith('ca-pub-') &&
    !adsenseClientId?.includes('0000000000');

  return (
    <html lang="en">
      <head>
        {isLiveAdsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
