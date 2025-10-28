import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '@/lib/aws-ses';

const contactEmail = process.env.CONTACT_EMAIL || 'info@t5fueling.com';

interface LeadSubmissionBody {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message?: string;
}

/**
 * Leads API Endpoint
 * 
 * Handles lead form submissions by:
 * 1. Validating required fields
 * 2. Storing submission in Supabase database
 * 3. Sending email notification via AWS SES
 * 
 * Returns success response with lead ID or appropriate error
 */

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, companyName, email, phone, serviceType, location, message }: LeadSubmissionBody = body;
    
    // Validate required fields
    if (!name || !email || !phone || !serviceType || !location) {
      return NextResponse.json(
        { error: 'Missing required fields. Please provide: name, email, phone, serviceType, and location.' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }
    
    // Validate phone format (basic US phone number validation)
    const phoneRegex = /^[\d\s\(\)\-\.]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number format.' },
        { status: 400 }
      );
    }
    
    // Store in Supabase
    const { data, error } = await supabaseAdmin
      .from('lead_submissions')
      .insert([
        {
          name,
          company_name: companyName || null,
          email,
          phone,
          service_type: serviceType,
          location,
          message: message || null,
          status: 'new'
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to store lead submission' },
        { status: 500 }
      );
    }
    
    // Send email notification via AWS SES
    const serviceTypeMap: Record<string, string> = {
      'diesel-generator': 'Diesel Generator Refueling',
      'equipment-refueling': 'Equipment Refueling',
      'job-site-delivery': 'Job Site Fuel Delivery',
      'shop-fueling': 'Shop Fueling Services',
      'def-refilling': 'DEF Re-filling',
      'other': 'Other Service'
    };
    
    const emailParams = {
      Destination: {
        ToAddresses: [contactEmail]
      },
      Message: {
        Body: {
          Html: {
            Data: `
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
                    <div class="field"><span class="label">Name:</span> ${name}</div>
                    ${companyName ? `<div class="field"><span class="label">Company:</span> ${companyName}</div>` : ''}
                    <div class="field"><span class="label">Email:</span> ${email}</div>
                    <div class="field"><span class="label">Phone:</span> ${phone}</div>
                    <div class="field"><span class="label">Service Type:</span> ${serviceTypeMap[serviceType] || serviceType}</div>
                    <div class="field"><span class="label">Location:</span> ${location}</div>
                    ${message ? `<div class="field"><span class="label">Message:</span><br>${message}</div>` : ''}
                    <div class="field"><span class="label">Submitted:</span> ${new Date().toLocaleString()}</div>
                  </div>
                </div>
              </body>
              </html>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `New Quote Request - Texas Five Fueling

Name: ${name}
${companyName ? `Company: ${companyName}` : ''}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceTypeMap[serviceType] || serviceType}
Location: ${location}
${message ? `Message: ${message}` : ''}

Submitted: ${new Date().toLocaleString()}`,
            Charset: 'UTF-8'
          }
        },
        Subject: {
          Data: 'New Quote Request from Texas Five Fueling Website',
          Charset: 'UTF-8'
        }
      },
      Source: 'no-reply@t5fueling.com',
      ReplyToAddresses: [email]
    };
    
    try {
      const command = new SendEmailCommand(emailParams);
      await sesClient.send(command);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // We still return success since the lead was stored in the database
    }
    
    return NextResponse.json({ success: true, id: data?.[0]?.id }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

