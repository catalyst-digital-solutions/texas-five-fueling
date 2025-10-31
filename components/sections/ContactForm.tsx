'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const infoRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Honeypot spam protection - if this field is filled, it's a bot
      const honeypot = formData.get('website') as string;
      if (honeypot) {
        // Silently reject bot submissions
        setIsSubmitting(false);
        console.warn('Bot submission detected via honeypot');
        return;
      }
      
      // Combine first and last name
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const name = `${firstName} ${lastName}`.trim();

      // Prepare payload matching API structure
      const payload = {
        name,
        companyName: formData.get('company') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        serviceType: formData.get('serviceType') as string,
        location: formData.get('location') as string,
        message: formData.get('message') as string,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Quote Request Received!",
        description: "We'll contact you within 24 hours to discuss your fueling needs.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Quote</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you with a customized quote
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef as any} className="reveal space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Reach out to us today for reliable gas/diesel delivery services in Houston and surrounding areas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone</h4>
                  <a href="tel:+12817502023" className="text-muted-foreground hover:text-primary transition-colors">
                    (281) 750-2023
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:info@texasfivefueling.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@texasfivefueling.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">We respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Service Area</h4>
                  <p className="text-muted-foreground">
                    Houston, TX and surrounding areas<br />
                    50-mile radius coverage
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">Business Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">6:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef as any} className="reveal">
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="John"
                    disabled={isSubmitting || isSuccess}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Doe"
                    disabled={isSubmitting || isSuccess}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold mb-2">
                  Company Name *
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Your Company LLC"
                  disabled={isSubmitting || isSuccess}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    disabled={isSubmitting || isSuccess}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(123) 456-7890"
                    disabled={isSubmitting || isSuccess}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold mb-2">
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    disabled={isSubmitting || isSuccess}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200 focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a service...</option>
                    <option value="Generator Fueling">Generator Fueling</option>
                    <option value="Construction Equipment">Construction Equipment</option>
                    <option value="Heavy Machinery">Heavy Machinery</option>
                    <option value="Fleet Fueling">Fleet Fueling</option>
                    <option value="Emergency Delivery">Emergency Delivery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold mb-2">
                    Service Location *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="Houston, TX"
                    disabled={isSubmitting || isSuccess}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Tell us about your fueling needs *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Please describe your equipment, location, and fuel requirements..."
                  rows={5}
                  disabled={isSubmitting || isSuccess}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Honeypot field - invisible to humans, bots will fill it */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 transition-all duration-200"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Request Sent!
                  </>
                ) : (
                  'Request a Quote'
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
