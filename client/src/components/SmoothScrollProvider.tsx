import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

const DEFAULT_OPTIONS = {
  duration: 1.1,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  lerp: 0.08,
};

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    if (reducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
      return () => {
        document.documentElement.style.scrollBehavior = previous;
      };
    }

    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={DEFAULT_OPTIONS} autoRaf>
      {children}
    </ReactLenis>
  );
}
