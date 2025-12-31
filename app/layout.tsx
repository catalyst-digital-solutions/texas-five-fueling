import type { Metadata } from "next";
import { Poppins, Playfair_Display } from 'next/font/google';
import { LazyMotion, domAnimation } from 'framer-motion';
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ViewTransitionProvider } from "@/providers/ViewTransitionProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'], // Regular, SemiBold, Bold
  variable: '--font-poppins',
  display: 'swap', // Optimize font loading - prevent invisible text
});
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '700'], // Regular, Bold
  variable: '--font-playfair',
  display: 'swap', // Optimize font loading - prevent invisible text
});

export const metadata: Metadata = {
  metadataBase: new URL('https://texasfivefueling.com'),
  title: {
    default: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
    template: '%s | Texas Five Fueling',
  },
  description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas. Licensed, insured, and reliable fuel delivery services.',
  keywords: ['diesel delivery', 'commercial fuel delivery', 'generator refueling', 'equipment refueling', 'Houston fuel delivery', 'DEF refilling', 'job site fuel delivery', 'mobile fueling Houston', 'construction fuel delivery', 'fleet fueling services'],
  authors: [{ name: 'Texas Five Fueling' }],
  creator: 'Texas Five Fueling',
  publisher: 'Texas Five Fueling',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
    description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas. Licensed, insured, and reliable fuel delivery services.',
    url: 'https://texasfivefueling.com',
    siteName: 'Texas Five Fueling',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Texas Five Fueling - Reliable Diesel Delivery Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
    description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <LazyMotion features={domAnimation} strict>
        <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
          <ViewTransitionProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </ViewTransitionProvider>
          <Toaster />
          
          {/* JSON-LD Structured Data for Local Business */}
          <Script
            id="json-ld"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Texas Five Fueling',
                description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas.',
                url: 'https://texasfivefueling.com',
                telephone: '+1-855-895-3835',
                email: 'info@texasfivefueling.com',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Houston',
                  addressRegion: 'TX',
                  addressCountry: 'US',
                },
                areaServed: {
                  '@type': 'GeoCircle',
                  geoMidpoint: {
                    '@type': 'GeoCoordinates',
                    latitude: 29.7604,
                    longitude: -95.3698,
                  },
                  geoRadius: '50 miles',
                },
                priceRange: '$$',
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '06:00',
                    closes: '20:00',
                  },
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Saturday',
                    opens: '07:00',
                    closes: '18:00',
                  },
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Sunday',
                    opens: '00:00',
                    closes: '23:59',
                    description: 'Emergency Only',
                  },
                ],
                sameAs: [
                  // Add social media URLs when available
                ],
              }),
            }}
          />
          
          {/* Service Worker Registration */}
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    })
                    .catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                });
              }
            `}
          </Script>
        </body>
      </LazyMotion>
    </html>
  );
}

