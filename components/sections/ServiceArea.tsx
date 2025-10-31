'use client';

import { Button } from '../ui/button';

export default function ServiceArea() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Using Google Maps Embed API with Houston as the center point
  const mapSrc = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Houston,TX&zoom=9`
    : '#'; // Fallback if API key is not available
  
  const servicedAreas = [
    'Houston',
    'Hempstead',
    'Katy',
    'Sugar Land',
    'Cypress',
    'The Woodlands',
    'Conroe',
    'Tomball',
    'Spring',
    'Humble',
    'Pasadena',
    'Baytown',
  ];
  
  return (
    <section id="service-area" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Our Service Area
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Serving Houston and surrounding areas with fast, reliable fuel delivery. 
            24/7 service for emergency needs.
          </p>
        </div>
        
        {/* Map and Service Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Google Maps Embed */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              {apiKey ? (
                <iframe
                  title="Texas Five Fueling Service Area Map"
                  src={mapSrc}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              ) : (
                <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Google Maps API key not configured</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Service Areas List */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Areas We Serve</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {servicedAreas.map((area, index) => (
                <div key={index} className="flex items-center text-gray-700 transition-colors duration-200 hover:text-blue-600 motion-reduce:transition-none">
                  <svg 
                    className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{area}</span>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4 text-sm">
                Need service in your area? Contact us to check availability.
              </p>
              <a href="#contact-form" aria-label="Check availability in your area">
                <Button variant="primary" size="md" className="w-full">
                  Check Availability
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3 text-gray-900">Extended Coverage Available</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            While we primarily serve the Houston metro area, we can arrange delivery to locations 
            throughout Texas. Contact us to discuss your specific location and requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
