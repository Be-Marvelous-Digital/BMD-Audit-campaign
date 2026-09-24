import { memo } from 'react';
import { faqs } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Faq.module.less';

export const Faq = memo(() => (
  <section id="otazky" className={styles.faq} aria-labelledby="faq-title">
    <div className={styles.faq__inner}>
      <SectionIntro id="faq-title" index="08" kicker="Otázky" title="Kde je háčik?" layout="stack" />
      <Reveal delay={1} className={styles.faq__list}>
        {faqs.map((faq, index) => (
          <details key={faq.question} name="faq" open={index === 0} className={styles.item}>
            <summary className={styles.item__question}>
              <span className={styles.item__heading}>{faq.question}</span>
              <span className={styles.item__icon} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </span>
            </summary>
            <p className={styles.item__answer}>{faq.answer}</p>
          </details>
        ))}
      </Reveal>
      <Reveal className={styles.faq__more}>
        <div className={styles['faq__more-copy']}>
          <h3 className={styles['faq__more-title']}>Iná otázka?</h3>
          <p className={styles['faq__more-text']}>Napíšte ju do formulára. Odpoviem spolu s auditom.</p>
        </div>
        <CtaLink href="#formular" withArrow>
          Prejsť na formulár
        </CtaLink>
      </Reveal>
    </div>
  </section>
));
