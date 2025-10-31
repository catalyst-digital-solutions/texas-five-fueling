import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNotificationEmail } from '@/lib/aws-ses';
import { leadsRateLimiter } from '@/lib/rate-limit';

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
 * 1. Rate limiting by IP address
 * 2. Validating required fields
 * 3. Storing submission in Supabase database
 * 4. Sending email notification via AWS SES with retry logic
 * 
 * Returns success response with lead ID or appropriate error
 */

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') ||
               'unknown';
    
    // Check rate limit (5 submissions per hour per IP)
    if (!leadsRateLimiter.check(ip)) {
      const resetTime = leadsRateLimiter.getResetTime(ip);
      const retryAfter = resetTime ? Math.ceil((resetTime - Date.now()) / 1000) : 3600;
      
      return NextResponse.json(
        { 
          error: 'Too many submissions. Please try again later.',
          retryAfter: retryAfter
        },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime?.toString() || '',
          }
        }
      );
    }
    
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
    
    // Get remaining rate limit for this IP
    const remaining = leadsRateLimiter.getRemaining(ip);
    const resetTime = leadsRateLimiter.getResetTime(ip);
    
    return NextResponse.json(
      { success: true, id: data?.[0]?.id }, 
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': resetTime?.toString() || '',
        }
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

