import { memo, useEffect, useRef } from 'react';
import { firstWord } from '../../utils/format';
import { CheckIcon } from '../CheckIcon';
import styles from './AuditForm.module.less';

interface FormSuccessProps {
  name: string;
  hasWeb: boolean;
}

export const FormSuccess = memo(({ name, hasWeb }: FormSuccessProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const greeting = firstWord(name);

  return (
    <div className={styles.success} role="status">
      <span className={styles.success__icon}>
        <CheckIcon size={24} />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className={styles.success__title}>
        Hotovo{greeting ? `, ${greeting}` : ''}.
      </h3>
      <p className={styles.success__text}>
        {hasWeb
          ? 'Váš web mám v rade. Do 48 hodín vám pošlem osobné video s auditom a 3 rýchlymi opravami.'
          : 'Ozvem sa vám do 24 hodín a dohodneme si 20 minút, ktoré vám sadnú.'}
      </p>
      <p className={styles.success__tip}>
        Kým čakáte: otvorte si svoj web na mobile a skúste do 5 sekúnd nájsť telefónne číslo. To je prvá vec, ktorú
        budem testovať.
      </p>
    </div>
  );
});
