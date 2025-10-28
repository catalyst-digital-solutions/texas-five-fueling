/**
 * Environment variables configuration
 * Centralizes environment variable access with type safety
 */

export const env = {
  // Supabase Configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  // Email Service (AWS SES)
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@t5fueling.com',

  // Google Maps API
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',

  // Node Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

/**
 * Server-side environment variables (not exposed to client)
 */
export const serverEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
} as const;

/**
 * Validate required environment variables
 * Throws error if critical variables are missing in production
 */
export function validateEnv(): void {
  const missing: string[] = [];

  // Client-side variables (need NEXT_PUBLIC_ prefix)
  if (!env.SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!env.SUPABASE_ANON_KEY) {
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (!env.GOOGLE_MAPS_API_KEY) {
    missing.push('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  }

  // Server-side variables
  if (process.env.NODE_ENV === 'production') {
    if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
      missing.push('SUPABASE_SERVICE_ROLE_KEY (server-only)');
    }
    if (!serverEnv.AWS_ACCESS_KEY_ID || !serverEnv.AWS_SECRET_ACCESS_KEY) {
      missing.push('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (server-only)');
    }
  }

  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing.join(', '));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }
  }
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  validateEnv();
}

/**
 * Check if variable is configured (not empty)
 */
export function isConfigured(key: keyof typeof env): boolean {
  return env[key] !== '';
}


