export function firstWord(value: string): string {
  return value.trim().split(/\s+/)[0] ?? '';
}

export function pluralizeCharacters(count: number): string {
  if (count === 1) return '1 znak';
  if (count >= 2 && count <= 4) return `${count} znaky`;
  return `${count} znakov`;
}
