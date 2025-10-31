'use client';

import { Award, Shield, Clock, Users } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { value: '15+', label: 'Years in Business', icon: Clock },
  { value: '500K+', label: 'Gallons Delivered', icon: Award },
  { value: '1000+', label: 'Satisfied Customers', icon: Users },
  { value: '24/7', label: 'Emergency Service', icon: Shield },
];

const Trust = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Texas Five?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Trusted by Houston's leading businesses for reliable diesel delivery
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} delay={index * 100} />
          ))}
        </div>

        <div ref={ref as any} className="reveal max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">NextGen Certified Provider</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  We maintain the highest industry standards for safety, quality, and environmental responsibility. Our team is fully licensed, insured, and committed to excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, delay }: { stat: typeof stats[0]; delay: number }) => {
  const ref = useScrollReveal();
  const Icon = stat.icon;

  return (
    <div
      ref={ref as any}
      className="reveal text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
      <div className="text-white/80 text-lg">{stat.label}</div>
    </div>
  );
};

export default Trust;

