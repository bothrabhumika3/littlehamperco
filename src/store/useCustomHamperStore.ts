import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  OccasionChoice,
  RecipientChoice,
  BudgetChoice,
  HamperItemOption,
  PackagingOption,
  ThemeChoice,
} from '../types/customHamper';
import { packagingOptions } from '../data/customHamperOptions';

export interface CustomHamperState {
  currentStep: number;
  occasion: OccasionChoice | string;
  recipient: RecipientChoice | string;
  budget: BudgetChoice | string;
  customBudgetAmount?: string;
  selectedItems: { item: HamperItemOption; quantity: number }[];
  packaging: PackagingOption;
  theme: ThemeChoice | string;
  customThemeDetails: string;
  personalMessage: string;
  hasHandwrittenNote: boolean;
  quantity: number;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
  eventDate: string;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setOccasion: (occ: OccasionChoice | string) => void;
  setRecipient: (rec: RecipientChoice | string) => void;
  setBudget: (b: BudgetChoice | string, custom?: string) => void;
  addItem: (item: HamperItemOption) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, delta: number) => void;
  setPackaging: (pkg: PackagingOption) => void;
  setTheme: (theme: ThemeChoice | string, details?: string) => void;
  setPersonalMessage: (msg: string, handwritten?: boolean) => void;
  setCustomerInfo: (info: {
    customerName?: string;
    customerPhone?: string;
    deliveryLocation?: string;
    eventDate?: string;
    quantity?: number;
  }) => void;
  resetHamper: () => void;

  // Computations
  getItemsSubtotal: () => number;
  getTotalPerHamper: () => number;
  getGrandTotal: () => number;
}

const defaultPackaging = packagingOptions[0];

export const useCustomHamperStore = create<CustomHamperState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      occasion: 'Birthday',
      recipient: 'Friend',
      budget: 'Classic Selection',
      customBudgetAmount: '',
      selectedItems: [],
      packaging: defaultPackaging,
      theme: 'Elegant',
      customThemeDetails: '',
      personalMessage: '',
      hasHandwrittenNote: true,
      quantity: 1,
      customerName: '',
      customerPhone: '',
      deliveryLocation: '',
      eventDate: '',

      setStep: (step) => set({ currentStep: Math.min(Math.max(1, step), 8) }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 8) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

      setOccasion: (occasion) => set({ occasion }),
      setRecipient: (recipient) => set({ recipient }),
      setBudget: (budget, custom) =>
        set({ budget, customBudgetAmount: custom !== undefined ? custom : get().customBudgetAmount }),

      addItem: (item) => {
        set((state) => {
          const index = state.selectedItems.findIndex((i) => i.item.id === item.id);
          if (index > -1) {
            const updated = [...state.selectedItems];
            updated[index].quantity += 1;
            return { selectedItems: updated };
          }
          return { selectedItems: [...state.selectedItems, { item, quantity: 1 }] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          selectedItems: state.selectedItems.filter((i) => i.item.id !== itemId),
        }));
      },

      updateItemQuantity: (itemId, delta) => {
        set((state) => {
          const updated = state.selectedItems
            .map((i) => {
              if (i.item.id === itemId) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter(Boolean) as { item: HamperItemOption; quantity: number }[];

          return { selectedItems: updated };
        });
      },

      setPackaging: (packaging) => set({ packaging }),
      setTheme: (theme, details) =>
        set({
          theme,
          customThemeDetails: details !== undefined ? details : get().customThemeDetails,
        }),

      setPersonalMessage: (personalMessage, handwritten) =>
        set((s) => ({
          personalMessage,
          hasHandwrittenNote: handwritten !== undefined ? handwritten : s.hasHandwrittenNote,
        })),

      setCustomerInfo: (info) =>
        set((s) => ({
          customerName: info.customerName !== undefined ? info.customerName : s.customerName,
          customerPhone: info.customerPhone !== undefined ? info.customerPhone : s.customerPhone,
          deliveryLocation: info.deliveryLocation !== undefined ? info.deliveryLocation : s.deliveryLocation,
          eventDate: info.eventDate !== undefined ? info.eventDate : s.eventDate,
          quantity: info.quantity !== undefined ? info.quantity : s.quantity,
        })),

      resetHamper: () =>
        set({
          currentStep: 1,
          occasion: 'Birthday',
          recipient: 'Friend',
          budget: 'Classic Selection',
          customBudgetAmount: '',
          selectedItems: [],
          packaging: defaultPackaging,
          theme: 'Elegant',
          customThemeDetails: '',
          personalMessage: '',
          hasHandwrittenNote: true,
          quantity: 1,
          customerName: '',
          customerPhone: '',
          deliveryLocation: '',
          eventDate: '',
        }),

      getItemsSubtotal: () => {
        const { selectedItems } = get();
        return selectedItems.reduce((sum, curr) => sum + curr.item.price * curr.quantity, 0);
      },

      getTotalPerHamper: () => {
        const itemsTotal = get().getItemsSubtotal();
        const packagingCost = get().packaging?.price || 0;
        return itemsTotal + packagingCost;
      },

      getGrandTotal: () => {
        const perHamper = get().getTotalPerHamper();
        const qty = get().quantity || 1;
        return perHamper * qty;
      },
    }),
    {
      name: 'lhc_custom_hamper_state_v1',
    }
  )
);
