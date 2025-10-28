/**
 * Environment variables configuration
 * Centralizes environment variable access with type safety
 */

export const env = {
  // Supabase Configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  // Email Service (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
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
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
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
    if (!serverEnv.RESEND_API_KEY) {
      missing.push('RESEND_API_KEY (server-only)');
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

