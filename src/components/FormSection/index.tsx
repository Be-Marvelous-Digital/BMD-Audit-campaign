import { memo, type RefObject } from 'react';
import { WEEKLY_CAPACITY } from '../../data/content';
import type { PreviewPrefill } from '../../hooks/usePreviewForm';
import { PreviewForm } from '../PreviewForm';
import { Reveal } from '../Reveal';
import styles from './FormSection.module.less';

interface FormSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
  prefill: PreviewPrefill | null;
}

export const FormSection = memo(({ sectionRef, prefill }: FormSectionProps) => (
  <section id="formular" ref={sectionRef} className={styles.section} aria-labelledby="form-title">
    <div className={styles.section__wash} aria-hidden="true" />
    <div className={styles.section__inner}>
      <Reveal className={styles.section__copy}>
        <h2 id="form-title" className={styles.section__title}>
          Ukážte mi svoj web. Ja vám ukážem nový.
        </h2>
        <p className={styles.section__lead}>6 krátkych krokov, asi 3 minúty. Žiadne platobné údaje.</p>
        <ul className={styles.facts}>
          <li>
            <strong>Do 72 hodín</strong> dostanete odkaz na náhľad.
          </li>
          <li>
            <strong>Na vašom obsahu</strong>, nie na šablóne.
          </li>
          <li>
            <strong>Najviac {WEEKLY_CAPACITY} týždenne</strong>, aby som každému venoval čas.
          </li>
        </ul>
      </Reveal>
      <Reveal delay={1}>
        <PreviewForm prefill={prefill} />
      </Reveal>
    </div>
  </section>
));
