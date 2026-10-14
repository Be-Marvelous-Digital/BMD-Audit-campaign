import { memo } from 'react';
import portraitUrl from '../../assets/images/peter-portrait.webp';
import { fitNo, fitYes, WEEKLY_CAPACITY } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Fit.module.less';

export const Fit = memo(() => (
  <section id="pre-koho" className={styles.fit} aria-labelledby="fit-title">
    <div className={styles.fit__inner}>
      <Reveal as="figure" className={styles.portrait}>
        <img
          src={portraitUrl}
          alt="Peter Lehocky stojí pri stole s notebookom v svetlom ateliéri"
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          className={styles.portrait__image}
        />
        <figcaption className={styles.portrait__caption}>
          <strong>Peter Lehocky</strong> navrhuje a programuje weby pre lokálne firmy 8+ rokov. Bez agentúry, bez
          predajcov.
        </figcaption>
      </Reveal>
      <div className={styles.fit__copy}>
        <SectionIntro
          id="fit-title"
          title={`Len ${WEEKLY_CAPACITY} náhľadov týždenne. Preto sa pýtam viac.`}
          lead="Každý návrh robím sám, pre konkrétnu firmu. Formulár má 6 krátkych krokov: z odpovedí viem, čo navrhnúť, a vy hneď vidíte, či to pre vás dáva zmysel."
          layout="stack"
        />
        <Reveal delay={1} className={styles.lists}>
          <div className={styles.lists__col}>
            <h3 className={styles.lists__title}>Je to pre vás, ak</h3>
            <ul className={styles.lists__list}>
              {fitYes.map((item) => (
                <li key={item} className={[styles.lists__item, styles['lists__item--yes']].join(' ')}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.lists__col}>
            <h3 className={styles.lists__title}>Nie je to pre vás, ak</h3>
            <ul className={styles.lists__list}>
              {fitNo.map((item) => (
                <li key={item} className={[styles.lists__item, styles['lists__item--no']].join(' ')}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <CtaLink href="#formular" withArrow>
            Chcem jeden z {WEEKLY_CAPACITY} náhľadov
          </CtaLink>
        </Reveal>
      </div>
    </div>
  </section>
));
