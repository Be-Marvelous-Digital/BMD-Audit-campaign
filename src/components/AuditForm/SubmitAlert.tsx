import { memo } from 'react';
import { SITE } from '../../config/site';
import styles from './AuditForm.module.less';

interface SubmitAlertProps {
  kind: 'error' | 'already-subscribed';
}

export const SubmitAlert = memo(({ kind }: SubmitAlertProps) => (
  <p className={styles.alert} role="alert">
    {kind === 'already-subscribed'
      ? 'Tento e-mail už mám v zozname, takže sa formulár neuložil znova. Napíšte mi prosím priamo na '
      : 'Odoslanie sa nepodarilo. Skúste to znova o chvíľu, alebo mi napíšte na '}
    <a href={`mailto:${SITE.email}?subject=Audit%20webu%20zadarmo`} className={styles.form__link}>
      {SITE.email}
    </a>
    .
  </p>
));
