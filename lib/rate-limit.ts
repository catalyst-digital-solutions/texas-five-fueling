/**
 * Simple in-memory rate limiter for API endpoints
 * 
 * Usage:
 *   const limiter = new RateLimiter(5, 60 * 60 * 1000); // 5 requests per hour
 *   if (!limiter.check(ip)) {
 *     return Response with 429
 *   }
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 60 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Check if the given identifier (usually IP) is within rate limit
   * @param identifier - Usually an IP address
   * @returns true if within limit, false if exceeded
   */
  check(identifier: string): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // Clean up expired entries
    if (entry && entry.resetAt < now) {
      this.store.delete(identifier);
    }

    const currentEntry = this.store.get(identifier);

    if (!currentEntry) {
      // First request from this identifier
      this.store.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return true;
    }

    if (currentEntry.count >= this.maxRequests) {
      // Rate limit exceeded
      return false;
    }

    // Increment count
    currentEntry.count += 1;
    this.store.set(identifier, currentEntry);
    return true;
  }

  /**
   * Get the reset time for a given identifier
   * @param identifier - Usually an IP address
   * @returns Reset time in milliseconds, or null if no entry exists
   */
  getResetTime(identifier: string): number | null {
    const entry = this.store.get(identifier);
    return entry ? entry.resetAt : null;
  }

  /**
   * Get remaining requests for a given identifier
   * @param identifier - Usually an IP address
   * @returns Number of remaining requests
   */
  getRemaining(identifier: string): number {
    const entry = this.store.get(identifier);
    if (!entry) return this.maxRequests;
    return Math.max(0, this.maxRequests - entry.count);
  }

  /**
   * Manually clean up expired entries
   * Should be called periodically to prevent memory leaks
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetAt < now) {
        this.store.delete(key);
      }
    }
  }
}

// Create a singleton instance for the leads endpoint
// 5 submissions per hour per IP
export const leadsRateLimiter = new RateLimiter(5, 60 * 60 * 1000);

// Auto-cleanup every 10 minutes
if (typeof window === 'undefined') {
  // Only run cleanup on server
  setInterval(() => leadsRateLimiter.cleanup(), 10 * 60 * 1000);
}

