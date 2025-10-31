'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from '@/lib/motion';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '../ui/button';

interface CounterProps {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ target, label, suffix = '', prefix = '' }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(0);
  const { shouldReduceMotion } = useReducedMotion();

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(target);
      return;
    }

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-600 text-lg">{label}</p>
    </div>
  );
}

interface GuaranteeProps {
  icon: string;
  title: string;
  description: string;
}

function GuaranteeCard({ icon, title, description }: GuaranteeProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 motion-reduce:transition-none">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* NextGen Group Badge */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
              <div className="text-left">
                <p className="text-sm text-gray-600">A trusted company</p>
                <p className="font-bold text-blue-900">NextGen Group</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Metrics Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedCounter 
            target={15} 
            label="Years in Business"
            suffix="+"
          />
          <AnimatedCounter 
            target={500000} 
            label="Gallons Delivered"
            suffix="+"
          />
          <AnimatedCounter 
            target={1000} 
            label="Customers Served"
            suffix="+"
          />
        </div>

        {/* Service Guarantees */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Texas Five Fueling?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <GuaranteeCard
                icon="/images/icons/24-7.svg"
                title="24/7 Service"
                description="Emergency fuel delivery whenever you need it, day or night"
              />
            </m.div>
            
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <GuaranteeCard
                icon="/images/icons/license.svg"
                title="Licensed & Insured"
                description="Fully licensed, bonded, and insured for your peace of mind"
              />
            </m.div>
            
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <GuaranteeCard
                icon="/images/icons/fast.svg"
                title="Fast Response"
                description="Quick dispatch and delivery to minimize downtime"
              />
            </m.div>
            
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <GuaranteeCard
                icon="/images/icons/team.svg"
                title="Experienced Team"
                description="Professional drivers with years of industry expertise"
              />
            </m.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Experience Reliable Fuel Delivery?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Texas Five Fueling for their commercial fuel needs
          </p>
          <a href="#contact-form">
            <Button variant="primary" size="lg">
              Get a Quote Today
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
