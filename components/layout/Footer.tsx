import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:2817502023" className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none">
                  (281) 750-2023
                </a>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@t5fueling.com" className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none">
                  info@t5fueling.com
                </a>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Hempstead, TX</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#services" 
                    className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none block"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#service-area" 
                    className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none block"
                  >
                    Service Area
                  </a>
                </li>
                <li>
                  <a 
                    href="#equipment" 
                    className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none block"
                  >
                    Equipment
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact-form" 
                    className="hover:text-blue-300 transition-colors duration-200 motion-reduce:transition-none block"
                  >
                    Get a Quote
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="mb-4 text-gray-300">
              Texas Five Fueling is a commercial diesel delivery service operating in Houston, TX, under the parent company NextGen Group.
            </p>
            <p className="text-gray-300">
              Part of <strong className="text-white">NextGen Group</strong>
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-gray-300 mb-2 md:mb-0">
              &copy; {currentYear} Texas Five Fueling. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              A <strong className="text-white">NextGen Group</strong> company
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

