import { memo } from 'react';
import { work } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { staggerDelay } from '../Reveal/Reveal.helpers';
import { SectionIntro } from '../SectionIntro';
import styles from './Work.module.less';

export const Work = memo(() => (
  <section id="projekty" className={styles.work} aria-labelledby="work-title">
    <div className={styles.work__inner}>
      <SectionIntro
        id="work-title"
        index="07"
        kicker="Skutočné projekty"
        title="Weby pre lokálne firmy."
        lead="Pizzeria, detské centrum, optika. Malé biznisy s jasným cieľom: aby zákazník zavolal, prišiel alebo si rezervoval."
      />
      <ul className={styles.work__grid}>
        {work.map((item, index) => (
          <Reveal as="li" key={item.name} delay={staggerDelay(index, 3)} className={styles.project}>
            <figure className={styles.project__figure}>
              <div className={styles.project__frame}>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className={styles.project__image}
                />
              </div>
              <figcaption className={styles.project__caption}>
                <span className={styles.project__name}>{item.name}</span>
                <span className={styles.project__category}>{item.category}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      <Reveal className={styles.work__cta}>
        <p className={styles['work__cta-text']}>Chcete vedieť, čo by pomohlo vášmu biznisu?</p>
        <CtaLink href="#formular" withArrow>
          Chcem audit zadarmo
        </CtaLink>
      </Reveal>
    </div>
  </section>
));
