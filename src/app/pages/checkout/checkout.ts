import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DeliveryType, PaymentMethod } from '../../core/models/order.model';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { notInPastValidator, todayIso, uaPhoneValidator } from '../../core/validators';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { UahPipe } from '../../shared/uah.pipe';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, BouquetArt, Icon, UahPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly orders = inject(OrderService);
  protected readonly cart = inject(CartService);

  protected readonly minDate = todayIso();
  protected readonly timeSlots = ['09:00–12:00', '12:00–15:00', '15:00–18:00', '18:00–21:00'];
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, uaPhoneValidator]],
      email: ['', [Validators.email]],
    }),
    delivery: this.fb.group({
      type: this.fb.control<DeliveryType>('courier'),
      city: ['Київ', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      date: [this.minDate, [Validators.required, notInPastValidator]],
      time: [this.timeSlots[1], [Validators.required]],
      comment: ['', [Validators.maxLength(300)]],
    }),
    payment: this.fb.control<PaymentMethod>('cash'),
  });

  protected readonly deliveryType = toSignal(this.form.controls.delivery.controls.type.valueChanges, {
    initialValue: this.form.controls.delivery.controls.type.value,
  });
  protected readonly payment = toSignal(this.form.controls.payment.valueChanges, {
    initialValue: this.form.controls.payment.value,
  });
  protected readonly commentLength = toSignal(this.form.controls.delivery.controls.comment.valueChanges, {
    initialValue: '',
  });

  protected readonly deliveryCost = computed(() => this.cart.deliveryCost(this.deliveryType()));
  protected readonly total = computed(() => this.cart.total(this.deliveryType()));

  constructor() {
    // Для самовивозу місто та адреса не потрібні — вимикаємо їх разом із валідацією.
    const { city, address } = this.form.controls.delivery.controls;
    this.form.controls.delivery.controls.type.valueChanges.subscribe((type) => {
      for (const control of [city, address]) {
        if (type === 'pickup') control.disable();
        else control.enable();
      }
    });
  }

  /** Показувати помилку, якщо поле невалідне і його вже чіпали або форму надсилали. */
  protected invalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid || this.cart.isEmpty()) {
      this.form.markAllAsTouched();
      // Фокус на перше поле з помилкою — для клавіатури та скрінрідерів.
      setTimeout(() =>
        this.host.nativeElement.querySelector<HTMLElement>('.input.ng-invalid, input.ng-invalid')?.focus(),
      );
      return;
    }

    const { customer, delivery, payment } = this.form.getRawValue();
    const isPickup = delivery.type === 'pickup';
    this.orders.place(
      { ...customer, name: customer.name.trim(), email: customer.email.trim() },
      {
        ...delivery,
        city: isPickup ? 'Київ' : delivery.city.trim(),
        address: isPickup ? 'Самовивіз: вул. Ярославів Вал, 14' : delivery.address.trim(),
        comment: delivery.comment.trim(),
      },
      payment,
    );
    this.router.navigate(['/order-success']);
  }
}
