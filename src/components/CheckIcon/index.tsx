import { memo } from 'react';

interface CheckIconProps {
  size?: number;
  className?: string;
}

export const CheckIcon = memo(({ size = 14, className }: CheckIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3 8.5l3 3 7-7" />
  </svg>
));
