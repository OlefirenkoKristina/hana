import { effect, Injectable, signal } from '@angular/core';
import { SizeCode } from '../models/product.model';
import { readStorage, writeStorage } from '../storage';

const DRAFT_KEY = 'hana.customize';

/**
 * Букет, який користувач змінює на сторінці «Змінити букет», і все, що він уже обрав.
 * Зберігається в localStorage: переживає перезавантаження сторінки й лишається,
 * доки користувач сам не видалить букет. `undefined` у полі означає «значення за замовчуванням»,
 * `null` — «без пакування / без стрічки».
 */
export interface CustomizationDraft {
  productId: string;
  size?: SizeCode;
  packagingId?: string | null;
  ribbonId?: string | null;
  wantsCard?: boolean;
  cardText?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomizationDraftService {
  private readonly _draft = signal<CustomizationDraft | null>(
    readStorage<CustomizationDraft | null>(DRAFT_KEY, null),
  );

  readonly draft = this._draft.asReadonly();

  constructor() {
    effect(() => writeStorage(DRAFT_KEY, this._draft()));
  }

  /** Починає зміну іншого букета: попередній вибір скидається. */
  start(productId: string): void {
    if (this._draft()?.productId !== productId) this._draft.set({ productId });
  }

  /** Зберігає зміну вибору для поточного букета. */
  patch(productId: string, changes: Partial<Omit<CustomizationDraft, 'productId'>>): void {
    const current = this._draft();
    this._draft.set({ ...(current?.productId === productId ? current : { productId }), ...changes });
  }

  /** Видаляє букет зі сторінки «Змінити букет». */
  clear(): void {
    this._draft.set(null);
  }
}
