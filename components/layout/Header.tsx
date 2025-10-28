'use client';

import Link from 'next/link';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-shadow duration-200 motion-reduce:transition-none">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
            aria-label="Texas Five Fueling Home"
          >
            <div className="flex items-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-sm">
                T5F
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                Texas Five Fueling
              </span>
            </div>
          </Link>

          {/* Right Side Navigation */}
          <div className="flex items-center gap-3">
            {/* Phone Button - Hidden on mobile */}
            <a 
              href="tel:2817502023" 
              className="hidden md:flex"
              aria-label="Call Texas Five Fueling at (281) 750-2023"
            >
              <Button variant="outline" size="sm">
                (281) 750-2023
              </Button>
            </a>
            
            {/* Get Quote Button */}
            <Link href="#contact-form">
              <Button variant="primary" size="sm">
                Get a Quote
              </Button>
            </Link>

            {/* Mobile Phone Link */}
            <a 
              href="tel:2817502023" 
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 motion-reduce:transition-none"
              aria-label="Call us"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

