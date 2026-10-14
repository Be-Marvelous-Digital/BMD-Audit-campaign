import { memo, useEffect, useRef } from 'react';
import { SITE } from '../../config/site';
import { firstWord } from '../../utils/format';
import { CheckIcon } from '../CheckIcon';
import styles from './PreviewForm.module.less';

interface FormSuccessProps {
  name: string;
  website: string;
  hasWeb: boolean;
}

export const FormSuccess = memo(({ name, website, hasWeb }: FormSuccessProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const greeting = firstWord(name);
  const subject = encodeURIComponent(`Podklady k náhľadu: ${website}`);

  return (
    <div className={styles.success} role="status">
      <span className={styles.success__icon}>
        <CheckIcon size={24} />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className={styles.success__title}>
        Mám to{greeting ? `, ${greeting}` : ''}.
      </h3>
      <p className={styles.success__text}>
        {hasWeb ? 'Váš web' : 'Váš profil'} mám v rade. Do 72 hodín vám na e-mail pošlem odkaz na náhľad novej úvodnej
        stránky.
      </p>
      <p className={styles.success__tip}>
        Máte logo alebo fotky vo vyššej kvalite? Pošlite mi ich na{' '}
        <a href={`mailto:${SITE.email}?subject=${subject}`} className={styles.form__link}>
          {SITE.email}
        </a>
        . Návrh bude vyzerať ešte viac ako vy.
      </p>
    </div>
  );
});
