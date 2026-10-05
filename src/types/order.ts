import { Product } from './product';
import { PackagingOption, ThemeChoice } from './customHamper';

export interface CartCustomHamperConfig {
  occasion: string;
  recipient: string;
  theme: ThemeChoice | string;
  packaging: PackagingOption;
  personalMessage: string;
  hasHandwrittenNote: boolean;
  items: { name: string; price: number; quantity: number }[];
}

export interface CartItem {
  id: string; // unique item id in cart
  productId?: string; // present if regular product
  product?: Product;
  customConfig?: CartCustomHamperConfig;
  name: string;
  price: number;
  quantity: number;
  image: string;
  packagingChoice?: string;
  giftMessage?: string;
}

export interface DeliverySlot {
  id: string;
  label: string;
  timeWindow: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  pincode: string;
  city: string;
  state: string;
  landmark?: string;
  deliveryDate: string;
  deliverySlot: string;
  giftMessage?: string;
  deliveryInstructions?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Packing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string; // e.g. LHC-2026-8942
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'Cash On Delivery';
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  packagingFee: number;
  totalAmount: number;
  couponCode?: string;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue?: number;
  description: string;
}
