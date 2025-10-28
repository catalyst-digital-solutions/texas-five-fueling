/**
 * View Transitions API Hook
 * Provides smooth page transitions with progressive enhancement
 */

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useViewTransition() {
  const router = useRouter();
  
  const navigateWithTransition = useCallback((href: string) => {
    // Check for browser support
    if (!document.startViewTransition) {
      // Fallback for unsupported browsers
      router.push(href);
      return;
    }
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }
    
    // Use native View Transitions API
    document.startViewTransition(() => {
      router.push(href);
    });
  }, [router]);
  
  return { navigateWithTransition };
}

