import { memo } from 'react';
import { work } from '../../data/content';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Work.module.less';

export const Work = memo(() => (
  <section id="projekty" className={styles.work} aria-labelledby="work-title">
    <div className={styles.work__inner}>
      <SectionIntro
        id="work-title"
        title="Takto navrhujem pre lokálne firmy."
        lead="Kožná ambulancia, reštaurácia, donáška jedla, optika. Weby, na ktorých zákazník na mobile hneď vie, čo robiť: zavolať, prísť alebo si objednať."
        tone="dark"
      />
      <ul className={styles.work__grid}>
        {work.map((item, index) => (
          <Reveal as="li" key={item.name} delay={Math.min(index, 2) as 0 | 1 | 2} className={styles.project}>
            <figure className={styles.project__figure}>
              <div className={styles.project__frame}>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
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
    </div>
  </section>
));
