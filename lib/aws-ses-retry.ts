/**
 * AWS SES Retry Logic with Exponential Backoff
 */

import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from './aws-ses';

interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
};

/**
 * Sends email with exponential backoff retry logic
 */
export async function sendEmailWithRetry(
  command: SendEmailCommand,
  options: RetryOptions = DEFAULT_RETRY_OPTIONS
): Promise<void> {
  let lastError: Error;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      await sesClient.send(command);
      return;
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on configuration errors
      if (error.name === 'MessageRejected' || 
          error.name === 'ConfigurationSetDoesNotExist' ||
          error.name === 'InvalidParameterValue') {
        throw error;
      }

      if (attempt === options.maxRetries) {
        break;
      }

      const delay = options.baseDelay * Math.pow(2, attempt);
      console.log(`SES send attempt ${attempt + 1} failed, retrying in ${delay}ms:`, error.message);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
