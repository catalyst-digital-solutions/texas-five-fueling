/**
 * SES Health Check Endpoint
 * 
 * Returns AWS SES quota information and service health status
 */

import { NextResponse } from 'next/server';
import { GetSendQuotaCommand } from '@aws-sdk/client-ses';
import { sesClient } from '@/lib/aws-ses';

export async function GET() {
  try {
    const command = new GetSendQuotaCommand({});
    const response = await sesClient.send(command);

    const quota = {
      max24HourSend: response.Max24HourSend || 0,
      sentLast24Hours: response.SentLast24Hours || 0,
      maxSendRate: response.MaxSendRate || 0
    };

    return NextResponse.json({
      status: 'healthy',
      quota
    });
  } catch (error) {
    console.error('SES health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}
