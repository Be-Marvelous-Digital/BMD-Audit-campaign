const numberFormatter = new Intl.NumberFormat('sk-SK', { maximumFractionDigits: 0 });

export function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export function formatEur(value: number): string {
  return `${formatNumber(value)} €`;
}

export function firstWord(value: string): string {
  return value.trim().split(/\s+/)[0] ?? '';
}
