import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Texas Five Fueling | Commercial Diesel Delivery Houston TX',
  description: '24/7 commercial diesel delivery for generators, equipment & job sites in Houston and surrounding areas. Licensed, insured, and reliable fuel delivery services.',
  keywords: 'diesel delivery, commercial fuel delivery, generator refueling, equipment refueling, Houston fuel delivery, DEF refilling, job site fuel delivery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

