import { memo, type RefObject } from 'react';
import { AuditForm } from '../AuditForm';
import { Reveal } from '../Reveal';
import styles from './FormSection.module.less';

interface FormSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
  hasWeb: boolean;
  onHasWebChange: (hasWeb: boolean) => void;
}

export const FormSection = memo(({ sectionRef, hasWeb, onHasWebChange }: FormSectionProps) => (
  <section id="formular" ref={sectionRef} className={styles.section} aria-labelledby="form-title">
    <div className={styles.section__wash} aria-hidden="true" />
    <div className={styles.section__inner}>
      <Reveal className={styles.section__copy}>
        <p className={styles.section__kicker}>
          <span className={styles.section__index}>09</span>
          Váš audit
        </p>
        <h2 id="form-title" className={styles.section__title}>
          Zistite, čo vám berie zákazníkov.
        </h2>
        <p className={styles.section__lead}>
          Tri krátke kroky. Žiadne platobné údaje. Video vám príde e-mailom alebo na WhatsApp do 48 hodín.
        </p>
        <aside className={styles.guarantee} aria-labelledby="guarantee-title">
          <h3 id="guarantee-title" className={styles.guarantee__title}>
            Moja záruka
          </h3>
          <p className={styles.guarantee__text}>
            Ak na vašom webe nenájdem aspoň 3 veci, ktoré vám berú zákazníkov, poviem vám to na rovinu a nebudem vám
            nič predávať.
          </p>
        </aside>
      </Reveal>
      <Reveal delay={1}>
        <AuditForm hasWeb={hasWeb} onHasWebChange={onHasWebChange} />
      </Reveal>
    </div>
  </section>
));
