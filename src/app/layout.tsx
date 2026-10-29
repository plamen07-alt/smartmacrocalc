import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.smartmacrocalc.com'),
  title:
    'SmartMacroCalc.com | Body Recomposition, GLP-1 Protein & Macro Cycling Calculator',
  description:
    'Clinical-grade Body Recomposition, Calorie Cycling (+5%/-20%), GLP-1 & Ozempic Muscle Preservation, Perimenopause, 16:8 Fasting Clock, Reverse Dieting (+80 kcal/wk), FFMI & Electrolyte Calculator.',
  keywords: [
    'body recomposition calculator',
    'calorie cycling calculator',
    'GLP-1 protein calculator',
    'Ozempic macro calculator',
    'perimenopause macro calculator',
    'intermittent fasting 16:8 calculator',
    'reverse diet calculator',
    'Katch-McArdle TDEE calculator',
    'Cunningham equation BMR',
    'leucine protein synthesis calculator',
  ],
  alternates: {
    canonical: 'https://www.smartmacrocalc.com',
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title:
      'SmartMacroCalc.com | Body Recomposition, GLP-1 Protein & Macro Cycling Calculator',
    description:
      'Calculate your exact Training Day (+5%) & Rest Day (-20%) macros, GLP-1 anti-sarcopenia protein floor, Perimenopause targets, 16:8 Fasting clock & 12-week body fat trajectory.',
    url: 'https://www.smartmacrocalc.com',
    siteName: 'SmartMacroCalc.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SmartMacroCalc.com — Body Recomposition, GLP-1 Protein & Calorie Cycling Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SmartMacroCalc.com | Body Recomposition, GLP-1 Protein & Macro Cycling Calculator',
    description:
      'Calculate your exact Training Day (+5%) & Rest Day (-20%) macros, GLP-1 anti-sarcopenia protein floor, Perimenopause targets & 12-week body fat trajectory.',
    images: ['/opengraph-image'],
  },
  facebook: {
    appId: '966242223397117',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4352066394446213';
  const isLiveAdsense =
    Boolean(adsenseClientId) &&
    adsenseClientId?.startsWith('ca-pub-') &&
    !adsenseClientId?.includes('0000000000');

  return (
    <html lang="en">
      <head>
        <meta property="fb:app_id" content="966242223397117" />
        {isLiveAdsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* Google tag (gtag.js) - lazyOnload preserves mobile LCP & 100/100 Core Web Vitals */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PC393FVH8K"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PC393FVH8K');
          `}
        </Script>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
