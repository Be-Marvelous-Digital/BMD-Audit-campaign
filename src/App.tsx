import { useCallback, useRef, useState } from 'react';
import { CookieConsent } from './components/CookieConsent';
import { Faq } from './components/Faq';
import { Fit } from './components/Fit';
import { FloatingCta } from './components/FloatingCta';
import { Footer } from './components/Footer';
import { FormSection } from './components/FormSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkipLink } from './components/SkipLink';
import { Steps } from './components/Steps';
import { Work } from './components/Work';
import { useConsent } from './hooks/useConsent';
import { useMetaPixel } from './hooks/useMetaPixel';
import { usePageScrollState } from './hooks/usePageScrollState';
import type { PreviewPrefill } from './hooks/usePreviewForm';
import type { ConsentPreferences } from './utils/consent';
import { useHideOnScroll } from './hooks/useHideOnScroll';
import { useScrolledPast } from './hooks/useScrolledPast';
import type { HeaderTone } from './components/Header';

const HEADER_HIDE_OFFSET = 120;

function getHeaderTone(pastHero: boolean, scrolled: boolean): HeaderTone {
  if (pastHero) return 'light';
  return scrolled ? 'dark' : 'clear';
}

export const App = () => {
  const [prefill, setPrefill] = useState<PreviewPrefill | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const { pastHero, nearForm } = usePageScrollState(heroRef, formRef);
  const scrolled = useScrolledPast(24);
  const headerTone = getHeaderTone(pastHero, scrolled);
  const headerHidden = useHideOnScroll(HEADER_HIDE_OFFSET);
  const { consent, needsDecision, save: saveConsent } = useConsent();
  const [consentSettingsOpen, setConsentSettingsOpen] = useState(false);
  const consentOpen = needsDecision || consentSettingsOpen;
  useMetaPixel(consent?.marketing === true);

  const startPreview = useCallback((hasWeb: boolean, website: string) => {
    setPrefill({ id: Date.now(), hasWeb, website });
    formRef.current?.scrollIntoView();
  }, []);

  const openConsentSettings = useCallback(() => setConsentSettingsOpen(true), []);
  const handleConsentSave = useCallback(
    (prefs: ConsentPreferences) => {
      saveConsent(prefs);
      setConsentSettingsOpen(false);
    },
    [saveConsent],
  );

  return (
    <>
      <SkipLink />
      <Header tone={headerTone} hidden={headerHidden} ctaVisible={pastHero} />
      <main id="obsah">
        <Hero sectionRef={heroRef} onStart={startPreview} />
        <Steps />
        <Work />
        <Fit />
        <FormSection sectionRef={formRef} prefill={prefill} />
        <Faq />
      </main>
      <Footer onConsentSettings={openConsentSettings} />
      <FloatingCta visible={pastHero && !nearForm && !consentOpen} />
      {consentOpen && <CookieConsent initial={consent} onSave={handleConsentSave} />}
    </>
  );
};
