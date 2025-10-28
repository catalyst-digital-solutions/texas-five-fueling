/**
 * Motion Utility Functions
 * Helper functions for Framer Motion with reduced motion support
 */

import type { Variants } from 'framer-motion';

/**
 * Create motion variants that respect reduced motion preferences
 * @param shouldReduce - Whether motion should be reduced
 * @returns Simplified or full motion variants
 */
export const createMotionVariants = (shouldReduce: boolean): Variants => {
  if (shouldReduce) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0 }
      }
    };
  }
  
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
};

/**
 * Get animation duration based on motion preference
 * @param shouldReduce - Whether motion should be reduced
 * @param normalDuration - Normal animation duration in seconds
 * @returns Adjusted duration
 */
export const getMotionDuration = (shouldReduce: boolean, normalDuration: number): number => {
  return shouldReduce ? 0 : normalDuration;
};

