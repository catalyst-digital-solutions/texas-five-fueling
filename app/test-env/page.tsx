'use client';

import { env, isConfigured } from '@/lib/env';

/**
 * Test page to verify environment variables are loaded correctly
 * This page should NOT be deployed to production
 */

export default function TestEnvPage() {
  const envStatus = {
    'NEXT_PUBLIC_SUPABASE_URL': {
      configured: isConfigured('SUPABASE_URL'),
      value: env.SUPABASE_URL ? '***configured***' : 'not set',
    },
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
      configured: isConfigured('SUPABASE_ANON_KEY'),
      value: env.SUPABASE_ANON_KEY ? '***configured***' : 'not set',
    },
    'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY': {
      configured: isConfigured('GOOGLE_MAPS_API_KEY'),
      value: env.GOOGLE_MAPS_API_KEY ? '***configured***' : 'not set',
    },
    'CONTACT_EMAIL': {
      configured: isConfigured('CONTACT_EMAIL'),
      value: env.CONTACT_EMAIL,
    },
  };

  // Note: Server-only variables (RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY)
  // cannot be safely checked from client-side
  const allConfigured = Object.values(envStatus).every(
    (status) => status.configured
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Environment Variables Test</h1>
          <p className="text-gray-600">
            Verify that environment variables are loaded correctly
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Client-Side Variables</h2>
          <div className="space-y-2">
            {Object.entries(envStatus).map(([key, status]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-3 rounded ${
                  status.configured
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-yellow-50 border border-yellow-200'
                }`}
              >
                <div>
                  <div className="font-medium">{key}</div>
                  <div className="text-sm text-gray-600">
                    Value: {status.value}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  status.configured
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {status.configured ? '✓ Configured' : '⚠ Not Set'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-lg ${
          allConfigured
            ? 'bg-green-50 border border-green-200'
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <h3 className="font-semibold mb-2">Status</h3>
          <p>
            {allConfigured ? (
              <span className="text-green-800">
                ✓ All client-side environment variables are configured correctly.
              </span>
            ) : (
              <span className="text-yellow-800">
                ⚠ Some environment variables are missing. Update .env.local with your API keys.
              </span>
            )}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Note</h3>
          <p className="text-sm text-blue-800">
            Server-only variables (RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY) are
            not accessible from the client for security reasons.
            <br />
            <br />
            <strong>Important:</strong> Delete this test page before deploying to production.
          </p>
        </div>

        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}


