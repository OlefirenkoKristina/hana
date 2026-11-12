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
  /** Справжнє фото букета (якщо в товару є), для мініатюри в кошику. */
  image?: string;
  /** Обрана персоналізація: пакування, стрічка, листівка. */
  details?: string[];
}

export type NewCartItem = Omit<CartItem, 'quantity'>;
