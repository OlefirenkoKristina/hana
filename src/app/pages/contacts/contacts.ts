import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { uaPhoneValidator } from '../../core/validators';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule, RouterLink, Icon, Reveal],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly submitted = signal(false);
  protected readonly sentTo = signal<string | null>(null);

  protected readonly topics = ['Питання щодо замовлення', 'Індивідуальний букет', 'Оформлення події', 'Співпраця', 'Інше'];

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    contact: ['', [Validators.required, uaPhoneValidator]],
    email: ['', [Validators.email]],
    topic: [this.topics[0]],
    // повідомлення необов'язкове: обов'язкові лише ім'я й телефон
    message: ['', [Validators.maxLength(500)]],
  });

  private static readonly PHONE_PREFIX = '+38 0';

  /** Клік у порожнє поле телефону підставляє «+38 0» — далі людина дописує решту цифр. */
  protected onPhoneFocus(): void {
    const c = this.form.controls.contact;
    if (!c.value.trim()) c.setValue(Contacts.PHONE_PREFIX);
  }

  /** Якщо в полі лишився самий префікс — прибираємо його, щоб не було «заповненого» порожнього значення. */
  protected onPhoneBlur(): void {
    const c = this.form.controls.contact;
    if (c.value.trim() === Contacts.PHONE_PREFIX.trim()) c.setValue('');
  }

  protected invalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Без серверної частини просто показуємо підтвердження.
    this.sentTo.set(this.form.controls.name.value.trim().split(' ')[0]);
    this.form.reset();
    this.submitted.set(false);
  }
}
