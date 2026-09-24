import { useCallback, useRef, useState } from 'react';
import { About } from './components/About';
import { Calculator } from './components/Calculator';
import { Faq } from './components/Faq';
import { FloatingCta } from './components/FloatingCta';
import { Footer } from './components/Footer';
import { FormSection } from './components/FormSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Marquee } from './components/Marquee';
import { Offer } from './components/Offer';
import { Problem } from './components/Problem';
import { Process } from './components/Process';
import { SkipLink } from './components/SkipLink';
import { Work } from './components/Work';
import { usePageScrollState } from './hooks/usePageScrollState';
import { useHideOnScroll } from './hooks/useHideOnScroll';
import { useScrolledPast } from './hooks/useScrolledPast';
import type { HeaderTone } from './components/Header';

const HEADER_HIDE_OFFSET = 120;

function getHeaderTone(pastHero: boolean, scrolled: boolean): HeaderTone {
  if (pastHero) return 'light';
  return scrolled ? 'dark' : 'clear';
}

export const App = () => {
  const [hasWeb, setHasWeb] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const { pastHero, nearForm } = usePageScrollState(heroRef, formRef);
  const scrolled = useScrolledPast(24);
  const headerTone = getHeaderTone(pastHero, scrolled);
  const headerHidden = useHideOnScroll(HEADER_HIDE_OFFSET);
  const chooseNoWeb = useCallback(() => setHasWeb(false), []);

  return (
    <>
      <SkipLink />
      <Header tone={headerTone} hidden={headerHidden} ctaVisible={pastHero} />
      <main id="obsah">
        <Hero sectionRef={heroRef} onNoWebClick={chooseNoWeb} />
        <Marquee />
        <Problem />
        <Calculator />
        <Offer onNoWebClick={chooseNoWeb} />
        <Journey />
        <Process />
        <About />
        <Work />
        <Faq />
        <FormSection sectionRef={formRef} hasWeb={hasWeb} onHasWebChange={setHasWeb} />
      </main>
      <Footer />
      <FloatingCta visible={pastHero && !nearForm} />
    </>
  );
};
