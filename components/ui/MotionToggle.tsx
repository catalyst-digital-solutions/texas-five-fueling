'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function MotionToggle() {
  const { shouldReduceMotion, toggleMotion, isUserControlled } = useReducedMotion();

  return (
    <button
      onClick={toggleMotion}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-600 hover:text-gray-800 transition-colors motion-reduce:transition-none"
      aria-pressed={shouldReduceMotion}
      aria-label={`${shouldReduceMotion ? 'Enable' : 'Disable'} animations`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {shouldReduceMotion ? (
          // Pause icon (animations off)
          <>
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </>
        ) : (
          // Play icon (animations on)
          <>
            <polygon points="5 3 19 12 5 21"></polygon>
          </>
        )}
      </svg>
      <span className="hidden sm:inline">Animations: {shouldReduceMotion ? 'Off' : 'On'}</span>
      {isUserControlled && (
        <span className="hidden md:inline text-xs text-gray-500">(Custom)</span>
      )}
    </button>
  );
}

