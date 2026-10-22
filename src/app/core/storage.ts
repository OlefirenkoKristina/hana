/**
 * Безпечна обгортка над localStorage: у приватному режимі або при
 * заблокованому сховищі доступ може кидати виняток — тоді просто
 * повертаємо значення за замовчуванням.
 */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* сховище недоступне — дані живуть лише до перезавантаження */
  }
}
