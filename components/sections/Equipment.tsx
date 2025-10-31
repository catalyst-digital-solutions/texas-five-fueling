'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const equipmentTypes = [
  {
    title: 'Diesel Generators',
    description: 'Reliable fuel delivery for power generation',
    image: '/images/diesel-generator.jpg',
    detailedDescription: "Keep your power running 24/7 with reliable on-site fuel delivery for backup and primary generators.",
    items: [
      'Portable job site generators',
      'Industrial standby generators',
      'Large-scale power systems',
      'Emergency backup generators',
      'Mobile generator units'
    ]
  },
  {
    title: 'Construction Equipment',
    description: 'On-site fueling for all construction machinery',
    image: '/images/construction-equipment.jpg',
    detailedDescription: "Fuel your heavy construction machinery without leaving the job site—we bring diesel directly to your equipment.",
    items: [
      'Excavators & backhoes',
      'Bulldozers & track loaders',
      'Wheel loaders & skid steers',
      'Motor graders & scrapers',
      'Compactors & pavers'
    ]
  },
  {
    title: 'Heavy Machinery & Cranes',
    description: 'Specialized fueling for heavy equipment',
    image: '/images/crane.jpg',
    detailedDescription: "Specialized fueling for your largest equipment—cranes, lifts, and heavy-duty machinery that keeps projects moving.",
    items: [
      'Mobile cranes & tower cranes',
      'Rough terrain cranes',
      'Boom lifts & scissor lifts',
      'Telehandlers & reach stackers',
      'Concrete pumps & mixers'
    ]
  },
  {
    title: 'Oil & Gas Equipment',
    description: 'Fuel services for energy sector operations',
    image: '/images/oil-gas.jpg',
    detailedDescription: "Reliable diesel delivery for upstream, midstream, and downstream operations across the Houston energy corridor.",
    items: [
      'Drilling rigs & workover rigs',
      'Pump jacks & wellhead equipment',
      'Fracturing equipment',
      'Pipeline construction equipment',
      'Compression & pumping units'
    ]
  },
  {
    title: 'Fleet & Commercial Vehicles',
    description: 'Bulk diesel delivery for vehicle fleets',
    image: '/images/fleet-vehicles.jpg',
    detailedDescription: "Efficient bulk fueling for your commercial fleet—reduce downtime and keep trucks on the road.",
    items: [
      'Semi-trucks & tractor-trailers',
      'Delivery & box trucks',
      'Dump trucks & tankers',
      'Service & utility vehicles',
      'Bus fleets'
    ]
  },
  {
    title: 'Agricultural Equipment',
    description: 'Farm machinery diesel delivery services',
    image: '/images/agricultural.jpg',
    detailedDescription: "Farm and ranch diesel delivery when you need it—harvest time, planting season, or routine operations.",
    items: [
      'Tractors & combines',
      'Harvesters & balers',
      'Irrigation pumps & systems',
      'Sprayers & planters',
      'Agricultural trucks & trailers'
    ]
  },
  {
    title: 'Emergency & Disaster Relief Equipment',
    description: 'Priority fueling for emergency response',
    image: '/images/emergency-relief.jpg',
    detailedDescription: "Rapid-response fueling for emergency operations—we understand critical timing when communities need power restored.",
    items: [
      'Emergency response generators',
      'Mobile command centers',
      'Disaster relief vehicles',
      'Emergency lighting towers',
      'Temporary power systems'
    ]
  },
  {
    title: 'Industrial Equipment',
    description: 'Comprehensive fueling for industrial operations',
    image: '/images/industrial-equipment.jpg',
    detailedDescription: "On-site fueling for warehouses, distribution centers, and manufacturing facilities—keep operations running smoothly.",
    items: [
      'Forklifts (diesel-powered)',
      'Reach trucks & pallet jacks',
      'Industrial sweepers & scrubbers',
      'Yard trucks & hostlers',
      'Material handling equipment'
    ]
  },
];

const Equipment = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<typeof equipmentTypes[0] | null>(null);

  return (
    <>
      <section id="equipment" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Equipment We Fuel</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We fuel all types of commercial and industrial equipment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentTypes.map((equipment, index) => (
              <EquipmentCard 
                key={index} 
                equipment={equipment} 
                delay={index * 100}
                onClick={() => setSelectedEquipment(equipment)}
              />
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl">{selectedEquipment?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedEquipment && (
              <Image 
                src={selectedEquipment.image}
                alt={selectedEquipment.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedEquipment?.detailedDescription}
            </p>
            <div>
              <h4 className="font-bold text-lg mb-3">Equipment Types:</h4>
              <ul className="space-y-2">
                {selectedEquipment?.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const EquipmentCard = ({ 
  equipment, 
  delay,
  onClick 
}: { 
  equipment: typeof equipmentTypes[0]; 
  delay: number;
  onClick: () => void;
}) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref as any}
      onClick={onClick}
      className="reveal group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Image
        src={equipment.image}
        alt={equipment.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/60 to-transparent group-hover:from-primary/90 group-hover:via-primary/60 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{equipment.title}</h3>
        <p className="text-white/90">{equipment.description}</p>
        <p className="text-sm text-white/70 mt-2">Click to learn more →</p>
      </div>
    </div>
  );
};

export default Equipment;
