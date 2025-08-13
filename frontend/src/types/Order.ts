import type { CartItem } from "./CartItem";

export interface Order {
  orderItems: CartItem[];
  total: number;
  address: string;
  unitPrice: number;
}
