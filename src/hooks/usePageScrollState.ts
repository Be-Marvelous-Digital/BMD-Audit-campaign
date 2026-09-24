import { useEffect, useState, type RefObject } from 'react';

interface PageScrollState {
  pastHero: boolean;
  nearForm: boolean;
}

const HEADER_OFFSET = 72;
const FORM_THRESHOLD = 0.9;

export function usePageScrollState(
  heroRef: RefObject<HTMLElement | null>,
  formRef: RefObject<HTMLElement | null>,
): PageScrollState {
  const [state, setState] = useState<PageScrollState>({ pastHero: false, nearForm: false });

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current;
      const form = formRef.current;
      if (!hero || !form) return;
      const pastHero = hero.getBoundingClientRect().bottom <= HEADER_OFFSET;
      const nearForm = form.getBoundingClientRect().top < window.innerHeight * FORM_THRESHOLD;
      setState((current) =>
        current.pastHero === pastHero && current.nearForm === nearForm ? current : { pastHero, nearForm },
      );
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [heroRef, formRef]);

  return state;
}
