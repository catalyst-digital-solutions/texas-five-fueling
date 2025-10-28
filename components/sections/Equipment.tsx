'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

type EquipmentType = {
  name: string;
  description: string;
  image: string;
};

const equipmentTypes: EquipmentType[] = [
  { 
    name: 'Diesel Generators', 
    description: 'Backup generators for businesses and facilities',
    image: '/images/equipment/generators.jpg' 
  },
  { 
    name: 'Construction Equipment', 
    description: 'Excavators, bulldozers, cranes, and more',
    image: '/images/equipment/construction.jpg' 
  },
  { 
    name: 'Heavy-Duty Vehicles', 
    description: 'Trucks, delivery vehicles, and commercial fleets',
    image: '/images/equipment/vehicles.jpg' 
  },
  { 
    name: 'Agricultural Machinery', 
    description: 'Tractors, harvesters, and farm equipment',
    image: '/images/equipment/agricultural.jpg' 
  },
  { 
    name: 'Industrial Generators', 
    description: 'Large-scale industrial power generation',
    image: '/images/equipment/industrial.jpg' 
  },
  { 
    name: 'Fleet Vehicles', 
    description: 'Company vehicles and delivery fleets',
    image: '/images/equipment/fleet.jpg' 
  },
];

export default function Equipment() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="equipment" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Equipment We Service
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide fuel delivery for a wide range of commercial and industrial equipment. 
            24/7 service for your operational needs.
          </p>
        </div>
        
        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {equipmentTypes.map((equipment, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="equipment-card relative overflow-hidden rounded-xl shadow-md group"
            >
              <div className="aspect-[16/10] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
                  {/* Placeholder gradient background */}
                </div>
                <div className="equipment-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0 opacity-70 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-85"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="text-xl font-bold mb-2">{equipment.name}</h3>
                <p className="text-sm text-gray-200">{equipment.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <a href="#contact-form" aria-label="Request fuel delivery for your equipment">
            <Button variant="primary" size="lg">
              Request Fuel Delivery
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
