import { createElement, useRef, type ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import type { RevealDelay } from './Reveal.helpers';

type RevealTag = 'div' | 'li' | 'article' | 'figure' | 'header' | 'aside';

interface RevealProps {
  as?: RevealTag;
  delay?: RevealDelay;
  className?: string;
  children: ReactNode;
}

export const Reveal = ({ as = 'div', delay = 0, className, children }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const state = useReveal(ref);
  const classes = [
    className,
    state !== 'static' && 'reveal',
    state === 'hidden' && 'reveal--hidden',
    state === 'shown' && 'reveal--shown',
    state !== 'static' && delay > 0 && `reveal--d${delay}`,
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(as, { ref, className: classes || undefined }, children);
};
