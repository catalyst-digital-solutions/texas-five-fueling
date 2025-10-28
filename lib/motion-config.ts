/**
 * Motion Configuration and Accessibility Helpers
 * Shared animation settings and reduced motion detection
 */

export const motionConfig = {
  reducedMotion: 'user',
  transition: { 
    duration: 0.3, 
    ease: 'easeOut' 
  }
};

/**
 * Check if user has reduced motion preference enabled
 * @returns {boolean} True if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get motion-safe animation settings
 * @returns {object} Animation configuration respecting user preferences
 */
export function getSafeMotionProps(customConfig?: any) {
  if (shouldReduceMotion()) {
    return {
      initial: false,
      animate: false,
      transition: { duration: 0.01 }
    };
  }
  
  return customConfig || motionConfig;
}

