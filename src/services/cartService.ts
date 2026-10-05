import { CartItem, Coupon } from '../types/order';
import { siteConfig } from '../config/siteConfig';

export const availableCoupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 999,
    description: '10% off on your first hamper (Orders above ₹999)',
  },
  {
    code: 'HAMPERLOVE',
    discountType: 'flat',
    discountValue: 200,
    minOrderValue: 1999,
    description: 'Flat ₹200 off on hampers above ₹1,999',
  },
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 3000,
    description: '15% off on celebrations above ₹3,000',
  },
];

export interface CartCalculationResult {
  subtotal: number;
  packagingFee: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
}

export const cartService = {
  validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string } {
    const cleanCode = code.toUpperCase().trim();
    const coupon = availableCoupons.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code. Try WELCOME10 or HAMPERLOVE.' };
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        error: `Coupon applies on orders of ₹${coupon.minOrderValue} or more. Add ₹${coupon.minOrderValue - subtotal} more.`,
      };
    }

    return { valid: true, coupon };
  },

  calculateTotals(items: CartItem[], appliedCoupon?: Coupon | null): CartCalculationResult {
    let subtotal = 0;
    let packagingFee = 0;

    items.forEach((item) => {
      subtotal += item.price * item.quantity;
      if (item.customConfig?.packaging?.price) {
        packagingFee += item.customConfig.packaging.price * item.quantity;
      }
    });

    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      } else {
        discountAmount = appliedCoupon.discountValue;
      }
    }

    const isFreeDelivery = subtotal >= siteConfig.freeDeliveryThreshold;
    const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : siteConfig.defaultDeliveryFee;
    const amountNeededForFreeDelivery = Math.max(0, siteConfig.freeDeliveryThreshold - subtotal);
    const totalAmount = Math.max(0, subtotal + packagingFee + deliveryFee - discountAmount);

    return {
      subtotal,
      packagingFee,
      deliveryFee,
      discountAmount,
      totalAmount,
      isFreeDelivery,
      amountNeededForFreeDelivery,
    };
  },
};
