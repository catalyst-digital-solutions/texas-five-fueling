'use client';

import { MapPin, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const cities = [
  'Houston', 'Katy', 'Sugar Land', 'The Woodlands', 'Pearland',
  'League City', 'Cypress', 'Spring', 'Pasadena', 'Baytown',
  'Missouri City', 'Friendswood', 'Deer Park', 'Stafford', 'Richmond'
];

const ServiceArea = () => {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="coverage" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={leftRef as any} className="reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Serving Greater Houston
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Texas Five Fueling provides reliable diesel delivery services throughout the Houston metropolitan area and surrounding communities. Our fleet is strategically positioned to ensure fast response times and exceptional service.
            </p>
            <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Coverage Area</h3>
                <p className="text-muted-foreground">
                  We deliver within a 50-mile radius of Houston, covering Harris, Fort Bend, Montgomery, and Brazoria counties.
                </p>
              </div>
            </div>
          </div>

          <div ref={rightRef as any} className="reveal">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-6">Cities We Serve</h3>
              <div className="grid grid-cols-2 gap-4">
                {cities.map((city, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{city}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Don't see your city? <a href="#contact" className="text-primary hover:underline font-semibold">Contact us</a> to check if we can serve your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
