import { memo } from 'react';
import logoUrl from '../../assets/logo.svg';

interface LogoProps {
  size: number;
  className?: string;
  decorative?: boolean;
}

export const Logo = memo(({ size, className, decorative = false }: LogoProps) => (
  <img
    src={logoUrl}
    alt={decorative ? '' : 'Be Marvelous Digital'}
    width={size}
    height={size}
    className={className}
    decoding="async"
  />
));
