'use client';

import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Image 
              src="/images/header-logo-dark.png"
              alt="Texas Five Fueling Logo" 
              width={200}
              height={60}
              className="h-[60px] w-auto mb-4"
              sizes="200px"
            />
            <p className="text-white/70 mb-4">
              Dependable diesel delivery services for commercial and industrial clients throughout the Houston area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('services')} className="text-white/70 hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('coverage')} className="text-white/70 hover:text-white transition-colors">
                  Service Area
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('equipment')} className="text-white/70 hover:text-white transition-colors">
                  Equipment
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-white/70">
              <li>Fleet Fueling</li>
              <li>Construction Sites</li>
              <li>Heavy Equipment</li>
              <li>On-site Business Fueling</li>
              <li>On-site Fuel Tanks</li>
              <li>Emergency Delivery</li>
              <li>Scheduled Service</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+18558953835" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                (855) 895-3835
              </a>
              <a href="mailto:info@texasfivefueling.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@texasfivefueling.com
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>Houston, TX<br />50-mile service radius</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
            <p>&copy; {currentYear} Texas Five Fueling. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
