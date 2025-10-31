'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        transition: 'box-shadow 0.7s ease-in-out',
      }}
    >
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-700 ease-in-out"
        style={{ opacity: isScrolled ? 1 : 0 }}
      />
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer"
            aria-label="Scroll to top"
          >
            <Image 
              src={isScrolled ? "/images/header-logo.png" : "/images/header-logo-dark.png"}
              alt="Texas Five Fueling Logo" 
              width={200}
              height={80}
              className="h-[80px] w-auto transition-opacity duration-500"
              priority
              sizes="200px"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className={`transition-colors duration-200 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}>
              Services
            </button>
            <button onClick={() => scrollToSection('coverage')} className={`transition-colors duration-200 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}>
              Service Area
            </button>
            <button onClick={() => scrollToSection('equipment')} className={`transition-colors duration-200 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}>
              Equipment
            </button>
            <button onClick={() => scrollToSection('contact')} className={`transition-colors duration-200 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}>
              Contact
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90">
              <Phone className="mr-2 h-4 w-4" />
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in bg-background rounded-b-lg px-2">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('coverage')} className="text-left text-foreground hover:text-primary transition-colors">
                Service Area
              </button>
              <button onClick={() => scrollToSection('equipment')} className="text-left text-foreground hover:text-primary transition-colors">
                Equipment
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition-colors">
                Contact
              </button>
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" />
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
