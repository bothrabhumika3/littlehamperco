import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // array of product ids
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: ['prod-02', 'prod-05'], // initial sample favorites

      toggleWishlist: (productId: string) => {
        set((state) => {
          const exists = state.items.includes(productId);
          if (exists) {
            return { items: state.items.filter((id) => id !== productId) };
          } else {
            return { items: [...state.items, productId] };
          }
        });
      },

      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'lhc_wishlist_store_v1',
    }
  )
);
