import { BouquetArtSpec } from './art.model';
import { SizeCode } from './product.model';

export interface CartItem {
  /** Унікальний ключ позиції: товар + розмір, або id власного букета. */
  key: string;
  productId: string | null;
  name: string;
  /** Ціна за одиницю, грн. */
  price: number;
  quantity: number;
  size?: SizeCode;
  art: BouquetArtSpec;
  /** Рядки опису для власного букета з конструктора. */
  details?: string[];
}

export type NewCartItem = Omit<CartItem, 'quantity'>;
