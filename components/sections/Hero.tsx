'use client';

import { useEffect, useState } from 'react';
import Button from '../ui/Button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      {/* Content with Animations */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Houston&apos;s Most Reliable Commercial Fuel Delivery Service
          </h1>
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 ${isVisible ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
            24/7 diesel delivery for generators, equipment, and job sites. Serving Houston and surrounding areas with fast, dependable service.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            <a href="#contact-form" aria-label="Get a quote for commercial fuel delivery">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get a Quote
              </Button>
            </a>
            <a href="tel:2817502023" aria-label="Call Texas Five Fueling at (281) 750-2023">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
