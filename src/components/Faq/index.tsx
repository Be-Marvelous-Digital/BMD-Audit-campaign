import { memo, useCallback, useState } from 'react';
import { faqs } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { FaqItem } from './FaqItem';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Faq.module.less';

export const Faq = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = useCallback((index: number) => setOpenIndex((current) => (current === index ? null : index)), []);
  const open = useCallback((index: number) => setOpenIndex(index), []);

  return (
  <section id="otazky" className={styles.faq} aria-labelledby="faq-title">
    <div className={styles.faq__inner}>
      <SectionIntro id="faq-title" index="08" kicker="Otázky" title="Kde je háčik?" layout="stack" />
      <Reveal delay={1} className={styles.faq__list}>
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            index={index}
            open={openIndex === index}
            onToggle={toggle}
            onOpen={open}
          />
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
  );
});
