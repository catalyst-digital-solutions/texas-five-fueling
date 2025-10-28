/**
 * View Transition Provider
 * Provides context and feature detection for View Transitions API
 */

'use client';

import { useEffect } from 'react';

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Feature detection and logging
    if ('startViewTransition' in document) {
      console.log('✅ View Transitions API supported');
    } else {
      console.log('ℹ️ View Transitions API not supported - using fallback');
    }
  }, []);
  
  return <>{children}</>;
}

