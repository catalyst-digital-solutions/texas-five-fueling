import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Authentication Middleware
 * 
 * This middleware is DISABLED for Phase 1 (public landing page only).
 * 
 * TO ENABLE IN PHASE 2:
 * 1. Uncomment all code below
 * 2. Uncomment the matcher config at the bottom
 * 3. Install @supabase/auth-helpers-nextjs: npm install @supabase/auth-helpers-nextjs
 * 4. Test authentication flow
 * 
 * This middleware will:
 * - Check for valid Supabase sessions
 * - Protect admin routes (/admin/*)
 * - Redirect unauthenticated users to login
 * - Pass authenticated users through
 */

export async function middleware(req: NextRequest) {
  // PHASE 1: Middleware is disabled
  // Uncomment the code below for Phase 2
  
  /*
  import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
  
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  // Check if accessing protected routes
  const isAccessingProtectedRoute = req.nextUrl.pathname.startsWith('/admin');
  
  if (isAccessingProtectedRoute && !session) {
    // Redirect to login if trying to access protected route without session
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  */
  
  return NextResponse.next();
}

// Specify which routes this middleware should run for
export const config = {
  matcher: [
    // Phase 1: No routes protected
    // Phase 2: Uncomment the line below to protect admin routes
    // '/admin/:path*',
  ],
};

