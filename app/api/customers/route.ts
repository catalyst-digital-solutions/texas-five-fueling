import { NextResponse } from 'next/server';

/**
 * Customers API Stub
 * 
 * This endpoint is not implemented yet and will be activated in Phase 2.
 * Returns 501 Not Implemented status for all requests.
 * 
 * Future implementation will handle:
 * - GET: Retrieve list of customers with pagination
 * - POST: Create new customer records
 * - Update customer information
 * - Delete customer records
 */

export async function GET() {
  return NextResponse.json(
    { error: 'This API is not implemented yet. Coming in Phase 2.' },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'This API is not implemented yet. Coming in Phase 2.' },
    { status: 501 }
  );
}

