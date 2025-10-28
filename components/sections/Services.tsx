'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

type Service = {
  title: string;
  description: string;
  icon: string;
};

const services: Service[] = [
  {
    title: 'Diesel Generator Refueling',
    description: 'Keep generators running with scheduled and emergency fuel delivery. 24/7 availability for critical backup systems.',
    icon: '/images/icons/generator.svg',
  },
  {
    title: 'Equipment Refueling',
    description: 'On-site diesel delivery for construction equipment and heavy-duty vehicles. Flexible scheduling to meet your needs.',
    icon: '/images/icons/equipment.svg',
  },
  {
    title: 'Job Site Fuel Delivery',
    description: 'Bulk diesel delivery directly to job sites with flexible scheduling. Keep your projects on track without delays.',
    icon: '/images/icons/jobsite.svg',
  },
  {
    title: 'Shop Fueling Services',
    description: 'Regular fuel delivery for shop fleets with 24/7 emergency service. Maintain fleet operations without interruption.',
    icon: '/images/icons/shop.svg',
  },
  {
    title: 'DEF Re-filling',
    description: 'Diesel Exhaust Fluid delivery for generators and equipment compliance. Meet EPA standards with our DEF service.',
    icon: '/images/icons/def.svg',
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.6, // Trigger at 60% viewport entry
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Trigger ONCE
        }
      });
    }, observerOptions);

    // Observe service cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable commercial diesel delivery services for all your equipment and job site needs. 
            24/7 availability with flexible scheduling.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="service-card bg-white p-8 rounded-xl shadow-sm transition-all duration-200 ease-out motion-reduce:transition-none"
            >
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-4 rounded-lg mr-4 flex-shrink-0">
                  <div className="w-10 h-10 relative">
                    <Image 
                      src={service.icon} 
                      alt={`${service.title} icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <a href="#contact-form" className="inline-block" aria-label="Request a service">
            <Button variant="primary" size="lg">
              Request a Service
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
