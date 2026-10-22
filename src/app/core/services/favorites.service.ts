import { computed, effect, Injectable, signal } from '@angular/core';
import { readStorage, writeStorage } from '../storage';

const FAVORITES_KEY = 'hana.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _ids = signal<string[]>(readStorage<string[]>(FAVORITES_KEY, []));

  readonly ids = this._ids.asReadonly();
  readonly count = computed(() => this._ids().length);

  constructor() {
    effect(() => writeStorage(FAVORITES_KEY, this._ids()));
  }

  has(id: string): boolean {
    return this._ids().includes(id);
  }

  /** Додає або прибирає товар. Повертає новий стан: true — товар в обраному. */
  toggle(id: string): boolean {
    const added = !this.has(id);
    this._ids.update((ids) => (added ? [...ids, id] : ids.filter((x) => x !== id)));
    return added;
  }

  remove(id: string): void {
    this._ids.update((ids) => ids.filter((x) => x !== id));
  }
}
