import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import ServiceArea from '@/components/sections/ServiceArea';
import Equipment from '@/components/sections/Equipment';
import TrustSection from '@/components/sections/TrustSection';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ServiceArea />
      <Equipment />
      <TrustSection />
      <ContactForm />
    </>
  );
}
