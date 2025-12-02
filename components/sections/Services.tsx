'use client';

import { Truck, Building2, HardHat, Zap, Clock, MapPin, Droplet } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    icon: Truck,
    title: 'Fleet Fueling',
    description: 'Keep your commercial fleet running with scheduled or on-demand diesel delivery directly to your vehicles.',
  },
  {
    icon: Building2,
    title: 'Construction Sites',
    description: 'Fuel your heavy equipment and machinery on-site with our reliable construction fueling services.',
  },
  {
    icon: HardHat,
    title: 'Heavy Equipment',
    description: 'Specialized fueling for excavators, bulldozers, cranes, and all types of heavy machinery.',
  },
  {
    icon: Zap,
    title: 'Emergency Delivery',
    description: '24/7 emergency fuel delivery when you need it most. We respond quickly to keep you operational.',
  },
  {
    icon: Clock,
    title: 'Scheduled Service',
    description: 'Set up regular delivery schedules to ensure your operations never run out of fuel.',
  },
  {
    icon: MapPin,
    title: 'On-site Business Fueling',
    description: 'Location fueling for businesses that keep tanks on-site—scheduled deliveries keep your equipment ready.',
  },
  {
    icon: Droplet,
    title: 'On-site Fuel Tanks Available',
    description: 'We can deploy, monitor, and refill on-site tanks so you always have a reliable fuel reserve.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted scroll-mt-14 md:scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive diesel delivery solutions for businesses across Houston
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, delay }: { service: typeof services[0]; delay: number }) => {
  const ref = useScrollReveal();
  const Icon = service.icon;

  return (
    <div
      ref={ref as any}
      className="reveal bg-card p-8 rounded-lg hover-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
    </div>
  );
};

export default Services;
