'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Texas Five Fueling commercial diesel delivery truck"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
      
      {/* Content with Animations */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Headline - Serif font, large and bold */}
          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Houston&apos;s Most Reliable Commercial Fuel Delivery
          </h1>
          
          {/* Subheadline - Sans font, clear and concise */}
          <p className={`font-sans text-xl md:text-2xl lg:text-3xl mb-8 text-gray-100 leading-relaxed max-w-3xl ${isVisible ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
            24/7 diesel delivery for generators, equipment, and job sites. Serving Houston and surrounding areas with fast, dependable service.
          </p>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            <a href="#contact-form" aria-label="Get a quote for commercial fuel delivery">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get a Quote
              </Button>
            </a>
            <a href="tel:2817502023" aria-label="Call Texas Five Fueling at (281) 750-2023">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-accent-dark font-semibold px-8 py-4 text-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: (281) 750-2023
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Down Arrow Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-8 h-8 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
