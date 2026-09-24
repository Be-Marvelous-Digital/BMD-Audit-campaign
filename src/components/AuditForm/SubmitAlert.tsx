import { memo } from 'react';
import { SITE } from '../../config/site';
import styles from './AuditForm.module.less';

export type SubmitAlertKind = 'error' | 'already-subscribed' | 'invalid-email' | 'rate-limited';

interface SubmitAlertProps {
  kind: SubmitAlertKind;
}

const MESSAGES: Record<SubmitAlertKind, string> = {
  'already-subscribed': 'Tento e-mail už mám v zozname, takže sa formulár neuložil znova. Napíšte mi prosím priamo na ',
  'invalid-email': 'Tento e-mail sa nepodarilo overiť. Skontrolujte ho, prípadne mi napíšte priamo na ',
  'rate-limited': 'Z tohto e-mailu prišlo priveľa pokusov za krátky čas. Skúste to o pár minút alebo mi napíšte na ',
  error: 'Odoslanie sa nepodarilo. Skúste to znova o chvíľu, alebo mi napíšte na ',
};

export const SubmitAlert = memo(({ kind }: SubmitAlertProps) => (
  <p className={styles.alert} role="alert">
    {MESSAGES[kind]}
    <a href={`mailto:${SITE.email}?subject=Audit%20webu%20zadarmo`} className={styles.form__link}>
      {SITE.email}
    </a>
    .
  </p>
));
