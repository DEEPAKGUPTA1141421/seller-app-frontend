
export enum OrderStatus {
  PENDING = 'Pending',
  PACKED = 'Packed',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  RETURNED = 'Returned'
}

export interface VariantOption {
  name: string; // e.g. "Size", "Color"
  values: string[]; // e.g. ["S", "M", "L"], ["Red", "Blue"]
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  variants?: VariantOption[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerAddress?: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  paymentMethod: 'COD' | 'Prepaid';
  returnReason?: string;
}

export interface SalesData {
  name: string;
  sales: number;
  orders: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'payment' | 'system';
}

export interface User {
  id: string;
  name: string;
  email: string;
  storeName: string;
  isVerified: boolean; // KYC
}

export interface KYCData {
  fullName: string;
  mobile: string;
  email: string;
  storeName: string;
  gstin: string;
  address: string;
  bankAccount: string;
  ifsc: string;
  aadharFile: File | null;
}
