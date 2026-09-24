import { DUMMY_META_PIXEL_ID } from '../config/tracking';

type FbqArgs = [string, ...unknown[]];

interface Fbq {
  (...args: FbqArgs): void;
  callMethod?: (...args: FbqArgs) => void;
  queue: FbqArgs[];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export interface LeadDetails {
  hasWeb: boolean;
  business: string;
}

const SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

export function isPixelConfigured(pixelId: string): boolean {
  return /^\d{15,16}$/.test(pixelId) && pixelId !== DUMMY_META_PIXEL_ID;
}

function debug(message: string, payload?: unknown): void {
  if (import.meta.env.DEV) console.info(`[meta-pixel] ${message}`, payload ?? '');
}

function createStub(): Fbq {
  const stub = function (...args: FbqArgs) {
    if (stub.callMethod) stub.callMethod(...args);
    else stub.queue.push(args);
  } as Fbq;
  stub.queue = [];
  stub.push = stub;
  stub.loaded = true;
  stub.version = '2.0';
  return stub;
}

export function loadMetaPixel(pixelId: string): void {
  if (!isPixelConfigured(pixelId)) {
    debug('pixel ID is not configured, skipping load', pixelId);
    return;
  }
  if (window.fbq) {
    window.fbq('consent', 'grant');
    return;
  }
  const fbq = createStub();
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = SCRIPT_SRC;
  document.head.appendChild(script);

  fbq('consent', 'grant');
  fbq('init', pixelId);
  fbq('track', 'PageView');
}

export function revokeMetaPixel(): void {
  window.fbq?.('consent', 'revoke');
}

export function trackLead({ hasWeb, business }: LeadDetails): void {
  const params = {
    content_name: hasWeb ? 'Audit webu zadarmo' : 'Konzultácia bez webu',
    content_category: business || 'neuvedené',
    currency: 'EUR',
    value: 0,
  };
  const options = { eventID: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}` };
  debug('track Lead', { params, options });
  window.fbq?.('track', 'Lead', params, options);
}
