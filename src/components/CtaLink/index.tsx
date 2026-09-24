import { memo, type MouseEventHandler, type ReactNode } from 'react';
import { ArrowIcon } from '../ArrowIcon';
import styles from './CtaLink.module.less';

export type CtaVariant = 'primary' | 'outline-light' | 'outline-dark';
export type CtaSize = 'sm' | 'md' | 'lg';

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  withArrow?: boolean;
  shine?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const CtaLink = memo(
  ({
    href,
    children,
    variant = 'primary',
    size = 'md',
    withArrow = false,
    shine = false,
    className,
    onClick,
  }: CtaLinkProps) => {
    const classes = [
      styles.cta,
      styles[`cta--${variant}`],
      styles[`cta--${size}`],
      shine && styles['cta--shine'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a href={href} className={classes} onClick={onClick}>
        <span className={styles.cta__label}>{children}</span>
        {withArrow && <ArrowIcon className={styles.cta__arrow} />}
      </a>
    );
  },
);
