import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { LazyMotion, domAnimation } from 'framer-motion';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ViewTransitionProvider } from "@/providers/ViewTransitionProvider";

const inter = Inter({ subsets: ['latin'] });

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
        <body className={inter.className}>
          <ViewTransitionProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </ViewTransitionProvider>
        </body>
      </LazyMotion>
    </html>
  );
}

