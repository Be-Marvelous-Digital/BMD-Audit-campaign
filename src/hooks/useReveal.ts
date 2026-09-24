import { useEffect, useState, type RefObject } from 'react';

export type RevealState = 'static' | 'hidden' | 'shown';

const START_BELOW_VIEWPORT = 0.92;

export function useReveal(ref: RefObject<Element | null>): RevealState {
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.getBoundingClientRect().top < window.innerHeight * START_BELOW_VIEWPORT) return;

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('shown');
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return state;
}
