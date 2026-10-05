import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Coupon } from '../types/order';
import { cartService, CartCalculationResult } from '../services/cartService';

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  couponError: string | null;

  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;

  // Computed helper
  getTotals: () => CartCalculationResult;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      isCartOpen: false,
      couponError: null,

      addItem: (itemData) => {
        set((state) => {
          // Check if identical item exists (same productId or custom config)
          const existingIndex = state.items.findIndex((item) => {
            if (itemData.productId && item.productId) {
              return item.productId === itemData.productId;
            }
            return false;
          });

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += itemData.quantity;
            return { items: updatedItems, isCartOpen: true };
          }

          const newItem: CartItem = {
            ...itemData,
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          };

          return { items: [...state.items, newItem], isCartOpen: true };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];

          return { items: updatedItems };
        });
      },

      applyCoupon: (code) => {
        const { items } = get();
        const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        const result = cartService.validateCoupon(code, subtotal);

        if (result.valid && result.coupon) {
          set({ appliedCoupon: result.coupon, couponError: null });
          return true;
        } else {
          set({ couponError: result.error || 'Invalid coupon code' });
          return false;
        }
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, couponError: null });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponError: null });
      },

      setIsCartOpen: (open) => set({ isCartOpen: open }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getTotals: () => {
        const { items, appliedCoupon } = get();
        return cartService.calculateTotals(items, appliedCoupon);
      },

      getTotalItemsCount: () => {
        const { items } = get();
        return items.reduce((acc, curr) => acc + curr.quantity, 0);
      },
    }),
    {
      name: 'lhc_cart_store_v1',
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
);
