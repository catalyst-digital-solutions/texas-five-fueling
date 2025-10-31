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
  variable: '--font-poppins' 
});
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '700'], // Regular, Bold
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
  description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas. Licensed, insured, and reliable fuel delivery services.',
  keywords: 'diesel delivery, commercial fuel delivery, generator refueling, equipment refueling, Houston fuel delivery, DEF refilling, job site fuel delivery',
  openGraph: {
    title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
    description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas. Licensed, insured, and reliable fuel delivery services.',
    url: 'https://texasfivefueling.com',
    siteName: 'Texas Five Fueling',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
    description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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

