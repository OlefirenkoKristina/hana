import { FormControl } from '@angular/forms';
import { notInPastValidator, todayIso, uaPhoneValidator } from './validators';

describe('validators', () => {
  describe('uaPhoneValidator', () => {
    const check = (value: string) => uaPhoneValidator(new FormControl(value));

    it.each(['+380671234567', '+38 (067) 123-45-67', '067 123 45 67', '0671234567'])('приймає %s', (v) => {
      expect(check(v)).toBeNull();
    });

    it.each(['12345', '+1 202 555 0100', '067-123-45', 'abc0671234567'])('відхиляє %s', (v) => {
      expect(check(v)).toEqual({ phone: true });
    });

    it('порожнє значення перевіряє Validators.required, а не цей валідатор', () => {
      expect(check('')).toBeNull();
    });
  });

  describe('notInPastValidator', () => {
    it('сьогоднішня дата допустима', () => {
      expect(notInPastValidator(new FormControl(todayIso()))).toBeNull();
    });

    it('минула дата недопустима', () => {
      expect(notInPastValidator(new FormControl('2000-01-01'))).toEqual({ past: true });
    });
  });
});
