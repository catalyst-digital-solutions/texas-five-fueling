'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile image */}
        <img
          src="/images/commercial-fuel-delivery-service-truck-tall-for-mobile-1.jpg"
          alt="Commercial diesel fuel delivery truck with T5 logo"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          loading="eager"
        />
        {/* Tablet portrait image */}
        <img
          src="/images/commercial-fuel-delivery-service-truck-midsize-for-tablet.jpg"
          alt="Commercial diesel fuel delivery truck with T5 logo"
          className="absolute inset-0 w-full h-full hidden md:block lg:hidden object-cover"
          loading="eager"
        />
        {/* Desktop image */}
        <img
          src="/images/commercial-fuel-delivery-service-truck-wide-for-desktop.jpg"
          alt="Commercial diesel fuel delivery truck with T5 logo"
          className="absolute inset-0 w-full h-full hidden lg:block object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight" style={{ animationDelay: '0ms' }}>
              Professional Fuel Delivery
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed" style={{ animationDelay: '100ms' }}>
              Reliable on-site fuel delivery for commercial fleets, construction sites, and heavy equipment throughout Houston, TX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4" style={{ animationDelay: '200ms' }}>
              <Button onClick={scrollToContact} size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 text-lg px-8">
                <a href="tel:+12817502023">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 pt-8 text-white/80">
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm">Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm">Satisfied Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
