import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { CONSENT_EVENT, readConsent, writeConsent, type ConsentPreferences } from '../utils/consent';

interface ConsentApi {
  consent: ConsentPreferences | null;
  needsDecision: boolean;
  save: (prefs: ConsentPreferences) => void;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getSnapshot(): string {
  return JSON.stringify(readConsent());
}

const SERVER_SNAPSHOT = 'server';

function getServerSnapshot(): string {
  return SERVER_SNAPSHOT;
}

export function useConsent(): ConsentApi {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent = useMemo<ConsentPreferences | null>(
    () => (snapshot === SERVER_SNAPSHOT ? null : (JSON.parse(snapshot) as ConsentPreferences | null)),
    [snapshot],
  );
  const save = useCallback((prefs: ConsentPreferences) => writeConsent(prefs), []);

  return { consent, needsDecision: snapshot === 'null', save };
}
