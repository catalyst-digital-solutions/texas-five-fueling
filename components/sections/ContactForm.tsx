'use client';

import { useState, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';

type FormData = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: '',
    location: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const serviceTypes = [
    { value: '', label: 'Select a service...' },
    { value: 'diesel-generator', label: 'Diesel Generator Refueling' },
    { value: 'equipment-refueling', label: 'Equipment Refueling' },
    { value: 'job-site-delivery', label: 'Job Site Fuel Delivery' },
    { value: 'shop-fueling', label: 'Shop Fueling Services' },
    { value: 'def-refilling', label: 'DEF Re-filling' },
    { value: 'other', label: 'Other Service' },
  ];
  
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (value.replace(/[\s\-\(\)]/g, '').length < 10) return 'Please enter a valid phone number';
        break;
      case 'serviceType':
        if (!value) return 'Please select a service type';
        break;
      case 'location':
        if (!value.trim()) return 'Location is required';
        break;
    }
    return '';
  };
  
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };
  
  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      serviceType: true,
      location: true,
      companyName: true,
      message: true,
    };
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'companyName' && key !== 'message') {
        const error = validateField(key, value);
        if (error) newErrors[key as keyof FormData] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        serviceType: '',
        location: '',
        message: '',
      });
      setErrors({});
      setTouched({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Free Quote</h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="polite">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-800">Thank you!</p>
                    <p className="text-green-700">We've received your request and will contact you soon.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                <p className="text-red-800">{submitError}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={touched.name && errors.name ? errors.name : undefined}
                  required
                />
              </div>
              
              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                  required
                />
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  error={touched.phone && errors.phone ? errors.phone : undefined}
                  required
                />
              </div>
            </div>
            
            {/* Service Type */}
            <div className="mb-6">
              <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                Service Type <span className="text-red-600">*</span>
              </label>
              <Select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={(e) => handleChange('serviceType', e.target.value)}
                onBlur={() => handleBlur('serviceType')}
                error={touched.serviceType && errors.serviceType ? errors.serviceType : undefined}
                required
                options={serviceTypes.map(type => ({ value: type.value, label: type.label }))}
                placeholder="Select a service..."
              />
            </div>
            
            {/* Location */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location <span className="text-red-600">*</span>
              </label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                onBlur={() => handleBlur('location')}
                error={touched.location && errors.location ? errors.location : undefined}
                placeholder="City, State or specific address"
                required
              />
            </div>
            
            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell us about your fuel delivery needs..."
                rows={4}
              />
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request a Quote'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
