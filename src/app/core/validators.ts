import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Український номер телефону: +380 XX XXX XX XX або 0XX XXX XX XX.
 * Пробіли, дужки й дефіси дозволені.
 */
export const uaPhoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value ?? '').trim();
  if (!value) return null;
  if (!/^[\d\s()+-]+$/.test(value)) return { phone: true };
  const digits = value.replace(/\D/g, '');
  const ok = (digits.length === 12 && digits.startsWith('380')) || (digits.length === 10 && digits.startsWith('0'));
  return ok ? null : { phone: true };
};

/** Дата у форматі YYYY-MM-DD не раніше за сьогодні. */
export const notInPastValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string;
  if (!value) return null;
  return value < todayIso() ? { past: true } : null;
};

/** Сьогоднішня дата за місцевим часом у форматі YYYY-MM-DD. */
export function todayIso(): string {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
}
