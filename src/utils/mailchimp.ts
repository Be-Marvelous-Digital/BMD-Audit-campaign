export type SubscribeOutcome = 'success' | 'already-subscribed' | 'invalid-email' | 'rate-limited' | 'error';

interface MailchimpResponse {
  result: 'success' | 'error';
  msg: string;
}

const TIMEOUT_MS = 15000;

export function toJsonpUrl(action: string, fields: Record<string, string>, callback: string): string {
  const url = new URL(action.replace('/subscribe/post?', '/subscribe/post-json?'));
  Object.entries(fields).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set('c', callback);
  return url.toString();
}

export function classifyResponse(response: MailchimpResponse): SubscribeOutcome {
  if (response.result === 'success') return 'success';
  if (/already subscribed/i.test(response.msg)) return 'already-subscribed';
  if (/too many/i.test(response.msg)) return 'rate-limited';
  if (/e-?mail/i.test(response.msg)) return 'invalid-email';
  return 'error';
}

export function subscribe(action: string, fields: Record<string, string>): Promise<SubscribeOutcome> {
  return new Promise((resolve) => {
    const callback = `mcCallback${Date.now()}`;
    const registry = window as unknown as Record<string, unknown>;
    const script = document.createElement('script');

    const finish = (outcome: SubscribeOutcome) => {
      window.clearTimeout(timer);
      delete registry[callback];
      script.remove();
      resolve(outcome);
    };
    const timer = window.setTimeout(() => finish('error'), TIMEOUT_MS);

    registry[callback] = (response: MailchimpResponse) => finish(classifyResponse(response));
    script.src = toJsonpUrl(action, fields, callback);
    script.onerror = () => finish('error');
    document.body.appendChild(script);
  });
}

export function collectFields(form: HTMLFormElement, ignorePrefix: string): Record<string, string> {
  const fields: Record<string, string> = {};
  new FormData(form).forEach((value, key) => {
    if (!key.startsWith(ignorePrefix) && typeof value === 'string') fields[key] = value;
  });
  return fields;
}
