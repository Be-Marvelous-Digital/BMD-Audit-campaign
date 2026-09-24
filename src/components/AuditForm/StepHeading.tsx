import { memo, type ReactNode, type RefObject } from 'react';
import styles from './AuditForm.module.less';

interface StepHeadingProps {
  headingRef: RefObject<HTMLHeadingElement | null> | undefined;
  children: ReactNode;
}

export const StepHeading = memo(({ headingRef, children }: StepHeadingProps) => (
  <h3 ref={headingRef} tabIndex={-1} className={styles.form__heading}>
    {children}
  </h3>
));
