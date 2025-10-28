import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNotificationEmail } from '@/lib/aws-ses';

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
 * 3. Sending email notification via AWS SES with retry logic
 * 
 * Returns success response with lead ID or appropriate error
 */

export async function POST(request: Request) {
  try {
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
    
    // Validate phone format
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
    
    // Send email notification with retry logic
    try {
      await sendNotificationEmail({
        name,
        companyName,
        email,
        phone,
        serviceType,
        location,
        message
      });
    } catch (emailError) {
      console.error('Email sending failed after retries:', emailError);
      // Lead was stored successfully, so we still return success
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

