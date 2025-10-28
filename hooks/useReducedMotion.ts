/**
 * Reduced Motion Hook
 * Manages motion preferences with system detection and user control
 */

import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [userPreference, setUserPreference] = useState<boolean | null>(null);

  useEffect(() => {
    // Load user preference from localStorage
    const stored = localStorage.getItem('reduceMotion');
    if (stored !== null) {
      setUserPreference(stored === 'true');
      document.documentElement.setAttribute('data-reduce-motion', stored);
    }

    // Detect system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for system preference changes
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (userPreference === null) {
        // Only update if user hasn't overridden
        document.documentElement.setAttribute('data-reduce-motion', String(e.matches));
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [userPreference]);

  const toggleMotion = () => {
    const newValue = userPreference === null ? !prefersReducedMotion : !userPreference;
    setUserPreference(newValue);
    localStorage.setItem('reduceMotion', String(newValue));
    document.documentElement.setAttribute('data-reduce-motion', String(newValue));
  };

  const shouldReduceMotion = userPreference ?? prefersReducedMotion;
  const isUserControlled = userPreference !== null;

  return {
    shouldReduceMotion,
    toggleMotion,
    isUserControlled,
  };
}

