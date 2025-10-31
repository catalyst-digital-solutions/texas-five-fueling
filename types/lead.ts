/**
 * Lead Submission Types
 * Shared between ContactForm and /api/leads endpoint
 */

export interface LeadFormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message: string;
}

export interface LeadSubmissionPayload {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  id?: string;
  error?: string;
}

export type ServiceType = 
  | 'Generator Fueling'
  | 'Construction Equipment'
  | 'Heavy Machinery'
  | 'Fleet Fueling'
  | 'Emergency Delivery'
  | 'Other';

