import { memo, type MouseEventHandler } from 'react';
import { offerIncludes } from '../../data/content';
import { AuditPreview } from '../AuditPreview';
import { CheckIcon } from '../CheckIcon';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Offer.module.less';

interface OfferProps {
  onNoWebClick: MouseEventHandler<HTMLAnchorElement>;
}

export const Offer = memo(({ onNoWebClick }: OfferProps) => (
  <section id="ponuka" className={styles.offer} aria-labelledby="offer-title">
    <div className={styles.offer__inner}>
      <div className={styles.offer__copy}>
        <SectionIntro
          id="offer-title"
          index="03"
          kicker="Riešenie"
          title="Audit 5 bodov. Zadarmo."
          lead="Žiadny automatický report s 80 stranami grafov. Osobné video, v ktorom váš web prejdem očami zákazníka a poviem vám po slovensky, čo opraviť ako prvé."
          layout="stack"
        />
        <Reveal delay={1}>
          <ul className={styles.offer__list}>
            {offerIncludes.map((item) => (
              <li key={item} className={styles.offer__item}>
                <span className={styles.offer__check}>
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={2} className={styles.offer__buy}>
          <p className={styles.offer__price}>
            <span className="visually-hidden">Bežná cena </span>
            <s className={styles['offer__price-old']}>299 €</s>
            <span className="visually-hidden">, teraz </span>
            <strong className={styles['offer__price-new']}>0 €</strong>
            <span className={styles['offer__price-note']}>pre lokálne biznisy zo Slovenska</span>
          </p>
          <div className={styles.offer__actions}>
            <CtaLink href="#formular" withArrow>
              Chcem audit zadarmo
            </CtaLink>
            <CtaLink href="#formular" variant="outline-dark" onClick={onNoWebClick}>
              Web ešte nemám
            </CtaLink>
          </div>
        </Reveal>
      </div>
      <Reveal delay={1}>
        <AuditPreview />
      </Reveal>
    </div>
  </section>
));
