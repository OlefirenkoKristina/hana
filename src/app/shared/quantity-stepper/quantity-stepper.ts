import { Component, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

/** Кнопки «−» / «+» з поточною кількістю. */
@Component({
  selector: 'app-quantity-stepper',
  imports: [Icon],
  template: `
    <button
      type="button"
      class="step"
      (click)="decrease.emit()"
      [disabled]="value() <= min()"
      [attr.aria-label]="'Зменшити кількість: ' + label()"
    >
      <app-icon name="minus" [size]="16" />
    </button>
    <output class="value" aria-live="polite">{{ value() }}</output>
    <button
      type="button"
      class="step"
      (click)="increase.emit()"
      [disabled]="value() >= max()"
      [attr.aria-label]="'Збільшити кількість: ' + label()"
    >
      <app-icon name="plus" [size]="16" />
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      border: 1.5px solid var(--line);
      border-radius: var(--radius-pill);
      background: var(--surface);
      height: 44px;
    }
    :host(.compact) {
      height: 38px;
    }
    .step {
      display: grid;
      place-items: center;
      width: 40px;
      height: 100%;
      border: 0;
      background: none;
      border-radius: var(--radius-pill);
      transition: background 0.2s;
    }
    .step:hover:not(:disabled) {
      background: var(--blush);
    }
    .step:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .value {
      min-width: 28px;
      text-align: center;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class QuantityStepper {
  readonly value = input.required<number>();
  readonly min = input(1);
  readonly max = input(99);
  readonly label = input('товар');

  readonly increase = output<void>();
  readonly decrease = output<void>();
}
