import { CartItem } from './cart-item.model';

export type DeliveryType = 'courier' | 'pickup';
export type PaymentMethod = 'cash' | 'card';

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
}

export interface OrderDelivery {
  type: DeliveryType;
  city: string;
  address: string;
  date: string;
  time: string;
  comment: string;
}

export interface Order {
  number: string;
  createdAt: string;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  payment: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  total: number;
}
