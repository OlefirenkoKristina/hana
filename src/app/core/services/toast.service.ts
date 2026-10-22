import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  action?: { label: string; link: string };
}

/** Короткі спливаючі повідомлення («Додано в кошик» тощо). */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<Toast[]>([]);

  show(message: string, action?: Toast['action'], duration = 3500): void {
    const toast: Toast = { id: this.nextId++, message, action };
    this.toasts.update((list) => [...list.slice(-2), toast]);
    setTimeout(() => this.dismiss(toast.id), duration);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
