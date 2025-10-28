/**
 * AWS SES Client Configuration
 * Handles email sending via AWS Simple Email Service
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { sendEmailWithRetry } from './aws-ses-retry';

export const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export interface LeadData {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message?: string;
}

const SERVICE_TYPE_MAP: Record<string, string> = {
  'diesel-generator': 'Diesel Generator Refueling',
  'equipment-refueling': 'Equipment Refueling',
  'job-site-delivery': 'Job Site Fuel Delivery',
  'shop-fueling': 'Shop Fueling Services',
  'def-refilling': 'DEF Re-filling',
  'other': 'Other Service'
};

export function generateEmailTemplate(leadData: LeadData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { background: #f4f4f4; padding: 20px; margin: 20px 0; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Quote Request - Texas Five Fueling</h2>
        </div>
        <div class="content">
          <div class="field"><span class="label">Name:</span> ${leadData.name}</div>
          ${leadData.companyName ? `<div class="field"><span class="label">Company:</span> ${leadData.companyName}</div>` : ''}
          <div class="field"><span class="label">Email:</span> ${leadData.email}</div>
          <div class="field"><span class="label">Phone:</span> ${leadData.phone}</div>
          <div class="field"><span class="label">Service Type:</span> ${SERVICE_TYPE_MAP[leadData.serviceType] || leadData.serviceType}</div>
          <div class="field"><span class="label">Location:</span> ${leadData.location}</div>
          ${leadData.message ? `<div class="field"><span class="label">Message:</span><br>${leadData.message}</div>` : ''}
          <div class="field"><span class="label">Submitted:</span> ${new Date().toLocaleString()}</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePlainTextEmail(leadData: LeadData): string {
  return `New Quote Request - Texas Five Fueling

Name: ${leadData.name}
${leadData.companyName ? `Company: ${leadData.companyName}` : ''}
Email: ${leadData.email}
Phone: ${leadData.phone}
Service Type: ${SERVICE_TYPE_MAP[leadData.serviceType] || leadData.serviceType}
Location: ${leadData.location}
${leadData.message ? `Message: ${leadData.message}` : ''}

Submitted: ${new Date().toLocaleString()}`;
}

export async function sendNotificationEmail(leadData: LeadData): Promise<void> {
  const contactEmail = process.env.CONTACT_EMAIL || 'info@t5fueling.com';
  
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [contactEmail]
    },
    Message: {
      Body: {
        Html: {
          Data: generateEmailTemplate(leadData),
          Charset: 'UTF-8'
        },
        Text: {
          Data: generatePlainTextEmail(leadData),
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: 'New Quote Request from Texas Five Fueling Website',
        Charset: 'UTF-8'
      }
    },
    Source: 'no-reply@t5fueling.com',
    ReplyToAddresses: [leadData.email]
  });

  await sendEmailWithRetry(command);
}

