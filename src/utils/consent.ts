export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
}

export const CONSENT_EVENT = 'cookie-consent-update';

const COOKIE_NAME = 'cookie_consent';
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export function readConsent(): ConsentPreferences | null {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)));
    if (typeof parsed !== 'object' || parsed === null) return null;
    const prefs = parsed as Partial<ConsentPreferences>;
    return { analytics: prefs.analytics === true, marketing: prefs.marketing === true };
  } catch {
    return null;
  }
}

export function writeConsent(prefs: ConsentPreferences): void {
  const value = encodeURIComponent(JSON.stringify(prefs));
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentPreferences>(CONSENT_EVENT, { detail: prefs }));
}
